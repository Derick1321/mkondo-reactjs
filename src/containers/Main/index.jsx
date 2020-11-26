import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppHeader from '$components/common/AppHeader';
import RouteWithSubRoutes from '$components/common/RouteWithSubRoutes';
import Player from '$components/common/Player';
import SideMenu from '$components/common/SideMenu';

import { routePaths } from '$common/routeConfig';
import { hideModal } from '$redux/features/modal';

import './index.scss';

const Main = (props) => {
  // props
  const {
    routes,
    location,
  } = props;

  // store
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === routePaths.main) {
      history.push(routePaths.home);
    }
  }, []);

  useEffect(() => {
    dispatch(hideModal());
    return () => {
      dispatch(hideModal()); // ensure the modal is hidden
    }
  }, [history]);

  // render
  return (
    <div className="d-flex vh-100">
      <div className="side-menu-wrapper">
        <SideMenu />
      </div>
      <div className="content">
        <AppHeader />
        <Switch>
          {
            routes.map((route, i) => (
              <RouteWithSubRoutes
                key={i}
                {...route}
              />
            ))
          }
        </Switch>
      </div>
      <div className="home-footer">
        <Player />
      </div>
    </div>
  );
}

export default Main;
