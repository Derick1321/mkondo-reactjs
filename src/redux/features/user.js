import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
  },
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
});

export default userSlice;

