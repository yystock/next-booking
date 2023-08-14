import { db } from "@/lib/db";
import { ScheduleForm } from "@/components/forms/schedule-form";

const SchedulePage = async ({ params }: { params: { scheduleId: number } }) => {
  const schedule = await db.schedule.findUnique({
    where: {
      id: params.scheduleId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ScheduleForm initialData={schedule} />
      </div>
    </div>
  );
};

export default SchedulePage;
