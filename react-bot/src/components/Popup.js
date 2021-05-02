import { Dialog, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { FaStar } from 'react-icons/fa';

export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;

  const [Author, setAuthor] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [starValue, setStarValue] = useState("");

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
    setStarValue(value)
    console.log(value)
    
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

  };

  

  const addToForum = () => {
    Axios.post("http://localhost:3001/forum/addForum",
      {
        author: Author,
        starValue: starValue,
        description: Description
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

      <div  style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}

              
            />
          )
        })}
      </div>
     
<br></br>

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
            Description
                  </label>
          <textarea
          placeholder="How was your experience?"
            style={styles.textarea}
            type="text"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>
      </div>

      <button onClick={add}
        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold  shadow text-xs px-4 py-2  outline-none focus:outline-none    duration-150"
        type="button"
      >

        Submit

         </button>


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

