"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import nookies from "nookies"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const profileRecup = nookies.get().profile
  const profile = profileRecup
    ? (JSON.parse(nookies.get().profile) as {
        full_name: string
        role: string
        shop: { shop_name: string }
      })
    : null
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <ShoppingBag className="h-6 w-6" />
        <span className="inline-block font-bold">
          {profile ? profile.shop.shop_name : ""}
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map((item, index) => {
            return item.needsAdminRights ? (
              profile?.role === "Admin" ? (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              ) : (
                ""
              )
            ) : (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
      ) : null}
    </div>
  )
}
