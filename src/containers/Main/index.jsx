import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RouteWithSubRoutes from '$components/common/RouteWithSubRoutes';
import { routePaths } from '$common/routeConfig';
import { hideModal } from '$redux/features/modal';

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
  );
}

export default Main;
