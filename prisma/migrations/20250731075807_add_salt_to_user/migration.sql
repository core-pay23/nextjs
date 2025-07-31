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

-- CreateIndex
CREATE UNIQUE INDEX "User_clientWalletAddress_key" ON "User"("clientWalletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_EoaAddress_key" ON "User"("EoaAddress");
