"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { InvoiceFilters } from "@/lib/types";

export function useInvoices(filters: InvoiceFilters = {}) {
  return useQuery({
    queryKey: ["invoices", filters],
    queryFn: () => api.getInvoices(filters),
    staleTime: 30_000,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}

export function useDownloadInvoicePdf() {
  return useMutation({
    mutationFn: (id: string) => api.downloadInvoicePdf(id),
  });
}
