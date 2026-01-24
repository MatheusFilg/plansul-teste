import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Column } from "@tanstack/react-table";

interface SortButtonProps<TData, TValue> {
  column: Column<TData, TValue>
}

export function SortButton<TData, TValue>({column}: SortButtonProps<TData, TValue>) {
  const isSorted = column.getIsSorted();
  
  return (
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
  )
}