import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Diagnosis from "views/Landing.js";
import Contact from "views/Contact.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Forum from "views/Forum";
import VirtualConsultation from "views/VirtualConsultation";
import UserProfile from "views/UserProfile";
import DossierMedical from "views/DossierMedical";
import ListeDossierMedical from "views/ListeDossierMedical";
import jwt_decode from "jwt-decode";
var token = localStorage.token;
if (token) {
  var decoded = jwt_decode(token);
}
else var decoded = "";


ReactDOM.render(
  <BrowserRouter>
    <Switch>

{/*admin routes*/}
      {
        decoded.role === 'Admin' ?
          <>

            <Route path="/admin" component={Admin} />

          

            <Route path="/contact" exact component={Contact} />

            <Route path="/forum" exact component={Forum} />
            <Route path="/UserProfile" exact component={UserProfile} />
            <Route path="/DossierMedical" exact component={DossierMedical} />
            <Route path="/ListeDossierMedical" exact component={ListeDossierMedical} />
            <Route path="/VC" exact component={VirtualConsultation} />

            <Route path="/" exact component={Index} />
          </>
          :
          <Route path="/" exact component={Index} />
      }


{/*doctor routes*/}

      {
        decoded.role === 'Doctor' ?
          <>





            <Route path="/contact" exact component={Contact} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/forum" exact component={Forum} />
            <Route path="/DossierMedical" exact component={DossierMedical} />
            <Route path="/ListeDossierMedical" exact component={ListeDossierMedical} />
            <Route path="/VC" exact component={VirtualConsultation} />

            <Route path="/" exact component={Index} />
          </>
          :
          <Route path="/" exact component={Index} />
      }


{/*patient routes*/}
      {
        decoded.role === 'patient' ?
          <>





            <Route path="/contact" exact component={Contact} />
            <Route path="/forum" exact component={Forum} />
            <Route path="/diagnosis" exact component={Diagnosis} />
            <Route path="/VC" exact component={VirtualConsultation} />
            <Route path="/UserProfile" exact component={UserProfile} />

            <Route path="/" exact component={Index} />
          </>
          :
          <Route path="/" exact component={Index} />
      }




      <Route path="/auth" component={Auth} />




    </Switch>

  </BrowserRouter>,

  document.getElementById("root")
);