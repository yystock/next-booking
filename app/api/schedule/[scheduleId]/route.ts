import { db } from "@/lib/db";
import * as z from "zod";
import { getCurrentUser } from "@/lib/session";
import { scheduleFormSchema } from "@/lib/validations/schedule";

const routeContextSchema = z.object({
  params: z.object({
    scheduleId: z.number(),
  }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToBlog(params.scheduleId))) {
      return new Response(null, { status: 403 });
    }
    await db.schedule.delete({
      where: {
        id: params.scheduleId,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("[Schedule_DELETE]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToBlog(params.scheduleId))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = scheduleFormSchema.parse(json);
    await db.schedule.update({
      where: {
        id: params.scheduleId,
      },
      data: {
        name: body.name,
        start: body.start,
        end: body.end,
        customer: body.customer,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log("[Schedule_PATCH]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToBlog(scheduleId: number) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return 0;
  const count = await db.schedule.count({
    where: {
      id: scheduleId,
      userId: currentUser.id,
    },
  });

  return count > 0;
}
