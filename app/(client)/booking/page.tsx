import React from "react";
import dynamic from "next/dynamic";
import MapLoading from "@/components/map/map-loading";
const Map = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <MapLoading />,
});

export default function Booking() {
  return (
    <div className="container max-w-6xl mx-auto">
      <p>Instant</p>
      <Map initialData={null} />
    </div>
  );
}
