import React from "react";
import { db } from "@/lib/db";
import { ScheduleClient } from "./components/client";
import { getCurrentUser } from "@/lib/session";

const SchedulePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const schedules = await db.schedule.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ScheduleClient data={schedules} />
      </div>
    </div>
  );
};

export default SchedulePage;
