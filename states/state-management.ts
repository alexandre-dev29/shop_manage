import { account, sub_account, transaction } from "@prisma/client"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface IAccountListState {
  listOfAccount: (account & { sub_accounts: sub_account[] })[]
  setListOfAccount: (
    listAccount: (account & { sub_accounts: sub_account[] })[]
  ) => void
}

interface ITransactionsListState {
  listOfTransactions: transaction[]
  setListOfTransaction: (listTransaction: transaction[]) => void
}

export const useAccountListState = create<IAccountListState>()(
  devtools(
    persist(
      (setState, getState) => ({
        listOfAccount: [],
        setListOfAccount: (
          listAccount: (account & { sub_accounts: sub_account[] })[]
        ) => {
          setState(() => ({
            listOfAccount: listAccount,
          }))
        },
      }),
      { name: "appListOfAccounts" }
    )
  )
)
export const useTransactionListState = create<ITransactionsListState>()(
  devtools(
    persist(
      (setState, getState) => ({
        listOfTransactions: [],
        setListOfTransaction: (listTransaction: transaction[]) => {
          setState(() => ({
            listOfTransactions: listTransaction,
          }))
        },
      }),
      { name: "appListOfAccounts" }
    )
  )
)
