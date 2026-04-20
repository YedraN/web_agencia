"use client";

import { FileText } from "lucide-react";

export default function FacturasPage() {
  return (
    <div className="flex-1 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-white">Invoices</h2>
      <div className="p-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center">
        <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/40 text-sm">No invoices yet. Your billing history will appear here.</p>
      </div>
    </div>
  );
}

