import { db } from "@/lib/db";
import * as z from "zod";
import { getCurrentUser } from "@/lib/session";
import { activityFormSchema } from "@/lib/validations/activity";

const routeContextSchema = z.object({
  params: z.object({
    activityId: z.number(),
  }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToBlog(params.activityId))) {
      return new Response(null, { status: 403 });
    }
    await db.activity.delete({
      where: {
        id: params.activityId,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.log("[Activity_DELETE]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserHasAccessToBlog(params.activityId))) {
      return new Response(null, { status: 403 });
    }

    const json = await req.json();
    const body = activityFormSchema.parse(json);
    await db.activity.update({
      where: {
        id: params.activityId,
      },
      data: {
        name: body.name,
        imageSrc: body.imageSrc,
        description: body.description,
        address: body.address,
        latitude: body.latitude,
        longitude: body.longitude,
        active: body.active,
        guestCount: body.guestCount,
        price: body.price,
        category: body.category,
      },
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.log("[Activity_PATCH]", error);
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(null, { status: 500 });
  }
}

async function verifyCurrentUserHasAccessToBlog(activityId: number) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return 0;
  const count = await db.activity.count({
    where: {
      id: activityId,
      userId: currentUser.id,
    },
  });

  return count > 0;
}
