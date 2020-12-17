import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const CREATE_PLAYLIST = 'playlist/CREATE_PLAYLIST';

// actions
export const createPlaylist = createAsyncThunk(
  CREATE_PLAYLIST,
  async (data) => {
    return await handleFetch('POST', 'playlists', data);
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    createPlaylistPending: false,
    createPlaylistError: null,
    createPlaylistComplete: false,
    currentPlaylist: [],
  },
  reducers: {
    updatePlaylist: (state, action) => {
      state.currentPlaylist.push(action.payload);
    },
  },
  extraReducers: {
    [createPlaylist.pending]: (state, action) => {
      state.createPlaylistPending = true;
      state.createPlaylistComplete = true;
      state.createPlaylistError = null;
    },
    [createPlaylist.fulfilled]: (state, action) => {
      state.createPlaylistPending = false;
      state.createPlaylistComplete = true;
      state.createPlaylistError = null;
    },
    [createPlaylist.rejected]: (state, action) => {
      state.createPlaylistPending = false;
      state.createPlaylistComplete = true;
      state.createPlaylistError = action.error;
    },
  }
});

export const { updatePlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;

