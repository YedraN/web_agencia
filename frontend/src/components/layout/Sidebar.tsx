"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bell,
  Settings,
  Diamond,
  LogOut,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { name: "Proyectos", href: "/dashboard/proyectos", icon: Briefcase },
  { name: "Facturas", href: "/dashboard/facturas", icon: FileText },
  { name: "Notificaciones", href: "/dashboard/notificaciones", icon: Bell },
  { name: "Ajustes", href: "/dashboard/ajustes", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useAppStore();
  const router = useRouter();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-white/[0.06] bg-[#0d0d0d]",
        "transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/[0.06] px-6">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
          <Diamond className="h-3.5 w-3.5 text-black fill-black" />
        </div>
        <span className="text-[16px] font-bold tracking-tight text-white">
          Nova<span className="text-white/40">Client</span>
        </span>
      </div>

      <ScrollArea className="flex-1 py-6">
        <div className="px-3 mb-2">
          <p className="px-3 text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-3">
            Espacio de trabajo
          </p>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-white/40 hover:bg-white/[0.04] hover:text-white/80"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-white/35")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/[0.06] p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group mb-2">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
            CW
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Client Workspace</div>
            <div className="text-xs text-white/35 truncate">client@company.com</div>
          </div>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/35 hover:text-white/60 hover:bg-white/[0.04] transition-all"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

