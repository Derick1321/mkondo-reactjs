import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import RouteWithSubRoutes from '$components/common/RouteWithSubRoutes';
import ModalRoot from '$components/common/modals/ModalRoot';
import Monitor from '$components/utility/Monitor';

import { setInitialNav } from '$redux/features/nav';

import { routes } from '$common/routeConfig';

const App = () => {
  const initialRoute = useSelector((store) => store.nav.initialRoute);

  const dispatch = useDispatch();

  // handler
  const preventDefault = (evt) => {
    evt.preventDefault();
  }

  // effects
  useEffect(() => {
    window.addEventListener("dragover", preventDefault, false);
    window.addEventListener("drop", preventDefault, false);
  }, []);

  // effects
  useEffect(() => {
    if (!initialRoute) {
      dispatch(setInitialNav(window.location.pathname));
    }
  }, [initialRoute]);

  // render
  if (!initialRoute) { // get the first url
    return null;
  }

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
      <Monitor />
    </Router>
  );
};

export default App;
