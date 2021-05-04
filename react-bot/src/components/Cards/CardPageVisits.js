import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

// components

export default function CardPageVisits() {

  const [ContactList, setContactList] = useState([]);
  
  useEffect(() => {
    Axios.get("http://localhost:3001/contact").then((response) => {
      setContactList(response.data);
      console.log(response.data);
    });
  }, []);
  const deleteContact = (id)=> {
    Axios.delete(`http://localhost:3001/contact/${id}`);
    window.location.reload();
  };


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Contact List
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                   name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  email
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  message
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
            {ContactList.map((val, index) => {
    return (
      <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                 
                <div key={index}>

             <h3>{val.name}</h3>
                    </div>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  
                <div key={index}>

             <h3>{val.email}</h3>
                    </div>
                
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <div key={index}>

                   <h3>{val.message}</h3>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  <button
          onClick={()=>deleteContact(val._id)}
            className="bg-lightGrey-500 active:bg-lightBlue-600 uppercase 
            text-white font-bold hover:shadow-md shadow text-xs px-3 py-1 
            rounded outline-none focus:outline-none sm:mr-1 mb-1  transition-all duration-150"
            type="button"
            class="fas fa-trash"
          >
            
          </button>
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
