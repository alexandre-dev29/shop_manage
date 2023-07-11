"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { account, sub_account } from "@prisma/client"
import { Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const approvisionnement = z.object({
  amount: z.number({ coerce: true }),
  comments: z.string().optional(),
  sub_account_id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
})

const CreateApprovisionnement = ({
  triggerElement,
  toast,
  profileId,
  accountList,
}: {
  triggerElement: any
  toast: any
  profileId: string
  accountList: (account & { sub_accounts: sub_account[] })[]
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof approvisionnement>>({
    resolver: zodResolver(approvisionnement),
    defaultValues: {},
  })
  const listOfSubAccounts: sub_account[] = []

  accountList
    .map((currentValue) => currentValue.sub_accounts)
    .map((currentValue) => {
      currentValue.map((innerValue) => {
        listOfSubAccounts.push({ ...innerValue })
      })
    })

  async function onSubmit(values: z.infer<typeof approvisionnement>) {
    setIsLoading(true)
    // Write here logic to add a new transaction
    values.user_id = profileId
    const response = await fetch("/api/approvisionnement", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    const finalResponse = await response.json()
    if (finalResponse.messageType === "success") {
      toast({
        title: "Adding transaction",
        description: "The transaction was added successfully",
      })

      form.reset({
        amount: 0,
        comments: "",
        sub_account_id: "",
      })
      setIsOpen(false)
      window.location.reload()
    } else {
      toast({
        title: "Error transaction",
        description: finalResponse.message,
        variant: "destructive",
      })
    }
    setIsLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger>{triggerElement}</DialogTrigger>
      <DialogContent style={{ maxWidth: "40vw ", width: "40vw" }}>
        <DialogHeader>
          <DialogTitle>New provisioning</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="sub_account_id"
                render={({ field }) => (
                  <FormItem className={""}>
                    <FormLabel>Comptes</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="selecte an account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listOfSubAccounts.map((value) => (
                          <SelectItem value={value.id} key={value.id}>
                            {value.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex:25000"
                        {...field}
                        type={"number"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commentaire</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="gap-4 self-center" disabled={isLoading}>
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

export default CreateApprovisionnement
