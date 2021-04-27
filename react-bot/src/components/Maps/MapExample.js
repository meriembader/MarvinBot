import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import locationIcon from '@iconify-icons/mdi/hospital-building'

import { Icon, InlineIcon } from '@iconify/react';

import virusIcon from '@iconify-icons/mdi/virus';



import './map.css'
//const TN = [36.81897, 10.16579];
const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={virusIcon} className="pin-icon2"/>
    <InlineIcon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)
console.log('AIzaSyCxg9uuzEQ5Lzv-0QT0THxI_t3FOw2Zg9Q')


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
      hospitals: this.props.hospitals,
      zoomLevel: this.props.zoomLevel
    }
  }


  render() {
    // const elements = this.state;
    const { location, hospitals, zoomLevel } = this.state;
    console.log(hospitals);
    console.log(location);
    const items = []
    // for (const [index, value] of hospitals.entries()) {
    //   items.push(<LocationPin
    //     key={index}
    //     lat={value.Latitude}
    //     lng={value.Longitude}
    //     text={value.address}
    //   />)

    // }
    return (
      <div className="map">
        <h2 className="map-h2"> See the nearst hospitals </h2>

        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCxg9uuzEQ5Lzv-0QT0THxI_t3FOw2Zg9Q' }}
            defaultCenter={location}
            defaultZoom={zoomLevel}

            yesIWantToUseGoogleMapApiInternals
          >
            <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
          
        />
            {hospitals.map(function (value, i) {
              console.log('latitude => ', value.Latitude);
              console.log('Longitude => ', value.Longitude);
              console.log('address => ', value.address);
              return <LocationPin 
                lat={value.Latitude}
                lng={value.Longitude}
                text={value.address +" (" + value.status + ")"} key={i} />;
            })}
           


          </GoogleMapReact>
        </div>
      </div>
    )

  }
}



export default Map
