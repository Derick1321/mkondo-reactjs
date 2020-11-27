import { createSlice } from '@reduxjs/toolkit';

const navSlice = createSlice({
  name: 'nav',
  initialState: {
    initialRoute: null,
  },
  reducers: {
    setInitialNav: (state, action) => {
      state.initialRoute = action.payload;
    },
  },
});

// actions
export const { setInitialNav } = navSlice.actions;

// reducer
export default navSlice.reducer;

