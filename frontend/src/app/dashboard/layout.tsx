import DashboardLayoutComponent from "@/components/layout/DashboardLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </ProtectedRoute>
  );
}