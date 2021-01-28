import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentMediaId: null,
  isPlaying: false,
  currentPlaylist: false,
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
      state.pauseForced = false;
    },
    pause(state, action) {
      // handle pause
      state.isPlaying = false;
    },
    clearId(state, action) {
      // handle clear id
    },
    play(state, action) {
      // handle play
      state.isPlaying = true;
    },
    goPrev(state, action) {
      // handle prev
    },
    goNext(state, action) {
      // handle prev
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
  // DEPRECATED
  forcePause,
} = playerSlider.actions;

export default playerSlider.reducer;