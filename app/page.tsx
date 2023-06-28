import prisma from "@/lib/prisma"
import MainContent from "@/app/main-content"

export default async function IndexPage() {
  const profileWithAccounts = await prisma.profiles.findMany({
    include: { account: { include: { sub_accounts: true } } },
  })
  const transactionLists = await prisma.transaction.findMany({
    orderBy: { createAt: "desc" },
    include: { subaccount: true, user: true },
  })

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <MainContent
        accountList={profileWithAccounts}
        transactionList={transactionLists}
      />
    </section>
  )
}
