import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const UPDATE_USER = 'user/UPDATE_USER';
const ADD_FAVORITE = 'user/ADD_FAVORITE';
const REMOVE_FAVORITE = 'user/REMOVE_FAVORITE';
const ADD_HISTORY = 'user/ADD_HISTORY';
const GET_MEDIA = 'user/GET_MEDIA';
const GET_HISTORY = 'user/GET_HISTORY';
const ADD_FOLLOWERS = 'user/ADD_FOLLOWERS';
const REMOVE_FOLLOWERS = 'user/REMOVE_FOLLOWERS';

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

export const addFollowers = createAsyncThunk(
  ADD_FOLLOWERS,
  async (data, param) => {
    const { token, user } = param.getState().authentication;
    return await handleFetch('POST', `users/${user.user_id}/followers`, data, token);
  }
);

export const removeFollowers = createAsyncThunk(
  REMOVE_FOLLOWERS,
  async (data, param) => {
    const { token, user } = param.getState().authentication;
    return await handleFetch('DELETE', `users/${user.user_id}/followers`, data, token);
  }
);

export const addHistory = createAsyncThunk(
  ADD_HISTORY,
  async (data, param) => {
    const { token, user } = param.getState().authentication;
    return await handleFetch('POST', `users/${user.user_id}/history`, data, token);
  }
);

export const getUserMedia = createAsyncThunk(
  GET_MEDIA,
  async (data, param) => {
    const { token, user } = param.getState().authentication;
    return await handleFetch('GET', `users/${user.user_id}/media`, null, token);
  }
);

export const getHistory = createAsyncThunk(
  GET_HISTORY,
  async (data, param) => {
    const { token, user } = param.getState().authentication;
    return await handleFetch('GET', `users/${user.user_id}/history`, null, token);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    updateUserPending: false,
    updateUserError: null,
    updateUserComplete: false,
    addFavoritePending: false,
    addFavoriteError: null,
    addFavoriteComplete: false,
    removeFavoritePending: false,
    removeFavoriteError: null,
    removeFavoriteComplete: false,
    addFollowersPending: false,
    addFollowersError: null,
    addFollowersComplete: false,
    removeFollowersPending: false,
    removeFollowersError: null,
    removeFollowersComplete: false,
    addHistoryPending: false,
    addHistoryError: null,
    addHistoryComplete: false,
    getHistoryPending: false,
    getHistoryError: null,
    getHistoryComplete: false,
    getUserMediaPending: false,
    getUserMediaError: null,
    getUserMediaComplete: false,
    userMedia: [],
    currentPagination: {},
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
    [addFollowers.pending]: (state, action) => {
      state.addFollowersPending = true;
      state.addFollowersComplete = false;
      state.addFollowersError = null;
      state.newMediaId = null;
    },
    [addFollowers.fulfilled]: (state, action) => {
      state.addFollowersPending = false;
      state.addFollowersComplete = true;
      state.addFollowersError = null;
    },
    [addFollowers.rejected]: (state, action) => {
      state.addFollowersPending = false;
      state.addFollowersComplete = false;
      state.addFollowersError = action.error;
    },
    [removeFollowers.pending]: (state, action) => {
      state.removeFollowersPending = true;
      state.removeFollowersComplete = false;
      state.removeFollowersError = null;
      state.newMediaId = null;
    },
    [removeFollowers.fulfilled]: (state, action) => {
      state.removeFollowersPending = false;
      state.removeFollowersComplete = true;
      state.removeFollowersError = null;
    },
    [removeFollowers.rejected]: (state, action) => {
      state.removeFollowersPending = false;
      state.removeFollowersComplete = false;
      state.removeFollowersError = action.error;
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
    [getHistory.pending]: (state, action) => {
      state.getHistoryPending = true;
      state.getHistoryComplete = false;
      state.getHistoryError = null;
    },
    [getHistory.fulfilled]: (state, action) => {
      state.getHistoryPending = false;
      state.getHistoryComplete = true;
      state.getHistoryError = null;
      state.history = action.payload.media;
    },
    [getHistory.rejected]: (state, action) => {
      state.getHistoryPending = false;
      state.getHistoryComplete = false;
      state.getHistoryError = action.error;
    },
    [updateUser.pending]: (state, action) => {
      state.updateUserPending = true;
      state.updateUserComplete = false;
      state.updateUserError = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateUserPending = false;
      state.updateUserComplete = true;
      state.updateUserError = null;
    },
    [updateUser.rejected]: (state, action) => {
      state.updateUserPending = false;
      state.updateUserComplete = false;
      state.updateUserError = action.error;
    },
    [getUserMedia.pending]: (state, action) => {
      state.getUserMediaPending = true;
      state.getUserMediaComplete = false;
      state.getUserMediaError = null;
    },
    [getUserMedia.fulfilled]: (state, action) => {
      const { pagination, data } = action.payload.media;
      state.getUserMediaPending = false;
      state.getUserMediaComplete = true;
      state.getUserMediaError = null;
      state.userMedia = data;
      state.currentPagination = pagination;
    },
    [getUserMedia.rejected]: (state, action) => {
      state.getUserMediaPending = false;
      state.getUserMediaComplete = false;
      state.getUserMediaError = action.error;
    },
  }
});

export default userSlice.reducer;

