"use client";
import qs from "query-string";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { Activity } from "@prisma/client";
import { SimpleSearchBox } from "./simple-search-box";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { LocateFixed, DollarSign, Radar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const containerStyle = {
  width: "100%",
  height: "600px",
};

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MapBoundsLiteral = google.maps.LatLngBoundsLiteral;
type ActivityType = Omit<Activity, "price"> & { price: string };
type ActivitiesType = ActivityType[] | null;

interface MapProps {
  initialData: ActivitiesType;
  c_lat?: number; // center
  c_lng?: number;
}

export default function Map({ initialData, c_lat, c_lng }: MapProps) {
  const [places, setPlaces] = useState<ActivitiesType>(initialData);
  const [selectedPlaces, setSelectedPlaces] = useState<ActivityType>();
  const [zoom, setZoom] = useState(13);
  const router = useRouter();
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const mapRef = useRef<google.maps.Map>();

  const [center, setCenter] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
  // const debouncedValue = useDebounce<LatLngLiteral>(center, 500);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "8e6c80814e65065",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const getLocation = async () => {
    try {
      const location = await axios.get("https://ipapi.co/json");
      setCenter({
        lat: location.data.latitude,
        lng: location.data.longitude,
      });
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if ((!lat && !lng) || (!center.lat && !center.lng)) {
      console.log("init");
      setPlaces(initialData);
      getLocation();
    }
  }, []);

  useEffect(() => {
    console.log(initialData?.length);
    setTimeout(() => {
      console.log("Waited for 1 second.");
    }, 1000);
  }, [center, router]);

  useEffect(() => {
    setPlaces(initialData);
  }, [initialData]);

  const onSearch = useCallback((center: LatLngLiteral) => {
    setCenter(center);
    mapRef.current?.panTo(center);
    console.log("search");
    const searchOptions = "onSearch";
    const query = {
      searchOptions: searchOptions,
      lat: center.lat,
      lng: center.lng,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, []);

  const onBoundChange = useCallback(() => {
    const bounds = mapRef.current?.getBounds()?.toJSON();
    const centerChanged = mapRef.current?.getCenter()?.toJSON();
    const searchOptions = "onDrag";
    if (centerChanged) {
      setCenter(centerChanged);
    }

    console.log("ondrag");
    const query = {
      searchOptions: searchOptions,
      s: bounds?.south,
      n: bounds?.north,
      e: bounds?.east,
      w: bounds?.west,
      lat: mapRef.current?.getCenter()?.lat(),
      lng: mapRef.current?.getCenter()?.lng(),
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, []);

  const searchNearestSpot = useCallback(() => {
    console.log("nearest");
    const searchOptions = "nearest";
    const query = {
      searchOptions: searchOptions,
      lat: center.lat,
      lng: center.lng,
    };
    const path = window.location.origin + window.location.pathname;
    console.log(path);

    const url = qs.stringifyUrl(
      {
        url: path,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative flex p-4 shadow-md z-10 justify-center w-full">
        <SimpleSearchBox className="w-1/2" onSelectAddress={(center) => onSearch(center)} />
        <div className="absolute top-0 right-0 p-4 z-10 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Radar className={cn("text-white bg-transparent hover:text-primary")} onClick={() => searchNearestSpot()} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Find Nearest Activity.</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <LocateFixed className={cn("text-white bg-transparent hover:text-primary")} onClick={() => mapRef.current?.panTo(center)!} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Locate yourself.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="map absolute left-0 top-0 h-full w-full">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: center.lat, lng: center.lng }}
          zoom={zoom}
          options={options}
          onLoad={onLoad}
          onDragEnd={onBoundChange}
        >
          {places &&
            places.map((place) => (
              <MarkerF
                key={`${place.address}-${place.name}-${place.latitude}${place.longitude}`}
                onClick={() => {
                  place.id === selectedPlaces?.id ? setSelectedPlaces(undefined) : setSelectedPlaces(place);
                }}
                position={{ lat: place.latitude, lng: place.longitude }}
              />
            ))}
          {selectedPlaces && (
            <InfoWindowF
              position={{
                lat: selectedPlaces.latitude,
                lng: selectedPlaces.longitude,
              }}
              zIndex={1}
              options={{
                pixelOffset: new window.google.maps.Size(0, -35),
              }}
              onCloseClick={() => setSelectedPlaces(undefined)}
            >
              <Card className="bg-white border-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium  text-accent">{selectedPlaces.name}</CardTitle>
                  <div className="items-center flex text-accent">
                    <DollarSign className="h-4 w-4  " />
                    {String(selectedPlaces.price)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5">
                    <div className="text-md font-bold text-accent">{selectedPlaces.description}</div>
                    <div className="text-md font-bold text-accent">{selectedPlaces.address}</div>
                  </div>
                </CardContent>
              </Card>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
