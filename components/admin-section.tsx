"use client";
import { Button } from "@/components/ui/button";
import { useActivityModal } from "@/hooks/use-activity-modal";
export default function AdminSection() {
  const activityModal = useActivityModal();

  return (
    <div>
      <Button onClick={() => activityModal.onOpen()}>Add Activity</Button>
    </div>
  );
}
