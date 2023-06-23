"use client"

import React from "react"
import { account, sub_account } from "@prisma/client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function SubAccountList({
  accountList,
}: {
  accountList: (account & { sub_accounts: sub_account[] })[]
}) {
  return (
    <div className={"grid grid-cols-5 gap-6"}>
      {accountList
        .sort((a, b) => {
          return a.agentcode.localeCompare(b.agentcode)
        })
        .map((accounts) => (
          <Card key={accounts.phonenumber}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                className={`text-sm font-medium ${
                  accounts.agentcode.toLowerCase().includes("main")
                    ? "font-extrabold text-blue-500"
                    : ""
                }`}
              >
                {accounts.phonenumber}
              </CardTitle>
              <p
                className={`text-sm font-bold ${
                  accounts.agentcode.toLowerCase().includes("main")
                    ? "text-blue-500"
                    : ""
                }`}
              >
                {accounts.agentcode}
              </p>
            </CardHeader>
            <CardContent>
              {accounts.sub_accounts
                .sort((a: sub_account, b: sub_account) => {
                  return a.devise.localeCompare(b.devise)
                })
                .map((subAccounts: any) => (
                  <div
                    className={"flex items-center justify-between"}
                    key={subAccounts.id}
                  >
                    <span>{subAccounts.devise}</span>
                    <p className="text-xl font-bold">
                      {subAccounts.amount.toLocaleString("en-US")}
                      <span className={"text-sm"}>
                        {`${subAccounts.devise == "USD" ? " $" : " FC"}`}
                      </span>
                    </p>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default SubAccountList
