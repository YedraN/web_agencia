import DashboardLayoutComponent from "@/components/layout/DashboardLayout";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}

