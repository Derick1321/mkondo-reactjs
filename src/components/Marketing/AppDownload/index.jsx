import React from 'react';

import './index.scss';

const phone = require('../../../assets/images/phone.png');
const appstore = require('../../../assets/images/appstore.svg');
const playstore = require('../../../assets/images/playstore.svg');

const AppDownload = () => {
  return (
    <div className="container d-flex app-download-wrapper">
      <div className="">
        <img
          src={phone}
          className="phone-mk-image"
          alt=""
        /> 
      </div>
      <div className="">
        <p className="panel-header">Never stop listening</p>
        <p>Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p>
        <div className="d-flex">
          <img
            src={appstore}
            className="store-icon"
            alt=""
          />
          <img
            src={playstore}
            className="store-icon"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default AppDownload;
