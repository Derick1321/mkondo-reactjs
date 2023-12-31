import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '$redux/features/authentication';

import Button from '$components/common/Button';
import './index.scss';

import { GOOGLE_CLIENT_ID } from '$common/constants';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { handleFetch } from '$common/requestUtils';
const google_icon = require('$assets/images/icons/google-icon.svg');

const refreshTokenSetup = res => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        console.log("newAuthRes: ", newAuthRes);

        // saveUserToken(newAuthRes.access_token);
        console.log('new auth Token', newAuthRes.id_token);

        // Setup the other timer after the first one
        setTimeout(refreshToken, refreshTiming);
    }
    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming)
}

const GoogleLoginComponent = (props) => {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLoginButton></GoogleLoginButton>
        </GoogleOAuthProvider>
        
    )
}

export const GoogleLoginButton = (props) => {
    const dispatch = useDispatch();
    // const loginPending = useSelector((store) => store.authentication.loginPending);

    const onSuccess = (res) => {
        console.log('[Login success] currentUser: ', res);

        dispatch(login({
            login_strategy: 'google',
            username: "email@gmail.com",
            password: '',
            access_token: res.access_token
        }));

        // res.disconnect();
    };

    const onFailure = res => {
        console.log('[Login Failed: res: ', res);
    };

    const signIn = useGoogleLogin({
        onSuccess, 
        onFailure,
        
    });

    return (
        <button className="btn btn-secondary btn-google rounded-pill" onClick={signIn}><img src={google_icon} className="google-icon" /> Login with Google</button>
    );
}

export default GoogleLoginComponent;