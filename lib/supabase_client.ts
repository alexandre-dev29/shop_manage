import { createClient } from "@supabase/supabase-js"

import { Database } from "@/types/supabase"

const supabase_client = createClient<Database>(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
)
export default supabase_client
