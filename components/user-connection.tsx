"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, LogOut } from "lucide-react"
import nookies from "nookies"

import { supabaseClient } from "@/lib/supabase_client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const UserConnection = () => {
  const router = useRouter()
  const profileRecup = nookies.get().profile
  const profile = profileRecup
    ? (JSON.parse(nookies.get().profile) as {
        fullName: string
        role: string
        Shop: { shopName: string }
      })
    : null
  console.log(profile)

  return (
    <>
      {profile ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>{profile.fullName}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className={"cursor-pointer"}
              onClick={async () => {
                nookies.destroy(null, "profile")
                await supabaseClient.auth.signOut()
                router.refresh()
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={"/login"}>
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  <LogIn className="h-5 w-5" />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Login</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  )
}

export default UserConnection
