import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

import locationIcon from '@iconify-icons/mdi/hospital-building'

import { Icon, InlineIcon } from '@iconify/react';

import virusIcon from '@iconify-icons/mdi/home-location';

import './map.css'

const LocationPin = ({ text, customIcon }) => {
  if (customIcon == 'me') {

    return (
      <div className="pin">
        <Icon color="green" icon={virusIcon} className="pin-icon" />
        <p className="pin-text">{text}</p>
      </div>
    )
  } else if (customIcon == 'hospital') {
    return (
      <div className="pin">
        <InlineIcon color="blue" icon={locationIcon} className="pin-icon" />
        <p className="pin-text">{text}</p>
      </div>
    )
  } else if (customIcon == 'nearH') {
    return (
      <div className="pin">
        <InlineIcon color="red" icon={locationIcon} className="pin-icon3" />
        <p className="pin-text2">{text}</p>
      </div>
      
    )

  }
}


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
              customIcon="me"
            />


            {
              hospitals.map(function (value, i) {


                return <LocationPin
                  lat={value.hospital.Latitude}
                  lng={value.hospital.Longitude}
                  customIcon={i == 0 ? "nearH" : "hospital"}
                  text={value.hospital.name + " contains " + value.hospital.status + " Empty BEDS, Far from you " + value.distancekm + ".s Estimated time " + value.temp} key={i} />;
              })}



          </GoogleMapReact>
        </div>
      </div>
    )

  }
}



export default Map