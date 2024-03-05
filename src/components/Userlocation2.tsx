"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useMap, Marker } from "react-leaflet";
import L from 'leaflet';

import icon from "../data/location.png"
import heading from "../data/orientation.png"



const Userlocation2 = () => {

  // user Location Manual ///////////////////////////////////////////
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    let intervalId: any;

    if (map) {
      intervalId = setInterval(function () {
        map.invalidateSize();
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [map]);

  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lon: 0,
    heading: 0
  });


  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000
    };

    const updateUserLocation = navigator.geolocation.watchPosition(position => {
      setUserLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        heading: position.coords.heading ? position.coords.heading : 0
      });
    },
      error => console.error(error),
      options
    );

    return () => {
      navigator.geolocation.clearWatch(updateUserLocation);
    };
  }, [])


  const iconLocation = L.icon({
    iconUrl: '/location.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  // zoom to user ////////////////////////////
  const maps = useMap();

  const handleClick = (lat: number, lon: number) => {
    maps.flyTo([lat, lon], 17);
  }


  return (
    <div>
      <button
        onClick={() => handleClick(userLocation.lat, userLocation.lon)}
      >
        <Image
          src={heading}
          alt="orientation"
          className="absolute top-36 left-4 z-[1000] w-8 transform border-2 border-gray-300 bg-gray-100 shadow-md p-1 rounded-full"
          style={{ transform: `rotate(${userLocation.heading}deg)` }}
        />
      </button>

      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lon]}
          icon={iconLocation}
        />
      )}
    </div>
  );
}

export default Userlocation2
