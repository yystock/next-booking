"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Loader2, Twitter } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isTwitterLoading, setIsTwitterLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsTwitterLoading(true);
          signIn("twitter");
        }}
        disabled={isTwitterLoading}
      >
        {isTwitterLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Twitter className="mr-2 h-4 w-4" />} Twitter
      </button>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google");
        }}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FcGoogle className="mr-2 h-4 w-4" />} Twitter
      </button>
    </div>
  );
}
