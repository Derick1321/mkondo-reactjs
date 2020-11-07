import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Marketing from '../Marketing';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Marketing />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
