"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import nookies from "nookies"

import { NavItem } from "@/types/nav"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const profileRecup = nookies.get().profile
  const profile = profileRecup
    ? (JSON.parse(nookies.get().profile) as {
        fullName: string
        role: string
        Shop: { shopName: string }
      })
    : null
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <ShoppingBag className="h-6 w-6" />
        <span className="inline-block font-bold">
          {profile ? profile.Shop.shopName : ""}
        </span>
      </Link>
      {/*{items?.length ? (*/}
      {/*  <nav className="flex gap-6">*/}
      {/*    {items?.map(*/}
      {/*      (item, index) =>*/}
      {/*        item.href && (*/}
      {/*          <Link*/}
      {/*            key={index}*/}
      {/*            href={item.href}*/}
      {/*            className={cn(*/}
      {/*              "flex items-center text-sm font-medium text-muted-foreground",*/}
      {/*              item.disabled && "cursor-not-allowed opacity-80"*/}
      {/*            )}*/}
      {/*          >*/}
      {/*            {item.title}*/}
      {/*          </Link>*/}
      {/*        )*/}
      {/*    )}*/}
      {/*  </nav>*/}
      {/*) : null}*/}
    </div>
  )
}
