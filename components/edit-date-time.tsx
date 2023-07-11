import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { pad } from "@/lib/utils";

type EditDateTimeProps = {
  name?: string;
  value: Date;
  onChange?: (date: Date) => void;
};

const EditDateTime = ({ name, value, onChange }: EditDateTimeProps) => {
  const [date, setDate] = useState(value);

  const onDate = (d: Date | undefined) => {
    if (!d) return;

    d.setHours(date.getHours());
    d.setMinutes(date.getMinutes());
    d.setSeconds(date.getSeconds());
    setDate(d);
    onChange && onChange(d);
  };

  return (
    <div>
      <div className="relative flex items-center">
        <input type="hidden" name={name} defaultValue={date.toISOString()} />
        <Input
          type="time"
          className="pr-8"
          value={`${pad(date.getHours())}:${pad(date.getMinutes())}`}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":");
            const newDate = new Date(date);
            newDate.setHours(parseInt(hours) || 0);
            newDate.setMinutes(parseInt(minutes) || 0);
            setDate(newDate);
            onChange && onChange(newDate);
          }}
        />
        <Popover>
          <PopoverTrigger className="absolute right-2 h-4 w-4">
            <CalendarIcon size={16} />
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode="single" selected={date} onSelect={onDate} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EditDateTime;
