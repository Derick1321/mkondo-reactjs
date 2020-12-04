import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleFetch, buildFormData } from '$common/requestUtils';

const ADD_MEDIA = 'media/ADD_MEDIA';
const GET_ALL_MEDIA = 'media/GET_ALL_MEDIA';
const SAVE_MEDIA = 'media/SAVE_MEDIA';
const GET_MEDIA = 'media/GET_MEDIA';

// actions
export const addMedia = createAsyncThunk(
  ADD_MEDIA,
  async (data) => {
    return await handleFetch('POST', 'media', data);
  }
);

export const getAllMedia = createAsyncThunk(
  GET_ALL_MEDIA,
  async () => {
    return await handleFetch('GET', 'media');
  }
);

export const getMedia = createAsyncThunk(
  GET_MEDIA,
  async (id) => {
    return await handleFetch('GET', `media/${id}`);
  }
);

// save to s3
export const saveMedia = createAsyncThunk(
  SAVE_MEDIA,
  async (file, param) => {
    const { token } = param.getState().authentication;
    const fileName = `${Math.random().toString(36).substring(5)}${file.name}`;
    const result = await handleFetch('GET', `media/presigned-post-url?file_name=${fileName}`, null, token);
    const { fields, url } = result.response;
  
    let response = null;
    try {
      const { headers, body: formData } = buildFormData(url, {
        ...fields,
        file,
      });
        
      response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers,
      });
    } catch (error) {
      throw error;
    }

    return response;
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState: {
    addMediaError: null,
    addMediaComplete: false,
    getMediaError: null,
    getMediaComplete: false,
    saveMediaError: null,
    saveMediaComplete: false,
    artists: [],
  },
  reducers: {},
  extraReducers: {
    [addMedia.fulfilled]: (state, action) => {
      console.log('action add ', action);
      state.addMediaComplete = true;
      state.addMediaError = null;
    },
    [addMedia.rejected]: (state, action) => {
      state.addMediaError = action.error;
    },
    [getMedia.fulfilled]: (state, action) => {
      console.log('action get ', action);
      state.getMediaComplete = true;
      state.getMediaError = null;
      state.artists = action.payload;
    },
    [getMedia.rejected]: (state, action) => {
      state.getMediaError = action.error;
    },
    [saveMedia.fulfilled]: (state, action) => {
      console.log('media save ', action);
      state.saveMediaComplete = true;
      state.saveMediaError = null;
      state.media = action.payload;
    },
    [saveMedia.rejected]: (state, action) => {
      state.saveMediaError = action.error;
    },
  }
});

export default mediaSlice.reducer;

