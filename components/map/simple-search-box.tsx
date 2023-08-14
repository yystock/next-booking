"use client";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface ISimpleSearchBoxProps {
  onSelectAddress: (position: google.maps.LatLngLiteral) => void;
  className?: string;
}

export function SimpleSearchBox({ onSelectAddress, className }: ISimpleSearchBoxProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: ["US", "CA", "GB", "HK"] },
    },
    debounce: 500,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAddress({ lat, lng });
    } catch (error) {
      console.error(`😱 Error:`, error);
    }
  };

  return (
    <Command className={cn("rounded-xl bg-white/0 border-2", className)}>
      <CommandInput
        id="location"
        value={value}
        onValueChange={(search) => setValue(search)}
        disabled={!ready}
        className={cn("w-full text-slate-100")}
        placeholder="Search a location..."
      />

      <CommandList className={cn("px-2 bg-opacity-100")}>
        {/* {data.length === 0 && <CommandEmpty>No results Found</CommandEmpty>} */}
        {status === "OK" &&
          data.map(({ place_id, description }, index) => (
            <CommandItem onSelect={handleSelect} key={place_id} className={cn("bg-accent")}>
              {description}
            </CommandItem>
          ))}
      </CommandList>
    </Command>
  );
}
