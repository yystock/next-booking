"use client";
import TypewriterComponent from "typewriter-effect";
import LandingSearch from "./landing-search";
import LoadMap from "./map/load-map";

export const LandingHero = () => {
  return (
    // Hero Section
    <div>
      <div className="text-white font-bold py-36 text-center space-y-5 mx-auto">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>Search for</h1>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <TypewriterComponent
              options={{
                strings: ["Experience."],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>

        <LoadMap>
          <LandingSearch />
        </LoadMap>
      </div>
    </div>
  );
};
