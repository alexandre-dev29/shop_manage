import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10)
  // const shoppingTest = await prisma.shop.upsert({
  //   include: { Users: true },
  //   where: { shopName: "ShoppingTest" },
  //   update: {
  //     Users: {
  //       update: {
  //         where: { phoneNumber: "+243975344824" },
  //         data: { password: hashedPassword },
  //       },
  //     },
  //   },
  //   create: {
  //     shopName: "ShoppingTest",
  //     shopInformation: "This is just  a fake shopping created to seed data",
  //     Users: {
  //       create: {
  //         phoneNumber: "+243975344824",
  //         fullName: "Axel Mwenze",
  //         role: "Admin",
  //         password: hashedPassword,
  //       },
  //     },
  //   },
  // })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
