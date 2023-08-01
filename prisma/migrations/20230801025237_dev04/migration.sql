/*
  Warnings:

  - You are about to drop the column `activityId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_activityId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "activityId";

-- CreateTable
CREATE TABLE "ActivitySchedule" (
    "activityId" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ActivitySchedule_pkey" PRIMARY KEY ("activityId","scheduleId")
);

-- AddForeignKey
ALTER TABLE "ActivitySchedule" ADD CONSTRAINT "ActivitySchedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitySchedule" ADD CONSTRAINT "ActivitySchedule_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
