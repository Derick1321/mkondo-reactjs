import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentMedia: null,
}

const theatreSlice = createSlice({
    name: "theatre",
    initialState,
    reducers: {
        setTheatreCurrentMedia: (state, action) => {
            state.currentMedia = action.payload;
        }
    },
    extraReducers: [],
});

export const { setTheatreCurrentMedia } = theatreSlice.actions;
export default theatreSlice.reducer;