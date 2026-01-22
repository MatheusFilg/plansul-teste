"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, isValid } from "date-fns";
import { Estoque } from "@/hooks/use-estoque";

export const estoqueColumns: ColumnDef<Estoque>[] = [
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
      accessorKey: "atualizado_em",
      header: "Atualizado em",
      cell: ({ row }) => {
        const valor = row.getValue("atualizado_em");
  
        if (!valor) return "-";
  
        const date = new Date(valor as string | number | Date);
  
        if (!isValid(date)) {
          return "Data Inválida";
        }
  
        return format(date, "dd/MM/yyyy HH:mm");
      },
    },
];
