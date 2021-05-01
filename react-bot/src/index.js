import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Contact from "views/Contact.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Forum from "views/Forum";
import VirtualConsultation from "views/VirtualConsultation";
import KommunicateChat from "chat.js";
import pieChart from "pieChart.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/contact" exact component={Contact} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/forum" exact component={Forum} />
      <Route path="/pieChart" exact component={pieChart} />
      <Route path="/VC" exact component={VirtualConsultation} />
    
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    
    </Switch>
    <div>
    <KommunicateChat/>
    </div>
   
    
  </BrowserRouter>,

  document.getElementById("root")
);
