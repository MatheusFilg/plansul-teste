"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Categoria } from "@/hooks/use-categorias";
import { getUniqueColumnValues } from "@/utils/getUniqueColumnValues";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, ArrowUpDown, Filter } from "lucide-react";

// export function getUniqueColumnValues<TData>(
//   data: TData[],
//   columnId: string
// ): unknown[] {
//   const values = new Set<unknown>();
  
//   data.forEach((row) => {
//     const rowData = row as Record<string, unknown>;
//     let value = rowData[columnId];

//     if (
//       typeof value === "object" &&
//       value !== null &&
//       "id" in value
//     ) {
//       value = (value as { id: unknown }).id;
//     }

//     if (value !== undefined && value !== null) {
//       values.add(value);
//     }
//   });

//   return Array.from(values).sort((a, b) => {
//       if (typeof a === 'number' && typeof b === 'number') return a - b;
//       return String(a).localeCompare(String(b));
//   });
// }

export const createCategoriaColumns = (
  allTableData: Categoria[]
): ColumnDef<Categoria>[] => [
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
    enableSorting: true,
    enableColumnFilter: false,
  },

  {
    accessorKey: "nome",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const isFiltered = column.getFilterValue() != null && column.getFilterValue() !== "";

      return (
        <div className="flex items-center gap-1">
          <span className="font-medium">Nome</span>
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
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "fuzzy",
  },

  {
    accessorKey: "descricao",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      const isFiltered = column.getFilterValue() != null && column.getFilterValue() !== "";
      
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium">Descrição</span>
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
                <DropdownMenuContent
                  align="start"
                  className="w-48 max-h-64 overflow-y-auto"
                >
                 
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
                  <DropdownMenuItem
                    onClick={() => column.setFilterValue("")}
                    className="text-red-500"
                  >
                    Limpar filtro
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
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