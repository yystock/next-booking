import { NavBar } from "@/components/nav-bar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <NavBar type="main" />

      {children}
    </div>
  );
}
