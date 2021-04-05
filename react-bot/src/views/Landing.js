import React from "react";
import { Link } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://miro.medium.com/max/875/1*pWl0WMscWcqNfGmfAD6VuQ.jpeg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                  How do you feel today? start diagnosis ...
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                  Follow the instructions to complete 
                  the first phase of the diagnosis
                  by placing your finger on the red light sensor also hold the other sensor with the other hand.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <i class="fas fa-temperature-high"></i>                    </div>
                    <h6 className="text-xl font-semibold">Measure your Temperature</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      tempeature sensor that provides an accurate measurement
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                    <i class="fas fa-heart"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Measure your CardioRate</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    The heart rate sensor measures your heart rate in Beats per Minute using an optical LED light source and an LED light sensor. The light shines through your skin, and the sensor
                     measures the amount of light that reflects back. The light reflections will vary as blood pulses under your skin past the light. 
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <i class="fas fa-lungs"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Measure your Oxygen Level</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      The Oxygen Sensor is an electronic device that measures the proportion of oxygen (O2) in the blood
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i class="fas fa-head-side-mask"></i>                </div>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  After First phase Diagnosis
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Continue the diagnosis by answering the questions of our chatbot MARVIN

                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  In the end of the whole diagnosis phase, and according to your state , a medical intervention or a quarantine 
                  will be assigned.
                </p>
                
                
                             
                <Link to="/chatbot" className="font-bold text-blueGray-700 mt-8" class="fas fa-user-md-chat">
                  Start Second diagnosis phase
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                  <img
                    alt="..."
                    src="https://thehealthcaretechnologyreport.com/wp-content/uploads/2019/10/healthcare-AI.jpg"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-lightBlue-500 fill-current"
                      ></polygon>
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                       Diagnosis Results
                    </h4>
                    <br></br>
                    <p className="text-md font-light mt-2 text-white">
                    <strong>Heart measurement : 75</strong>  
                    <br></br>
                    <br></br>
                    <strong>Temperature degree : 38.5°</strong> 
                    <br></br>
                    <br></br>
                    <strong>Oxygen Level : 92%</strong> 
                    <br></br>
                    <br></br>
                    <br></br>
                    <button
                        className="bg-lightGrey-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Confirm Results
                      </button>
                      <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Reset
                      </button>
                      
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

      

       
        
      </main>
      <Footer />
    </>
  );
}
