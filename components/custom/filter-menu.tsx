import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { getUniqueColumnValues } from "@/utils/getUniqueColumnValues";
import { Button } from "../ui/button";
import { Column } from "@tanstack/react-table";

interface FilterMenuProps<TData, TValue> {
  column: Column<TData, TValue>
  allTableData: TData[]
  
}

export function FilterMenu<TData, TValue>({column, allTableData}:FilterMenuProps<TData, TValue>) {
  const isFiltered = column.getFilterValue() != null && column.getFilterValue() !== "";
    return (
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
    );
}