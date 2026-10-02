-- CreateEnum
CREATE TYPE "DogSize" AS ENUM ('LITTLE_PUPPY', 'PUPPY', 'ADULT');

-- CreateEnum
CREATE TYPE "EnergyLevels" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "IndependenceLevels" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "SuitableEnvironments" AS ENUM ('HOUSE', 'APARTMENT', 'SPACIOUS_ENVIRONMENT');

-- CreateTable
CREATE TABLE "dog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "dogSize" "DogSize",
    "energyLevel" "EnergyLevels",
    "independenceLevel" "IndependenceLevels",
    "suitableEnvironment" "SuitableEnvironments",
    "photos" TEXT[],
    "adoptionRequirements" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "dog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dog" ADD CONSTRAINT "dog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
