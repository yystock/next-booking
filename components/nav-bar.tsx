import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { UserMenu } from "./user-menu";
import { ModeToggle } from "./mode-toggle";
import { getRole } from "@/app/actions/getRole";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/config/site";
import { dashboardLinks } from "@/config/dashboard";

interface NavBarProps {
  type: string;
}
export async function NavBar({ type }: NavBarProps) {
  const user = await getCurrentUser();
  const role = await getRole(user?.id);
  const links = type === "main" ? navLinks : dashboardLinks;

  return (
    <div className="shadow">
      <div className="container max-w-7xl mx-auto flex items-center py-2 space-x-4">
        <Link href="/" className="py-1 px-2 hover:bg-accent rounded">
          <span className="font-semibold">Booking</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link className="py-1 px-2 hover:bg-accent rounded text-foreground hover:text-primary" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="flex-grow" />
        <ModeToggle />
        {user ? (
          <>
            <UserMenu user={user} role={role} />
          </>
        ) : (
          <Link href="/login" className={cn(buttonVariants({ variant: "default" }))}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
