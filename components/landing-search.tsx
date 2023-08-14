"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { SimpleSearchBox } from "./map/simple-search-box";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type LatLngLiteral = google.maps.LatLngLiteral;
export default function LandingSearch() {
  const [center, setCenter] = useState<LatLngLiteral>();
  const router = useRouter();

  return (
    <div className="flex justify-center gap-4 max-w-[1200px] mx-auto">
      <SimpleSearchBox
        className="w-1/2"
        onSelectAddress={(center) => {
          setCenter(center);
        }}
      />
      <Button
        onClick={() => {
          center ? router.push(`./booking?lat=${center?.lat}&lng=${center?.lng}`) : router.push("./booking");
        }}
        variant="default"
        className={cn("hover:bg-primary bg-slate-100/20 md:text-lg p-2 md:p-4 rounded-full font-semibold")}
      >
        Search
      </Button>
    </div>
  );
}
