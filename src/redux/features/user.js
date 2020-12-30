import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const UPDATE_GENRE = 'user/UPDATE_GENRE';
const ADD_FAVORITE = 'user/ADD_FAVORITE';
const REMOVE_FAVORITE = 'user/REMOVE_FAVORITE';

// actions
export const updateGenre = createAsyncThunk(
  UPDATE_GENRE,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'users/update-genre', data, token);
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    updateGenreError: null,
    updateGenreComplete: false,
    addFavoritePending: false,
    addFavoriteError: null,
    addFavoriteComplete: false,
    removeFavoritePending: false,
    removeFavoriteError: null,
    removeFavoriteComplete: false,
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
    [updateGenre.fulfilled]: (state, action) => {
      state.updateGenreComplete = true;
      state.updateGenreError = null;
    },
    [updateGenre.rejected]: (state, action) => {
      state.updateGenreError = action.error;
    },
  }
});

export default userSlice.reducer;

