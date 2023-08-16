"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Activity } from "@prisma/client";
import LoadMap from "@/components/map/load-map";
import Map from "@/components/map/map";

type ActivityType = Omit<Activity, "price"> & { price: string };
type ActivitiesType = ActivityType[] | null;
interface ActivityClientProps {
  data: ActivitiesType;
}

export const ActivityClient: React.FC<ActivityClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Activity (${data && data.length})`} description="Manage your activities" />
        <Button onClick={() => router.push(`/dashboard/activity/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <LoadMap>
        <Map initialData={data} />
      </LoadMap>
    </>
  );
};
