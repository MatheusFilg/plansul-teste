"use client";

import { Categoria } from "@/hooks/use-categorias";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { SortButton } from "../custom/sort-button";
import { FilterMenu } from "../custom/filter-menu";

export const createCategoriaColumns = (
  allTableData: Categoria[]
): ColumnDef<Categoria>[] => [
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
    enableSorting: true,
    enableColumnFilter: false,
  },

  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium">Nome</span>
          <div className="flex items-center">
            <SortButton column={column} />

            <FilterMenu column={column} allTableData={allTableData} />
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "fuzzy",
  },

  {
    accessorKey: "descricao",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium">Descrição</span>
          <div className="flex items-center">
            <SortButton column={column} />
            
            <FilterMenu column={column} allTableData={allTableData} />
         </div>
        </div>
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "fuzzy",
  },
  {
    accessorKey: "criado_em",
    header: "Criado Em",
    cell: ({ row }) => {
      const rawDate = row.getValue("criado_em");
      const date = new Date(rawDate as string | number | Date);
      return !isNaN(date.getTime()) ? format(date, "dd/MM/yyyy HH:mm") : "-";
    },
    enableSorting: true,
    enableColumnFilter: false,
  },
];