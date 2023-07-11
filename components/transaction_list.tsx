"use client"

import React from "react"
import { account, profiles, sub_account, transaction } from "@prisma/client"
import { DollarSign, Plus } from "lucide-react"
import nookies from "nookies"
import { z } from "zod"

import { TransactionEntity, transactionSchema } from "@/types/tablesSchemas"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import CreateApprovisionnement from "@/components/main-page/create-approvisionnement"
import CreateTransaction from "@/components/main-page/create-transaction"
import { TransactionDataTable } from "@/components/main-page/transaction-table/transaction-datatable"

const Transaction_list = ({
  accountList,
  transactionList,
}: {
  accountList: (account & { sub_accounts: sub_account[] })[]
  transactionList: (transaction & { subaccount: sub_account; user: profiles })[]
}) => {
  const { toast } = useToast()
  const profileRecup = nookies.get().profile
  const profile = profileRecup
    ? (JSON.parse(nookies.get().profile) as {
        id: string
        full_name: string
        role: string
        shop: { shop_name: string }
      })
    : null

  const listOfEntity =
    transactionList !== null
      ? z.array(transactionSchema).parse(
          transactionList.map(
            (value) =>
              ({
                id: value.id,
                transaction_type: value.transation_type,
                amount_before: value.amount_before,
                clientName: value.clientName,
                numero_reference: value.numero_reference,
                phoneNumber: value.phoneNumber,
                identityPiece: value.identityPiece,
                amount: value.amount,
                account_concerned: value.subaccount.type,
                createdAt: value.createAt,
                updatedAt: value.updatedAt,
                devise: value.subaccount.devise,
              } as TransactionEntity)
          )
        )
      : []
  return (
    <>
      <div className={"flex items-center justify-between"}>
        <h2 className={"text-xl font-bold"}>List of transactions</h2>
        <div>
          <CreateTransaction
            profileId={`${profile?.id}`}
            setData={() => {}}
            accountList={accountList}
            toast={toast}
            triggerElement={
              <Button>
                <DollarSign className={"mr-2"} />
                Transaction
              </Button>
            }
          />
          <CreateApprovisionnement
            accountList={accountList}
            profileId={`${profile?.id}`}
            toast={toast}
            triggerElement={
              <Button className={"ml-2"}>
                <Plus className={"mr-2"} />
                Approvisionner
              </Button>
            }
          />
        </div>
      </div>
      <TransactionDataTable data={listOfEntity} />
    </>
  )
}

export default Transaction_list
