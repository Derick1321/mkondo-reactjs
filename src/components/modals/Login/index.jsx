import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';
import Alert from '$components/authentication/Alert';
import GoogleLoginComponent from '$components/modals/GoogleLoginComponent';
import FacebookLoginComponent from '$components/modals/FacebookLoginComponent';

import { showModal, hideModal } from '$redux/features/modal';
import { login } from '$redux/features/authentication';

import { routePaths } from '$common/routeConfig';

import './index.scss';

const background = require('$assets/images/login_bg.png');
const login_mobile_top = require('$assets/images/login_mobile_top.png');
const login_mobile_bottom = require('$assets/images/login_mobile_bottom.png');
const logo = require('$assets/images/logo.png');
const arrow_left = require('$assets/images/icons/arrow-left-home.svg');

const LoginBackBottom = styled.div`
  @media screen and (max-width: 576px) {
    width: 100%;
    height: 0;
    padding-top: 21%;
    background-size: cover;
    background-position: left;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: url(${login_mobile_bottom});
  }
`;

const LoginBack = styled.div`
  width: 100%;
  height: 0;
  background-size: cover;
  background-position: left;
  position: absolute;
  background-color: transparent;
  top: 0;
  left: 0;
  z-index: 1;

  @media screen and (max-width: 576px) {
    background-image: url(${login_mobile_top});
    padding-top: 39%
  }
  @media screen and (min-width: 576px) {
    background-image: url(${background});
    padding-top: 23%;
  }
`;

const initialValues = {
  email: '',
  password: '',
};

const LoginModal = () => {
  // state
  const [values, setValues] = useState(initialValues);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const loginPending = useSelector((store) => store.authentication.loginPending);
  const error = useSelector((store) => store.authentication.loginError);
  const token = useSelector((store) => store.authentication.token);

  // effects
  useEffect(() => {
    if (token) {
      history.push(routePaths.home);
      return;
    }

    history.push(routePaths.marketing);
  }, [token]);

  // handlers
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleForgotPassword = () => { dispatch(showModal('FORGOT_PASSWORD_MODAL')); };

  const handleSignUp = () => { dispatch(showModal('SIGNUP_MODAL')); };

  const handleSignIn = () => {
    const { email, password } = values;
    dispatch(login({
      login_strategy: 'local',
      username: email,
      password,
      tokenId: null
    }));
  };

  // render
  return (
    <div>

      <LoginBack />
      <LoginBackBottom />
      <button className="goHome" onClick={() => dispatch(hideModal())}>
        <img src={arrow_left} style={{ width: '12px' }} /> Home</button>
      <div className="foreContent row justify-content-center h-100">

        <div className="col-md-6 col-sm-6 c-text-center position-relative">
          <img src={logo} alt="" className="login_logo_icon" />
        </div>
        <div className="col-md-6 col-sm-6 z3">
          <div className="row justify-content-center login-modal-top">
            <div className="col-10 col-sm-10 col-md-10 mt-4">
              <div className="f25 mb-4">Login</div>
              {
                error && (
                  <Alert
                    content={error}
                    type="error"
                  />
                )
              }
              <label class="label">Email</label>
              <TextInput
                name="email"
                placeholder="Email Address / User Name"
                value={values.email}
                onChange={handleChange}
              />
              <label class="label">Password</label>
              <TextInput
                name="password"
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              <div className="d-flex my-2 mt-4">
                <button
                  onClick={handleSignIn}
                  isLoading={loginPending}
                  className="btn-login"
                >
                  {loginPending ? <span className="spinner-border w20"></span> : <span>LOGIN</span>}
                </button>
                <button
                  onClick={handleSignUp}
                  className="btn-register"
                >
                  REGISTER
                </button>
                <button
                  className="btn-forget"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <div className="mt-4">
                <GoogleLoginComponent />
              </div>
              <div className="mt-4">
                <FacebookLoginComponent />
              </div>
              <div className="d-flex justify-content-center my-2">

              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-center mt-5 mb-3 display-none">
          Copyright ©2021 Mkondo. All Rights Reserved
        </div>
      </div>

    </div>
  );
}

export default LoginModal;
