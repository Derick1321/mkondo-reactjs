import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';

import { showModal } from '$redux/features/modal';
import { signup } from '$redux/features/authentication';

const initialValues = {
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupModal = () => {
  // state
  const [values, setValues] = useState(initialValues);
  const [passwordError, setPasswordError] = useState(null);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const signupError = useSelector((store) => store.authentication.signupError);
  const userName = useSelector((store) => store.authentication.user.full_name);

  // effects
  useEffect(() => {
    // routePaths.onBoarding
    if (!userName) {
      return;
    }

    history.replace(routePaths.onBoarding);
  }, [userName]);

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
    if (values.password !== values.confirmPassword) {
      setPasswordError('Passwords don\'t match');
      return;
    }

    dispatch(signup({
      full_name: values.fullName,
      phone_number: values.phoneNumber,
      email: values.email,
      password: values.password,
      user_type: 'User',
      country: 'TZ',
    }));
  };

  // render
  return (
    <div className="row justify-content-center">
      {
        (passwordError || signupError)
        && (
          <Alert
            content={passwordError || "Failed to sign up. Try again"}
            type="error"
          />
        )
      }
      <div className="col-10 col-md-8">
        <div className="row justify-content-center login-modal-top">
          <InfoPane value="Sign Up to Mkondo Music" />
          <div className="col-12 col-sm-10 col-md-8 mt-4">
            <TextInput
              name="fullName"
              placeholder="Fullname"
              value={values.fullName}
              onChange={handleChange}
            />
            <TextInput
              name="email"
              placeholder="Email Address"
              type="email"
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              name="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <TextInput
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            <TextInput
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            <div className="d-flex justify-content-center my-2">
              <Button
                style="mk-btn-secondary"
                onClick={handleSignUp}
                isStretch
              >
                Sign Up
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-center my-4">
              <span>Have an account? </span>
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
};

export default SignupModal;