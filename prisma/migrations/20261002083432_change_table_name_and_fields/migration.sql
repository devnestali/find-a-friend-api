/*
  Warnings:

  - You are about to drop the `dog` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('LITTLE_PUPPY', 'PUPPY', 'ADULT');

-- DropForeignKey
ALTER TABLE "dog" DROP CONSTRAINT "dog_organizationId_fkey";

-- DropTable
DROP TABLE "dog";

-- DropEnum
DROP TYPE "DogSize";

-- CreateTable
CREATE TABLE "pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "PetSize" "PetSize" NOT NULL,
    "energyLevel" "EnergyLevels" NOT NULL,
    "independenceLevel" "IndependenceLevels" NOT NULL,
    "suitableEnvironment" "SuitableEnvironments" NOT NULL,
    "photos" TEXT[],
    "adoptionRequirements" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
