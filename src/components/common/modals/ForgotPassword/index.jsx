import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';

import { showModal } from '$redux/features/modal';
import { signup } from '$redux/features/authentication';

const ForgotPasswordModal = () => {
  // state
  const [email, setEmail] = useState('');

  // store
  const dispatch = useDispatch();

  // handlers
  const handleForgot = () => {
  };

  const handleLogin = () => {
    dispatch(showModal('LOGIN_MODAL'));
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    setEmail(value);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-10 col-md-8">
        <div className="row justify-content-center login-modal-top">
          <InfoPane value="Yo! Forget Your Password" />
          <div className="col-12 col-sm-10 col-md-8 mt-4">
            <p className="text-center">No worries! Enter Your email and we will send  you a request.</p>
            <TextInput
              name="email"
              placeholder="Your email"
              value={email}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-center my-2">
              <Button
                style="mk-btn-secondary"
                onClick={handleForgot}
                isStretch
              >
                Send Request
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-center my-4">
              <span>Back to </span>
              <Button
                style="mk-btn-secondary no-width"
                onClick={handleLogin}
                isTransparent
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
