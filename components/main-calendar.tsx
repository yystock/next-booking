"use client";
import { Activity } from "@prisma/client";
import { FC, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

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
    <div>
      <Calendar mode="single" selected={date} onSelect={onDate} />
    </div>
  );
};

export default MainCalendar;
