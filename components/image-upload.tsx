"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {/* {value.map((url) => ( */}
        <div key={value} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <div className="z-10 absolute top-2 right-2">
            <Button type="button" onClick={() => onRemove(value)} variant="destructive" size="sm">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Image fill className="object-cover" alt="Image" src={value || "/images/placeholder-image.png"} />
        </div>
        {/* ))} */}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="mohsz7x4">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
