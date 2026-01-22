"use client";

import { DataTable } from "@/components/custom/data-table";
import { Input } from "@/components/ui/input";
import { estoqueMovimentacaoColumns } from "../estoque-movimentacao/estoque-movimentacao-columns";
import { useEstoqueMovimentacao } from "@/hooks/use-estoque-movimentacao";

export function EstoqueMovimentacaoView() {
  const { data: estoqueMovimentacao, isLoading, isError, error } = useEstoqueMovimentacao();


  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load products."}
      </div>
    );
  }

  return (
      <DataTable
        columns={estoqueMovimentacaoColumns}
        data={estoqueMovimentacao || []}
        isLoading={isLoading}
        searchComponent={
          <Input placeholder="Buscar produtos..." className="max-w-sm" />
        }
      />
  );
}
