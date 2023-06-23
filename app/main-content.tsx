"use client"

import React, { useState } from "react"
import { account, profiles, sub_account, transaction } from "@prisma/client"
// @ts-ignore
import { RealtimePostgresChangesPayload } from "@supabase/realtime-js"
import nookies from "nookies"

import { supabaseClient } from "@/lib/supabase_client"
import SubAccountList from "@/components/sub-account-list"
import Transaction_list from "@/components/transaction_list"

const reactToUpdateAccount = (
  payload: RealtimePostgresChangesPayload<{ [p: string]: any }>,
  currentListOfObjects: (account & { sub_accounts: sub_account[] })[],
  setCurrentListOfObject: React.Dispatch<
    React.SetStateAction<(account & { sub_accounts: sub_account[] })[]>
  >
) => {
  const currentSubAccount = payload.new as sub_account
  const oldAccountNumber = currentListOfObjects.filter(
    (value) => value.phonenumber === currentSubAccount.account_number
  )[0]
  const curredOldAccountNumber = oldAccountNumber.sub_accounts.filter(
    (value) => value.id != currentSubAccount.id
  )

  const puredAccount = currentListOfObjects.filter(
    (value) => value.phonenumber !== currentSubAccount.account_number
  )
  puredAccount.push({
    ...oldAccountNumber,
    sub_accounts: [...curredOldAccountNumber, currentSubAccount],
  })
  setCurrentListOfObject(puredAccount)
}
const MainContent = ({
  accountList,
  transactionList,
}: {
  accountList: (profiles & {
    account: (account & { sub_accounts: sub_account[] })[]
  })[]
  transactionList: (transaction & { subaccount: sub_account; user: profiles })[]
}) => {
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

  supabaseClient
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "sub_account" },
      (payload) => {
        reactToUpdateAccount(payload, listAccount, setListAccount)
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
        transactionList={transactionList}
      />
    </>
  )
}

export default MainContent
