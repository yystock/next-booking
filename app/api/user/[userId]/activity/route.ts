import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { z } from "zod";
const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});
export async function GET(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const user = await getCurrentUser();
    if (!user || context.params.userId !== user.id) {
      console.log("unauthorized:");
      return new Response("Unauthorized", { status: 403 });
    }

    const data = await db.activity.findMany({
      where: {
        userId: user.id,
      },
    });
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.log("[User_Activity_GET]", error);
    return new Response("Could not fetch activity", { status: 500 });
  }
}
