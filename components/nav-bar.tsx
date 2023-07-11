import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { UserMenu } from "./user-menu";
import { ModeToggle } from "./mode-toggle";
const links = [{ href: "/booking", label: "Booking" }];

export async function NavBar() {
  const user = await getCurrentUser();
  console.log("uuser", user);

  return (
    <div className="shadow">
      <div className="container mx-auto flex items-center py-2 space-x-4">
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
        <UserMenu user={user} />
      </div>
    </div>
  );
}
