import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Share from '$components/common/Share';
import { routePaths } from '$common/routeConfig';

import './index.scss';

const checkmark = require('$assets/images/checkmark.svg');

const SuccessPage = () => {
  // store
  const location = useLocation();
  const history = useHistory();

  // effects
  useEffect(() => {
    if (!location.state) {
      history.replace(routePaths.home);
      return;
    }
  }, [location]);

  if (!location.state) { // ensure the app doesn't crash on no state
    return null;
  }

  const { message, name, country, userId } = location.state;

  // render
  return (
    <div className="d-flex flex-column success-wrapper">
      <div className="d-flex align-items-center justify-content-center success-message-wrapper my-4">
        <img src={checkmark} alt="" />
        <span className="success-message mx-2">{message}</span>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8">
          <div className="success-dialog-wrapper">
            <Share
              name={name}
              country={country}
              userId={userId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
