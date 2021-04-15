import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "idle", //the state can be one of the following values (idle, loading, successful, failed)
    error: null,
    data: []
}

const sliderSlice = createSlice({
    name: "slider",
    initialState,
    reducers: [],
    extraReducers: []
});

export default sliderSlice.reducer