-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "clientWalletAddress" TEXT NOT NULL,
    "EoaAddress" TEXT NOT NULL,
    "EoaPrivateKey" TEXT,
    "salt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uniqueId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "tokenAddress" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clientWalletAddress_key" ON "User"("clientWalletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_EoaAddress_key" ON "User"("EoaAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_uniqueId_key" ON "Payment"("uniqueId");
