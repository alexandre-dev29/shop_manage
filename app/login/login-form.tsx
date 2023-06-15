"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Loader2, LogIn } from "lucide-react"
import nookies from "nookies"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Database } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(8, { message: "Please write a correct phone number " }),
  password: z
    .string()
    .min(6, { message: "Your password must have at least 6 character" }),
})
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const supabase = createClientComponentClient<Database>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  })
  async function onSubmit({
    phoneNumber,
    password,
  }: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const result = await supabase.auth.signInWithPassword({
      phone: phoneNumber,
      password: password,
    })
    if (result.error) {
      toast({ title: "Login Error", description: result.error.message })
    } else {
      const profile = await supabase
        .from("profiles")
        .select("fullName, role, Shop(shopName)")
        .eq("id", result.data.user.id)
      if (profile.data) {
        nookies.set(null, "profile", JSON.stringify(profile.data[0]), {
          maxAge: 34 * 24 * 60 * 60,
          path: "/",
        })
      }
    }
    window.location.replace("/")
    setIsLoading(false)
  }
  return (
    <Card className={"w-[30vw]"}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password below to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="a@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} type={"password"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="flex w-full gap-4" disabled={isLoading}>
              {!isLoading ? (
                <>
                  <LogIn />
                  Login
                </>
              ) : (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
