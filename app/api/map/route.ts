import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const { city } = z
      .object({
        city: z.string(),
      })
      .parse({
        city: url.searchParams.get("city"),
      });
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city + ", USA")}&key=${
      process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
    }`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();
    const { lat, lng } = geocodeData.results[0].geometry.location;
    return NextResponse.json({ lat, lng });
  } catch (error) {
    console.log("[MAP_GET]", error);
    return new Response("Could not fetch MAP", { status: 500 });
  }
}
