"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

const Logo = ({ className }: LogoProps) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className={cn("hidden md:block cursor-pointer", className)}
      src="/images/logo.png"
      height="100"
      width="100"
      alt="Logo"
    />
  );
};

export default Logo;
