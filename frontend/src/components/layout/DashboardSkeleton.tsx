import { Skeleton } from "@/components/ui/skeleton";
import { Diamond } from "lucide-react";

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/[0.06] bg-[#0d0d0d]">
        <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/[0.06] px-6">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
            <Diamond className="h-3.5 w-3.5 fill-black text-black" />
          </div>
          <span className="text-[16px] font-bold tracking-tight text-white">
            Nova<span className="text-white/40">Client</span>
          </span>
        </div>

        <div className="flex-1 px-4 py-6 space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg bg-white/[0.04]" />
          ))}
        </div>

        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 shrink-0 rounded-full bg-white/[0.04]" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-24 bg-white/[0.04]" />
              <Skeleton className="h-2.5 w-16 bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#0d0d0d]/80 px-6 backdrop-blur-sm">
          <Skeleton className="h-5 w-40 bg-white/[0.04]" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg bg-white/[0.04]" />
            <Skeleton className="h-9 w-9 rounded-full bg-white/[0.04]" />
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 w-full max-w-7xl mx-auto">
          <div className="mb-8 space-y-2">
            <Skeleton className="h-7 w-52 bg-white/[0.04]" />
            <Skeleton className="h-4 w-80 bg-white/[0.04]" />
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <Skeleton className="h-4 w-24 bg-white/[0.04]" />
                <Skeleton className="h-8 w-20 bg-white/[0.04]" />
                <Skeleton className="h-3 w-32 bg-white/[0.04]" />
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <Skeleton className="h-5 w-44 bg-white/[0.04]" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full bg-white/[0.04]" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
