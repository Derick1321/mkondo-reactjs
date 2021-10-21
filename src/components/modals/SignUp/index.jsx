import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';
import InputField from '$components/forms/InputField';
import FacebookSignUpButton from '$components/modals/SignUp/FacebookSignUpButton/index'
import GoogleLoginComponent from '$components/modals/GoogleLoginComponent';
import FacebookLoginComponent from '$components/modals/FacebookLoginComponent';
import { showModal, hideModal } from '$redux/features/modal';
import { signup } from '$redux/features/authentication';

import { routePaths } from '$common/routeConfig';

import './index.scss';
import { COLOR_ACCENT, COLOR_PRIMARY } from '../../../common/constants';

const background = require('$assets/images/login_bg.png');
const login_mobile_top = require('$assets/images/login_mobile_top.png');
const login_mobile_bottom = require('$assets/images/login_mobile_bottom.png');
const logo = require('$assets/images/logo.png');

const user_icon = require('$assets/images/icons/register_user.svg');
const music_icon = require('$assets/images/icons/register_music.svg');
const manager_icon = require('$assets/images/icons/register_manager.svg');
const user_icon_white = require('$assets/images/icons/register_user_active.svg');
const music_icon_white = require('$assets/images/icons/register_music_active.svg');
const manager_icon_white = require('$assets/images/icons/register_manager_active.svg');
const arrow_left = require('$assets/images/icons/arrow-left-home.svg');


const RegisterTopShape = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 20%;
    border-radius: 0 0 90% 0;
    background: linear-gradient(${COLOR_PRIMARY}, ${COLOR_ACCENT});
`;

const GradientBackground = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(${COLOR_PRIMARY}, ${COLOR_ACCENT});
`;

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


const RegisterBack = styled.div`
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

// const options = [
//   { value: 'user', label: 'User' },
//   { value: 'creator', label: 'Artist' },
//   { value: 'admin', label: 'Manager' },
// ];

const initialValues = {
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: 'user',
};

const initalErrors = {
  full_name: null,
  phone_number: null,
  email: null,
  password: null,
}


const SignupModal = () => {
  // state
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const [errObj, setErrorObj] = useState({});
  const [currentPage, setFirstPage] = useState(true);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const signupError = useSelector((store) => store.authentication.signupError);
  const signUpComplete = useSelector((store) => store.authentication.signUpComplete);
  const signupPending = useSelector((store) => store.authentication.signupPending);

  useEffect(() => {
    // routePaths.onBoarding
    if (!signUpComplete) {
      return;
    }

    dispatch(hideModal()); // Should close on route change?
    history.replace(routePaths.onBoarding);
  }, [signUpComplete]);

  useEffect(() => {
    if (!signupError) return;

    //populate the errors
    console.log("sign up error triggered");
    console.log(signupError);
    setErrorObj(initalErrors);
    
    //display errors
    //error structure to purse addSeriesError is Null or {message: jsonString}
    //get the message and parse the jsonString and look for fields of interest
    const message = signupError.message;
    try {
        const json = JSON.parse(message)
        let _errors;
        if (json.message) {
            _errors = json.message;
        } else {
            _errors = json;
        }
        console.log("Errors converted to json: currentType:", _errors);
        if (typeof _errors == 'object') {
          console.log("Errors is object");
          const fields = ['full_name', 'email', 'phone_number', 'password'];
          const isInvalid = fields.some(key => {
            if (Object.keys(_errors).includes(key)) {
              setErrorObj({...errObj, [key]: _errors[key]});
              return true;
            }
          });
          console.log("Is invalid", isInvalid, _errors);
          if (!isInvalid) {
            setError(null)
            setErrorObj(initalErrors)
          } else {
            setError("Sorry! Signup Failed.")
          }
        }

        if (typeof _errors == 'string') {
          console.log("Errors is string");
          setError(_errors);
          setErrorObj(initalErrors);
        }
        //if there is no validation error go to the next page
    } catch (e) {
        console.log("json decoding error");
        console.error(e)
    }
  }, [signupError]);

  // handlers
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLogin = () => {
    dispatch(showModal('LOGIN_MODAL'));
  };

  const handleSignUp = () => {
    console.log("Handle signup called");

    dispatch(signup({
      full_name: values.fullName,
      phone_number: values.phoneNumber,
      email: values.email,
      password: values.password,
      user_type: values.userType, // user, creator, admin
      country: 'TZ',
    }));
  };

  const handlePage = (index) => {
    console.log('handle page called');
    setError(null);
    setErrorObj(initalErrors)

    if (index == 3 && (values.fullName == '' || values.email == '' || values.phoneNumber == '')) {
      setError(setErrorObj({
        ...error,
        full_name: values.fullName == '' ? 'Fullname cannot be empty' : null,
        email: values.email == '' ? 'Email cannot be empty' : null,
        phone_number: values.phoneNumber == '' ? 'Phone cannot be empty' : null, 
      }));
      return;
    }

    if (index == 4) {
      let isInvalid = false;
      if (!values.password) {
        isInvalid = true;
        setErrorObj({...errObj, password: 'Password cannot be empty'})
      }
      if (!values.confirmPassword) {
        isInvalid = true;
        setErrorObj({...errObj, password_confirm: 'Password confirm connot be empty'})
      }
      if (values.password != values.confirmPassword) {
        isInvalid = true;
        setErrorObj({...errObj, password_confirm: 'Passwords do not match'})
      }
      if (!isInvalid) {
        
        handleSignUp()
      }
      return;
    }

    if (index == 3) {
      console.log("dispatching handle signup method");
      handleSignUp();
      return;
    }

    
    setFirstPage(index);
  }

  // render
  return (
    <div className="row">
      <div className="col-lg-6 d-none d-md-block">
      <GradientBackground>
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <h1 className="display-3 text-light pt-20 w-75">Register with Mkondo</h1>
            <div className="w-75 my-4">
              <div className="py-1 bg-light w-50 rounded-pill"></div>
            </div>
            <p className="lead w-75 text-light">Africa's choice for premium content. Listen, Watch and Enjoy more with Mkondo.</p>
          </div>
        </GradientBackground>
      </div>
      <div className="col-lg-6">
      <div className="d-sm-none"><RegisterTopShape /></div>
      <div className="d-flex flex-column h-100 justify-content-center align-items-center">
          <div className="w-75">
          <img src={logo} className="d-block ml-auto mb-5" alt="Mkondo Logo" height="75" />
              <div className="f25 mb-4">Register</div>
              {
                (error)
                && (
                  <Alert
                    content={error || "Failed to sign up. Try again"}
                    type="error"
                  />
                )
              }

                <>
                  <InputField field={{ 
                        type: "text",
                        name: "fullName",
                        title: "Fullname",
                        placeholder: "Fullname",
                        value: values.fullName,
                    }} error={errObj.full_name} onChange={handleChange} isGrey={false} />

                  <InputField field={{ 
                        type: "text",
                        name: "email",
                        title: "Username",
                        placeholder: "Email/Phone",
                        value: values.email,
                    }} error={errObj.email} onChange={handleChange} isGrey={false} />

                  <InputField field={{ 
                        type: "text",
                        name: "phoneNumber",
                        title: "Phone",
                        placeholder: "Phone Number",
                        value: values.phoneNumber,
                    }} error={errObj.phone_number} onChange={handleChange} isGrey={false} />

                  <InputField field={{ 
                        type: "password",
                        name: "password",
                        title: "Password",
                        placeholder: "Password",
                        value: values.password,
                    }} error={errObj.password} onChange={handleChange} isGrey={false} />

                  
                  <div className="d-flex mt-2 mb-2 align-items-center">
                    <button className="btn btn-primary mr-2"  onClick={() => handlePage(3)}>Register {signupPending ? <small>validating...</small> : null }</button>
                    <button className="gotoLogin" onClick={() => handleLogin()}>Already have an account?</button>
                  </div>
                  <GoogleLoginComponent />
                  <div className="my-2"></div>
                  <FacebookSignUpButton />
                </>
            </div>
            </div>
      </div>
    </div>
  );
};

export default SignupModal;