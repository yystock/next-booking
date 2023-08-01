"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Schedule } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScheduleClientProps {
  data: Schedule[];
}

export const ScheduleClient: React.FC<ScheduleClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Schedule (${data.length})`} description="Manage your activities" />
        <Button onClick={() => router.push(`/dashboard/schedule/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div className="grid gap-4 grid-cols-3">
        {data.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>Start Time:</div>
                <div className="text-2xl font-bold">{item.start}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>End Time: </div>
                <div className="text-2xl font-bold">{item.end}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Max Customer:</div>
                <div className="text-2xl font-bold">{item.customer}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
