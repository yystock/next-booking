import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import MainCalendar from "@/components/main-calendar";
import AdminSection from "@/components/admin-sectiion";
import Activity from "@/components/activiity";
export default async function Home() {
  const currentUser = await getCurrentUser();

  const user = await db.user.findUnique({
    where: {
      id: currentUser?.id,
    },
    include: {
      activity: true,
    },
  });

  const activities = await db.activity.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainCalendar activities={activities} />
      {user?.role === "ADMIN" ? <AdminSection /> : <></>}
      {activities.length &&
        activities.map((data, index) => {
          return (
            <div key={index}>
              <Activity activity={data} />
            </div>
          );
        })}
    </main>
  );
}
