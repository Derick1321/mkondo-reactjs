import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppHeader from '$components/common/AppHeader';
import GenreSelector from '$components/common/GenreSelector';

import { routePaths } from '$common/routeConfig';
import { updateGenre } from '$redux/features/user';

import styles from './index.module.scss';

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
      <GenreSelector
        handleNext={handleNext}
        handleSelect={handleSelect}
        selected={selected}
        subtitle="consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
      />
    </div>
  );
}

export default OnBoarding;
