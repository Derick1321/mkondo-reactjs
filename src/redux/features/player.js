import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentMediaId: null,
  isPlaying: false,
  currentPlaylist: [],
  isAutoPlay: false,
  isRepeat: false,
  isShuffle: false,
  // DEPRECATED
  pauseForced: false,
};

const playerSlider = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentMediaId(state, action) {
      state.currentMediaId = action.payload;
      // DEPRECATED
      state.pauseForced = false;
    },
    setCurrentPlaylist(state, action) {
      state.currentPlaylist = action.payload;
    },
    pause(state, action) {
      state.isPlaying = false;
    },
    clearId(state, action) {
      // handle clear id
    },
    play(state, action) {
      state.isPlaying = true;
    },
    goPrev(state, action) {
      // handle prev
    },
    goNext(state, action) {
      // handle prev
    },
    updateRange(state, action) {
      // range
    },
    // TO BE DEPRECATED
    forcePause(state, action) {
      state.pauseForced = action.payload;
    },
  },
});

export const {
  setCurrentMediaId,
  play,
  pause,
  clearId,
  updateRange,
  // DEPRECATED
  forcePause,
} = playerSlider.actions;

export default playerSlider.reducer;