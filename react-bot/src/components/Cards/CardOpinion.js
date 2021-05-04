import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { FaStar } from 'react-icons/fa';
export default function CardStats() {

  const [ForumList, setForumList] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const stars = Array(5).fill(0)

  useEffect(() => {
    Axios.get("http://localhost:3001/forum").then((response) => {
      setForumList(response.data);
      console.log(response.data);
    });
  }, []);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

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


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">

              {ForumList.map((val, index) => {
                return (
                  <div>
                    <p>{val.author}</p>
                    <div style={styles.stars}>
                      {stars.map((_, index) => {
                        return (
                          <FaStar
                            key={index}
                            size={24}

                            color={(val.starValue) > index ? colors.orange : colors.grey}
                            style={{
                              marginRight: 10,
                              cursor: "pointer"
                            }}


                          />
                        )
                      })}
                    </div>




                  </div>

                );
              })}


            </div>

          </div>


        </div>
      </div>
    </>
  );


}



