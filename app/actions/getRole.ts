import { db } from "@/lib/db";

export async function getRole(id?: string) {
  if (!id) return null;
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) return null;
  return user.role;
}
