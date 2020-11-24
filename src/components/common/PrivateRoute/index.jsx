import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const accessToken = useSelector((store) => store.authentication.accessToken);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/", // goes to marketing site!; should display message?
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
