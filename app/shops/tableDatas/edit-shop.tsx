"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Row } from "@tanstack/react-table"
import { Edit, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { Shop, shopSchemaEditOrCreate } from "@/types/tablesSchemas"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function EditShop({
  row,
  toast,
  currentData,
  setData,
}: {
  row: Row<{
    id: string
    shop_informations: string
    shop_name: string
    usersNumber: number
  }>
  setData: any
  currentData: Shop[]
  toast: any
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof shopSchemaEditOrCreate>>({
    resolver: zodResolver(shopSchemaEditOrCreate),
    defaultValues: {
      shop_name: row.original.shop_name,
      shop_informations: row.original.shop_informations,
    },
  })

  async function onSubmit({
    shop_name,
    shop_informations,
  }: z.infer<typeof shopSchemaEditOrCreate>) {
    setIsLoading(true)
    const { error } = await createClientComponentClient<Database>()
      .from("shop")
      .update({ shop_name, shop_informations })
      .eq("id", row.original.id)
    if (error) {
      toast({
        title: "Shop Edit",
        description: `There was an error while updating the shop informations`,
      })
    } else {
      toast({
        title: "Shop Edit",
        description: `The shop informations has been successfully updated`,
      })
      const filteredData = currentData.filter((a) => a.id !== row.original.id)
      filteredData.push({
        id: row.original.id,
        shop_informations: shop_informations,
        shop_name: shop_name,
        usersNumber: row.original.usersNumber,
      })
      setData(filteredData)
    }
    setIsLoading(false)
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Edit className=" h-5 w-5 text-muted-foreground/70" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit shop informations</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="shop_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: My Shop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shop_informations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Information</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write a description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="flex w-full gap-4" disabled={isLoading}>
                {!isLoading ? (
                  <>
                    <Edit />
                    Edit
                  </>
                ) : (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                )}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
