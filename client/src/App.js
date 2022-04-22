import React from "react";

import Login from "./views/login";
import Admin from "./views/admin";
import Teacher from "./views/teacher"
import Student from "./views/student"

import { Router, Route } from "wouter";

function App() {
  return (
    <Router>
      <Route path="/Admin/:id">{(params) => <Admin id={params.id} />}</Route>
      <Route path="/teacher/:id">{(params) => <Teacher id={params.id} />}</Route>
      <Route path="/student/:id">{(params) => <Student id={params.id} />}</Route>
      <Route path="/">
        <Login />
      </Route>
    </Router>
  );
}

export default App;
