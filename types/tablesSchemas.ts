import { z } from "zod"

export const shopSchema = z.object({
  id: z.string(),
  shopName: z.string(),
  shopInformation: z.string(),
  usersNumber: z.number(),
})

export type Shop = z.infer<typeof shopSchema>

export const shopSchemaEditOrCreate = z.object({
  shopName: z.string().min(3, { message: "Please write a correct name" }),
  shopInformation: z.string().min(10, { message: "Write a shop description" }),
})
