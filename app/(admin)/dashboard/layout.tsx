import "@/app/globals.css";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/nav-bar";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { Inter } from "next/font/google";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });
export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModalProvider />
          <Toaster />
          <NavBar type="dashboard" />
          <main className="container max-w-7xl">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
