import React from "react";
import { db } from "@/lib/db";
import { ActivityClient } from "./components/client";
import { getCurrentUser } from "@/lib/session";
import { formatter } from "@/lib/utils";

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

  const formattedActivities = activities.map((x) => {
    return {
      ...x,
      price: formatter.format(x.price.toNumber()),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActivityClient data={formattedActivities} />
      </div>
    </div>
  );
};

export default ActivityPage;
