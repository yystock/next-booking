import { Activity } from "@prisma/client";
import { FC } from "react";

interface ActivityProps {
  activity: Activity;
}

const Activity: FC<ActivityProps> = ({ activity }) => {
  return (
    <div className="flex items-center">
      <div>{activity.name}</div>
      <div>{activity.category}</div>
      <div>{activity.description}</div>
      <div>{activity.guestCount}</div>
      <div>{activity.imageSrc}</div>
      <div>{activity.location}</div>
      <div>{activity.price}</div>
      <div>{activity.userId}</div>
    </div>
  );
};

export default Activity;
