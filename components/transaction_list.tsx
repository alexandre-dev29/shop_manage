"use client"

import React from "react"
import { account, sub_account } from "@prisma/client"
import { DollarSign } from "lucide-react"
import nookies from "nookies"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import CreateTransaction from "@/components/main-page/create-transaction"

const Transaction_list = ({
  accountList,
}: {
  accountList: (account & { sub_accounts: sub_account[] })[]
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

  return (
    <div className={"flex items-center justify-between"}>
      <h2 className={"text-xl font-bold"}>List of transactions</h2>
      <CreateTransaction
        profileId={`${profile?.id}`}
        setData={() => {}}
        accountList={accountList}
        toast={toast}
        triggerElement={
          <Button>
            <DollarSign className={"mr-4"} />
            New Transaction
          </Button>
        }
      />
    </div>
  )
}

export default Transaction_list
