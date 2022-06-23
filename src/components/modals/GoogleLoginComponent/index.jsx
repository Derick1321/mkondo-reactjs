import React from 'react';
// import GoogleLogin, { useGoogleLogin } from 'react-google-login';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '$redux/features/authentication';

import Button from '$components/common/Button';
import './index.scss';

import { GOOGLE_CLIENT_ID } from '$common/constants';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
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

const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const GoogleLoginComponent = (props) => {

    const dispatch = useDispatch();
    // const loginPending = useSelector((store) => store.authentication.loginPending);

    const onSuccess = (res) => {
        console.log('[Login success] response: ', res);
        _json = parseJwt(res.credential);
        console.log('[Login success] decoded: ', _json);

        dispatch(login({
            login_strategy: 'google',
            username: _json.email,
            password: '',
            tokenId: res.credential
        }));
    };

    const onFailure = res => {
        console.log('[Login Failed: res: ', res);
    };

    // const { signIn } = useGoogleLogin({
    //     onSuccess, onFailure, clientId: GOOGLE_CLIENT_ID, isSignedIn: true, cookiePolicy: 'single_host_origin'
    // });

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
            />
            {/* <button className="btn btn-secondary btn-google rounded-pill" onClick={signIn}><img src={google_icon} className="google-icon" /> Login with Google</button> */}
        </GoogleOAuthProvider>
    )
}

export default GoogleLoginComponent;