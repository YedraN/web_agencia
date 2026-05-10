import type { Metadata } from "next";
import DashboardLayoutComponent from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </ProtectedRoute>
  );
}