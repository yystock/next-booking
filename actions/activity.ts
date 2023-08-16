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
  const locationResult: { id: number }[] = await db.$queryRaw`
        INSERT INTO "Location" ("coords")
        VALUES (ST_MakePoint(${data.longitude}, ${data.latitude}))
        RETURNING "id";
      `;
  const locationId = locationResult[0].id;
  await db.activity.create({
    data: {
      name: data.name,
      imageSrc: data.image,
      price: data.price,
      address: data.address,
      longitude: data.longitude,
      latitude: data.latitude,
      description: data.description,
      userId: data.userId,
      guestCount: data.guestCount,
      category: data.category,
      active: data.active,
      tenantId: data.tenantId,
      locationId: locationId,
    },
  });

  revalidatePath("/");
}
