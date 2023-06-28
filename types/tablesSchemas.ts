import { z } from "zod"

export const shopSchema = z.object({
  id: z.string(),
  shop_name: z.string(),
  shop_informations: z.string(),
  usersNumber: z.number(),
})

export type Shop = z.infer<typeof shopSchema>

export const shopSchemaEditOrCreate = z.object({
  shop_name: z.string().min(3, { message: "Please write a correct name" }),
  shop_informations: z
    .string()
    .min(10, { message: "Write a shop description" }),
})

export const transactionSchemaCreateOrEdit = z.object({
  transaction_type: z.enum(["Depot", "Retrait", "Approvisionement"]),
  amount: z.number({ coerce: true }),
  numero_reference: z
    .string()
    .min(2, { message: "veuillez ecrire un numero de reference" }),
  identityPiece: z.string().min(10, { message: "numero de piece d'identitee" }),
  comments: z.string().optional(),
  phoneNumber: z.string().min(10, { message: "numero de telephone" }),
  clientName: z
    .string()
    .min(5, { message: "veuillez ecrire le nom du client" }),
  sub_account_id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
})
export const transactionSchema = z.object({
  transaction_type: z.enum(["Depot", "Retrait", "Approvisionement"]),
  amount: z.number({ coerce: true }),
  numero_reference: z
    .string()
    .min(2, { message: "veuillez ecrire un numero de reference" }),
  identityPiece: z.string().min(10, { message: "numero de piece d'identitee" }),
  phoneNumber: z.string().min(10, { message: "numero de telephone" }),
  amount_before: z.number(),
  devise: z.enum(["USD", "CDF"]),
  clientName: z
    .string()
    .min(5, { message: "veuillez ecrire le nom du client" }),
  account_concerned: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  id: z.string().uuid(),
})

export type TransactionEntity = z.infer<typeof transactionSchema>
