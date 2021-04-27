import React from "react";

// components

import MapSection from '../../components/Maps/MapExample' // import the map here


const location = {
  address: 'hopital charles nicolle',
  lat: 36.8022474,
  lng: 10.1590333,
} // our lo
export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <MapSection location={location} zoomLevel={15} /> 
          </div>
        </div>
      </div>
    </>
  );
}
