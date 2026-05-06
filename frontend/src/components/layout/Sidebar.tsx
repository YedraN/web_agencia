"use client";

import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Briefcase, FileText, Bell, Settings, Diamond, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { Link as I18nLink } from "@/i18n/routing";

export function Sidebar() {
  const t = useTranslations("Dashboard.Sidebar");
  const pathname = usePathname();
  const { sidebarOpen } = useAppStore();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const navItems = [
    { name: t("inicio"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("proyectos"), href: "/dashboard/proyectos", icon: Briefcase },
    { name: t("facturas"), href: "/dashboard/facturas", icon: FileText },
    { name: t("notificaciones"), href: "/dashboard/notificaciones", icon: Bell },
    { name: t("ajustes"), href: "/dashboard/ajustes", icon: Settings },
  ];

  const getInitials = (name?: string) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <aside className={cn("fixed inset-y-0 left-0 z-40 w-64 border-r border-white/[0.06] bg-[#0d0d0d]", "transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 flex flex-col", sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/[0.06] px-6">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white"><Diamond className="h-3.5 w-3.5 text-black fill-black" /></div>
        <span className="text-[16px] font-bold tracking-tight text-white">Nova<span className="text-white/40">Client</span></span>
      </div>

      <ScrollArea className="flex-1 py-6">
        <div className="px-3 mb-2">
          <p className="px-3 text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-3">{t("workspace")}</p>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <I18nLink key={item.name} href={item.href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200", isActive ? "bg-white/[0.08] text-white" : "text-white/40 hover:bg-white/[0.04] hover:text-white/80")}>
                  <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-white/35")} />{item.name}
                </I18nLink>
              );
            })}
          </nav>
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t border-white/[0.06] p-4">
        {isLoading ? (
          <div className="flex items-center gap-3 p-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2"><div className="h-3 w-20 bg-white/10 rounded" /><div className="h-2 w-32 bg-white/5 rounded" /></div>
          </div>
        ) : user ? (
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group mb-2">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60 group-hover:text-white transition-colors">{getInitials(user.name)}</div>
            <div className="flex-1 min-w-0"><div className="text-sm font-medium text-white truncate">{user.name}</div><div className="text-xs text-white/35 truncate">{user.email}</div></div>
          </div>
        ) : null}
        <button onClick={() => router.push("/login")} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/35 hover:text-white/60 hover:bg-white/[0.04] transition-all">
          <LogOut className="h-4 w-4" />{t("logout")}
        </button>
      </div>
    </aside>
  );
}