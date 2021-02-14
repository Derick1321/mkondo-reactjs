import React, { useState, useEffect } from 'react';
import Picker from 'react-simple-wheel-picker';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '$components/common/Button';
import Header from '$components/common/Header';
import Hero from '$components/common/Hero';
import Tabs from '$components/common/Tabs';
import Preview from '$components/common/Preview';
import TopSongs from '$components/common/TopSongs';
import HowItWorks from '$components/marketing-site/HowItWorks';
import AppDownload from '$components/marketing-site/AppDownload';
import AlbumMenuPanel from '$components/common/AlbumMenuPanel';

import { routePaths } from '$common/routeConfig';

import { setInitialNav } from '$redux/features/nav';
import { showModal } from '$redux/features/modal';
import { coldstart, reloadUser } from '$redux/features/authentication';
import { getHistory } from '$redux/features/user';

import { urls, data } from './model';

import styles from './index.module.scss';

const Marketing = () => {
  // state
  const [selected, setSelected] = useState('audio');

  // store
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector((store) => store.authentication.token);
  const signUpComplete = useSelector((store) => store.authentication.signUpComplete);
  const initialRoute = useSelector((store) => store.nav.initialRoute);
  const userId = useSelector((store) => store.authentication.user.user_id);

  // effects
  useEffect(() => {
    const { state } = location;
    if (state && state.token) {
      dispatch(setInitialNav(routePaths.home));
      dispatch(showModal('RESET_PASSWORD_MODAL', {
        token: state.token,
      }));
      return;
    }

    dispatch(coldstart());
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (!signUpComplete) {
      dispatch(reloadUser(userId));
      dispatch(getHistory());
      history.replace((initialRoute !== routePaths.marketing && initialRoute) || routePaths.home);
    }
  }, [token]);

  // handlers
  const handleSelect = (name) => {
    setSelected(name);
  }

  const handleFindMore = () => {
    console.log('find more!!');
  }

  const getCurrentYear = () => {
    const d = new Date();
    return d.getFullYear();
  }

  const handleChange = (value) => {
  }

  const handleExploreSongs = () => {
    console.log('VALUE');
  }

  // render
  return (
    <div className={`container-fluid h-100 ${styles.wrapper}`}>
      <div className="row w-100">
        <div className="col-12 col-sm-8 offset-sm-2">
          <Header />
          <Hero source={selected} />
          <div className="mt-4">
            <Tabs
              onSelect={handleSelect}
              selected={selected}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className={`row ${styles.tabContentWrapper}`}>
            {
              urls[selected].map((item, idx) => (
                <Preview
                  key={`${selected}-${idx}`}
                  {...item}
                />
              ))
            }
          </div>
        </div>
      </div>
      <div className={`row ${styles.topSongsPane}`}>
        <div className="col-12 col-md-10 offset-md-1">
          <p className={`mb-4 text-center ${styles.howItWorksTitle}`}>Top Free Songs of the Week</p>
          <TopSongs />
          <div className="text-center">
            <Button
              onClick={handleExploreSongs}
              style="px-4"
            >
              Explore Top Songs
            </Button>
          </div>
        </div>
      </div>
      <div className={`row ${styles.hotItWorksPane}`}>
        <div className="col-12 col-md-10 offset-md-1">
          <HowItWorks />
        </div>
      </div>
      <div className={`row justify-content-center align-items-center ${styles.appDownloadWrapper}`}>
        <div className="col-12">
          <div className={styles.appDownloadFooter} />
          <div className={styles.appDownloadContent1}>
            <div className={`col-12 col-sm-8 col-md-6 offset-sm-2 offset-md-3 ${styles.downloadWrapper}`}>
              <AppDownload />
            </div>
          </div>
        </div>
      </div>
      <div className={`row ${styles.neverStopPanel}`}>
        <div className="col-12 col-sm-8 col-md-6 offset-sm-2 offset-md-3">
          <p className={`text-white ${styles.panelHeader}`}>Never stop listening</p>
          <p className="text-white">Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p>
          <Button
            onClick={handleFindMore}
            isBorderSecondary
            isTransparent
            isSquare
          >
            FIND OUT MORE
          </Button>
        </div>
      </div>
      <div className={`row justify-content-center text-center ${styles.thanksPanel}`}>
        <div className="col-12 col-sm-8 col-md-6">
          <p className={`${styles.panelHeader} ${styles.panelHeaderDark}`}>Thanks for listening</p>
          <p>Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p>
          <div className="d-flex justify-content-center">
            <Button
              onClick={handleFindMore}
              isBorderPrimary
              isTransparent
            >
              FIND OUT MORE
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className={`col-12 d-flex align-items-center justify-content-center ${styles.marketingFooter}`}>
          <p>Copyright &copy;{getCurrentYear()} Mkondo. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
