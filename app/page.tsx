import { LandingHero } from "@/components/hero";
import { NavBar } from "@/components/nav-bar";

export default function Page() {
  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover bg-blend-overlay bg-black/70 text-white"
      style={{ backgroundImage: "url('/images/hero1-CP.jpeg')" }}
    >
      <NavBar type="main" landing={true} />

      <LandingHero />
    </div>
  );
}
