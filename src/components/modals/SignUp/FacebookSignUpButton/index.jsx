import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { signup } from '$redux/features/authentication';
import Button from '$components/common/Button';
import styles from './index.module.scss';
const facebook_icon = require('$assets/images/icons/facebook-icon.svg');

import { FACEBOOK_APP_ID } from '$common/constants';
import { async } from 'regenerator-runtime';
import { addFacebookScript } from '../../../../common/facebookAuth';

const FacebookSignUpButton = (props) => {
    const [loaded, setLoaded] =  useState(false);
    //store
    const dispatch = useDispatch();

    //effects
    useEffect(() => {
        const initializeFacebookAuth = async () => {
            try {
                await addFacebookScript();
                const params = {
                    appId: FACEBOOK_APP_ID,
                    status: true,
                    xfbml: false,
                    oauth: true,
                    version: 'v12.0'
                }
                FB.init(params)
                FB.getLoginStatus(resp => console.log(`FB:status: ${resp.status}`));
                setLoaded(true)
            } catch (e) {
                console.log(`${e.name}:${e.message}`);
            }
        }
        initializeFacebookAuth();
    }, []);

    const handleFBLogin = () => {
        FB.getLoginStatus((resp) => {
            console.log(`FB:status: ${resp.status}`)
            const params = {
                provider: 'facebook',
            };
            
            if (resp.status === 'connected') {
                params.fbAccessToken = resp.authResponse.accessToken;
                FB.api('/me?fields=id,name,email', (response) => {
                    if ('email' in response) {
                        onSuccess(response, params);
                    } else {
                        FB.login((resp) => {
                            if (resp.authResponse) {
                                params.fbAccessToken = resp.authResponse.accessToken;
                                FB.api('/me?fields=id,name,email', (response) => {
                                    console.log(response);
                                    onSuccess(response, params);
                                });
                            }
                            console.log("Facebook Login Response ", resp);
                        }, {
                            scope: 'email,', 
                            return_scopes: true,
                            auth_type: 'rerequest'
                        });
                    }
                });
                return;
            }

            FB.login((resp) => {
                if (resp.authResponse) {
                    params.fbAccessToken = resp.authResponse.accessToken;
                    FB.api('/me?fields=id,name,email', (response) => {
                        console.log(response);
                        onSuccess(response, params);
                    });
                }
                console.log("Facebook Login Response ", resp);
            }, {
                scope: 'email,public_profile', 
                return_scopes: true
            });
            
        });
    }

    const onSuccess = (res, params) => {
        console.log('Facebook Response', res);
        if (res.status == "unknown") return;
        dispatch(signup({
            signup_strategy: 'facebook',
            tokenId: params.fbAccessToken,
            full_name: res.name,
            phone_number: '',
            email: res.email ?? "facebook@email.com",
            password: '',
            user_type: 'user', // user, creator, admin
            country: 'TZ',
        }));
    }

    const responseFacebook = (res) => {
        console.log('Facebook Response', res);
        if (res.status == "unknown") return;
        dispatch(signup({
            signup_strategy: 'facebook',
            tokenId: res.accessToken,
            full_name: res.name,
            phone_number: '',
            email: res.email ?? "facebook@email.com",
            password: '',
            user_type: 'user', // user, creator, admin
            country: 'TZ',
        }));
    }

    const componentClicked = () => console.log("[Facebook Signup Button Clicked]");

    return (
        <>
            <button
                onClick={handleFBLogin}
                type="button"
                disabled={!loaded}
                className={`${styles.facebookButton} facebook`}>
                    <img src={facebook_icon} /> Register with Facebook
            </button>
        </>
    )
}

export default FacebookSignUpButton;