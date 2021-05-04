import React, { useState } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { Link } from "react-router-dom";
import back from "./../assets/img/online.jpg";


export default function Profile({ color }) {

  const [Event, setEvent] = useState(true);


  var gapi = window.gapi
  var CLIENT_ID = "159401783293-3tejc8v8a4ugfefvnrs45dm9ircpr6q5.apps.googleusercontent.com"
  var API_KEY = "AIzaSyBzEqWS3zLUksGw98gdVa7s4GDMOBoXm60"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"


  const test = () => {
    if (Event.length > 0) {
      for (var i = 0; i < Event.length; i++) {
        var event = Event[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        } console.log((event.summary + ' (' + when + ')'))

        return (
              <div>   {event.summary + ' (' + when + ')'}        </div>

        ) 
      }
    } else {
      return (
        <div> No events </div>
      )
    }

  }

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })



      gapi.auth2.getAuthInstance().signIn()
        .then(() => {


          var event = {
            'summary': 'Awesome Event!',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'Really great refreshments',
            'start': {
              'dateTime': '2021-04-28T09:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'end': {
              'dateTime': '2021-04-28T17:00:00-07:00',
              'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              { 'email': 'lpage@example.com' },
              { 'email': 'sbrin@example.com' }
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 }
              ]
            }
          }

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })

          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })



          // get events


          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            setEvent(response.result.items)


          })

          gapi.client.load('calendar', 'v3')

        })
    })
  }
  



  return (
    <>

      <Navbar transparent />
      <main className="profile-page">

        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url(" + back + ")",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
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
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("assets/img/doctor.png").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        <Link
                          to="/landing"
                          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                        >
                          <i class="fas fa-sign-in-alt" ></i> Start diagnosis
                                        </Link>

                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          
                                      </span>
                        <span className="text-sm text-blueGray-400">
                        
                                      </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                         
                                      </span>
                        <span className="text-sm text-blueGray-400">
                      
                                      </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          
                                      </span>
                        <span className="text-sm text-blueGray-400">
                          
                                      </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Dr.Fethi Nouira
                                </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                                  Sousse, Tunis
                                </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                  Doctor
                                </div>

                  <div>
                    <br></br>
                   
                    <button onClick={handleClick}
                      className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                     
                      <i className="fas fa-calendar-check"></i> Add appointment

                                    </button>
                                      
                    <button 
                      className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      <i className="fas fa-plus-square"></i>  <a href = "/DossierMedical" >Add Medical File</a>

                                    </button>
                  </div>
                  
                  <div>
                    <br></br>
                    <button 
                      className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      <i className="fas fa-plus-square"></i>  <a href = "/ListeDossierMedical" >List Dossier Medicale</a>

                                    </button>
                 
                  </div>
                </div>

                <br></br>
                <br></br>
                

                <div
                  className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
                  }
                >


                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">

                        <h3
                          className={
                            "font-semibold text-lg " +
                            (color === "light" ? "text-blueGray-700" : "text-white")
                          }
                        >
 UPCOMING EVENTS
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="block w-full overflow-x-auto">

                    <table className="items-center w-full bg-transparent border-collapse">

                      <thead>
                       
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
 
                          {test() }

                              </th>
                         
                      
                      </thead>

                      <tbody>
                        
<th>
                      
                      </th>
                   
                      </tbody>
                    </table>

                  </div>
                </div>







                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
              
                                    </p>
                      <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more details
                                    </a>
                    </div>
                  </div>
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


Profile.defaultProps = {
  color: "blue",
};



