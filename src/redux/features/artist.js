import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';
import { updateUser } from './user';
import queryString from 'query-string';

const ADD_ARTIST = 'artist/ADD_ARTIST';
const UPDATE_ARTIST = 'artist/UPDATE_ARTIST'
const GET_ARTISTS = 'artist/GET_ARTISTS';
const GET_ARTISTS_MORE = 'artist/GET_ARTISTS_MORE';
const GET_ARTIST_BY_ID = 'artist/GET_ARTIST_BY_ID';
const GET_ARTIST_INSIGHTS = 'artist/GET_ARTIST_INSIGHTS';
const GET_ARTIST_MEDIA = 'artist/GET_ARTIST_MEDIA';
const DELETE_ARTIST = 'artist/DELETE_ARTIST';
const GET_MANAGE_USER_REQUESTS = 'user/GET_MANAGE_USER_REQUESTS';
const POST_MANAGE_USER_REQUEST = 'user/POST_MANAGE_USER_REQUEST';

// actions
export const addArtist = createAsyncThunk(
  ADD_ARTIST,
  async (data, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('POST', 'artists', data, token);
  }
);

export const getArtistMedia = createAsyncThunk(
  GET_ARTIST_MEDIA,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `users/${id}/media`, null, token);
  }
);

export const getArtists = createAsyncThunk(
  GET_ARTISTS,
  async (params, param) => {
    const { token } = param.getState().authentication;
    const _filters = {
      ...params,
      // size: 2,
    }
    return await handleFetch('GET', `artists?${queryString.stringify(_filters)}`, null, token);
  }
);

export const getArtistsMore = createAsyncThunk(
  GET_ARTISTS_MORE,
  async (params, param) => {
    const { token } = param.getState().authentication;
    const { hasNext, next } = param.getState().artist.artistsPagination;
    if (!hasNext) return;
    return await handleFetch('GET', next, null, token);
  }
);

export const getArtistById = createAsyncThunk(
  GET_ARTIST_BY_ID,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `users/${id}`, null, token);
  }
);

export const getArtistInsights = createAsyncThunk(
  GET_ARTIST_INSIGHTS,
  async (id, param) => {
    const { token } = param.getState().authentication;
    return await handleFetch('GET', `artists/${id}/insights`, null, token);
  }
);

export const updateArtist = createAsyncThunk(
  UPDATE_ARTIST,
  async (payload, store) => {
    const state = store.getState();
    const { token } = state.authentication;
    return await handleFetch('PUT', `artists/${payload.id}`, payload, token);
  }
);

export const deleteArtist = createAsyncThunk(
  DELETE_ARTIST,
  async (payload, store) => {
    const state = store.getState();
    const { token } = state.authentication;
    return await handleFetch('DELETE', `artist/${payload.id}`, null, token);
  }
);

export const getManageUserRequests = createAsyncThunk(
  GET_MANAGE_USER_REQUESTS,
  async (params, store) => {
    console.log("Params", params);
    const { token } = store.getState().authentication;
    return await handleFetch('GET', `admin/request-manage-artist?${queryString.stringify(params)}`, null, token);
  }
);

export const createManageUserRequest = createAsyncThunk(
  POST_MANAGE_USER_REQUEST,
  async (data, store) => {
    const { token } = store.getState().authentication;
    return await handleFetch('POST', 'admin/request-manage-artist', data, token);
  }
);

const initialState = {
  addArtistPending: false,
  addArtistError: null,
  addArtistComplete: false,
  deleteArtistPendingQueue: [],
  deleteArtistsErrors: [],
  updateArtistPending: false,
  updateArtistError: null,
  updateArtistComplete: false,
  getArtistsPending: false,
  getArtistsComplete: false,
  getArtistsError: null,
  getArtistsMorePenidng: false,
  getArtistsMoreComplete: false,
  getArtistsMoreError: null,
  getArtistMediaPending: false,
  getArtistMediaComplete: false,
  getArtistMediaError: false,
  getArtistByIdPending: false,
  getArtistByIdComplete: false,
  getArtistByIdError: null,
  getManageUserRequestsPending: false,
  getManageUserRequestsComplete: false,
  getManageUserRequestsError: null,
  createManageUserRequestPendingQueue: [],
  createManageUserRequestErrors: [],
  newArtistId: '',
  artists: [],
  artistsPagination: {},
  manageUserRequests: [],
  currentArtist: {},
  insights: {},
  artistsMedia: [],
  getArtistInsights: {
    loading: false,
    error: null,
    data: {},
  },
  getArtistById: {
    loading: false,
    data: {},
    error: null,
  },
};

// slice
const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    clearArtist(state) {
      state = initialState;
    },
  },
  extraReducers: {
    [addArtist.pending]: (state, action) => {
      state.addArtistPending = true;
      state.addArtistComplete = false;
      state.addArtistError = null;
    },
    [addArtist.fulfilled]: (state, action) => {
      state.addArtistPending = false;
      state.addArtistComplete = true;
      state.addArtistError = null;
      state.newArtistId = action.payload.user_id;
    },
    [addArtist.rejected]: (state, action) => {
      state.addArtistPending = false;
      state.addArtistError = action.error;
    },
    [deleteArtist.pending]: (state, action) => {
      state.deleteArtistPendingQueue.push(action.meta.arg.id);
    },
    [deleteArtist.fulfilled]: (state, action) => {
      state.deleteArtistPendingQueue = state.deleteArtistPendingQueue.filter(artist_id => artist_id != action.meta.arg.id);
      state.artists = state.artists.filter(artist => artist.user_id != action.meta.arg.id);
    },
    [deleteArtist.rejected]: (state, action) => {
      state.deleteArtistPendingQueue = state.deleteArtistPendingQueue.filter(artist_id => artist_id != action.meta.arg.id);
      state.deleteArtistsErrors.push({ artist_id: action.meta.arg.id, "error": action.error });
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
      state.artists = action.payload.artists.data;
      state.artistsPagination = action.payload.artists.pagination;
    },
    [getArtists.rejected]: (state, action) => {
      state.getArtistsPending = false;
      state.getArtistsComplete = false;
      state.getArtistsError = action.error;
    },
    [getArtistsMore.pending]: (state, action) => {
      state.getArtistsMorePenidng = true;
      state.getArtistsMoreComplete = false;
      state.getArtistsMoreError = null;
    },
    [getArtistsMore.fulfilled]: (state, action) => {
      state.getArtistsMorePenidng = false;
      state.getArtistsMoreComplete = true;
      state.getArtistsMoreError = null;
      state.artists.push(...action.payload.artists.data);
      state.artistsPagination = action.payload.artists.pagination;
    },
    [getArtistsMore.rejected]: (state, action) => {
      state.getArtistsMorePenidng = false;
      state.getArtistsMoreComplete = false;
      state.getArtistsMoreError = action.error;
    },
    [getArtistMedia.pending]: (state, action) => {
      state.getArtistMediaPending = true;
      state.getArtistMediaComplete = false;
      state.getArtistMediaError = null;
    },
    [getArtistMedia.fulfilled]: (state, action) => {
      state.getArtistMediaPending = false;
      state.getArtistMediaComplete = true;
      state.getArtistMediaError = null;
      state.artistsMedia = action.payload.media.data;
    },
    [getArtistMedia.rejected]: (state, action) => {
      state.getArtistMediaPending = false;
      state.getArtistMediaComplete = false;
      state.getArtistMediaError = action.error;
    },
    [getArtistById.pending]: (state, action) => {
      state.getArtistByIdPending = true;
      state.getArtistByIdComplete = false;
      state.getArtistByIdError = null;
      state.getArtistById.loading = true;
      state.getArtistById.data = null;
      state.getArtistById.error = null;
    },
    [getArtistById.fulfilled]: (state, action) => {
      state.getArtistByIdPending = false;
      state.getArtistByIdComplete = true;
      state.getArtistByIdError = null;
      state.currentArtist = action.payload.user;
      state.getArtistById.loading = false;
      state.getArtistById.data = action.payload.user;
      state.getArtistById.error = null;

    },
    [getArtistById.rejected]: (state, action) => {
      state.getArtistByIdPending = false;
      state.getArtistByIdComplete = false;
      state.getArtistById.loading = false;
      state.getArtistByIdError = action.error;
      state.getArtistById.error = action.error;
      state.getArtistById.data = null;
    },
    [getArtistInsights.pending]: (state, action) => {
      state.getArtistInsights.loading = true;
      state.getArtistInsights.error = null;
      state.getArtistInsights.data = {};
    },
    [getArtistInsights.fulfilled]: (state, action) => {
      state.getArtistInsights.loading = false;
      state.getArtistInsights.error = null;
      state.getArtistInsights.data = action.payload;
      state.insights = action.payload
    },
    [getArtistInsights.rejected]: (state, action) => {
      state.getArtistInsights.loading = false;
      state.getArtistInsights.error = action.error;
      state.getArtistInsights.data = {};
    },
    [updateUser.fulfilled]: (state, action) => {
      const index = state.artists.findIndex(artist => artist.user_id == action.meta.arg.id);
      if (index > -1) {
        state.artists[index] = action.payload.user;
      }
    },
    [updateArtist.pending]: (state, action) => {
      state.updateArtistPending = true;
      state.updateArtistComplete = false;
      state.updateArtistError = null;
    },
    [updateArtist.fulfilled]: (state, action) => {
      state.updateArtistPending = false;
      state.updateArtistComplete = true;

      const index = state.artists.findIndex(artist => artist.user_id == action.meta.arg.id);
      if (index > -1) {
        state.artists[index] = action.payload.artist;
      }
    },
    [updateArtist.rejected]: (state, action) => {
      state.updateArtistPending = false;
      state.updateArtistComplete = false;
      state.updateArtistError = action.error;
    },
    [getManageUserRequests.pending]: (state, action) => {
      state.getManageUserRequestsPending = true;
      state.getManageUserRequestsComplete = false;
      state.getManageUserRequestsError = null;
    },
    [getManageUserRequests.fulfilled]: (state, action) => {
      state.getManageUserRequestsPending = false;
      state.getManageUserRequestsComplete = true;
      state.manageUserRequests = action.payload.manage_user_requests.data;
    },
    [getManageUserRequests.rejected]: (state, action) => {
      state.getManageUserRequestsPending = false;
      state.getManageUserRequestsError = action.error;
    },
    [createManageUserRequest.pending]: (state, action) => {
      state.createManageUserRequestPendingQueue.push(action.meta.arg);
    },
    [createManageUserRequest.fulfilled]: (state, action) => {
      state.createManageUserRequestPendingQueue = state.createManageUserRequestPendingQueue.filter(item => item != action.meta.arg);
      const index = state.manageUserRequests.findIndex(item => (item.requesting_user_id == action.payload.manage_user_request.requesting_user_id && item.requested_user_id == action.payload.manage_user_request.requested_user_id));
      if (index > -1) {
        state.manageUserRequests.splice(index, 1, action.payload.manage_user_request);
      } else {
        state.manageUserRequests.push(action.payload.manage_user_request);
      }
    },
    [createManageUserRequest.rejected]: (state, action) => {
      state.createManageUserRequestPendingQueue = state.createManageUserRequestPendingQueue.filter(item => item != action.meta.arg);
      state.createManageUserRequestErrors.push(action.error);
    }
  }
});

export const { clearArtist } = artistSlice.actions;
export default artistSlice.reducer;