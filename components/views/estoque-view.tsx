"use client";

import { DataTable } from "@/components/custom/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEstoque } from "@/hooks/use-estoque";
import { estoqueColumns } from "../estoque/estoque-columns";

export function EstoqueView() {
  const { data: estoque, isLoading, isError, error } = useEstoque();


  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load products."}
      </div>
    );
  }

  return (
      <DataTable
        columns={estoqueColumns}
        data={estoque || []}
        isLoading={isLoading}
        searchComponent={
          <Input placeholder="Buscar produtos..." className="max-w-sm" />
        }
        actionButtons={[
          <Button key="new-product">
            Novo Produto
          </Button>,
        ]}
      />
  );
}
