"use client"

import React from "react"
import Link from "next/link"
import { Row } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className={"flex gap-2"}>
      <Link
        className={"cursor-pointer"}
        href={`/dashboard/posts/edit/${row.getValue("postSlug")}`}
      >
        <Edit className=" h-5 w-5 text-muted-foreground/70" />
      </Link>
      <Popover>
        <PopoverTrigger>
          <Trash className="h-5 w-5 text-red-400" />
        </PopoverTrigger>
        <PopoverContent className={"flex flex-col gap-2 text-center"}>
          <p>Are you sure to delete this category ?</p>
          <Button
            className={"bg-red-500"}
            onClick={() => {
              // deleteCurrentCategory(value.id)
            }}
          >
            <Trash className="h-5 w-5" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
