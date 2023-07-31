"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "@/components/avatar";
import { User } from "next-auth";
import { FC } from "react";
import Link from "next/link";
import { Logout } from "./logout";
interface UserMenuProps {
  user?: User;
  role: string | null;
}

export const UserMenu: FC<UserMenuProps> = ({ user, role }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {role === "ADMIN" && (
          <DropdownMenuItem asChild className="w-full cursor-pointer">
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild className="w-full cursor-pointer">
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="w-full cursor-pointer">
          <Link href="/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
