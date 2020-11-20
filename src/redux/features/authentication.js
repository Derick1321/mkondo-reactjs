import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handlePost } from '../../common/requestUtils';

const AUTHENTICATE = 'authentication/AUTHENTICATE';
const SIGN_UP = 'authentication/SIGN_UP';

// actions
export const login = createAsyncThunk(
  AUTHENTICATE,
  async (data) => {
    return await handlePost('users/authenticate', data);
  }
);

export const signup = createAsyncThunk(
  SIGN_UP,
  async (data) => {
    return await handlePost('users', data);
  }
);

// reducers
const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: null,
    user: null,
    loginError: null,
    signupError: null,
  },
  reducers: {
    logout: () => initialState,
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { access_token, user } = action.payload;
      state.token = access_token;
      state.user = user;
      state.loginError = null;
    },
    [login.rejected]: (state, action) => {
      state.loginError = action.error;
    },
    [signup.fulfilled]: (state, action) => {
      const { access_token, user } = action.payload;
      state.token = access_token;
      state.user = user;
    },
    [signup.rejected]: (state, action) => {
      console.log('sign up ', action);
      state.signupError = action.error;
    },
  }
});

export default authenticationSlice.reducer;
