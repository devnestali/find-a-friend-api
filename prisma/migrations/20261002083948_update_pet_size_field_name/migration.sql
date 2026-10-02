/*
  Warnings:

  - You are about to drop the column `PetSize` on the `pet` table. All the data in the column will be lost.
  - Added the required column `petSize` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet" DROP COLUMN "PetSize",
ADD COLUMN     "petSize" "PetSize" NOT NULL;
