"use client";
import { FC, useEffect, useRef, useState } from "react";

interface MarkerProps {
  key: number;
}

const Marker: FC<MarkerProps> = ({ key }) => {
  const [highlight, setHighlight] = useState<number | null>();

  return (
    <div
      className={`p-2 bg-black placeholder-inherit w-5 h-5 border-4 ${highlight === key ? "highlight" : ""}`}
      onMouseEnter={() => setHighlight(key)}
      onMouseLeave={() => setHighlight(null)}
    >
      {highlight === key ? (
        <div className="five-day">
          <p>Next 5</p>
          <p></p>
        </div>
      ) : null}
    </div>
  );
};

export default Marker;
