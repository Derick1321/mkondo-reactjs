import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleFetch } from "../../common/requestUtils";

const initialState = {
    status: "idle", //the state can be one of the following values (idle, loading, successful, failed)
    error: null,
    data: []
}

export const fetchSliders = createAsyncThunk(
    'slider/fetchSliders',
    async (payload, store) => {
        const { token } = store.getState().authentication
        const response = await handleFetch('GET', 'sliders', null, token)
        return response.data
    }
)

const sliderSlice = createSlice({
    name: "slider",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSliders.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchSliders.fulfilled]: (state, action) => {
            state.status = 'successful'
            state.data = action.payload
        },
        [fetchSliders.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error
        }
    }
});

export default sliderSlice.reducer

export const selectAllSliders = state => state.slider.data