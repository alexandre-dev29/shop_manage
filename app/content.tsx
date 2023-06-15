"use client"

import React from "react"
import { useRouter } from "next/navigation"
import nookies from "nookies"

import { supabaseClient } from "@/lib/supabase_client"
import { Button } from "@/components/ui/button"

const Content = () => {
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        await supabaseClient.auth.signOut()
        nookies.destroy(null, "profile")
        router.refresh()
      }}
    >
      SignUp
    </Button>
  )
}

export default Content
