import { ActivityForm } from "@/components/forms/activity-form";

const NewActivityPage = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActivityForm initialData={null} />
      </div>
    </div>
  );
};

export default NewActivityPage;
