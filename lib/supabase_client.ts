import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

export const supabaseServer = (cookies: any) =>
  createServerComponentClient<Database>({ cookies })
export const supabaseClient = createClientComponentClient<Database>()
