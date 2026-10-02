/*
  Warnings:

  - Made the column `dogSize` on table `dog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `energyLevel` on table `dog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `independenceLevel` on table `dog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `suitableEnvironment` on table `dog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "dog" ALTER COLUMN "age" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "dogSize" SET NOT NULL,
ALTER COLUMN "energyLevel" SET NOT NULL,
ALTER COLUMN "independenceLevel" SET NOT NULL,
ALTER COLUMN "suitableEnvironment" SET NOT NULL;
