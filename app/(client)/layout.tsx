import { NavBar } from "@/components/nav-bar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <NavBar type="main" />

      {children}
    </div>
  );
}
