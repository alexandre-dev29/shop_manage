"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"

import { Shop } from "@/config/tablesSchemas"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"
import { EditShop } from "@/app/shops/tableDatas/edit-shop"

export const shopColumns = (
  setData: any,
  currentData: Shop[],
  toast: any
): ColumnDef<Shop>[] => {
  const confirmDelete = async (postId: string) => {
    // implement delete shop
    toast({
      title: "Shop Delete",
      description: `Your post has been deleted`,
    })
    setData(currentData.filter((value) => value.id !== postId))
  }
  return [
    {
      accessorKey: "shopName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Shop Name" />
      ),
      cell: ({ row }) => {
        return (
          <Link
            href={`/shops/${row.original.id}`}
            className={
              "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-base"
            }
          >
            {row.getValue("shopName")}
          </Link>
        )
      },
    },
    {
      accessorKey: "shopInformation",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Shop Information" />
      ),
      cell: ({ row }) => {
        return (
          <div className={"line-clamp-2"}>
            <p className={"line-clamp-2"}>{row.getValue("shopInformation")}</p>
          </div>
        )
      },
    },

    {
      accessorKey: "usersNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Users Number" />
      ),
      cell: ({ row }) => {
        return <Badge variant="outline">{row.getValue("usersNumber")}</Badge>
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className={"flex items-center gap-2"}>
            <EditShop
              row={row}
              setData={setData}
              currentData={currentData}
              toast={toast}
            />
            <Popover>
              <PopoverTrigger>
                <Trash className="h-5 w-5 text-red-400" />
              </PopoverTrigger>
              <PopoverContent className={"flex flex-col gap-2 text-center"}>
                <p>Are you sure to delete this post ?</p>
                <Button
                  className={"bg-red-500"}
                  onClick={async () => {
                    await confirmDelete(row.original.id)
                  }}
                >
                  <Trash className="h-5 w-5" />
                  Delete
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )
      },
    },
  ]
}
