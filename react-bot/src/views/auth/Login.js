import  React, { useState, useContext, useEffect  } from 'react';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Recaptcha from 'react-recaptcha';
import axios from 'axios';
import jwt_decode from "jwt-decode";
export default function Login() {


let recaptchaVerif = false;

function recaptchaLoaded() {
	console.log("Recaptcha loaded successfully !");
}

function verifyCallback(response) {
	if (response) {
		recaptchaVerif = true;
	}
}
	let [username, setUsername] = useState();
    let [password, setPassword] = useState();
    let [checked, setChecked] = useState();



    const history = useHistory();

    useEffect(() => {
		const checkRememberMe = async () => {
			let usernameStorage = localStorage.getItem("username");
			let passwordStorage = localStorage.getItem("password");
			let checkboxStorage = localStorage.getItem("checkbox");

			if (usernameStorage !== "" && passwordStorage !== "" && checkboxStorage !== "") {
				setUsername(usernameStorage);
				setPassword(passwordStorage);
				setChecked(checkboxStorage);
			}

		}
		checkRememberMe();
	}, []);

	const submit = async (e) => {
        e.preventDefault();
        try {
        const loginUser = {
            username,
            password
        };
			
      			  const loginRes = await axios.post(
      		      "http://localhost:3001/user/login",
      		      loginUser
    		    );
           
        
 
           
          
          localStorage.token = loginRes.data.accessToken;
          
          history.push("/");
          window.location.reload();
    } catch (err) {
        console.log(" tayyy!")
    }
    };


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
             
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                  <strong>sign in </strong>
                </div>
                <form onSubmit = {submit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="username"onChange={(e) =>  setUsername(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"onChange={(e) =>  setPassword(e.target.value)}
                    />
                  </div>
                  <Recaptcha sitekey="6Led9rwaAAAAAEX7aTBnvOnAj05VPlunviWpBPtZ" 
						render = "explicit" onloadCallback={recaptchaLoaded}
						verifyCallback={verifyCallback}/>

                  <div>
                  
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox" checked={checked}
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" onChange={(e) => setChecked(e.target.checked)}
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember Me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <span className="noAcc">Don't have an account ?</span> <a href = "/auth/register" className = "authRef" style = {{color: 'blue'}}>Register</a>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">

              
              <div className="w-1/2">
                <a
                  href="/auth/forgotpassword" style = {{color: 'white'}}
                >
                  <small>Forgot password? </small>
                </a>
              </div>
              <div className="w-1/2 text-right">

              </div> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}