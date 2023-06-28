"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { TransactionEntity } from "@/types/tablesSchemas"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"

export const transactionColumns = (
  setData: any,
  currentData: TransactionEntity[],
  toast: any
): ColumnDef<TransactionEntity>[] => {
  // const confirmDelete = async (postId: string) => {
  //   const { error } = await createClientComponentClient<Database>()
  //     .from("shop")
  //     .delete()
  //     .eq("id", postId)
  //   if (error) {
  //     toast({
  //       title: "Shop Delete",
  //       description: `There was an error when trying to delete`,
  //     })
  //   } else {
  //     toast({
  //       title: "Shop Delete",
  //       description: `Your shop has been deleted`,
  //     })
  //     setData(currentData.filter((value) => value.id !== postId))
  //   }
  // }
  return [
    {
      accessorKey: "clientName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Client Name" />
      ),
      cell: ({ row }) => {
        return (
          <p
            className={
              "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-base"
            }
          >
            {row.getValue("clientName")}
          </p>
        )
      },
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
      cell: ({ row }) => {
        return <p className={"line-clamp-2"}>{row.getValue("phoneNumber")}</p>
      },
    },

    {
      accessorKey: "transaction_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Transaction type" />
      ),
      cell: ({ row }) => {
        return (
          <Badge
            variant="outline"
            className={`text-white ${
              row.original.transaction_type === "Depot"
                ? "bg-green-400"
                : row.original.transaction_type === "Retrait"
                ? "bg-red-400"
                : "bg-blue-400"
            }`}
          >
            {row.getValue("transaction_type")}
          </Badge>
        )
      },
    },
    {
      accessorKey: "amount_before",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount before" />
      ),
      cell: ({ row }) => {
        return (
          <p className={"line-clamp-2"}>{`${row.getValue("amount_before")} ${
            row.original.devise === "USD" ? "$" : "Fc"
          }`}</p>
        )
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        return (
          <p className={"line-clamp-2"}>{`${row.getValue("amount")} ${
            row.original.devise === "USD" ? "$" : "Fc"
          }`}</p>
        )
      },
    },
    {
      accessorKey: "account_concerned",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account" />
      ),
      cell: ({ row }) => {
        return (
          <p className={"line-clamp-2"}>{row.getValue("account_concerned")}</p>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date transaction" />
      ),
      cell: ({ row }) => {
        return (
          <p className={"line-clamp-2"}>
            {row.original.createdAt.toLocaleDateString("fr-Fr")}
          </p>
        )
      },
    },

    // {
    //   id: "actions",
    //   cell: ({ row }) => {
    //     return (
    //       <div className={"flex items-center gap-2"}>
    //         <Popover>
    //           <PopoverTrigger>
    //             <Trash className="h-5 w-5 text-red-400" />
    //           </PopoverTrigger>
    //           <PopoverContent className={"flex flex-col gap-2 text-center"}>
    //             <p>Are you sure to delete this shop ?</p>
    //             <Button className={"bg-red-500"}>
    //               <Trash className="h-5 w-5" />
    //               Delete
    //             </Button>
    //           </PopoverContent>
    //         </Popover>
    //       </div>
    //     )
    //   },
    // },
  ]
}
