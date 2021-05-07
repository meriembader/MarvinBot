import React, { Component } from "react";
import axios from "axios";
import {redirectTohospital} from "./redirectTohospital"

// components

import MapSection from '../../components/Maps/MapExample'; // import the map here
import { fetchNearestPlacesFromGoogle } from "./nearhospital";
class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      location: {
        address: '',
        lat: undefined,
        lng: undefined,
      }
    };
  }
  componentDidMount() {
    
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('my position ', position);
      const loc = {
        address: 'My Postion',
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.setState({
        location: { ...loc }
      });
      console.log('location var => ', this.state.location);
      fetchNearestPlacesFromGoogle(position.coords.latitude, position.coords.longitude)
        .then(
          (result) => {
            console.log('fetchNearestPlacesFromGoogle => ', result);

            const elm = []
            for (const [index, value] of result.entries()) {
              elm.push(value);
            }



            console.log('elm => ', elm);
            
            axios.post(
              "http://localhost:3001/hospital/testtest", elm

            );
            this.getHosptals();
          },
          
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

    }, (error) => {
      console.log('get current position error ', error);
    },
      { maximumAge: 0, timeout: 2000, enableHighAccuracy: true });


    
  }
  getHosptals() {
    console.log("getting hospitals from db");
    fetch("http://localhost:3001/hospital")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          const elm = []
          for (const [index, value] of result.entries()) {
            elm.push(value);
          }
         redirectTohospital(this.state.location.lat,this.state.location.lng,elm).then(hospitals => {
           console.log('hospitals ===> ',hospitals);
      
          this.setState({
            isLoaded: true,
            items: hospitals
          });
         })
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items, location } = this.state;
    console.log('items ===========>',items);
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading ...
        <img id="WaitGif" src="https://i.gifer.com/YCZH.gif" alt="alternatetext" align="center"></img>
        <p>Getting the nearset empty hospital... please wait.</p>
      </div>;
    } else {
      return (


        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <MapSection location={location} hospitals={items} zoomLevel={15} />

            </div>
          </div>

        </div>
      );
    }
  }
}
export default Maps;