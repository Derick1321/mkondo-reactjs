import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import RouteWithSubRoutes from '$components/common/RouteWithSubRoutes';
import ModalRoot from '$components/common/modals/ModalRoot';

import { routes } from '$common/routeConfig';

const App = () => {
  // handler
  const preventDefault = (evt) => {
    evt.preventDefault();
  }

  // effects
  useEffect(() => {
    window.addEventListener("dragover", preventDefault, false);
    window.addEventListener("drop", preventDefault, false);
  }, []);

  // render
  return (
    <Router>
      <Switch>
        {
          routes.map((route, i) => (
            <RouteWithSubRoutes
              key={`route-${i}`}
              {...route}
            />
          ))
        }
      </Switch>
      <ModalRoot />
    </Router>
  )
};

export default App;
