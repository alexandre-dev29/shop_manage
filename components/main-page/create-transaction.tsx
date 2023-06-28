"use client"

import React, { useState } from "react"
import { useCurrentSubAccountState } from "@/states/state-management"
import { zodResolver } from "@hookform/resolvers/zod"
import { account, sub_account } from "@prisma/client"
import { Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { transactionSchemaCreateOrEdit } from "@/types/tablesSchemas"
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

const CreateTransaction = ({
  triggerElement,
  accountList,
  profileId,
  toast,
}: {
  setData: any
  accountList: (account & { sub_accounts: sub_account[] })[]
  profileId: string
  toast: any
  triggerElement: any
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { setCurrentSubAccount } = useCurrentSubAccountState()
  const listOfSubAccounts: sub_account[] = []

  accountList
    .map((currentValue) => currentValue.sub_accounts)
    .map((currentValue) => {
      currentValue.map((innerValue) => {
        listOfSubAccounts.push({ ...innerValue })
      })
    })

  const form = useForm<z.infer<typeof transactionSchemaCreateOrEdit>>({
    resolver: zodResolver(transactionSchemaCreateOrEdit),
    defaultValues: {
      numero_reference: "",
      clientName: "",
    },
  })

  async function onSubmit(
    values: z.infer<typeof transactionSchemaCreateOrEdit>
  ) {
    setIsLoading(true)
    // Write here logic to add a new transaction
    values.user_id = profileId
    const response = await fetch("/api/transactions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    // const currentSubAccount = listOfSubAccounts.filter(
    //   (value) => value.id === values.sub_account_id
    // )[0]
    // setCurrentSubAccount(currentSubAccount)
    const finalResponse = await response.json()
    if (finalResponse.messageType === "success") {
      toast({
        title: "Adding transaction",
        description: "The transaction was added successfully",
      })

      form.reset({
        user_id: "",
        clientName: "",
        transaction_type: "Depot",
        sub_account_id: "",
        amount: 0,
        identityPiece: "",
        phoneNumber: "",
        numero_reference: "",
        comments: "",
      })
    }
    setIsOpen(false)
    setIsLoading(false)
    window.location.reload()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent style={{ maxWidth: "60vw ", width: "50vw" }}>
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4"
            >
              <FormField
                control={form.control}
                name="transaction_type"
                render={({ field }) => (
                  <FormItem className={"mt-4"}>
                    <FormLabel>Type Operation</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type of operation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"Depot"} key={"Depot"}>
                          Depot
                        </SelectItem>
                        <SelectItem value={"Retrait"} key={"Retrait"}>
                          Retrait
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sub_account_id"
                render={({ field }) => (
                  <FormItem className={"mt-4"}>
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: +243970000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Guylain Kasongo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identityPiece"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Piece d'identite`}</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Guylain Kasongo" {...field} />
                    </FormControl>
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

              <FormField
                control={form.control}
                name="numero_reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de reference transaction</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 00000" {...field} />
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

export default CreateTransaction
