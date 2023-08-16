"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function SheetComponent() {
  useEffect(() => {
    toast.success("hello");
  }, []);
  return (
    <>
      <div className={cn("fixed inset-0 z-10 bg-background/80 backdrop-blur-sm ")}></div>

      <div className={cn("fixed z-10 bg-background/80 backdrop-blur-sm inset-y-0 right-0 h-full w-3/4  border-l sm:max-w-sm")}>
        <div className="flex flex-col space-y-2 text-center sm:text-left">Header</div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
      </div>
    </>
  );
}
