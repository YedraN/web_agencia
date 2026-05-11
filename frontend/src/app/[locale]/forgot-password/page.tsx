"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Diamond, Loader2, ArrowLeft, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { forgotPassword } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function ForgotPasswordPage() {
  const t = useTranslations("ForgotPassword");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t("validation.emailRequired") })
      .email({ message: t("validation.emailInvalid") }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      await forgotPassword(values.email);
      setSent(true);
    } catch (error: any) {
      toast.error(t("toast.errorTitle"), { description: error?.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#090909] flex">
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] flex-col justify-between p-12 border-r border-white/[0.06] relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Link href="/" className="relative inline-flex items-center gap-2.5 z-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <Diamond className="h-4 w-4 text-black fill-black" />
          </div>
          <span className="text-[17px] font-bold tracking-tight text-white">
            Nova<span className="text-white/40">Studio</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md mb-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("back")}
          </Link>
        </div>

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
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              {t("title")}
            </h1>
            <p className="text-white/45 text-[15px]">{t("subtitle")}</p>
          </div>

          {sent ? (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center gap-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Mail className="h-6 w-6 text-white/60" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{t("successTitle")}</p>
                  <p className="text-white/45 text-sm mt-1">{t("successDesc")}</p>
                </div>
              </div>
              <Link
                href="/login"
                className="block w-full text-center text-sm text-white/40 hover:text-white transition-colors"
              >
                ← {t("back")}
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60 text-sm font-medium">
                        {t("emailLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("emailPlaceholder")}
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-white text-black font-bold text-[15px] hover:bg-white/90 transition-colors mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("submitting")}
                    </>
                  ) : (
                    t("submit")
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
