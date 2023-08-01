import * as z from "zod";

export const scheduleFormSchema = z.object({
  name: z.string().min(1),
  customer: z.coerce.number().min(1),
  start: z.string(),
  end: z.string(),
});
