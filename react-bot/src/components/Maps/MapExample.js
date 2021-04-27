import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import './map.css'
//const TN = [36.81897, 10.16579];
const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)
console.log('AIzaSyCxg9uuzEQ5Lzv-0QT0THxI_t3FOw2Zg9Q')

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2"> See the nearst hospitals </h2>

    <div className="google-map">
    <GoogleMapReact
  bootstrapURLKeys={{ key: 'AIzaSyCxg9uuzEQ5Lzv-0QT0THxI_t3FOw2Zg9Q' }}
  defaultCenter={location}
  defaultZoom={10}

  yesIWantToUseGoogleMapApiInternals
>
<LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
</GoogleMapReact>
    </div>
  </div>
)
export default Map