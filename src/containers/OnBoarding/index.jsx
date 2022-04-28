import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppHeader from '$components/common/AppHeader';
import GenreSelector from '$components/common/GenreSelector';

import { routePaths } from '$common/routeConfig';
import { updateUser } from '$redux/features/user';

import styles from './index.module.scss';
import GeneralSelector from '../../components/common/Selector';
import InputField from '../../components/forms/InputField';
import Button from '../../components/common/Button';
import { updateSystemUser } from '../../redux/features/user';
import { refreshToken } from '../../redux/features/authentication';
import store from '../../redux/store';

const OnBoarding = () => {
  // state
  const [selected, setSelected] = useState([]);
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const updateUserComplete = useSelector((store) => store.user.updateUserComplete);
  const updateUserError = useSelector((state) => state.user.updateUserError);
  const user = useSelector((store) => store.authentication.user);

  // effects
  useEffect(() => {
    if (updateUserComplete) {
      dispatch(updateSystemUser());
    }
  }, [updateUserComplete]);

  useEffect(() => {
    if (user.user_type && user.email && user.phone_number) {
      history.push(routePaths.home);
    }
  }, [user]);

  useEffect(() => {
    if (!updateUserError) return;

    try {
      error = JSON.parse(updateUserError.message)
      if (error && error.message) {
        setErrorMessage(error.message)
      }
    } catch (e) {
      setErrorMessage('Sorry, Something went wrong during saving!')
    }
  }, [updateUserError])

  // handlers
  const handleSelect = (name) => {
    if (selected.indexOf(name) > -1) {
      selected.splice(selected.indexOf(name), 1);
      setSelected([...selected]);
      return;
    }
    setSelected([...selected, name]);
  }

  const handleSelectUserType = (name) => {
    setSelected([name]);
  }

  const handleChange = (key, value) => {
    if (key == "phone") {
      setPhone(value);
    }
    
  }

  const handleNext = async () => {
    const payload = {
      ...user,
      genres: selected,
    };

    await dispatch(updateUser({
      id: user.user_id,
      payload,
    }));
  }

  const handleNextUserType = async () => {
    const payload = {
      ...user,
      user_type: selected[0],
    };

    await dispatch(updateUser({
      id: user.user_id,
      payload,
    }));

    await dispatch(refreshToken(user.user_id));
  }

  const handleUpdatePhone = async () => {
    const payload = {
      ...user,
      phone_number: phone,
    };

    await dispatch(updateUser({
      id: user.user_id,
      payload,
    }));
  }

  if (!user.user_type || !user.user_type == 'visitor') {
    return (
      <div className={styles.onboardingWrapper}>
        <AppHeader showSearch={false} />
        <GeneralSelector
          handleNext={handleNextUserType}
          handleSelect={handleSelectUserType}
          selected={selected}
          subtitle="Select account type"
        />
      </div>
    )
  }

  if (!user.phone_number) {
    return (
      <div className={styles.onboardingWrapper}>
          <div className="d-flex justify-content-end"> 
            <AppHeader
              showSearch={false}
            />
          </div>
          
          
          <div className='mt-2 mx-4'>
            {errorMessage && <div className={`alert alert-danger ${styles.error}`}>{errorMessage}</div>}
            <h4 className='text-light'>Update Number</h4>
            <InputField 
              field={{ 
                  type: "text",
                  name: "phone",
                  placeholder: "Phone Number",
                  value: phone,
              }} onChange={handleChange} isGrey={false} />
              <Button onClick={handleUpdatePhone}>Save</Button>
          </div>
      </div>
    )
  }

  
  // render
  if (!user.genres) {
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
  

  return (
    <div className={styles.onboardingWrapper}>
        <div className="d-flex justify-content-end"> 
          <AppHeader
            showSearch={false}
          />
        </div>
        
        <div className='mt-5 pt-5 container'>
          <h4>Onboarding</h4>
          
        </div>
    </div>
  )
}

export default OnBoarding;
