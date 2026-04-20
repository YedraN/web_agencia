"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Diamond, Loader2, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
  company: z
    .string()
    .min(1, { message: "Company name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchedPassword = form.watch("password");

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      // TODO: Replace with real API call
      // const response = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: values.name,
      //     company: values.company,
      //     email: values.email,
      //     password: values.password,
      //   }),
      // });
      // if (!response.ok) {
      //   const err = await response.json();
      //   throw new Error(err.message || "Registration failed");
      // }
      // const { token } = await response.json();
      // localStorage.setItem("auth_token", token);

      await new Promise((r) => setTimeout(r, 1500)); // Remove when backend is ready
      toast.success("Account created!", {
        description: "Welcome to Nova Studio. Redirecting...",
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-between p-12 border-r border-white/[0.06] relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

        {/* Logo */}
        <Link href="/" className="relative inline-flex items-center gap-2.5 z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <Diamond className="h-4 w-4 text-black fill-black" />
          </div>
          <span className="text-[17px] font-bold tracking-tight text-white">
            Nova<span className="text-white/40">Studio</span>
          </span>
        </Link>

        {/* Benefits */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            What you get with the Client Portal
          </h2>
          <ul className="space-y-5">
            {[
              "Real-time project progress tracking",
              "Direct communication with your team",
              "Invoices, contracts & shared files",
              "Approve designs and review milestones",
              "Access to your dedicated team channel",
            ].map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[15px] text-white/60 leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 overflow-y-auto">
        {/* Back link */}
        <div className="w-full max-w-md mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to website
          </Link>
        </div>

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Diamond className="h-4 w-4 text-black fill-black" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-white">
              Nova<span className="text-white/40">Studio</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Request Portal Access
            </h1>
            <p className="text-white/45 text-[15px]">
              Create your account to start working with us.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60 text-sm font-medium">
                        Full name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="register-name"
                          placeholder="John Doe"
                          autoComplete="name"
                          disabled={isLoading}
                          className={cn(
                            "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
                            "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl",
                            "hover:border-white/15 transition-colors"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60 text-sm font-medium">
                        Company
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="register-company"
                          placeholder="Acme Corp"
                          autoComplete="organization"
                          disabled={isLoading}
                          className={cn(
                            "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
                            "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl",
                            "hover:border-white/15 transition-colors"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/60 text-sm font-medium">
                      Work email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        disabled={isLoading}
                        className={cn(
                          "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
                          "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl",
                          "hover:border-white/15 transition-colors"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/60 text-sm font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className={cn(
                            "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
                            "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl pr-12",
                            "hover:border-white/15 transition-colors"
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                    {/* Password strength indicators */}
                    {watchedPassword.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {passwordRequirements.map((req) => (
                          <div
                            key={req.label}
                            className={cn(
                              "flex items-center gap-2 text-xs transition-colors",
                              req.test(watchedPassword) ? "text-emerald-400" : "text-white/30"
                            )}
                          >
                            <CheckCircle className="h-3 w-3 shrink-0" />
                            {req.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/60 text-sm font-medium">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="register-confirm-password"
                          type={showConfirm ? "text" : "password"}
                          placeholder="Repeat your password"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className={cn(
                            "h-12 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25",
                            "focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl pr-12",
                            "hover:border-white/15 transition-colors"
                          )}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                          tabIndex={-1}
                        >
                          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <Button
                id="register-submit"
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90 transition-colors mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              <p className="text-xs text-white/30 text-center leading-relaxed">
                By creating an account you agree to our{" "}
                <Link href="/terms" className="text-white/50 hover:text-white underline underline-offset-4">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-white/50 hover:text-white underline underline-offset-4">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </Form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-white/25 font-medium">Already a client?</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <Link
            href="/login"
            className="block w-full text-center h-12 rounded-xl border border-white/[0.09] text-white/60 font-semibold text-[15px] hover:bg-white/[0.04] hover:text-white transition-all leading-[3rem]"
          >
            Sign in instead
          </Link>
        </div>
      </div>
    </div>
  );
}

