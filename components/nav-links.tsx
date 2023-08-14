"use client";
import React from "react";
import { navLinks } from "@/config/site";
import { dashboardLinks } from "@/config/dashboard";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  type: string;
  landing?: boolean;
}
export default function NavLinks({ type, landing }: NavLinksProps) {
  const segment = useSelectedLayoutSegment();
  const links = type === "main" ? navLinks : dashboardLinks;
  return (
    <nav>
      <ul className="flex items-center gap-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              className={cn(
                "py-1 px-2 hover:text-primary",
                landing ? "text-slate-100 hover:bg-accent/30" : "text-foreground hover:bg-accent ",
                href.startsWith(`/${segment}`) ? "border-b-2 border-primary" : "bg-transparent"
              )}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
