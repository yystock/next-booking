"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Activity } from "@prisma/client";
import LoadMap from "@/components/map/load-map";

interface ActivityClientProps {
  data: Activity[];
}

export const ActivityClient: React.FC<ActivityClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Activity (${data.length})`} description="Manage your activities" />
        <Button onClick={() => router.push(`/dashboard/activity/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <LoadMap initialData={data} />
    </>
  );
};
