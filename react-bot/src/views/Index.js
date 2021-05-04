/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import medical from "./../assets/img/medical.jpg";
import doctor from "./../assets/img/doctor.jpg";
export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">




        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url(" + medical + ")",
          }}
        />
        <div className="header relative pt-16 items-center flex h-screen max-h-860-px">
          <div className="container mx-auto items-center flex flex-wrap">
            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
              <div className="pt-32 sm:pt-0">
                <h1 className="text-white font-semibold text-5xl">
                  Increasing Access.
Lowering Costs. Improving Health.                  </h1>
                <p className="mt-4 text-lg text-Black-200">
                  <strong>
                    Using the sensors provided with the application,
                    we can detect
 the patient health situation.<br />
 Marvin-Bot will ask you several questions according to your medical state.
 </strong>  </p>
                <div className="mt-12">
                  <a
                    href="http://localhost:3000/diagnosis"
                    target="_blank"
                    className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    Speak to Marvin
                </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
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
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="..."
                  src={require("assets/img/aibot.jpg").default}
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
                    Prevent Covid-19!
                  </h4>
                  <p className="text-md font-light mt-2 text-white">

                    Marvin is here when you need it. For everyday care , you can count on it to keep you and your loved ones safe and healthy.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-stethoscope"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Diagnoses
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        After finishing collecting data, Marvin provides diagnoses and offers you various solutions and actionable steps to take.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-hospital"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Locations and Directions
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Find the nearest hospital or laboratory to go when in need.
                        We know the COVID-19 pandemic weighs heavy on your minds right now. You may wonder if it’s safe to come in to get care? We give you the safest places in healthcare today.

                        You should feel confident we're keeping your family — and our caregivers — safe.

                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-video"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Online Virtual Visits</h6>
                      <p className="mb-4 text-blueGray-500">

                        Need to talk to a healthcare provider right away?
                      Marvin connects you online with specialists who can review your diagnosis and offer additional consultation, quickly and securely.                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-calendar-check"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Appointments
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        We now offer more ways than ever to schedule a follow-up appointment with your provider.


                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-stethoscope"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Diagnoses
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Based on the gathered data from the sensors as well as the information fed to its smart algorithm and the questions , Marvin interprets your symptoms and recommends you a diagnosis.

              </p>
              <div className="block pb-6">

              </div>


            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <img
                  alt="..."
                  src={require("assets/img/marvin.jpeg").default}
                  className="w-full align-middle rounded absolute shadow-lg max-w-200-px z-3 left-145-px -top-29-px"
                />

                <img
                  alt="..."
                  src={require("assets/img/original.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-250-px -top-225-px left-55-px z-2"
                />
                <img
                  alt="..."
                  src={require("assets/img/coronavirus.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/chatbot.png").default}
                  className="w-full align-middle rounded absolute shadow-lg max-w-200-px -left-25-px top-210-px"
                />
                <img

                  alt="..."
                  src={require("assets/img/virtual.jpg").default}
                  className="w-full align-middle rounded absolute shadow-xl max-w-210-px left-195-px top-95-px"
                />

              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center pt-32">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="justify-center flex flex-wrap relative">
                <div className="my-4 w-full lg:w-6/12 px-4">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-26 mx-auto p-2 bg-white"
                        src={require("assets/img/doctor.jpg").default}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Online virtual visits
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-26 mx-auto p-2 bg-white"
                        src={require("assets/img/appointments.jpg").default}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Appointments
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >

                  </a>
                </div>
                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >

                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-26 mx-auto p-2 bg-white"
                        src={require("assets/img/hospital.png").default}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Find Hospital
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-26 mx-auto p-2 bg-white"
                        src={require("assets/img/steps.png").default}
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Quarantine case
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-file-medical-alt"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                If You Are Sick
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Take steps to care for yourself and help protect others in your home and community.
              <br />
                <strong>If you have an emergency warning sign (including trouble breathing), call 911.</strong>
              </p>



            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-32 pt-48">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className="text-3xl font-semibold">
                  Interactions
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Marvin’s Insight Engine collects user preferences to ensure a more personalized experience.
                  Dashboards draw on current data, providing immediate, real-time insights into users and their behaviors.
                </p>

              </div>
            </div>

            <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src={require("assets/img/dashboard.png").default}
              />
            </div>
          </div>
        </div>

        <div className="justify-center text-center flex flex-wrap mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">

          </div>
        </div>
      </section>





      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
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


      </section>
      <Footer />
    </>
  );
}
