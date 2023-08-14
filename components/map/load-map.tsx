"use client";
import { Libraries, useLoadScript } from "@react-google-maps/api";

interface MapProps {
  children: React.ReactNode;
}

const libraries: Libraries = ["places"];
export default function LoadMap({ children }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <>{children}</>;
}
