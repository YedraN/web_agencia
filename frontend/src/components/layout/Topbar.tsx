"use client";

import { useAppStore } from "@/store/useAppStore";
import { Menu, Bell, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Topbar() {
  const { toggleSidebar } = useAppStore();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-white/[0.06] bg-[#090909]/90 backdrop-blur-xl px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white/40 hover:text-white hover:bg-white/[0.05] rounded-lg"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-white/40 hover:text-white hover:bg-white/[0.05]"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full px-3 py-1.5 hover:bg-white/[0.05] transition-colors outline-none">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
              CW
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-white leading-tight">Workspace</div>
              <div className="text-xs text-white/35 leading-tight">client@company.com</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-[#111] border-white/[0.08] text-white rounded-xl p-1 shadow-xl"
            align="end"
          >
            <DropdownMenuLabel className="font-normal px-3 py-2">
              <div className="font-semibold text-sm text-white">Client Workspace</div>
              <div className="text-xs text-white/35 mt-0.5">client@company.com</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/[0.06] my-1" />
            <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm text-white/60 hover:text-white focus:bg-white/[0.06] focus:text-white cursor-pointer">
              <Link href="/dashboard/ajustes" className="w-full">Account Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-lg px-3 py-2 text-sm text-white/60 hover:text-white focus:bg-white/[0.06] focus:text-white cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

