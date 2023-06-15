"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Shop } from "@/config/tablesSchemas"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableViewOptions } from "@/components/ui/table/data-table-column-toggle"
import { DataTablePagination } from "@/components/ui/table/data-table-pagination"
import { useToast } from "@/components/ui/use-toast"
import { shopColumns } from "@/app/shops/tableDatas/columns"

interface DataTableProps<TData, TValue> {
  data: TData[]
}

export function ShopDataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast()

  const [currentData, setCurrentData] = useState(data as Shop[])

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data: currentData,
    columns: shopColumns(setCurrentData, currentData, toast),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })
  // const getActualSizeOfColumn = (columnName: string) => {
  //   switch (columnName) {
  //     case "postDescription":
  //       return "w-[40%]"
  //     case "postSlug":
  //       return "w-[250px]"
  //     case "status":
  //     case "categoryName":
  //     case "viewCount":
  //       return "w-[100px]"
  //   }
  // }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter title..."
          value={
            (table.getColumn("shopName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("shopName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      // className={`${getActualSizeOfColumn(header.id)}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={shopColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
