import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import MainCalendar from "@/components/main-calendar";
import AdminSection from "@/components/admin-section";
import Activity from "@/components/activity";
import { getRole } from "../actions/getRole";
export default async function Home() {
  const currentUser = await getCurrentUser();
  const role = await getRole(currentUser?.id);
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
      {role === "ADMIN" ? <AdminSection /> : <></>}
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
