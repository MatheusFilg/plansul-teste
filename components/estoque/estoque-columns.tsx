"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, isValid } from "date-fns";
import { Estoque } from "@/hooks/use-estoque";
import { SortButton } from "../custom/sort-button";
import { FilterMenu } from "../custom/filter-menu";


export const estoqueColumns= (allTableData: Estoque[]): ColumnDef<Estoque>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span>Id</span>
          <div className="flex items-center">
            <SortButton column={column} />
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "produto_id",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium">Id Produto</span>
          <div className="flex items-center">
            <SortButton column={column} />

            <FilterMenu column={column} allTableData={allTableData} />
          </div>
        </div>
      )
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "fuzzy",
  },
  {
    accessorKey: "quantidade",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span>Quantidade</span>
          <div className="flex items-center">
            <SortButton column={column} />
          </div>
        </div>
      )
    },
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
