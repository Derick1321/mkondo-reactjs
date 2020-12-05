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
    addArtistError: null,
    addArtistComplete: false,
    getArtistsComplete: false,
    getArtistsError: null,
    artists: [],
  },
  reducers: {},
  extraReducers: {
    [addArtist.fulfilled]: (state, action) => {
      console.log('action add ', action);
      state.addArtistComplete = true;
      state.addArtistError = null;
    },
    [addArtist.rejected]: (state, action) => {
      state.addArtistError = action.error;
    },
    [getArtists.fulfilled]: (state, action) => {
      console.log('action get ', action);
      state.getArtistsComplete = true;
      state.getArtistsError = null;
      state.artists = action.payload;
    },
    [getArtists.rejected]: (state, action) => {
      state.getArtistsError = action.error;
    },
  }
});

export default artistSlice.reducer;

