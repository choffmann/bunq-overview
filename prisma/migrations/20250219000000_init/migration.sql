-- CreateTable
CREATE TABLE "bunq_tokens" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "privateKey" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "installationToken" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bunq_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bunq_session" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiryTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bunq_session_pkey" PRIMARY KEY ("id")
);
