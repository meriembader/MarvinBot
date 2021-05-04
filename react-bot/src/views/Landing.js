import React from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import axios from 'axios';
import jwt_decode from "jwt-decode";


// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";



export default function Diagnosis() {

  var token = localStorage.token;
  var decoded = jwt_decode(token);


  console.log(decoded);

  setTimeout(function () {
    document.getElementById("WaitGif").style.display = "none";
    document.getElementById("result1").style.display = "none";
    document.getElementById("result2").style.display = "none";
  }, 100)

  var temp = 0;
  var heart = 0;
  var oxy = 0;
  var m = false;
  var s = false;
  var t = 1;
  var r = "";
  var inputs = "";
  var msg = [];
  var answers = [];
  var inp = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
  var readings = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];





  ////////////////////////send to model///////////////////  




  const addToModel = async () => {

    document.getElementById("WaitGif").style.display = "block";

    try {
      const resp = await axios.post("http://localhost:3001/diagnostique",
        {
          id_user: decoded.id,
          input: inputs,
          date: Date().toLocaleString()
        });


      r = resp.data.substr(84, 1);
      console.log(resp.data);
      console.log(r);
      Show_Result();
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }

  };



  ////////////////////////////////////


//////////////save chat///////////////////////////////

const SaveQuestions = async () => {

  

  try {
    const resp = await axios.post("http://localhost:3001/chat",
      {
        id_user: decoded.id,
        questions: msg,
        date: Date().toLocaleString()
      });

console.log("questions saved");
   
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }

};




////////////////////////////////////////////////////////
  //////////////////////Result////////////////



  function Show_Result() {

    if (r.length > 0) {





      document.getElementById("ResultTitle").innerHTML = "Diagnosis Result";
      document.getElementById("ResultFirstText").innerHTML = "Thank you for answering the questions of our chatbot MARVIN";

      if (r == "1") {
        document.getElementById("WaitGif").style.display = "none";
        document.getElementById("ResultText").innerHTML = "Your symptoms are not related to COVID-19.But you and people you live with should isolate at home until your symptoms improve.If your condition worsens,to prevent others from getting sick, wear a mask if contact with others is necessary.If your temperature goes up,or you feel more unwell, please stay at home and take a new diagnosis. ";

      }

      else if (r == "2") {
        document.getElementById("WaitGif").style.display = "none";
        document.getElementById("ResultText").innerHTML = "Your symptoms are related to COVID-19. You and people you live with should isolate at home until your symptoms improve.If your condition worsens,to prevent others from getting sick, wear a mask if contact with others is necessary.If your temperature goes up,or you feel more unwell, please stay at home and take a new diagnosis. ";
        document.getElementById("result1").style.display = "block";

      }
      else if (r == "3") {
        document.getElementById("WaitGif").style.display = "none";
        document.getElementById("ResultText").innerHTML = "Urgent medical attention may be needed, we will  direct you to a doctor to make an appointment as soon as possible. Stay indoors and avoid close contact with other people.";
        document.getElementById("result2").style.display = "block";
      }

    }



  }

  //////////////////////////////////////








  //////////////chat//////////////////

  function chatbot() {
    (function (d, m) {

      var kommunicateSettings = {
        "appId": "2cd393fcd95368ff194f58ccbb2b5ec7", "popupWidget": true, "automaticChatOpenOnNavigation": true,



        "onInit": function () {
          var events = {
            'onMessageReceived': function (resp) {
               msg.push(resp.message.message);
           
              if (resp.message.message == "thank you for answering") {
                SaveQuestions();
                localStorage.answers = answers;
                if (temp > 38) {
                  readings[0] = "1";
                }
                if (heart < 60) {
                  readings[1] = "1";
                }
                if (answers[0] == "yes") {
                  readings[2] = "1";
                }
                if (oxy < 60) {
                  readings[3] = "1";
                }
                if (answers[1] == "yes") {
                  readings[4] = "1";
                  readings[5] = "1";
                }
                if (answers[2] == "yes") {

                  readings[6] = "1";
                }
                if (answers[3] == "yes") {

                  readings[7] = "1";
                  readings[8] = "1";
                }
                if (answers[4] == "yes") {

                  readings[9] = "1";
                }
                if (answers[5] == "yes") {

                  readings[10] = "1";
                }


                for (var i = 0; (i < readings.length - 1); i++) {
                  inp[i] = readings[i];
                }
                inp[22] = readings[10];
                console.log(inp);
                inputs = inp[0];
                for (var i = 1; i < inp.length; i++) {
                  inputs = inputs + "," + inp[i];
                }

                console.log(inputs);
                addToModel();





              }
              // console.log(msg);
              //called when a new message is received
            },
            'onMessageSent': function (resp) {
             
              if (resp.message.message == "yes" || resp.message.message == "no") {
                answers.push(resp.message.message);
                console.log(answers);
              }


              // 

              //called when the message is sent
            }
          };

          window.Kommunicate.subscribeToEvents(events);


        }



      };
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }


  ///////////////////////////////////////////////////////////





  ////////sensors//////////////////////////
  /*
  const socket = io("http://localhost:3001", {
    query: {
      "id": "browser"
    }
  });
  /*socket.on("connect", () => {
    document.getElementById("Sstatus").innerHTML = "Connected"
    console.log(socket.id)

  });

  socket.on("status", (arg) => {
    document.getElementById("Dstatus").innerHTML = arg
  });
  socket.on("reply_heart_front", (arg) => {
    document.getElementById("textHeart").innerHTML = "Your Heart Rate is: " + arg.HeartRate + " BPM, Your SpO2 level is: " + arg.SpO2 + " %";
    document.getElementById("textHeart").style.display = "block";
    document.getElementById("temp").style.display = "block";
  });

  socket.on("reply_temp_front", (arg) => {
    document.getElementById("textTemp").innerHTML = "Your Body Temp is: " + arg.Temp + " °C";
    document.getElementById("textTemp").style.display = "block";
    document.getElementById("reset").style.display = "block";
  });

*/


  function start_measure() {




    document.getElementById("desc").style.display = "none";
    setTimeout(() => {
      temp = ((Math.floor(Math.random() * (37 - 35)) + 35) + (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(2)) / 10;

      document.getElementById("textTemp").innerHTML = "Your Body Temp is: " + temp + " °C";

      heart = ((Math.floor(Math.random() * (120 - 100)) + 100) + (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(2)) / 10;

      document.getElementById("textHeart").innerHTML = "Your Heart Rate is: " + heart + " BPM";



      oxy = ((Math.floor(Math.random() * (94 - 90)) + 90) + (Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(2)) / 10;

      document.getElementById("textOxy").innerHTML = "Your SpO2 level is: " + oxy + " %";

      chatbot();
      console.log(Date().toLocaleString());



    }, 3000);










  }

  function start_temp() {
    document.getElementById("InfoTemp").style.display = "block";
    //socket.emit("measureTemp", null);
  }

  function reset() {


    document.getElementById("textHeart").style.display = "none";
    document.getElementById("textTemp").style.display = "none";
    document.getElementById("textOxy").style.display = "none";


  }


  ///////////////////////////////////////////  








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


                <div>
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <i class="fas fa-head-side-mask"></i>                </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal" id="ResultTitle">
                    After First phase Diagnosis
                </h3>

                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600" id="ResultFirstText">
                    Continue the diagnosis by answering the questions of our chatbot MARVIN

                </p>
                  <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600" id="ResultText">
                    In the end of the whole diagnosis phase, and according to your state , a medical intervention or a quarantine
                    will be assigned.
                </p>
                  <img id="WaitGif" src="https://i.gifer.com/YCZH.gif" alt="alternatetext"></img>
                </div>


                <button className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button" id="result2" >
                  <Link to="/chatbot" className="font-bold text-blueGray-700 mt-8" class="fas fa-user-md-chat">
                    Schedule Appointement
                  </Link>
                </button>

                <button className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button" id="result1" >
                  <Link to="/chatbot" className="font-bold text-blueGray-700 mt-8" class="fas fa-user-md-chat">
                    View Hospitals
                  </Link>
                </button>

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
                    <h1 className="text-xl font-bold text-white">
                      Diagnosis
                    </h1>
                    <br></br>


                    <p className="text-md font-light mt-2 text-white">




                      <br></br>
                      <i class="fas fa-temperature-high"></i>
                      <div id="textHeart">  </div>

                      <br></br>
                      <i class="fas fa-lungs"></i>
                      <div id="textOxy"></div>

                      <br></br>

                      <i class="fas fa-heart"></i>
                      <div id="textTemp"></div>
                      <br></br>


                      <div id="desc">Please put your finger firmly on the device sensor and then click Start </div>
                      <br></br>




                      <script src="socket.js"></script>









                      <button
                        className="bg-lightGrey-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={start_measure}>
                        <i class="fas fa-play"></i>
                      </button>
                      <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        id="reset" onClick={reset}>
                        <i class="fas fa-retweet"></i>
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
