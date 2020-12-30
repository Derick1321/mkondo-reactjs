import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppHeader from '$components/common/AppHeader';
import Button from '$components/common/Button';

import { routePaths } from '$common/routeConfig';
import { updateGenre } from '$redux/features/user';

import menus from './menus';
import styles from './index.module.scss';

const happyFace = require('$assets/images/home/happy-face.svg');

const OnBoarding = () => {
  // state
  const [selected, setSelected] = useState([]);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const updateGenreComplete = useSelector((store) => store.user.updateGenreComplete);

  // effects
  useEffect(() => {
    if (updateGenreComplete) {
      history.replace(routePaths.home);
    }
  }, [updateGenreComplete]);

  // handlers
  const handleSelect = (name) => {
    if (selected.indexOf(name) > -1) {
      selected.splice(selected.indexOf(name), 1);
      setSelected([...selected]);
      return;
    }
    setSelected([...selected, name]);
  }

  const handleNext = () => {
    // dispatch(updateGenre());
    // TEMPO
    history.replace(routePaths.home);
  }

  // render
  return (
    <div className={styles.onboardingWrapper}>
      <div className="d-flex justify-content-end"> 
        <AppHeader
          showSearch={false}
        />
      </div>
      <div className="row justify-content-center">
        <div className={`col-10 col-sm-8 col-md-6 ${styles.onboardingContent}`}>
          <div className="d-flex justify-content-center align-items-center onboarding-header">
            <img
              src={happyFace}
              alt="Happy Face"
            />
            <div className={styles.onboardingHeaderWrapper}>
              <p className={styles.onboardingHeader}>We are Happy to have you here...</p>
              <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
            </div>
          </div>
          <div className={`d-flex flex-wrap justify-content-center ${styles.onboardingMenus}`}>
            {
              menus.map((menu) => {
                const isActive = selected.indexOf(menu.name) > -1 ? 'active' : '';
                const icon = isActive ? menu.iconActive : menu.icon;
                return (
                  <div
                    className={`d-flex flex-column justify-content-center align-items-center ${styles.onboardingMenu} ${isActive}`}
                    key={`onboarding-${menu.name}`}
                    onClick={() => handleSelect(menu.name)}
                  >
                    <div className={`d-flex justify-content-center align-items-center ${styles.onboardingMenuImage}`}>
                        <img src={icon} />
                    </div>
                    <span>{menu.title}</span>
                  </div>
                )
              })
            }
          </div>
          <div className="d-flex justify-content-center my-4">
            <Button onClick={handleNext} icon="next">Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnBoarding;
