import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';

const UPDATE_GENRE = 'authentication/UPDATE_GENRE';

// actions
export const updateGenre = createAsyncThunk(
  UPDATE_GENRE,
  async (data) => {
    return await handleFetch('POST', 'users/update-genre', data);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    updateGenreError: null,
    updateGenreComplete: false,
  },
  reducers: {},
  extraReducers: {
    [updateGenre.fulfilled]: (state, action) => {
      state.updateGenreComplete = true;
      state.updateGenreError = null;
    },
    [updateGenre.rejected]: (state, action) => {
      state.updateGenreError = action.error;
    },
  }
});

export default userSlice.reducer;

