import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import RouteWithSubRoutes from '$components/common/RouteWithSubRoutes';
import ModalRoot from '$components/common/modals/ModalRoot';
import Monitor from '$components/utility/Monitor';
import Player from '$components/utility/Player';

import { setInitialNav, toggleIsMobile } from '$redux/features/nav';

import { routes } from '$common/routeConfig';

const App = () => {
  // store
  const initialRoute = useSelector((store) => store.nav.initialRoute);
  const isMobile = useSelector((store) => store.nav.isMobile);
  const dispatch = useDispatch();

  // handler
  const preventDefault = (evt) => {
    evt.preventDefault();
  }

  const getWindowDimensions = () => {
    const {
      innerWidth: width,
      innerHeight: height
    } = window;

    return {
      width,
      height
    };
  }

  const handleResize = () => {
    const { width } = getWindowDimensions();
    if (width <= 576) {
      dispatch(toggleIsMobile(true));
      return;
    }

    dispatch(toggleIsMobile(false));
  }

  // effects
  useEffect(() => {
    window.addEventListener("dragover", preventDefault, false);
    window.addEventListener("drop", preventDefault, false);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('dragover', preventDefault);
      window.removeEventListener('drop', preventDefault);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

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
      <Player />
    </Router>
  );
};

export default App;
