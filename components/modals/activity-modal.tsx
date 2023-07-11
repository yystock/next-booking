"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useActivityModal } from "@/hooks/use-activity-modal";
import { Button } from "@/components/ui/button";
import { createActivity } from "@/actions/activity";
import EditDateTime from "@/components/edit-date-time";

const formSchema = z.object({
  name: z.string().min(1),
});

export const ActivityModal = () => {
  const ActivityModal = useActivityModal();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Modal
      title="Create Activity"
      description="Add a new Activity to manage products and categories."
      isOpen={ActivityModal.isOpen}
      onClose={ActivityModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <form
              action={async (data) => {
                await createActivity(data);
                toast({
                  title: "Scheduled: Catch up",
                  description: "Friday, February 10, 2023 at 5:57 PM",
                });
              }}
            >
              <Input className="w-[300px]" type="text" name="name" defaultValue={""} />
              <EditDateTime name="startAt" value={new Date()} />
              <EditDateTime name="endAt" value={new Date()} />
              <span className="flex-grow" />
              <Button type="submit">Save</Button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
