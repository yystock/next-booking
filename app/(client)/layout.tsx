import { NavBar } from "@/components/nav-bar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar type="main" />

      {children}
    </div>
  );
}
