import React,{Component}  from "react";

// components

import MapSection from '../../components/Maps/MapExample' // import the map here

 class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      location : {
        address: 'p',
        lat: 36.81897,
        lng: 10.16579,

      }
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) =>  {
      //console.log("Latitude is :", position.coords.latitude);
      //console.log("Longitude is :", position.coords.longitude);
      const loc = {
        address: 'My Postion',
        lat: position.coords.latitude,
        lng:position.coords.longitude
      }
      this.setState({
        location : {...loc}
      })
    });
    fetch("http://localhost:3001/hospital")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          const elm = []
          for (const [index, value] of result.entries()) {
            elm.push(value);
          }
          this.setState({
            isLoaded: true,
            items: elm
          });
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }
 
  render (){
    const {error, isLoaded, items,location} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
    
  
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <MapSection location={location} hospitals={items} zoomLevel={9} /> 
          
          </div>
        </div>
  
      </div>
      );
  }
  }
}
export default Maps;

