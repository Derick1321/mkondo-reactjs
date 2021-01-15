import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const UPDATE_USER = 'user/UPDATE_USER';
const ADD_FAVORITE = 'user/ADD_FAVORITE';
const REMOVE_FAVORITE = 'user/REMOVE_FAVORITE';
const ADD_HISTORY = 'user/ADD_HISTORY';

// actions
export const updateUser = createAsyncThunk(
  UPDATE_USER,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('PUT', `users/${data.id}`, data.payload, token);
  }
);

export const addFavorite = createAsyncThunk(
  ADD_FAVORITE,
  async (data, param) => {
    const { token, user } = param.getState().authentication;
    return await handleFetch('POST', `users/${user.user_id}/favourites`, data, token);
  }
);

export const removeFavorite = createAsyncThunk(
  REMOVE_FAVORITE,
  async (data, param) => {
    const { token, user } = param.getState().authentication;
    return await handleFetch('DELETE', `users/${user.user_id}/favourites`, data, token);
  }
);

export const addHistory = createAsyncThunk(
  ADD_HISTORY,
  async (data, param) => {
    const { token, user } = param.getState().authentication;
    return await handleFetch('POST', `users/${user.user_id}/history`, data, token);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    updateUserError: null,
    updateUserComplete: false,
    addFavoritePending: false,
    addFavoriteError: null,
    addFavoriteComplete: false,
    removeFavoritePending: false,
    removeFavoriteError: null,
    removeFavoriteComplete: false,
    addHistoryPending: false,
    addHistoryError: null,
    addHistoryComplete: false,
  },
  reducers: {},
  extraReducers: {
    [addFavorite.pending]: (state, action) => {
      state.addFavoritePending = true;
      state.addFavoriteComplete = false;
      state.addFavoriteError = null;
      state.newMediaId = null;
    },
    [addFavorite.fulfilled]: (state, action) => {
      state.addFavoritePending = false;
      state.addFavoriteComplete = true;
      state.addFavoriteError = null;
      console.log('action ', action);
    },
    [addFavorite.rejected]: (state, action) => {
      state.addFavoritePending = false;
      state.addFavoriteComplete = false;
      state.addFavoriteError = action.error;
    },
    [removeFavorite.pending]: (state, action) => {
      state.removeFavoritePending = true;
      state.removeFavoriteComplete = false;
      state.removeFavoriteError = null;
      state.newMediaId = null;
    },
    [removeFavorite.fulfilled]: (state, action) => {
      state.removeFavoritePending = false;
      state.removeFavoriteComplete = true;
      state.removeFavoriteError = null;
    },
    [removeFavorite.rejected]: (state, action) => {
      state.removeFavoritePending = false;
      state.removeFavoriteComplete = false;
      state.removeFavoriteError = action.error;
    },
    [addHistory.pending]: (state, action) => {
      state.addHistoryPending = true;
      state.addHistoryComplete = false;
      state.addHistoryError = null;
    },
    [addHistory.fulfilled]: (state, action) => {
      state.addHistoryPending = false;
      state.addHistoryComplete = true;
      state.addHistoryError = null;
    },
    [addHistory.rejected]: (state, action) => {
      state.addHistoryPending = false;
      state.addHistoryComplete = false;
      state.addHistoryError = action.error;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateUserComplete = true;
      state.updateUserError = null;
    },
    [updateUser.rejected]: (state, action) => {
      state.updateUserError = action.error;
    },
  }
});

export default userSlice.reducer;

