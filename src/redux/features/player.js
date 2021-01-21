import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentMediaId: null,
  pauseForced: false,
}

const playerSlider = createSlice({
  name: 'player',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentMediaId(state, action) {
      state.currentMediaId = action.payload;
      state.pauseForced = false;
    },
    forcePause(state, action) {
      state.pauseForced = action.payload;
    }
  },
});

export const { setCurrentMediaId, forcePause } = playerSlider.actions;

export default playerSlider.reducer;