import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const LOAD_MEDIA = 'player/LOAD_MEDIA';
const LOAD_NEXT_MEDIA = 'player/LOAD_NEXT_MEDIA';
const LOAD_PREV_MEDIA = 'player/LOAD_PREV_MEDIA';

export const loadNext = createAsyncThunk(
  LOAD_NEXT_MEDIA,
  async (data, store) => {
    return new Promise(async (resolve, reject) => {
      let state = store.getState().player;
      if (state.currentPlaylistIndex < (state.currentPlaylist.length - 1)) {
        // state.currentPlaylistIndex++;
        let _index = state.currentPlaylistIndex + 1;
        let _media = state.currentPlaylist[_index];
        store.dispatch(updateLoading(true));
        store.dispatch(setCurrentMediaId(_media.mediaId));

        let { token, visitorToken } = store.getState().authentication;
        if (!token) token = visitorToken;

        const res = await handleFetch('GET', `media/presigned-get-url?file_name=${_media.url}`, null, token);
        store.dispatch(play({
          ..._media,
          url: res.response,
        }));
        resolve(_index);
      }
      reject("End of playlist has reached");
      return;
    });
  }
);

export const loadPrevious = createAsyncThunk(
  LOAD_PREV_MEDIA,
  async (data, store) => {
    return new Promise(async (resolve, reject) => {
      let state = store.getState().player;
      if (state.currentPlaylistIndex > 0) {
        // state.currentPlaylistIndex++;
        let _index = state.currentPlaylistIndex - 1;
        let _media = state.currentPlaylist[_index];
        store.dispatch(updateLoading(true));
        store.dispatch(setCurrentMediaId(_media.mediaId));

        let { token, visitorToken } = store.getState().authentication;
        if (!token) token = visitorToken;

        const res = await handleFetch('GET', `media/presigned-get-url?file_name=${_media.url}`, null, token);
        store.dispatch(play({
          ..._media,
          url: res.response,
        }));
        resolve(_index);
      }
      reject("End of playlist has reached");
      return;
    });
  }
);

const INITIAL_STATE = {
  currentMediaId: null,
  isPlaying: false,
  currentPlaylistIndex: 0,
  currentPlaylist: [],
  isAutoPlay: false,
  isRepeat: false,
  isShuffle: false,
  isLoading: false,
  position: 0,
  duration: 0,
  volume: 1,
  newPosition: -1,
  isPlaylistOpened: false
};

const playerSlider = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentMediaId(state, action) {
      state.currentMediaId = action.payload;
    },
    pause(state) {
      state.isPlaying = false;
    },
    seek(state, action) {
      state.newPosition = action.payload;
    },
    play(state, action) {
      if (action.payload) {
        state.currentMediaId = action.payload.mediaId; // TODO: media id fix

        if (state.currentPlaylist.some((media) => media.mediaId == action.payload.mediaId)) {
          let _index = state.currentPlaylist.findIndex((media) => media.mediaId == action.payload.mediaId);
          state.currentPlaylist[_index] = action.payload;
        } else {
          state.currentPlaylist.unshift(action.payload);
        }
      }
      state.isPlaying = true;
    },
    updatePlaylist(state, action) {
      state.currentPlaylist = action.payload;
    },
    goPrev(state, action) {
      // handle prev
      if (state.currentPlaylistIndex > 0) {
        state.currentPlaylistIndex--;
      }
    },
    goNext(state, action) {
      // handle prev
    },
    updateVolume(state, action) {
      state.volume = action.payload;
    },
    updateRange(state, action) {
      state.position = action.payload;
    },
    updateDuration(state, action) {
      state.duration = action.payload;
    },
    updateLoading(state, action) {
      state.isLoading = action.payload;
    },
    togglePlaylistOpened(state, action) {
      state.isPlaylistOpened = !state.isPlaylistOpened;
    },
  },
  extraReducers: {
    [loadNext.fulfilled]: (state, action) => {
      state.currentPlaylistIndex = action.payload;
    },
    [loadPrevious.fulfilled]: (state, action) => {
      state.currentPlaylistIndex = action.payload
    }
  }
});

export const {
  setCurrentMediaId,
  play,
  pause,
  seek,
  updateRange,
  updateLoading,
  updateDuration,
  updateVolume,
  togglePlaylistOpened,
  updatePlaylist,
} = playerSlider.actions;

// actions
export const loadMedia = createAsyncThunk(
  LOAD_MEDIA,
  async (data, param) => {
    const { currentMediaId, isPlaying } = param.getState().player;
    if (currentMediaId === data.mediaId) {
      if (isPlaying) {
        param.dispatch(pause());
        return;
      }
      param.dispatch(play());
      return;
    }
    param.dispatch(updateLoading(true));
    param.dispatch(setCurrentMediaId(data.mediaId));
    //populate the queue, by loading the required medias
    let { token, visitorToken } = param.getState().authentication;
    if(!token) {token = visitorToken;}
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${data.url}`, null, token);
    param.dispatch(play({
      ...data,
      url: res.response,
    }));
  }
);

export default playerSlider.reducer;