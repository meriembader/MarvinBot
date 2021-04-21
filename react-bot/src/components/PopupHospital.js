import { Dialog, Button} from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Status, setStatus] = useState("");

  const [newName, setnewName] = useState("");
  const [newAddress, setnewAddress] = useState("");
  const [newStatus, setnewStatus] = useState("");


  const addTohospital = () => {
    Axios.post("http://localhost:3001/Hodpital/",
      {
        name: Name,
        address: Address,
        status: Status
      });
  };

  const updateHospital = (id) => {
    Axios.put("http://localhost:3001/hospital/update/:id",

      {
        id: id,
        name: newName,
        address: newAddress,
        status: newStatus
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
          <div style={{ diplay: ' flex' }}> x</div>

        </Button>
      </div>
      <div className="w-full lg:w-12/12 px-12">
        <div className="relative w-full mb-3">
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

      <Button onClick={add} class="btn btn-success">
        Submit
              </Button>
    </Dialog>
  )
}
