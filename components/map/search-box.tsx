import { useLoadScript, Libraries } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface ISearchBoxProps {
  onSelectAddress: (address: string, latitude: number, longitude: number) => void;
  defaultValue: string;
}

const libraries: Libraries = ["places"];
export function SearchBox({ onSelectAddress, defaultValue }: ISearchBoxProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries,
  });

  if (!isLoaded) return <div className="flex items-center justify-center h-screen">Loading... </div>;
  return <PlacesAutocomplete onSelectAddress={onSelectAddress} defaultValue={defaultValue} />;
}

function PlacesAutocomplete({ onSelectAddress, defaultValue }: ISearchBoxProps) {
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
    debounce: 300,
  });

  const handleChange = (search: string) => {
    setValue(search);
    if (search === "") {
      onSelectAddress("", -999, -999);
    }
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAddress(address, lat, lng);
    } catch (error) {
      console.error(`😱 Error:`, error);
    }
  };

  return (
    <Command>
      <CommandInput
        id="location"
        value={value}
        onValueChange={handleChange}
        disabled={!ready}
        className="h-1/2 lg:h-auto w-full lg:w-96 shadow-sm p-4 rounded-md text-gray-900"
        placeholder="Search a location..."
      />

      <CommandList>
        {/* {data.length === 0 && <CommandEmpty>No results Found</CommandEmpty>} */}
        <CommandGroup>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <CommandItem onSelect={handleSelect} key={place_id}>
                {description}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
