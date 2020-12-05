import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const ADD_ARTIST = 'artist/ADD_ARTIST';
const GET_ARTISTS = 'artist/GET_ARTISTS';

// actions
export const addArtist = createAsyncThunk(
  ADD_ARTIST,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'artists', data, token);
  }
);

export const getArtists = createAsyncThunk(
  GET_ARTISTS,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', 'artists', token);
  }
);

const artistSlice = createSlice({
  name: 'artist',
  initialState: {
    addArtistPending: false,
    addArtistError: null,
    addArtistComplete: false,
    getArtistPending: false,
    getArtistsComplete: false,
    getArtistsError: null,
    artists: [],
  },
  reducers: {},
  extraReducers: {
    [addArtist.pending]: (state, action) => {
      state.addArtistPending = true;
    },
    [addArtist.fulfilled]: (state, action) => {
      state.addArtistPending = false;
      state.addArtistComplete = true;
      state.addArtistError = null;
    },
    [addArtist.rejected]: (state, action) => {
      state.addArtistPending = false;
      state.addArtistError = action.error;
    },
    [getArtists.pending]: (state, action) => {
      state.getArtistsPending = true;
      state.getArtistsComplete = false;
      state.getArtistsError = null;
    },
    [getArtists.fulfilled]: (state, action) => {
      state.getArtistsPending = false;
      state.getArtistsComplete = true;
      state.getArtistsError = null;
      state.artists = action.payload;
    },
    [getArtists.rejected]: (state, action) => {
      state.getArtistsPending = false;
      state.getArtistsComplete = false;
      state.getArtistsError = action.error;
    },
  }
});

export default artistSlice.reducer;

