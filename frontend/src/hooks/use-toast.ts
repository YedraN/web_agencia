import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const toast = (options: ToastOptions) => {
    sonnerToast(options.title, {
      description: options.description,
      style: options.variant === "destructive" 
        ? { background: "#7f1d1d", borderColor: "#991b1b", color: "#fecaca" }
        : undefined,
    });
  };

  return { toast };
}