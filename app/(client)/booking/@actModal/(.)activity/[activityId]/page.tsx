import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ActivityModalProps {
  params: {
    activityId: string;
  };
}

export default async function ActModal({ params }: ActivityModalProps) {
  console.log("modal route");
  const activityId = params.activityId ? parseInt(params.activityId) : undefined;

  const activity = await db.activity.findFirst({
    where: {
      id: activityId,
    },
    select: {
      imageSrc: true,
      name: true,
      description: true,
      price: true,
      category: true,
      schedules: true,
    },
  });
  if (!activity) {
    return notFound();
  }
  console.log(activity);

  return (
    <Sheet defaultOpen={true}>
      <SheetContent className={cn("")}>
        <SheetHeader>
          <SheetTitle>{activity.name}</SheetTitle>
          <div className="">
            <Image height={100} width={400} src={activity.imageSrc} alt="notFound" />
          </div>
          <SheetDescription>{activity.description}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
