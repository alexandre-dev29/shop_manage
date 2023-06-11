import { usersStub } from "@/testConfig/stubs/users.stub"
import { Users } from "@prisma/client"

import prisma from "../config/mock-client"

export async function createUser(user: Partial<Users>) {
  return await prisma.users.create({
    data: usersStub(),
  })
}

export async function updatePhoneNumber(user: Partial<Users>) {
  return (
    await prisma.users.update({
      where: { id: user.id },
      data: {
        phoneNumber: usersStub().phoneNumber,
      },
    })
  ).phoneNumber
}
