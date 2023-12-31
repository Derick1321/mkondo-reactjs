import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';
import { element } from 'screenfull';
import { checkSubscriptionStatus } from './media';

const LOAD_MEDIA = 'player/LOAD_MEDIA';
const PRE_LOAD_MEDIA = 'player/PRE_LOAD_MEDIA';

const INITIAL_STATE = {
  currentMediaId: null,
  isPlaying: false,
  currentPlaylist: [],
  isAutoPlay: false,
  isRepeat: false,
  isShuffle: false,
  isLoading: false,
  position: 0,
  duration: 0,
  volume: 1,
  newPosition: -1,
  isPlaylistOpened: false,
  next: 0,
  prev: 0,
  index: 0,
  skipTo: -1,
};

const playerSlider = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentMediaId(state, action) {
      state.currentMediaId = action.payload;
    },
    setCurrentIndex(state, action) {
      state.index = action.payload;
    },
    updatePlaylist(state, action) {
      state.currentPlaylist = action.payload;
      state.index = 0;
    },
    updatePlaylistAtIndex(state, action) {
      if (action.payload.index && action.payload.data) {
        if (state.currentPlaylist.length > action.payload.index) {
          state.currentPlaylist[action.payload.index] = action.payload.data;
        }
      }
    },
    pause(state) {
      state.isPlaying = false;
    },
    seek(state, action) {
      state.newPosition = action.payload;
    },
    play(state, action) {
      // console.log("play reducer triggered", state.currentPlaylist.length);
      if (action.payload) {
        // console.log("payload exists..");
        state.currentMediaId = action.payload.mediaId; // TODO: media id fix
        if (state.currentPlaylist.some((media) => (media.mediaId ?? media.media_id) == action.payload.mediaId)) {
          // console.log("current playlist has the song");
          let _index = state.currentPlaylist.findIndex((media) => (media.mediaId ?? media.media_id) == action.payload.mediaId);
          // console.log(_index);
          state.currentPlaylist[_index] = action.payload;
          state.index = _index;
        } else {
          // console.log("The song is not on the current playlist", action.payload, state.currentPlaylist.map(m => m.media_id));
          //we will know weather to pop or push
          if (state.currentPlaylist.length == 0) {
            state.currentPlaylist = [action.payload];
          } else {
            if (state.currentPlaylist.length == 1) {
              state.currentPlaylist.push(action.payload);
            } else {
              state.currentPlaylist.splice(state.index + 1, 0, action.payload);
            }
            state.index++;
          }
          
        }
      }
      state.isPlaying = true;
    },
    goPrev(state, action) {
      // handle prev
      state.prev++;
    },
    goNext(state, action) {
      // handle nex
      state.next++;
    },
    skipTo(state, action) {
      state.skipTo = action.payload;
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
  extraReducers: {}
});

export const {
  setCurrentMediaId,
  play,
  pause,
  seek,
  goNext,
  goPrev,
  skipTo,
  updateRange,
  updateLoading,
  updateDuration,
  updateVolume,
  togglePlaylistOpened,
  updatePlaylist,
  setCurrentIndex,
  updatePlaylistAtIndex,
} = playerSlider.actions;

// actions
export const loadMedia = createAsyncThunk(
  LOAD_MEDIA,
  async (data, param) => {
    console.debug("LOAD_MEDIA: Loading Media...");
    const { currentMediaId, isPlaying, currentPlaylist  } = param.getState().player;
    if (currentMediaId === data.mediaId) {
      console.debug("LOAD_MEDIA: current media id equals incoming media id");
      if (isPlaying) {
        console.debug("LOAD_MEDIA: media was currently playing");
        param.dispatch(pause());
        console.debug("LOAD_MEDIA: media paused");
        return;
      }
      console.debug("LOAD_MEDIA: media was currently playing")
      param.dispatch(play());
      console.debug("LOAD_MEDIA: media played");
      return;
    }
    console.debug("LOAD_MEDIA: loading new media");
    if (currentPlaylist.some(m => m.mediaId == data.mediaId)) {
      console.debug("LOAD_MEDIA: the media has been found in the current playlist");
      let _index = currentPlaylist.findIndex(m => m.mediaId == data.mediaId);
      console.debug("LOAD_MEDIA: skipping to the playlist");
      param.dispatch(skipTo(_index));
      return;
    }

    //check for subscription
    param.dispatch(updateLoading(true));
    // var checkSubscription = await unwrapResult(param.dispatch(checkSubscriptionStatus(data.mediaId)))
    // console.log(checkSubscription);
    
    
    param.dispatch(setCurrentMediaId(data.mediaId));
    //populate the queue, by loading the required medias
    let { token, visitorToken } = param.getState().authentication;
    if(!token) {token = visitorToken;}
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${data.url}`, null, token);
    console.log("triggered update loading...");
    // param.dispatch(updateLoading(false));
    console.log("dispatching play...");
    param.dispatch(play({
      ...data,
      url: res.response,
    }));
  }
);

export const preLoadMedia = createAsyncThunk(
  PRE_LOAD_MEDIA,
  async (data, param) => {
    
    if (data.payload.url) {
      // console.log("Pre Loading Media, Ealry Return", data.payload);
      return;
    }

    const { currentMediaId, isPlaying } = param.getState().player;
    
    // param.dispatch(updateLoading(true));
    // param.dispatch(setCurrentMediaId(data.mediaId));
    //populate the queue, by loading the required medias
    let { token, visitorToken } = param.getState().authentication;
    if(!token) {token = visitorToken;}
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${data.payload.media_url}`, null, token);
    const avatar = await handleFetch('GET', `media/presigned-get-url?file_name=${data.payload.owner_avatar_url}`, null, token);
    // console.log("Pre Loading Media", data.index, data.payload);
    
    param.dispatch(updatePlaylistAtIndex({
      index: data.index,
      data: {
        ...data.payload,
        url: res.response,
        mediaId: data.payload.media_id,
        avatar: avatar.response,
        name: data.payload.name,
        artistName: data.payload.owner_name,
        artistId: data.payload.owner_id,
        howl: null,
      }
    }));
  }
);

export default playerSlider.reducer;