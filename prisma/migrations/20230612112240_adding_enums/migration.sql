/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubAccount" DROP CONSTRAINT "SubAccount_accountNumber_fkey";

-- DropForeignKey
ALTER TABLE "Transations" DROP CONSTRAINT "Transations_subAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transations" DROP CONSTRAINT "Transations_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_shopId_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToUsers" DROP CONSTRAINT "_AccountToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToUsers" DROP CONSTRAINT "_AccountToUsers_B_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Shop";

-- DropTable
DROP TABLE "SubAccount";

-- DropTable
DROP TABLE "Transations";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "_AccountToUsers";
