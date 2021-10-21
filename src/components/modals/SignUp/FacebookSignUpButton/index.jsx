import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { signup } from '$redux/features/authentication';
import Button from '$components/common/Button';
import styles from './index.module.scss';
const facebook_icon = require('$assets/images/icons/facebook-icon.svg');

import { FACEBOOK_APP_ID } from '$common/constants';

const FacebookSignUpButton = (props) => {

    const dispatch = useDispatch();
    const loginPending = useSelector((store) => store.authentication.loginPending);

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
        <FacebookLogin
            appId={FACEBOOK_APP_ID}
            autoLoad={false}
            disableMobileRedirect={true}
            fields="name,email,picture"
            scope="public_profile,email"
            callback={responseFacebook}
            onClick={componentClicked}
            cssClass={`${styles.facebookButton}`}
            textButton="Sign Up with Facebook"
            icon={<img src={facebook_icon} />}>Register with Facebook</FacebookLogin>
    )
}

export default FacebookSignUpButton;