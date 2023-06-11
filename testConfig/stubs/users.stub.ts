import { Users } from "@prisma/client"

export const usersStub = (): Users => {
  return {
    phoneNumber: "+243975344824",
    role: "User",
    fullName: "Axel Mwenze",
    password: "123456",
    id: "",
    createAt: new Date("2023-06-11T19:24:38.817Z"),
    updatedAt: new Date("2023-06-11T19:24:38.817Z"),
    shopId: "generated",
  }
}
