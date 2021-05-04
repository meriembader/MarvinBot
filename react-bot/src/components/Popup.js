import { Dialog, Button} from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;
  const [Author, setAuthor] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");


  const addToForum = () => {
    axios.post("http://localhost:3001/forum/addForum",
      {
        author: Author,
        title: Title,
        description: Description
      });
  };

  const updateForum = (id) => {
    axios.put("http://localhost:3001/forum/update/:id",

      {
        id: id,
        author: newAuthor,
        title: newTitle,
        description: newDescription
      });
  };

  function add() {

    addToForum();
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
            Username
                  </label>
          <input
            type="text"
            onChange={(event) => {
              setAuthor(event.target.value);
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
            Title
                  </label>
          <input
            type="text"
            onChange={(event) => {
              setTitle(event.target.value);
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
            Description
                  </label>
          <input
            type="text"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>

      <Button onClick={add} color="primary">
        Submit
              </Button>
    </Dialog>
  )
}
