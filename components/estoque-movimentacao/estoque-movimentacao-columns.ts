"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, isValid } from "date-fns";
import { EstoqueMovimentacao } from "@/hooks/use-estoque-movimentacao";

export const estoqueMovimentacaoColumns: ColumnDef<EstoqueMovimentacao>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "produto_id",
    header: "Id do Produto",
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },
  {
    accessorKey: "tipo",
    header: "Tipo de Movimentação",
  },
  {
      accessorKey: "criado_em",
      header: "Criado em",
      cell: ({ row }) => {
        const valor = row.getValue("criado_em");
  
        if (!valor) return "-";
  
        const date = new Date(valor as string | number | Date);
  
        if (!isValid(date)) {
          return "Data Inválida";
        }
  
        return format(date, "dd/MM/yyyy HH:mm");
      },
    },
];
