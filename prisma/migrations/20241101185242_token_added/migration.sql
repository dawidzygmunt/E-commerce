-- CreateTable
CREATE TABLE "VeryficationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VeryficationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VeryficationToken_token_key" ON "VeryficationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VeryficationToken_email_token_key" ON "VeryficationToken"("email", "token");
