import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch, buildFormData } from '$common/requestUtils';

const ADD_MEDIA = 'media/ADD_MEDIA';
const GET_ALL_MEDIA = 'media/GET_ALL_MEDIA';
const SAVE_MEDIA = 'media/SAVE_MEDIA';
const GET_MEDIA = 'media/GET_MEDIA';
const GET_NEW_RELEASES = 'media/GET_NEW_RELEASES';
const UPDATE_SHARE_COUNT = 'media/UPDATE_SHARE_COUNT';
const ADD_ALBUM = 'media/ADD_ALBUM';
const GET_ALBUMS = 'media/GET_ALBUMS';

// actions
export const addMedia = createAsyncThunk(
  ADD_MEDIA,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'media', data, token);
  }
);

export const getAllMedia = createAsyncThunk(
  GET_ALL_MEDIA,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', 'media', null, token);
  }
);

export const updateShareCount = createAsyncThunk(
  UPDATE_SHARE_COUNT,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', `media/${id}/shares`, null, token);
  }
);

export const getMedia = createAsyncThunk(
  GET_MEDIA,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `media/${id}`, null, token);
  }
);

export const getNewReleases = createAsyncThunk(
  GET_NEW_RELEASES,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', 'media/new-release', null, token);
  }
);

export const addAlbum = createAsyncThunk(
  ADD_ALBUM,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'albums', data, token);
  }
);

// save to digital ocean spaces
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

const INITIAL_STATE = {
  addMediaPending: false,
  addMediaError: null,
  addMediaComplete: false,
  getMediaError: null,
  getMediaComplete: false,
  saveMediaPending: false,
  saveMediaError: null,
  saveMediaComplete: false,
  newMediaId: null,
  getNewReleasesPending: false,
  getNewReleasesComplete: false,
  getNewReleasesError: null,
  updateShareCountPending: false,
  updateShareCountError: null,
  updateShareCountComplete: false,
  addAlbumPending: false,
  addAlbumError: null,
  addAlbumComplete: false,
  medias: [],
  newReleases: [],
  albumId: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [addMedia.pending]: (state, action) => {
      state.addMediaPending = true;
      state.addMediaComplete = false;
      state.addMediaError = null;
      state.newMediaId = null;
    },
    [addMedia.fulfilled]: (state, action) => {
      state.addMediaPending = false;
      state.addMediaComplete = true;
      state.addMediaError = null;
      state.newMediaId = action.payload.media_id;
    },
    [addMedia.rejected]: (state, action) => {
      state.addMediaPending = false;
      state.addMediaComplete = false;
      state.addMediaError = action.error;
    },
    [getMedia.pending]: (state, action) => {
      state.getMediaPending = true;
      state.getMediaComplete = false;
      state.getMediaError = null;
    },
    [getMedia.fulfilled]: (state, action) => {
      state.getMediaComplete = true;
      state.getMediaError = null;
      state.medias = action.payload;
    },
    [getMedia.rejected]: (state, action) => {
      state.getMediaComplete = true;
      state.getMediaError = null;
      state.getMediaError = action.error;
    },
    [updateShareCount.pending]: (state, action) => {
      state.updateShareCountPending = true;
      state.updateShareCountComplete = false;
      state.updateShareCountError = null;
    },
    [updateShareCount.fulfilled]: (state, action) => {
      state.updateShareCountPending = false;
      state.updateShareCountComplete = true;
      state.updateShareCountError = null;
    },
    [updateShareCount.rejected]: (state, action) => {
      state.updateShareCountPending = false;
      state.updateShareCountComplete = false;
      state.updateShareCountError = action.error;
    },
    [addAlbum.pending]: (state, action) => {
      state.addAlbumPending = true;
      state.addAlbumComplete = false;
      state.addAlbumError = null;
      state.albumId = null;
    },
    [addAlbum.fulfilled]: (state, action) => {
      state.addAlbumPending = false;
      state.addAlbumComplete = true;
      state.addAlbumError = null;
      state.albumId = action.payload;
    },
    [addAlbum.rejected]: (state, action) => {
      state.addAlbumPending = false;
      state.addAlbumComplete = false;
      state.addAlbumError = action.error;
    },
    [saveMedia.pending]: (state, action) => {
      state.saveMediaPending = true;
      state.saveMediaComplete = false;
      state.saveMediaError = null;
    },
    [saveMedia.fulfilled]: (state, action) => {
      state.saveMediaComplete = true;
      state.saveMediaError = null;
      state.saveMediaPending = false;
      state.media = action.payload;
    },
    [saveMedia.rejected]: (state, action) => {
      state.saveMediaComplete = false;
      state.saveMediaError = action.error;
      state.saveMediaPending = false;
    },
    [getNewReleases.pending]: (state, action) => {
      state.getNewReleasesPending = true;
      state.getNewReleasesComplete = false;
      state.getNewReleasesError = null;
    },
    [getNewReleases.fulfilled]: (state, action) => {
      state.getNewReleasesPending = false;
      state.getNewReleasesComplete = true;
      state.getNewReleasesError = null;
      state.newReleases = action.payload.media;
    },
    [getNewReleases.rejected]: (state, action) => {
      state.getNewReleasesPending = false;
      state.getNewReleasesComplete = true;
      state.getNewReleasesError = action.error;
    },
  }
});

export default mediaSlice.reducer;

