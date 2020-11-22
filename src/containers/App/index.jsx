import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Marketing from '$containers/Marketing';
import Home from '$containers/Home';
import OnBoarding from '$containers/OnBoarding';
import ModalRoot from '$components/common/modals/ModalRoot';

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
      <ModalRoot />
    </Router>
  )
};

export default App;
