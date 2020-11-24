import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '$components/common/Button';

import { showModal } from '$redux/features/modal';

import './index.scss';

const alertIcon = require('$assets/images/alert-icon.svg');

const AlertModal = () => {
  //store
  const dispatch = useDispatch();
 
  // handlers
  const handleLogin = () => {
    dispatch(showModal('LOGIN_MODAL'));
  };

  const handleSignUp = () => {
    dispatch(showModal('SIGNUP_MODAL'));
  };

  // render
  return (
    <div className="d-flex">
      <img
        className="alert-icon"
        src={alertIcon}
        alt=""
      />
      <div className="d-flex flex-column">
        <p className="heading-1 mt-2">OOps</p>
        <p className="mt-2">To access premium contents you must first.</p>
        <Button onClick={handleLogin}>Login</Button>
        <p className="mt-2">
          <span>Don&apos;t have an account?</span>
          <Button
            style="alert-sign-mk"
            onClick={handleSignUp}
            isTransparent
          >
            Sign Up
          </Button>
        </p>
      </div>
    </div>
  );
}

export default AlertModal;
