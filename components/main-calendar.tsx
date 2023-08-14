"use client";
import { Activity } from "@prisma/client";
import { FC, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
interface MainCalendarProps {
  activities: Activity[];
}

const MainCalendar: FC<MainCalendarProps> = () => {
  const [date, setDate] = useState<Date>();

  const onDate = (d: Date | undefined) => {
    console.log(d);
    if (!d) return;
    if (date) {
      d.setHours(date.getHours());
      d.setMinutes(date.getMinutes());
      d.setSeconds(date.getSeconds());
    }
    setDate(d);
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={onDate} initialFocus />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default MainCalendar;
