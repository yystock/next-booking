import * as z from "zod";

export const activityFormSchema = z.object({
  name: z.string().min(1),
  imageSrc: z.string(),
  price: z.coerce.number().min(1),
  address: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  description: z.string().min(1),
  category: z.string().optional(),
  guestCount: z.number().optional(),
  active: z.boolean().default(false).optional(),
});
