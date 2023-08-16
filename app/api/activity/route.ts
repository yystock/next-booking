import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import * as z from "zod";
import { activityFormSchema } from "@/lib/validations/activity";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const body = activityFormSchema.parse(json);

    const locationResult: { id: number }[] = await db.$queryRaw`
        INSERT INTO "Location" ("coords")
        VALUES (ST_MakePoint(${body.longitude}, ${body.latitude}))
        RETURNING "id";
      `;
    const locationId = locationResult[0].id;

    const activity = await db.activity.create({
      data: {
        name: body.name,
        imageSrc: body.imageSrc,
        description: body.description,
        userId: currentUser.id,
        tenantId: currentUser.tenant.id,
        address: body.address,
        latitude: body.latitude,
        longitude: body.longitude,
        active: body.active,
        guestCount: body.guestCount,
        price: body.price,
        category: body.category,
        locationId: locationId,
      },
    });

    return NextResponse.json(activity);
  } catch (error) {
    console.log("[Activity_POST]", error);

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
