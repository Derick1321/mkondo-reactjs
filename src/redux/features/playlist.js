import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const CREATE_PLAYLIST = 'playlist/CREATE_PLAYLIST';
const GET_PLAYLIST = 'playlist/GET_PLAYLIST';
const UPDATE_PLAYLIST = 'playlist/UPDATE_PLAYLIST';

// actions
export const createPlaylist = createAsyncThunk(
  CREATE_PLAYLIST,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'playlists', data, token);
  }
);

export const updatePlaylist = createAsyncThunk(
  UPDATE_PLAYLIST,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', `playlists/${data.id}`, {
      owner_id: data.ownerId,
      song_id: data.songId,
    }, token);
  }
);

export const getPlaylist = createAsyncThunk(
  GET_PLAYLIST,
  async (id) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `playlists/${id}`, null, token);
  }
);

export const listPlaylist = createAsyncThunk(
  LIST_PLAYLIST,
  async (id) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `playlists/${id}`, null, token);
  }
);

// reducer
const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    createPlaylistPending: false,
    createPlaylistError: null,
    createPlaylistComplete: false,
    currentPlaylist: [],
  },
  extraReducers: {
    [createPlaylist.pending]: (state, action) => {
      state.createPlaylistPending = true;
      state.createPlaylistComplete = false;
      state.createPlaylistError = null;
    },
    [createPlaylist.fulfilled]: (state, action) => {
      state.createPlaylistPending = false;
      state.createPlaylistComplete = true;
      state.createPlaylistError = null;
      console.log('action ', action);
    },
    [createPlaylist.rejected]: (state, action) => {
      state.createPlaylistPending = false;
      state.createPlaylistComplete = false;
      state.createPlaylistError = action.error;
    },
    [updatePlaylist.pending]: (state, action) => {
      state.updatePlaylistPending = true;
      state.updatePlaylistComplete = true;
      state.updatePlaylistError = null;
    },
    [updatePlaylist.fulfilled]: (state, action) => {
      state.updatePlaylistPending = false;
      state.updatePlaylistComplete = true;
      state.updatePlaylistError = null;
    },
    [updatePlaylist.rejected]: (state, action) => {
      state.updatePlaylistPending = false;
      state.updatePlaylistComplete = true;
      state.updatePlaylistError = action.error;
    },
    [getPlaylist.pending]: (state, action) => {
      state.getPlaylistPending = true;
      state.getPlaylistComplete = false;
      state.getPlaylistError = null;
    },
    [getPlaylist.fulfilled]: (state, action) => {
      state.getPlaylistPending = false;
      state.getPlaylistComplete = true;
      state.getPlaylistError = null;
      state.playlists = action.playlists;
    },
    [getPlaylist.rejected]: (state, action) => {
      state.getPlaylistPending = false;
      state.getPlaylistComplete = false;
      state.getPlaylistError = action.error;
    },
  }
});

export default playlistSlice.reducer;

