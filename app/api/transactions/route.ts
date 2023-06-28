import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

import { transactionSchemaCreateOrEdit } from "@/types/tablesSchemas"
import prisma from "@/lib/prisma"
import { supabaseServer } from "@/lib/supabase_client"

export async function POST(request: Request) {
  const requestValues = (await request.json()) as z.infer<
    typeof transactionSchemaCreateOrEdit
  >
  try {
    const supabase = supabaseServer(cookies)

    const currentSubAccount = await supabase
      .from("sub_account")
      .select("*")
      .eq("id", requestValues.sub_account_id)
      .single()
    const currentAccount = await supabase
      .from("account")
      .select("*")
      .like("agentcode", "%Main%")
      .single()
    const selectedMainSubAccount = await supabase
      .from("sub_account")
      .select("*")
      .eq("transation_genre", "MainAccount")
      .eq("account_number", currentAccount.data!.phonenumber)
      .eq("devise", currentSubAccount.data!.devise)
      .single()

    const mainSubAccount = selectedMainSubAccount.data
    const createATransaction = prisma.transaction.create({
      data: {
        clientName: requestValues.clientName,
        transation_type: requestValues.transaction_type,
        numero_reference: requestValues.numero_reference,
        amount: requestValues.amount,
        amount_before: currentSubAccount.data!.amount,
        phoneNumber: requestValues.phoneNumber,
        identityPiece: requestValues.identityPiece,
        subaccount: { connect: { id: requestValues.sub_account_id } },
        user: { connect: { id: requestValues.user_id } },
      },
    })

    let updateMoney: any
    let updateMainAccount: any
    switch (requestValues.transaction_type) {
      case "Retrait":
        updateMoney = prisma.sub_account.update({
          where: { id: requestValues.sub_account_id },
          data: {
            amount: currentSubAccount.data!.amount + requestValues.amount,
          },
        })
        updateMainAccount = prisma.sub_account.update({
          where: { id: mainSubAccount!.id },
          data: { amount: mainSubAccount!.amount - requestValues.amount },
        })
        break
      case "Depot":
        updateMoney = prisma.sub_account.update({
          where: { id: requestValues.sub_account_id },
          data: {
            amount: currentSubAccount.data!.amount - requestValues.amount,
          },
        })
        updateMainAccount = prisma.sub_account.update({
          where: { id: mainSubAccount!.id },
          data: { amount: mainSubAccount!.amount + requestValues.amount },
        })
        break
    }
    await prisma.$transaction([
      createATransaction,
      updateMoney,
      updateMainAccount,
    ])

    return NextResponse.json({ messageType: "success" })
  } catch (e) {
    return NextResponse.json({ messageType: "error" })
  }
}
