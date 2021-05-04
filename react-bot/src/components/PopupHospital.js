import { Dialog, Button} from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Status, setStatus] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");

  const [newName, setnewName] = useState("");
  const [newAddress, setnewAddress] = useState("");
  const [newStatus, setnewStatus] = useState("");
  const [newLongitude, setnewLongitude] = useState("");
  const [newLatitude, setnewLatitude] = useState("");

  const addTohospital = () => {
    Axios.post("http://localhost:3001/Hospital/",
      {
        name: Name,
        address: Address,
        status: Status, 
        Longitude: Longitude,
        Latitude: Latitude,
      });
  };

  const updateHospital = (id) => {
    Axios.put("http://localhost:3001/hospital/update/:id",

      {
        id: id,
        name: newName,
        address: newAddress,
        status: newStatus,
        Longitude: newLongitude,
        Latitude: newLatitude,
      });
  };

  function add() {

    addTohospital();
    setOpenPopup(false);
    window.location.reload();
  }

  return (
    <Dialog open={openPopup}
    >
      <div className="ml-auto">
        <Button
          color="secondary"

          onClick={() => setOpenPopup(false)}
        >
          <div >
            <button class=" btn-danger">X</button> </div>

        </Button>
      </div>
      <div className="w-full lg:w-12/12 px-12">
        <div className="relative w-full mb-4">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            name
                  </label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>

      <div className="w-full lg:w-12/12 px-12">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            address
                  </label>
          <input
            type="text"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>

      <div className="w-full lg:w-12/12 px-12">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            status
                  </label>
          <input
            type="text"
            onChange={(event) => {
              setStatus(event.target.value);
            }}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
      <div className="w-full lg:w-12/12 px-12">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Longitude
                  </label>
          <input
            type="text"
            onChange={(event) => {
              setLongitude(event.target.value);
            }}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
      <div className="w-full lg:w-12/12 px-12">
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Latitude
                  </label>
          <input
            type="text"
            onChange={(event) => {
              setLatitude(event.target.value);
            }}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>
      <div className="text-center mt-4">
                    <button  onClick={add}
                      className="green-800 text-white active:green-600 text-sm font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      valider
                    </button>
                  </div>
     
    </Dialog>
  );

};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }
}

