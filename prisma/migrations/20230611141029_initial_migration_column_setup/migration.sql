-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Manager', 'User');

-- CreateEnum
CREATE TYPE "GenreTransation" AS ENUM ('Equity', 'Airtel', 'Vodacom', 'Africell', 'Orange');

-- CreateEnum
CREATE TYPE "TypeTransaction" AS ENUM ('Depot', 'Retrait');

-- CreateEnum
CREATE TYPE "Devise" AS ENUM ('CDF', 'USD');

-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "shopInformation" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "phoneNumber" TEXT NOT NULL,
    "agentCode" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("phoneNumber")
);

-- CreateTable
CREATE TABLE "SubAccount" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "devise" "Devise" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "accountNumber" TEXT NOT NULL,

    CONSTRAINT "SubAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transations" (
    "id" TEXT NOT NULL,
    "transationGenre" "GenreTransation" NOT NULL,
    "transationType" "TypeTransaction" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "numeroReference" TEXT NOT NULL,
    "identityPiece" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subAccountId" TEXT NOT NULL,

    CONSTRAINT "Transations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_shopName_key" ON "Shop"("shopName");

-- CreateIndex
CREATE UNIQUE INDEX "Account_agentCode_key" ON "Account"("agentCode");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToUsers_AB_unique" ON "_AccountToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToUsers_B_index" ON "_AccountToUsers"("B");

-- AddForeignKey
ALTER TABLE "SubAccount" ADD CONSTRAINT "SubAccount_accountNumber_fkey" FOREIGN KEY ("accountNumber") REFERENCES "Account"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transations" ADD CONSTRAINT "Transations_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transations" ADD CONSTRAINT "Transations_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToUsers" ADD CONSTRAINT "_AccountToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("phoneNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToUsers" ADD CONSTRAINT "_AccountToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
