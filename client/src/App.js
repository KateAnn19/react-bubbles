import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from './components/BubblePage';

function App() {
  return (
    <Router>
      <div className="App">
        <li>
          <Link to='/'>Login</Link>
        </li>
        <li>
          <Link to='/protected'>Protected Page</Link>
        </li>
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path='/protected' component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
