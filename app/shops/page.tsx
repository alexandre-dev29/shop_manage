import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { shopSchema } from "@/types/tablesSchemas"
import { ShopDataTable } from "@/app/shops/tableDatas/data-table"

export default async function IndexPage() {
  const allShops = await createServerComponentClient<Database>({ cookies })
    .from("Shop")
    .select("*, profiles(fullName)")
  const data =
    allShops !== null
      ? z.array(shopSchema).parse(
          allShops.data!.map((value) => ({
            id: value.id,
            shopName: value.shopName,
            shopInformation: value.shopInformation,
            usersNumber: value.profiles.length,
          }))
        )
      : []
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <ShopDataTable data={data} />
    </section>
  )
}
