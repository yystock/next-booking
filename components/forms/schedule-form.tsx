"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Schedule } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { scheduleFormSchema } from "@/lib/validations/schedule";

type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

interface ScheduleFormProps {
  initialData: Schedule | null;
}
export const ScheduleForm: React.FC<ScheduleFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit schedule" : "Create schedule";
  const description = initialData ? "Edit a schedule." : "Add a new schedule";
  const toastMessage = initialData ? "Schedule updated." : "Schedule created.";
  const action = initialData ? "Save changes" : "Create";
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        customer: 1,
      };

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ScheduleFormValues) => {
    console.log(data);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/schedule/${initialData.id}`, data);
      } else {
        await axios.post(`/api/schedule`, data);
      }
      router.refresh();
      router.push(`/dashboard/schedule`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (initialData) {
      try {
        setLoading(true);
        await axios.delete(`/api/schedule/${initialData.id}`);
        router.refresh();
        router.push(`/schedule`);
        toast.success("Schedule deleted.");
      } catch (error: any) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mx-auto">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Morning Schedule" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start</FormLabel>
                <FormControl>
                  <Input type="time" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End</FormLabel>
                <FormControl>
                  <Input type="time" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
