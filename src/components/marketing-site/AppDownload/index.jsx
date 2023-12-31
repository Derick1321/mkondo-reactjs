import React from 'react';

import styles from './index.module.scss';

const phone = require('$assets/images/phone.png');
const appstore = require('$assets/images/appstore.svg');
const playstore = require('$assets/images/playstore.svg');

const AppDownload = () => {
  return (
    <div className="row">
      <div className="d-none d-md-block col-12 col-md-3">
        <img
          src={phone}
          className={styles.phoneMkImage}
          alt=""
        /> 
      </div>
      <div className="col-12 col-md-9">
        <div className={styles.innerWrapper}>
          <p className={`${styles.appDownloadHeader}`}>Watch and Listen Anywhere at All Times</p>
          <p>Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p>
          <div className="d-flex">
            <a href="" target="_blank" rel="noopener noreferrer">
              <img
                src={appstore}
                className={styles.storeIcon}
                alt=""
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=co.mkondo.mkondo.mkondo_app_new" target="_blank" rel="noopener noreferrer">
              <img
                src={playstore}
                className={styles.storeIcon}
                alt=""
              />
            </a>
          </div>
        </div>
        <div />
      </div>
    </div>
  )
}

export default AppDownload;
