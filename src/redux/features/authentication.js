import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';
import { getUser, saveUser, clearUser } from '$common/userService';

const AUTHENTICATE = 'authentication/AUTHENTICATE';
const SIGN_UP = 'authentication/SIGN_UP';

// actions
export const login = createAsyncThunk(
  AUTHENTICATE,
  async (data) => {
    return await handleFetch('POST', 'users/authenticate', data);
  }
);

export const signup = createAsyncThunk(
  SIGN_UP,
  async (data) => {
    return await handleFetch('POST', 'users', data);
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
  user: {
    full_name: null,
  },
  loginError: null,
  signupError: null,
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
    coldstart: () => {
      const { token, user } = getUser();
      return {
        token,
        user,
      }
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return {
        ...state,
        ...handleAuthentication(action.payload),
      };
    },
    [login.rejected]: (state, action) => {
      state.loginError = action.error;
    },
    [signup.fulfilled]: (state, action) => {
      return {
        ...state,
        ...handleAuthentication(action.payload),
      };
    },
    [signup.rejected]: (state, action) => {
      state.signupError = action.error;
    },
  }
});

// extra actions
export const { logout, coldstart } = authenticationSlice.actions;
// reducer
export default authenticationSlice.reducer;
