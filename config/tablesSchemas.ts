import { z } from "zod"

export const shopSchema = z.object({
  id: z.string(),
  shopName: z.string(),
  shopInformation: z.string(),
  usersNumber: z.number(),
})

export type Shop = z.infer<typeof shopSchema>
