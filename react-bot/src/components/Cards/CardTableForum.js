import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { FaStar } from 'react-icons/fa';

export default function CardTableForum({ color }) {


  const [ForumList, setForumList] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const stars = Array(5).fill(0)
  // const { idd ,color } = props;

  useEffect(() => {
    Axios.get("http://localhost:3001/forum").then((response) => {
      setForumList(response.data);
      console.log(response.data);
    });
  }, []);

  const deleteForum = (id) => {
    Axios.delete(`http://localhost:3001/forum/${id}`);
    window.location.reload();
  };

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

  const calculate = () => {
    var i = 0, sum = 0, len = ForumList.length;

    for (i = 0; i < ForumList.length; i++) {
      var f = ForumList[i];
      sum = + f.starValue;

    }
    return (
      <div> <h1>{sum / len} out of 5</h1>

      </div>
    )
  }


  return (
    <>



      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h1
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >

                Ratings and Reviews

              </h1>

            </div>
          </div>
        </div>

        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">




              <h4
                className={
                  "font-bold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                <FaStar

                  size={52}

                  color={colors.orange}
                  style={{
                    marginRight: 10,
                    cursor: "pointer"
                  }}


                />
                {calculate()}

              </h4>

            </div>
          </div>
        </div>



        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">

            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Username
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Opinion
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">

                </th>


              </tr>
            </thead>

            <tbody>



              {ForumList.map((val, index) => {
                return (
                  <tr>

                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={require("assets/img/user.png").default}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light" ? "text-blueGray-600" : "text-white")
                        }
                      >

                        <div key={index}>

                          <h3>{val.author}</h3>
                        </div>
                      </span>

                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div key={index}>

                        <h3>{val.description}</h3>
                      </div>
                    </td>


                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">


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



                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}

CardTableForum.defaultProps = {
  color: "light",
};

CardTableForum.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};