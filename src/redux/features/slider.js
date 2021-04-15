import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { handleFetch } from "../../common/requestUtils";

const initialState = {
    status: "idle", //the state can be one of the following values (idle, loading, successful, failed)
    error: null,
    data: []
}

const fetchSliders = createAsyncThunk(
    'slider/fetchSliders',
    async (payload, store) => {
        const { token } = store.getState().authentication
        const response = await handleFetch('GET', 'sliders', null, token)
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

export const selectAllSliders = useSelector(state => state.slider.data)