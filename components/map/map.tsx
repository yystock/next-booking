"use client";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";

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
export type Place = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type geoLocation = {
  data: {
    lat: number;
    lng: number;
  };
};

export default function Map() {
  const [places, setPlaces] = useState<Place[]>([
    {
      name: "Burger City",
      address: "999 Some Street, New York City, NY",
      latitude: 40.7121,
      longitude: -74.005,
    },
    {
      name: "Another Burger",
      address: "243 Some Street, New York City, NY",
      latitude: 40.7131,
      longitude: -74.015,
    },
    {
      name: "Burger Awesome",
      address: "143 Some Street, New York City, NY",
      latitude: 40.7031,
      longitude: -74.035,
    },
  ]);

  const cityRef = useRef(undefined);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  const [position, setPosition] = useState({
    lat: places[0].latitude,
    lon: places[0].longitude,
  });

  const [selectedPlaces, setSelectedPlaces] = useState<Place | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setPlaces(() => [...places]);
    }, 3000);
  }, []);

  const form = useForm<z.infer<typeof configureSchema>>({
    resolver: zodResolver(configureSchema),
    defaultValues: {
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof configureSchema>) {
    const { data } = (await axios.get(`/api/map?city=${values.city}`)) as geoLocation;
    setPosition({ lat: data.lat, lon: data.lng });
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="hidden">City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: position.lat, lng: position.lon }} zoom={13}>
          {places.map((place) => (
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
