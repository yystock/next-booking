"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// export async function updateActivity(data: FormData) {
//   await db.activity.update({
//     where: {
//       id: parseInt(data.get("id")),
//     },
//     data: {
//       name: data.get("name") as string,
//     },
//   });

//   revalidatePath("/");
// }

export async function deleteActivity(id: string) {
  await db.activity.delete({
    where: {
      id: parseInt(id),
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
      userId: data.userId,
      guestCount: data.guestCount,
      category: data.category,
      active: data.active,
      tenantId: data.tenantId,
    },
  });

  revalidatePath("/");
}
