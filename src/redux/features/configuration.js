import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    error: null,
    data: []
}
const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {},
    extraReducers: {}
})

export default configurationSlice.reducer