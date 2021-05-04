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
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/diagnosis" exact component={Diagnosis} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/forum" exact component={Forum} />
      <Route path="/UserProfile" exact component={UserProfile} />
      <Route path="/DossierMedical" exact component={DossierMedical} />
      <Route path="/ListeDossierMedical" exact component={ListeDossierMedical} />
      <Route path="/VC" exact component={VirtualConsultation} />
    
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    
    </Switch>
  
  </BrowserRouter>,

  document.getElementById("root")
);
