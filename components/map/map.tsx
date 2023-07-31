"use client";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { Activity } from "@prisma/client";

export const DEFAULT_DISTANCE_IN_KM = "100";

const configureSchema = z.object({
  city: z.string().min(1, {
    message: "City must be at least 1 characters long",
  }),
});

const containerStyle = {
  width: "100%",
  height: "600px",
};

type LatLngLiteral = google.maps.LatLngLiteral;
interface MapProps {
  initialData: Activity[] | null;
}

export default function Map({ initialData }: MapProps) {
  const [places, setPlaces] = useState<Activity[] | null>(initialData);
  const [currentLocation, setCurrentLocation] = useState({});
  const [selectedPlaces, setSelectedPlaces] = useState<Activity | undefined>(undefined);

  const mapRef = useRef<GoogleMap>();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  const [position, setPosition] = useState<LatLngLiteral>({
    lat: initialData && initialData.length > 0 ? initialData[0].latitude : 0,
    lng: initialData && initialData.length > 0 ? initialData[0].longitude : 0,
  });

  const getLocation = async () => {
    try {
      const location = await axios.get("https://iapi.co/json");
      setPosition({
        lat: location.data.latitude,
        lng: location.data.longitude,
      });
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    setPlaces(initialData);
    getLocation();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: position.lat, lng: position.lng }} zoom={13}>
          {places &&
            places.map((place) => (
              <MarkerF
                key={`${place.address}-${place.name}-${place.latitude}${place.longitude}`}
                onClick={() => {
                  place === selectedPlaces ? setSelectedPlaces(undefined) : setSelectedPlaces(place);
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
              <div>
                <h3>{selectedPlaces.name}</h3>
                <p>{selectedPlaces.address}</p>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      )}
    </div>
  );
}
