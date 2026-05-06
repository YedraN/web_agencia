import { useState, useCallback } from "react";
import { Search, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useInvoices, useDownloadInvoicePdf } from "@/hooks/useInvoices";
import { InvoiceStatus, InvoiceFilters } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";
export default function FacturasPage() {
  const t = useTranslations("Dashboard.Facturas");
  const [filters, setFilters] = useState<InvoiceFilters>({ page: 1, page_size: 10, status: "", search: "" });
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, isError } = useInvoices(filters);
  const downloadPdf = useDownloadInvoicePdf();
  const applySearch = useCallback(() => { setFilters((f) => ({ ...f, search: searchInput, page: 1 })); }, [searchInput]);
  const setStatus = (status: InvoiceStatus | "") => { setFilters((f) => ({ ...f, status, page: 1 })); };
  const goToPage = (page: number) => { setFilters((f) => ({ ...f, page })); };
  const statusLabels: Record<InvoiceStatus, string> = { draft: t("draft"), sent: t("sent"), viewed: t("viewed"), paid: t("paid"), overdue: t("overdue"), cancelled: t("cancelled") };
  const statusVariants: Record<InvoiceStatus, "default" | "secondary" | "destructive" | "outline"> = { draft: "outline", sent: "secondary", viewed: "secondary", paid: "default", overdue: "destructive", cancelled: "outline" };
  const allStatuses: InvoiceStatus[] = ["draft", "sent", "viewed", "paid", "overdue", "cancelled"];
  function formatAmount(cents: number, moneda: string) {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: moneda || "EUR" }).format(cents / 100);
  }
  function formatDate(dateStr: string | null) {
    if (!dateStr) return "\u2014";
    return new Date(dateStr).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  }
  return (
    <div className="flex-1 space-y-6">
      <div><h2 className="text-3xl font-bold tracking-tight text-white">{t("title")}</h2><p className="text-white/40 text-sm mt-1">{t("subtitle")}</p></div>
      <div className="flex gap-6 items-start">
        <aside className="w-52 shrink-0 space-y-5">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-4">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">{t("filters")}</p>
            <div className="space-y-1.5">
              <label className="text-xs text-white/50">{t("searchLabel")}</label>
              <div className="flex gap-1.5">
                <Input placeholder={t("searchPlaceholder")} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && applySearch()} className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 text-sm" />
                <Button size="icon" variant="outline" onClick={applySearch} className="shrink-0 border-white/[0.08] text-white/60 hover:text-white"><Search className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/50">{t("statusFilter")}</label>
              <div className="flex flex-col gap-1">
                <button onClick={() => setStatus("")} className={`text-left text-sm px-2.5 py-1.5 rounded-lg transition-colors ${!filters.status ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>{t("all")}</button>
                {allStatuses.map((s) => (<button key={s} onClick={() => setStatus(s)} className={`text-left text-sm px-2.5 py-1.5 rounded-lg transition-colors ${filters.status === s ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>{statusLabels[s]}</button>))}
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1 min-w-0 space-y-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-white/50 font-medium text-xs uppercase tracking-wider pl-4">#</TableHead>
                  <TableHead className="text-white/50 font-medium text-xs uppercase tracking-wider">{t("date")}</TableHead>
                  <TableHead className="text-white/50 font-medium text-xs uppercase tracking-wider">{t("client")}</TableHead>
                  <TableHead className="text-white/50 font-medium text-xs uppercase tracking-wider">{t("dueDate")}</TableHead>
                  <TableHead className="text-white/50 font-medium text-xs uppercase tracking-wider text-right">{t("amount")}</TableHead>
                  <TableHead className="text-white/50 font-medium text-xs uppercase tracking-wider">{t("status")}</TableHead>
                  <TableHead className="text-white/50 font-medium text-xs uppercase tracking-wider text-right pr-4">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (<TableRow key={i} className="border-white/[0.04]">{Array.from({ length: 6 }).map((_, j) => (<TableCell key={j}><Skeleton className="h-4 w-full bg-white/[0.06]" /></TableCell>))}</TableRow>))
                ) : isError ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-12 text-white/40">{t("errorLoading")}</TableCell></TableRow>
                ) : !data?.items.length ? (
                  <TableRow><TableCell colSpan={7} className="py-16"><div className="flex flex-col items-center gap-3 text-white/30"><FileText className="h-10 w-10" /><p className="text-sm">{t("noInvoices")}</p></div></TableCell></TableRow>
                ) : (
                  data.items.map((invoice) => (
                    <TableRow key={invoice.id} className="border-white/[0.04] hover:bg-white/[0.02]">
                      <TableCell className="pl-4 font-mono text-sm text-white/80">{invoice.numero}</TableCell>
                      <TableCell className="text-white/60 text-sm">{formatDate(invoice.emitida_en || invoice.creado)}</TableCell>
                      <TableCell className="text-white/70 text-sm">{invoice.cliente_nombre ?? "\u2014"}</TableCell>
                      <TableCell className="text-white/60 text-sm">{formatDate(invoice.vencimiento)}</TableCell>
                      <TableCell className="text-right font-semibold text-white text-sm">{formatAmount(invoice.total_cents, invoice.moneda)}</TableCell>
                      <TableCell><Badge variant={statusVariants[invoice.status as InvoiceStatus]}>{statusLabels[invoice.status as InvoiceStatus] ?? invoice.status}</Badge></TableCell>
                      <TableCell className="text-right pr-4"><Button size="icon-sm" variant="ghost" disabled={downloadPdf.isPending} onClick={() => downloadPdf.mutate(invoice.id)} title={t("downloadPdf")} className="text-white/40 hover:text-white"><Download className="h-3.5 w-3.5" /></Button></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {data && data.total_pages > 1 && (
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-white/40">{data.total} {data.total !== 1 ? t("totalInvoicesPlural") : t("totalInvoices")}</p>
              <div className="flex items-center gap-1">
                <Button size="icon-sm" variant="ghost" disabled={filters.page === 1} onClick={() => goToPage((filters.page ?? 1) - 1)} className="text-white/40 hover:text-white disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></Button>
                {Array.from({ length: data.total_pages }, (_, i) => i + 1).filter((p) => { const cur = filters.page ?? 1; return p === 1 || p === data.total_pages || Math.abs(p - cur) <= 1; }).reduce<(number | "...")[]>((acc, p, idx, arr) => { if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("..."); acc.push(p); return acc; }, []).map((p, i) => p === "..." ? (<span key={`ellipsis-${i}`} className="text-white/30 text-sm px-1">\u2026</span>) : (<Button key={p} size="icon-sm" variant={filters.page === p ? "default" : "ghost"} onClick={() => goToPage(p as number)} className={filters.page === p ? "text-white" : "text-white/40 hover:text-white"}>{p}</Button>))}
                <Button size="icon-sm" variant="ghost" disabled={filters.page === data.total_pages} onClick={() => goToPage((filters.page ?? 1) + 1)} className="text-white/40 hover:text-white disabled:opacity-30"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}