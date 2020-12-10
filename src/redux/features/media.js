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
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', 'media', null, token);
  }
);

export const getMedia = createAsyncThunk(
  GET_MEDIA,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `media/${id}`, null, token);
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
  
    try {
      const { headers, body: formData } = buildFormData(url, {
        ...fields,
        file,
      });
        
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
        headers,
      });

      await res.text();
      return fileName;
    } catch (error) {
      throw error;
    }
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState: {
    addMediaError: null,
    addMediaComplete: false,
    getMediaError: null,
    getMediaComplete: false,
    saveMediaPending: false,
    saveMediaError: null,
    saveMediaComplete: false,
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
      state.getMediaComplete = true;
      state.getMediaError = null;
      state.artists = action.payload;
    },
    [getMedia.rejected]: (state, action) => {
      state.getMediaError = action.error;
    },
    [saveMedia.pending]: (state, action) => {
      state.saveMediaPending = true;
      state.saveMediaComplete = false;
      state.saveMediaError = null;
    },
    [saveMedia.fulfilled]: (state, action) => {
      state.saveMediaComplete = true;
      state.saveMediaError = null;
      state.saveMediaPending = false,
      state.media = action.payload;
    },
    [saveMedia.rejected]: (state, action) => {
      state.saveMediaComplete = false;
      state.saveMediaError = action.error;
      state.saveMediaPending = false;
    },
  }
});

export default mediaSlice.reducer;

