import { GoogleApiWrapper , Map , Marker, InfoWindow} from "google-maps-react";
import React, { Component } from "react";



class MapExample extends Component {
  render(){
    return(
      <Map google={this.props.google} zoom={14}>

      <Marker onClick={this.onMarkerClick}
        name={'Current location'} />

      <InfoWindow onClose={this.onInfoWindowClose}>

      </InfoWindow>
    </Map>

    );
  }
 
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCIsvIuXNOvuglOF8JOVEdTsxW3BCEjDUg")
})(MapExample)