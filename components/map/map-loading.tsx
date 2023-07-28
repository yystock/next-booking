import { Skeleton } from "@/components/ui/skeleton";

export default function MapLoading() {
  return (
    <div className="flex flex-col items-center space-x-4  gap-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}
