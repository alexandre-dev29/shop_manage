"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { uuid } from "uuidv4"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { Shop, shopSchemaEditOrCreate } from "@/types/tablesSchemas"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export function CreateShop({
  toast,
  currentData,
  setData,
  triggerElement,
}: {
  setData: any
  currentData: Shop[]
  toast: any
  triggerElement: any
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof shopSchemaEditOrCreate>>({
    resolver: zodResolver(shopSchemaEditOrCreate),
    defaultValues: {
      shopName: "",
      shopInformation: "",
    },
  })

  async function onSubmit({
    shopName,
    shopInformation,
  }: z.infer<typeof shopSchemaEditOrCreate>) {
    setIsLoading(true)
    const valueToInsert = {
      shopName,
      shopInformation,
      id: uuid(),
      createAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    }
    const { error } = await createClientComponentClient<Database>()
      .from("Shop")
      .insert(valueToInsert)
    if (error) {
      toast({
        title: "Shop Create",
        description: `There was an error while creating the shop informations`,
      })
    } else {
      toast({
        title: "Shop Create",
        description: `The shop has been successfully created`,
      })
      setData([
        ...currentData,
        {
          id: valueToInsert.id,
          shopName: valueToInsert.shopName,
          shopInformation: valueToInsert.shopInformation,
          usersNumber: 0,
        },
      ])
    }
    setIsOpen(false)
    setIsLoading(false)
  }
  return (
    <Dialog open={isOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)}>
        {triggerElement}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new shop</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="shopName"
                render={({ field }) => (
                  <FormItem className={"mt-4"}>
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
                name="shopInformation"
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
                    <Save />
                    Create
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
