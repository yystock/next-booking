import { ScheduleForm } from "@/components/forms/schedule-form";

const NewSchedulePage = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ScheduleForm initialData={null} />
      </div>
    </div>
  );
};

export default NewSchedulePage;
