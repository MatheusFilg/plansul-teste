"use client";

import { DataTable } from "@/components/custom/data-table";
import { Input } from "@/components/ui/input";
import { estoqueMovimentacaoColumns } from "../estoque-movimentacao/estoque-movimentacao-columns";
import { useEstoqueMovimentacao } from "@/hooks/use-estoque-movimentacao";
import { Button } from "../ui/button";
import { useState } from "react";
import { AddTransactionModal } from "../estoque-movimentacao/estoque-movimentacao-add-modal";

export function EstoqueMovimentacaoView() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { data: estoqueMovimentacao, isLoading, isError, error } = useEstoqueMovimentacao();


  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load products."}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={estoqueMovimentacaoColumns}
        data={estoqueMovimentacao || []}
        isLoading={isLoading}
        searchComponent={
          <Input placeholder="Buscar produtos..." className="max-w-sm" />
        }
        actionButtons={[
          <Button key="new-transaction" onClick={() => setIsAddModalOpen(true)}>
            Nova Movimentação
          </Button>,
        ]}
      />
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      </>
  );
}
