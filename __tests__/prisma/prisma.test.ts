import { prismaMock } from "@/testConfig/config/singleton"
import {
  createUser,
  updatePhoneNumber,
} from "@/testConfig/prisma/functions-without-context"
import { usersStub } from "@/testConfig/stubs/users.stub"
import { Users } from "@prisma/client"

test("should create new user ", async () => {
  prismaMock.users.create.mockResolvedValue(usersStub())

  await expect(createUser(usersStub())).resolves.toEqual({
    phoneNumber: usersStub().phoneNumber,
    fullName: usersStub().fullName,
    role: usersStub().role,
    password: usersStub().password,
    createAt: usersStub().createAt,
    updatedAt: usersStub().updatedAt,
    shopId: usersStub().shopId,
    id: usersStub().id,
  } as Users)
})

test("should update a users phoneNumber", async () => {
  prismaMock.users.update.mockResolvedValue(usersStub())

  await expect(updatePhoneNumber(usersStub())).resolves.toEqual(
    usersStub().phoneNumber
  )
})
