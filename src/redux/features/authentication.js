import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';
import { getUser, saveUser, clearUser } from '$common/userService';
import { setDefaultPaymentMethod } from './subscriptions';
import user from './user';
import { async } from 'regenerator-runtime';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

const AUTHENTICATE = 'authentication/AUTHENTICATE';
const SIGN_UP = 'authentication/SIGN_UP';
const FORGOT_PASSWORD = 'authentication/FORGOT_PASSWORD';
const VERIFY_OTP = 'authentication/VERIFY_OTP';
const RESET_PASSWORD = 'authentication/RESET_PASSWORD';
const RELOAD_USER = 'authentication/RELOAD_USER';
const VISITOR_COLD_START = 'authentication/VISITOR_COLD_START';
const REFRESH_TOKEN = 'authentication/REFRESH_TOKEN';

// actions
export const login = createAsyncThunk(
    AUTHENTICATE,
    async(data) => {
        return await handleFetch('POST', 'users/authenticate', data);
    }
);

export const signup = createAsyncThunk(
    SIGN_UP,
    async(data) => {
        return await handleFetch('POST', 'users', data);
    }
);

export const forgotPassword = createAsyncThunk(
    FORGOT_PASSWORD,
    async(data) => {
        return await handleFetch('POST', 'users/forgotpassword', data);
    }
);

export const verifyOTP = createAsyncThunk(
    VERIFY_OTP,
    async (data) => {
        return await handleFetch('POST', 'users/verify-otp', data);
    }
)

export const resetPassword = createAsyncThunk(
    RESET_PASSWORD,
    async(data) => {
        return await handleFetch('POST', 'users/password/reset', data);
    }
);

export const reloadUser = createAsyncThunk(
    RELOAD_USER,
    async(id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('GET', `users/${id}`, null, token);
    }
);

export const refreshToken = createAsyncThunk(
    REFRESH_TOKEN,
    async(id, store) => {
        const { token } = store.getState().authentication;
        return await handleFetch('POST', `users/${id}/refresh_token`, null, token);
    }
);

export const visitorColdStart = createAsyncThunk(
    VISITOR_COLD_START,
    async() => {
        return await handleFetch('GET', `users/visitor-token`, null);
    }
);

// handlers
const handleAuthentication = (data) => {
    const { access_token, user } = data;
    saveUser(user, access_token);
    return {
        token: access_token,
        user,
    };
}

const initialState = {
    token: null,
    visitorToken: null,
    resetToken: null,
    user: {
        full_name: null,
        user_id: null,
        publish: false,
        user_type: null,
    },
    loginPending: false,
    loginComplete: false,
    loginError: null,
    signupPending: false,
    signUpComplete: false,
    signupError: null,
    forgotPasswordPending: false,
    forgotPasswordComplete: false,
    forgotPasswordError: null,
    verifyOtpPending: false,
    verifyOtpComplete: false,
    verifyOtpError: null,
    resetPasswordPending: false,
    resetPasswordComplete: false,
    resetPasswordError: null,
    refreshTokenPending: false,
    refreshTokenComplete: false,
    refreshTokenError: null,
};

// reducers
const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logout: () => {
            clearUser();
            return initialState;
        },
        coldstart: (state) => {
            const { token, user } = getUser();
            return {
                ...state,
                token,
                user: user || {
                    ...initialState.user,
                    user_type: 'visitor',
                },
                isVistor: false,
            }
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loginPending = true;
            state.loginComplete = false;
            state.loginError = null;
        },
        [login.fulfilled]: (state, action) => {
            return {
                ...state,
                ...handleAuthentication(action.payload),
                loginPending: false,
                loginError: false,
                loginComplete: true,
            };
        },
        [login.rejected]: (state, action) => {
            try {
                let err = action.error.message;
                err = JSON.parse(err);
                console.log(err);
                state.loginError = err.message;
            } catch (e) {
                console.error(e);
            }
            state.loginPending = false;
            state.loginComplete = false;
        },
        [refreshToken.pending]: (state, action) => {
            return {
                ...state,
                refreshTokenPending: true,
                refreshTokenComplete: false,
                refreshTokenError: null,
            }
        },
        [refreshToken.fulfilled]: (state, action) => {
            return {
                ...state,
                ...handleAuthentication(action.payload),
                refreshTokenPending: false,
                refreshTokenComplete: true,
                refreshTokenError: null,
            }
        },
        [refreshToken.rejected]: (state, action) => {
            return {
                ...state,
                refreshTokenPending: false,
                refreshTokenComplete: false,
                refreshTokenError: action.error,
            }
        },
        [signup.pending]: (state, action) => {
            state.signupPending = true;
            state.signupError = null;
            state.signUpComplete = false;
        },
        [signup.fulfilled]: (state, action) => {
            return {
                ...state,
                ...handleAuthentication(action.payload),
                signupPending: false,
                signUpComplete: true,
            };
        },
        [signup.rejected]: (state, action) => {
            state.signupPending = false;
            state.signupError = action.error;
            state.signUpComplete = false;
        },
        [forgotPassword.pending]: (state, action) => {
            state.forgotPasswordPending = true;
            state.forgotPasswordError = null;
            state.forgotPasswordComplete = false;
        },
        [forgotPassword.fulfilled]: (state, action) => {
            state.forgotPasswordPending = false;
            state.forgotPasswordError = null;
            state.forgotPasswordComplete = true;
        },
        [forgotPassword.rejected]: (state, action) => {
            state.forgotPasswordPending = false;
            state.forgotPasswordError = action.error;
            state.forgotPasswordComplete = false;
        },
        [verifyOTP.pending]: (state, action) => {
            state.verifyOtpPending = true;
            state.verifyOtpComplete = false;
            state.verifyOtpError = null;
        },
        [verifyOTP.fulfilled]: (state, action) => {
            state.verifyOtpPending = false;
            state.verifyOtpComplete = true;
            state.resetToken = action.payload.reset_token;
        },
        [verifyOTP.rejected]: (state, action) => {
            state.verifyOtpPending = false;
            state.verifyOtpComplete = false;
            state.verifyOtpError = action.error;
        },
        [resetPassword.pending]: (state, action) => {
            state.resetPasswordPending = true;
            state.resetPasswordError = null;
            state.resetPasswordComplete = false;
        },
        [resetPassword.fulfilled]: (state, action) => {
            return {
                ...state,
                ...handleAuthentication(action.payload),
                resetPasswordPending: false,
                resetPasswordError: false,
                resetPasswordComplete: true,
            };
        },
        [resetPassword.rejected]: (state, action) => {
            state.resetPasswordPending = false;
            state.resetPasswordError = action.error;
            state.resetPasswordComplete = false;
        },
        [reloadUser.pending]: (state, action) => {
            state.reloadUserPending = true;
            state.reloadUserError = null;
            state.reloadUserComplete = false;
        },
        [reloadUser.fulfilled]: (state, action) => {
            state.reloadUserPending = false;
            state.reloadUserError = null;
            state.reloadUserComplete = true;
            state.user = action.payload.user;
        },
        [reloadUser.rejected]: (state, action) => {
            state.reloadUserPending = false;
            state.reloadUserError = action.error;
            state.reloadUserComplete = false;
        },
        [visitorColdStart.pending]: (state, action) => {
            state.visitorColdStartPending = true;
            state.visitorColdStartError = null;
            state.visitorColdStartComplete = false;
        },
        [visitorColdStart.fulfilled]: (state, action) => {
            state.visitorColdStartPending = false;
            state.visitorColdStartError = null;
            state.visitorColdStartComplete = true;
            state.visitorToken = action.payload.token;
        },
        [visitorColdStart.rejected]: (state, action) => {
            state.visitorColdStartPending = false;
            state.visitorColdStartError = action.error;
            state.visitorColdStartComplete = false;
        },
        [setDefaultPaymentMethod.fulfilled]: (state, action) => {
            if (state.user) {
                console.log("state user detected");
                if (state.user.stripe_customer) {
                    console.log("stripe customer detected");
                    if (state.user.stripe_customer.invoice_settings.default_payment_method) {
                        state.user.stripe_customer.invoice_settings.default_payment_method = action.payload.customer.invoice_settings.default_payment_method;
                    }
                }
            }
            
        }
    }
});

const authenticationPersistConfig = {
    key: 'authentication',
    storage: storage,
    whitelist: ['token', 'visitorToken', 'resetToken', 'user'],
  }

// extra actions
export const { logout, coldstart } = authenticationSlice.actions;
// reducer
export default persistReducer(authenticationPersistConfig, authenticationSlice.reducer);