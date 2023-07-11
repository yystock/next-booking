"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateActivity(data: FormData) {
  await db.activity.update({
    where: {
      id: data.get("id") as string,
    },
    data: {
      name: data.get("name") as string,
      startAt: data.get("startAt") as string,
      endAt: data.get("endAt") as string,
    },
  });

  revalidatePath("/");
}

export async function deleteActivity(id: string) {
  await db.activity.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
}

export async function createActivity(data: any) {
  await db.activity.create({
    data: {
      name: data.name,
      imageSrc: data.image,
      price: data.price,
      location: data.location,
      description: data.description,
      startAt: data.startAt,
      endAt: data.endAt,
      userId: data.userId,
      guestCount: data.guestCount,
      category: data.category,
    },
  });
  revalidatePath("/");
}
