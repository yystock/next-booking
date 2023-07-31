import { db } from "@/lib/db";
import { ActivityForm } from "@/components/forms/activity-form";

const ActivityPage = async ({ params }: { params: { activityId: number } }) => {
  const activity = await db.activity.findUnique({
    where: {
      id: params.activityId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActivityForm initialData={activity} />
      </div>
    </div>
  );
};

export default ActivityPage;
