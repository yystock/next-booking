/*
  Warnings:

  - Added the required column `name` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_activityId_fkey";

-- DropIndex
DROP INDEX "Activity_tenantId_idx";

-- DropIndex
DROP INDEX "Activity_userId_idx";

-- DropIndex
DROP INDEX "Client_tenantId_idx";

-- DropIndex
DROP INDEX "Reservation_activityId_idx";

-- DropIndex
DROP INDEX "Reservation_clientId_idx";

-- DropIndex
DROP INDEX "Reservation_tenantId_idx";

-- DropIndex
DROP INDEX "Schedule_activityId_idx";

-- DropIndex
DROP INDEX "Schedule_tenantId_idx";

-- DropIndex
DROP INDEX "Schedule_userId_idx";

-- DropIndex
DROP INDEX "User_tenantId_idx";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "activityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
