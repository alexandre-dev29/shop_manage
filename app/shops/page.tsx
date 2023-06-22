import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"

import { Database } from "@/types/supabase"
import { shopSchema } from "@/types/tablesSchemas"
import { ShopDataTable } from "@/app/shops/tableDatas/data-table"

export default async function IndexPage() {
  const allShops = await createServerComponentClient<Database>({ cookies })
    .from("shop")
    .select("*, profiles(full_name)")
  console.log(allShops)
  const data =
    allShops.data !== null
      ? z.array(shopSchema).parse(
          allShops.data.map((value) => ({
            id: value.id,
            shop_name: value.shop_name,
            shop_informations: value.shop_informations,
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
