import LoadMap from "@/components/map/load-map";
import Map from "@/components/map/map";
import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";
import { Activity, Location } from "@prisma/client";
import { SearchOptions } from "@/types";

interface BookingProps {
  searchParams: {
    searchOptions: string;
    n?: string;
    e?: string;
    s?: string;
    w?: string;
    lat?: string;
    lng?: string;
  };
}
export default async function Booking({ searchParams }: BookingProps) {
  const latitude = searchParams.lat ? parseFloat(searchParams.lat) : undefined;
  const longitude = searchParams.lng ? parseFloat(searchParams.lng) : undefined;

  let activities: Activity[];
  if (searchParams.searchOptions === SearchOptions.onDrag && searchParams.s && searchParams.w && searchParams.e && searchParams.n) {
    const west = parseFloat(searchParams.w);
    const south = parseFloat(searchParams.s);
    const east = parseFloat(searchParams.e);
    const north = parseFloat(searchParams.n);
    const locationWithinBoundaries: { id: number }[] = await db.$queryRaw`
        SELECT id
        FROM "Location"
        WHERE ST_Intersects(coords, ST_MakeEnvelope(${west}, ${south}, ${east}, ${north}, 4326))`;
    const arrayOfIds = locationWithinBoundaries.map((obj) => obj.id);
    activities = await db.activity.findMany({
      where: {
        locationId: {
          in: arrayOfIds,
        },
      },
    });

    console.log("Boundary:", arrayOfIds);
  } else if (searchParams.searchOptions === SearchOptions.onSearch && searchParams.lat && searchParams.lng) {
    const locationWithinDistance: { id: number }[] = await db.$queryRaw`
      SELECT id
      FROM "Location"
      WHERE ST_Distance(coords, ST_MakePoint(${longitude}, ${latitude})::geography) <= ${20000};
    `;

    const arrayOfIds = locationWithinDistance.map((obj) => obj.id);
    activities = await db.activity.findMany({
      where: {
        locationId: {
          in: arrayOfIds,
        },
      },
    });
    console.log("onSearch", arrayOfIds);
  } else if (searchParams.searchOptions === SearchOptions.nearest) {
    console.log("nearest:", latitude, longitude, typeof latitude);
    const nearestLocation: { id: number }[] = await db.$queryRaw`
      SELECT id
      FROM "Location"
      ORDER BY ST_Distance(coords, ST_MakePoint(${longitude}, ${latitude})) ASC
      LIMIT 1;
    `;

    const arrayOfIds = nearestLocation.map((obj) => obj.id);
    console.log("nearest", arrayOfIds);
    activities = await db.activity.findMany({
      where: {
        locationId: {
          in: arrayOfIds,
        },
      },
    });
  } else {
    activities = await db.activity.findMany({
      include: {
        user: true,
      },
    });
  }
  const formattedActivities = activities.map((x) => {
    return {
      ...x,
      price: formatter.format(x.price.toNumber()),
    };
  });

  return (
    <main className="container max-w-6xl mx-auto">
      <LoadMap>
        <Map initialData={formattedActivities} c_lat={latitude} c_lng={longitude} />
      </LoadMap>
    </main>
  );
}
