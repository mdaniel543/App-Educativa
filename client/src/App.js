import React, { useState } from "react";

import Login from "./views/login";
import Admin from "./views/admin";

import { Router, Route } from "wouter";

function App() {
  return (
    <Router>
      <Route path="/Admin/:id">{(params) => <Admin id={params.id} />}</Route>
      <Route path="/">
        <Login />
      </Route>
    </Router>
  );
}

export default App;
