"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:pl-0" : "lg:pl-0"
        )}
      >
        <Topbar />
        
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className="flex-1 p-6 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

