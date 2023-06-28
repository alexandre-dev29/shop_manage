"use client"

import React, { useState } from "react"
import { useCurrentSubAccountState } from "@/states/state-management"
import { account, profiles, sub_account, transaction } from "@prisma/client"
// @ts-ignore
import { RealtimePostgresChangesPayload } from "@supabase/realtime-js"
import nookies from "nookies"

import { supabaseClient } from "@/lib/supabase_client"
import { reactToInsertTransaction, reactToUpdateAccount } from "@/lib/utils"
import SubAccountList from "@/components/sub-account-list"
import Transaction_list from "@/components/transaction_list"

const MainContent = ({
  accountList,
  transactionList,
}: {
  accountList: (profiles & {
    account: (account & { sub_accounts: sub_account[] })[]
  })[]
  transactionList: (transaction & { subaccount: sub_account; user: profiles })[]
}) => {
  const { currentSubAccount } = useCurrentSubAccountState()
  const profile = nookies.get().profile
    ? (JSON.parse(nookies.get().profile) as {
        id: string
        full_name: string
        role: string
        shop: { shop_name: string }
      })
    : null
  const accountPured = accountList.filter(
    (value: any) => value.id === profile?.id
  )[0].account

  const [listAccount, setListAccount] =
    useState<(account & { sub_accounts: sub_account[] })[]>(accountPured)
  const [listTransaction, setListTransaction] =
    useState<(transaction & { subaccount: sub_account; user: profiles })[]>(
      transactionList
    )

  supabaseClient
    .channel("db-changes")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "sub_account" },
      (payload) => {
        console.log(payload)
        reactToUpdateAccount(payload, listAccount, setListAccount)
      }
    )
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "transaction" },
      (payload) => {
        console.log(payload)
        reactToInsertTransaction(
          payload,
          listTransaction,
          setListTransaction,
          currentSubAccount
        )
      }
    )
    .subscribe()
  return (
    <>
      <div className="">
        <SubAccountList accountList={listAccount} />
      </div>
      <Transaction_list
        accountList={listAccount}
        transactionList={listTransaction}
      />
    </>
  )
}

export default MainContent
