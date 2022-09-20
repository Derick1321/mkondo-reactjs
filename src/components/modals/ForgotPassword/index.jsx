import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import TextInput from '$components/common/TextInput';
import InfoPane from '$components/authentication/Info';

import { showModal } from '$redux/features/modal';
import { forgotPassword } from '$redux/features/authentication';
import { verifyOTP, resetPassword } from '../../../redux/features/authentication';
import { useHistory } from 'react-router';
import { routePaths } from '../../../common/routeConfig';

const ForgotPasswordModal = () => {
  // route
  const history = useHistory();

  // state
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // store
  const dispatch = useDispatch();
  const reset_token = useSelector(state => state.authentication.resetToken);

  const forgotPasswordError = useSelector((store) => store.authentication.forgotPasswordError);
  const forgotPasswordComplete = useSelector((store) => store.authentication.forgotPasswordComplete);
  const forgotPasswordPending = useSelector((store) => store.authentication.forgotPasswordPending);
  
  const verifyOtpPending = useSelector(state => state.authentication.verifyOtpPending);
  const verifyOtpComplete = useSelector(state => state.authentication.verifyOtpComplete);
  const verifyOtpError = useSelector(state => state.authentication.verifyOtpError);

  const resetPasswordPending = useSelector(state => state.authentication.resetPasswordPending);
  const resetPasswordComplete = useSelector(state => state.authentication.resetPasswordComplete);
  const resetPasswordError = useSelector(state => state.authentication.resetPasswordError);

  // effects
  useEffect(() => {
    if (!forgotPasswordError) return;
    setErrorMessage("The entered email address doesn't exist. Please try again.");
    setTimeout(() => {
      setErrorMessage(null);
    }, 60000);
  }, [forgotPasswordError]);

  useEffect(() => {
    if (!verifyOtpError) return;
    // console.log("VERIFY OTP CLEANED: ", cleaned);
    try {
      let _json = JSON.parse(verifyOtpError.message);
      setErrorMessage(_json.message);
    } catch (error) {
      setErrorMessage("OTP Verification Failed");
    }
    
    setTimeout(() => {
      setErrorMessage(null);
    }, 60000);
  }, [verifyOtpError]);

  useEffect(() => {
    if (!resetPasswordError) return;
    // console.log("VERIFY OTP CLEANED: ", cleaned);
    try {
      let _json = JSON.parse(resetPasswordError.message);
      setErrorMessage(_json.message);
    } catch (error) {
      setErrorMessage("Reset Password Failed");
    }
    
    setTimeout(() => {
      setErrorMessage(null);
    }, 60000);
  }, [resetPasswordError]);

  useEffect(() => {
    if (!forgotPasswordComplete) return;
    setSuccessMessage("The otp has been sent to your email.");
    setTimeout(() => {
      setSuccessMessage(null);
    });
  }, [forgotPasswordComplete]);

  useEffect(() => {
    if (!verifyOtpComplete) return;
    setSuccessMessage("OTP Verified Successfull");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 60000);
  }, [verifyOtpComplete]);

  useEffect(() => {
    if (!verifyOtpComplete) return;
    setSuccessMessage("Password Reset Complete");
    setTimeout(() => {
      setSuccessMessage(null);
      history.push(routePaths.home);
    }, 10000);
  }, [resetPasswordComplete]);

  // handlers
  const handleLogin = () => {
    history.push(routePaths.login);
  };

  const handleForgot = () => {
    dispatch(forgotPassword({
      email,
    }));
  };

  const handleVerifyOtp = () => {
    dispatch(verifyOTP({
      email,
      otp
    }));
  }

  const handleResetPassword = () => {
    if (password != confirmPassword) {
      setErrorMessage("Password confirmation did not match");
      setTimeout(() => {
        setErrorMessage(null);
      }, 60000);
      return;
    }

    dispatch(resetPassword({
      reset_token,
      password
    }))
  }

  const handleChange = (name, value) => {
    if (name == 'email') {
      setEmail(value);
    }

    if (name == "otp") {
      setOtp(value);
    }

    if (name == "password") {
      setPassword(value);
    }

    if (name == "confirm_password") {
      setConfirmPassword(value);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-10 col-md-8">
        <div className="row justify-content-center login-modal-top">
          {
            successMessage && (
              <Alert
                content={successMessage}
                type="success"
              />
            )
          }
          {
            errorMessage && (
              <Alert
                content={errorMessage}
                type="error"
              />
            )
          }
          <InfoPane value="Yo! Forget Your Password" />
          {forgotPasswordComplete ? (
            <>
              {verifyOtpComplete ? (
                <div className="col-12 col-sm-10 col-md-8 mt-4">
                  <p className="text-center">Setup New Password</p>
                  <TextInput
                    name="password"
                    placeholder="Your New Password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <TextInput
                    name="confirm_password"
                    placeholder="Confirm Your Password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                  <div className="d-flex justify-content-center my-2">
                    <Button
                      onClick={handleResetPassword}
                      isLoading={resetPasswordPending}
                      isSecondary
                      isStretch
                    >
                      Reset Password
                    </Button>
                  </div>
                  <div className="d-flex align-items-center justify-content-center my-4">
                    <span>Back to </span>
                    <Button
                      onClick={handleLogin}
                      isTransparent
                      isTertiary
                      noBorder
                      noWidth
                    >
                      Login
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="col-12 col-sm-10 col-md-8 mt-4">
                  <p className="text-center">Validate the OTP to Reset Your Password</p>
                  <TextInput
                    name="otp"
                    placeholder="Your OTP"
                    value={otp}
                    onChange={handleChange}
                  />
                  <div className="d-flex justify-content-center my-2">
                    <Button
                      onClick={handleVerifyOtp}
                      isLoading={verifyOtpPending}
                      isSecondary
                      isStretch
                    >
                      Verify OTP
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center my-2">
                  <Button
                    onClick={handleForgot}
                    isLoading={forgotPasswordPending}
                    isCustom
                    isStretch
                  >
                    Resend OTP
                  </Button>
                </div>
                  <div className="d-flex align-items-center justify-content-center my-4">
                    <span>Back to </span>
                    <Button
                      onClick={handleLogin}
                      isTransparent
                      isTertiary
                      noBorder
                      noWidth
                    >
                      Login
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
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
                onClick={handleForgot}
                isLoading={forgotPasswordPending}
                isSecondary
                isStretch
              >
                Send Request
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-center my-4">
              <span>Back to </span>
              <Button
                onClick={handleLogin}
                isTransparent
                isTertiary
                noBorder
                noWidth
              >
                Login
              </Button>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
