import React, { useState }  from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
  
 
  const [email, setEmail] = useState();
  


  const history = useHistory();

  const submit = async (e) => {
      e.preventDefault();
      try {
      const forgotPswd = {
        
          email,
         
      };
      await Axios.post(
          "http://localhost:3001/user/forgotpassword",
          forgotPswd
      );
     
      alert("email sent!, check you inbox please");
      history.push("/user/forgotpassword");
      window.location.reload();
  } catch (err) {
     console.log("error");
  }
  };


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
           
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                  <strong> Forgot Password </strong>
                </div>
                <form  onSubmit = {submit}>
                

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>



                
                  <div className="text-right mt-3">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Validate
                    </button>
                    </div>
                    <div className="text-left mt-3">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="reset"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  
  
      </div>
    </>
  );
}