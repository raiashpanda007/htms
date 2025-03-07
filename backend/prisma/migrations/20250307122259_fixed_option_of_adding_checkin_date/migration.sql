/*
  Warnings:

  - Added the required column `checkInAt` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "checkInAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "checkedIn" SET DEFAULT false;
