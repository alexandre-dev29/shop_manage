import React from "react"
import { account, profiles, sub_account, transaction } from "@prisma/client"
import { RealtimePostgresChangesPayload } from "@supabase/realtime-js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const reactToUpdateAccount = (
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
export const reactToInsertTransaction = (
  payload: RealtimePostgresChangesPayload<{ [p: string]: any }>,
  currentListOfObjects: (transaction & {
    subaccount: sub_account
    user: profiles
  })[],
  setCurrentListOfObject: React.Dispatch<
    React.SetStateAction<
      (transaction & { subaccount: sub_account; user: profiles })[]
    >
  >,
  currentSubAccount: sub_account
) => {
  const currentTransaction = payload.new as transaction & {
    subaccount: sub_account
    user: profiles
  }

  setCurrentListOfObject([
    ...currentListOfObjects,
    {
      ...currentTransaction,
      createAt: new Date(currentTransaction.createAt),
      updatedAt: new Date(currentTransaction.updatedAt),
      subaccount: currentSubAccount,
    },
  ])
}
