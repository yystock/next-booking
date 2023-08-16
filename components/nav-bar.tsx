import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { UserMenu } from "./user-menu";
// import { ModeToggle } from "./mode-toggle";
import { getRole } from "@/app/actions/getRole";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import NavLinks from "./nav-links";

interface NavBarProps {
  type: string;
  landing?: boolean;
}
export async function NavBar({ type, landing }: NavBarProps) {
  const user = await getCurrentUser();
  const role = await getRole(user?.id);

  return (
    <div className={cn("shadow backdrop-filter backdrop-blur-lg bg-opacity-30 ", !landing && "border-b border-gray-200")}>
      <div className="container max-w-7xl mx-auto flex items-center py-2 px-8 space-x-4 justify-center">
        <Link href="/" className={cn("py-1 px-2 rounded", landing ? "hover:bg-accent/30" : "hover:bg-accent")}>
          <span className={cn("font-semibold", landing ? "text-slate-100" : "text-foreground")}>Booking</span>
        </Link>
        <NavLinks type={type} landing={landing} />

        <span className="flex-grow" />
        {/* <ModeToggle /> */}

        {user ? (
          <UserMenu user={user} role={role} />
        ) : (
          <Link href="/login">
            <Button variant="default" className={cn(landing && "bg-slate-100/20 hover:bg-primary")}>
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
