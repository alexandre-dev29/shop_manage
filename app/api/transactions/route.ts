import { NextResponse } from "next/server"
import { z } from "zod"

import { transactionSchemaCreateOrEdit } from "@/types/tablesSchemas"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const requestValues = (await request.json()) as z.infer<
    typeof transactionSchemaCreateOrEdit
  >
  try {
    const currentSubAccount = await prisma.sub_account.findUnique({
      where: { id: requestValues.sub_account_id },
    })
    const mainAccount = await prisma.profiles.findUnique({
      where: { id: requestValues.user_id },
      include: {
        account: {
          where: { agentcode: { contains: "Main" } },
          take: 1,
          include: {
            sub_accounts: {
              where: {
                transation_genre: "MainAccount",
                AND: { devise: currentSubAccount!.devise },
              },
            },
          },
        },
      },
    })
    const mainSubAccount = mainAccount?.account[0].sub_accounts[0]
    const createATransaction = prisma.transaction.create({
      data: {
        clientName: requestValues.clientName,
        transation_type: requestValues.transaction_type,
        numero_reference: requestValues.numero_reference,
        amount: requestValues.amount,
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
          data: { amount: currentSubAccount!.amount + requestValues.amount },
        })
        updateMainAccount = prisma.sub_account.update({
          where: { id: mainSubAccount!.id },
          data: { amount: mainSubAccount!.amount - requestValues.amount },
        })
        break
      case "Depot":
        updateMoney = prisma.sub_account.update({
          where: { id: requestValues.sub_account_id },
          data: { amount: currentSubAccount!.amount - requestValues.amount },
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
