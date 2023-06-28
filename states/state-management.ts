import { sub_account, transaction } from "@prisma/client"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface ISubAccountSelectedState {
  currentSubAccount: sub_account
  setCurrentSubAccount: (currentSubAccount: sub_account) => void
}

interface ITransactionsListState {
  listOfTransactions: transaction[]
  setListOfTransaction: (listTransaction: transaction[]) => void
}

export const useCurrentSubAccountState = create<ISubAccountSelectedState>()(
  devtools(
    persist(
      (setState, getState) => ({
        currentSubAccount: {
          id: "",
          amount: 0,
          type: "",
          account_number: "",
          devise: "USD",
          transation_genre: "Africell",
        },
        setCurrentSubAccount: (currentSubAccount: sub_account) => {
          setState(() => ({
            currentSubAccount: currentSubAccount,
          }))
        },
      }),
      { name: "currentSubAccount" }
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
