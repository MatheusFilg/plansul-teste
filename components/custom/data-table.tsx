"use client";
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value);
	addMeta({ itemRank });
	return itemRank.passed;
};

interface DataTableProps<TData extends { id: string }, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	isLoading?: boolean;
	searchComponent?: React.ReactNode;
	actionButtons?: React.ReactNode[];
}

export function DataTable<TData extends { id: string }, TValue>({
	columns,
	data,
	onEdit,
	onDelete,
	isLoading = false,
	searchComponent,
	actionButtons,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [globalFilter, setGlobalFilter] = React.useState("");
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			globalFilter,
			columnVisibility,
		},
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		globalFilterFn: fuzzyFilter,
	});


  const generateSkeletonRow = (columnCount: number, key: number) => (
    <TableRow key={key}>
      {Array.from({ length: columnCount }).map((_, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton className="h-6 w-full" />
        </TableCell>
      ))}
    </TableRow>
  );

  const renderSearchComponent = React.useMemo(() => {
    if (React.isValidElement(searchComponent)) {
      return React.cloneElement(searchComponent as React.ReactElement<{
        value?: string;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      }>, {
        value: globalFilter,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value),
      });
    }
    return null;
  }, [searchComponent, globalFilter]);

  
	return (
		<div>
			<div className="flex items-center py-4 gap-2">
				{renderSearchComponent}
				<div className="ml-auto flex gap-2">
					{actionButtons?.map((button, index) => (
						<React.Fragment key={index}>{button}</React.Fragment>
					))}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Colunas
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table && typeof table.getAllLeafColumns === "function" ? (
								(() => {
									const allLeafColumns = table.getAllLeafColumns();
									if (Array.isArray(allLeafColumns)) {
										return allLeafColumns
											.filter((column) => column.getCanHide())
											.map((column) => {
												return (
													<DropdownMenuCheckboxItem
														key={column.id}
														className="capitalize"
														checked={column.getIsVisible()}
														onCheckedChange={(value) =>
															column.toggleVisibility(!!value)
														}
													>
														{column.id}
													</DropdownMenuCheckboxItem>
												);
											});
									}
									return (
										<DropdownMenuItem disabled>
											Nenhuma coluna disponível (não é um array)
										</DropdownMenuItem>
									);
								})()
							) : (
								<DropdownMenuItem disabled>
									Carregando colunas ou erro na inicialização da tabela.
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							Array.from({ length: 5 }).map((_, index) =>
								generateSkeletonRow(columns.length, index),
							)
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
									{(onEdit || onDelete) && (
										<TableCell className="text-right">
											{onEdit && (
												<Button
													variant="ghost"
													onClick={() => onEdit(row.original.id)}
													className="mr-2"
												>
													Edit
												</Button>
											)}
											{onDelete && (
												<Button
													variant="ghost"
													onClick={() => onDelete(row.original.id)}
												>
													Delete
												</Button>
											)}
										</TableCell>
									)}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Anterior
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Próximo
				</Button>
			</div>
		</div>
	);
}
