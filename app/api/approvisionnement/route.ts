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
    const currentUser = await supabase
      .from("profiles")
      .select("*")
      .eq("id", requestValues.user_id)
      .single()

    const createATransaction = prisma.transaction.create({
      data: {
        clientName: currentUser.data!.full_name,
        transation_type: "Approvisionement",
        numero_reference: "Aucun",
        amount: requestValues.amount,
        amount_before: currentSubAccount.data!.amount,
        phoneNumber: "Aucun",
        identityPiece: "Aucune",
        subaccount: { connect: { id: requestValues.sub_account_id } },
        user: { connect: { id: requestValues.user_id } },
      },
    })

    const updateMoney = prisma.sub_account.update({
      where: { id: requestValues.sub_account_id },
      data: {
        amount: currentSubAccount.data!.amount + requestValues.amount,
      },
    })
    await prisma.$transaction([createATransaction, updateMoney])
    return NextResponse.json({ messageType: "success" })
  } catch (e) {
    return NextResponse.json({
      messageType: "error",
      message: "There was an error while trying to provision this account",
    })
  }
}
