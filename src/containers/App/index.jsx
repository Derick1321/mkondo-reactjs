import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Marketing from '../Marketing';
import Home from '../Home';
import OnBoarding from '../OnBoarding';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app/on-boarding">
          <OnBoarding />
        </Route>
        <Route path="/app">
          <Home />
        </Route>
        <Route path="/">
          <Marketing />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
