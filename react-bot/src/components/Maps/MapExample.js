import React from "react";
import {GoogleMap} from "react-google-maps";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";

function MapExample() {
    return (
        <GoogleMap defaultZoom={10} 
        defaultCenter={{ lat: 35.769260, lng: 10.819970 }}/>
            )
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function Map() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            process.env.REACT_APP_GOOGLE_KEY
          }`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
        }
