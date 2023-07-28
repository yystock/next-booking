import { redirect } from "next/navigation";
import { NavBar } from "@/components/nav-bar";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  const isUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
