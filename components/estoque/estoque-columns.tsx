"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, isValid } from "date-fns";
import { Estoque } from "@/hooks/use-estoque";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown, Filter } from "lucide-react";
import { getUniqueColumnValues } from "@/utils/getUniqueColumnValues";

// export function getUniqueColumnValues<TData>(
//   data: TData[],
//   columnId: string
// ): unknown[] {
//   const values = new Set<unknown>();
  
//   data.forEach((row) => {
//     let currentValue: any = row;
//     const keys = columnId.split('.');

//     for (const key of keys) {
//       if (currentValue === null || typeof currentValue !== 'object') {
//         currentValue = undefined;
//         break;
//       }
//       currentValue = currentValue[key];
//     }
    
//     if (typeof currentValue === "object" && currentValue !== null && "id" in currentValue) {
//       currentValue = currentValue.id;
//     }

//     if (currentValue !== undefined && currentValue !== null) {
//       values.add(currentValue);
//     }
//   });

//   return Array.from(values).sort((a, b) => {
//       if (typeof a === 'number' && typeof b === 'number') return a - b;
//       return String(a).localeCompare(String(b));
//   });
// }

export const estoqueColumns= (allTableData: Estoque[]): ColumnDef<Estoque>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      
      return (
        <div className="flex items-center gap-1">
          <span>Id</span>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (isSorted === "asc") {
                  column.toggleSorting(true); 
                } else if (isSorted === "desc") {
                  column.clearSorting();
                } else {
                  column.toggleSorting(false);
                }
              }}
              title="Ordenar"
            >
              {isSorted === "asc" ? (
                <ArrowUp className="h-4 w-4 text-primary" />
              ) : isSorted === "desc" ? (
                <ArrowDown className="h-4 w-4 text-primary" />
              ) : (
                <ArrowUpDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "produto_id",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const isFiltered = column.getFilterValue() != null && column.getFilterValue() !== "";
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium">Id Produto</span>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (isSorted === "asc") {
                  column.toggleSorting(true); 
                } else if (isSorted === "desc") {
                  column.clearSorting();
                } else {
                  column.toggleSorting(false);
                }
              }}
              title="Ordenar"
            >
              {isSorted === "asc" ? (
                <ArrowUp className="h-4 w-4 text-primary" />
              ) : isSorted === "desc" ? (
                <ArrowDown className="h-4 w-4 text-primary" />
              ) : (
                <ArrowUpDown className="h-4 w-4" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 p-0 ${isFiltered ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
                  title="Filtrar"
                >
                  <Filter className={`h-4 w-4 ${isFiltered ? "fill-current" : ""}`} />
                </Button>
              </DropdownMenuTrigger>
              {column.getCanFilter() && (
                <DropdownMenuContent align="start" className="w-48 max-h-64 overflow-y-auto">
                  
                  {getUniqueColumnValues(allTableData, column.id).map((value) => (
                    <DropdownMenuCheckboxItem
                      key={String(value)}
                      checked={column.getFilterValue() === value}
                      onCheckedChange={(checked) =>
                        column.setFilterValue(checked ? value : "")
                      }
                      className="capitalize"
                    >
                      {String(value)}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => column.setFilterValue("")} className="text-red-500">
                    Limpar filtro
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
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
      const isSorted = column.getIsSorted();
      
      return (
        <div className="flex items-center gap-1">
          <span>Quantidade</span>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (isSorted === "asc") {
                  column.toggleSorting(true); 
                } else if (isSorted === "desc") {
                  column.clearSorting();
                } else {
                  column.toggleSorting(false);
                }
              }}
              title="Ordenar"
            >
              {isSorted === "asc" ? (
                <ArrowUp className="h-4 w-4 text-primary" />
              ) : isSorted === "desc" ? (
                <ArrowDown className="h-4 w-4 text-primary" />
              ) : (
                <ArrowUpDown className="h-4 w-4" />
              )}
            </Button>
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
