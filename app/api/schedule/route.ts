import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import * as z from "zod";
import { scheduleFormSchema } from "@/lib/validations/schedule";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized", { status: 403 });
    }
    const json = await req.json();
    const body = scheduleFormSchema.parse(json);
    console.log(currentUser);

    const schedule = await db.schedule.create({
      data: {
        end: body.end,
        name: body.name,
        start: body.start,
        userId: currentUser.id,
        tenantId: currentUser.tenant.id,
      },
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.log("[Schedule_POST]", error);

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
