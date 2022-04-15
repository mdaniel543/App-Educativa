import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Login from './views/login'
import Admin from './views/admin'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
