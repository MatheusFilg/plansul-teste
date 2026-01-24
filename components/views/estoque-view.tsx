"use client";

import { DataTable } from "@/components/custom/data-table";
import { useEstoque } from "@/hooks/use-estoque";
import { estoqueColumns } from "../estoque/estoque-columns";
import { useMemo } from "react";

export function EstoqueView() {
  const { data: estoque, isLoading, isError, error } = useEstoque();

  
  const columns = useMemo(() => {
    return estoqueColumns(estoque || []);
  }, [estoque]);

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to load products."}
      </div>
    );
  }

  return (
      <DataTable
        columns={columns}
        data={estoque || []}
        isLoading={isLoading}
        pageSize={10}
      />
  );
}
