import React from "react";
import { db } from "@/lib/db";
import { ActivityClient } from "./components/client";
import { getCurrentUser } from "@/lib/session";
import { Activity } from "@prisma/client";

const ActivityPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const activities = await db.activity.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActivityClient data={activities} />
      </div>
    </div>
  );
};

export default ActivityPage;
