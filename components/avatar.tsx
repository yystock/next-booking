"use client";
import { User } from "next-auth";
import Image from "next/image";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div
      className="
        relative 
        flex
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
        items-center
      
      "
    >
      <Image fill sizes="24" src={user?.image || "/images/placeholder.jpg"} alt="Avatar" />
    </div>
  );
};

export default Avatar;
