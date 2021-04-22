import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { async } from "regenerator-runtime";
import { handleFetch } from "../../common/requestUtils";

const initialState = {
    status: 'idle',
    error: null,
    data: []
}

const fetchConfigurations = createAsyncThunk(
    'configurations/fetchConfigurations',
    async (payload, store) => {
        const { token } = store.getState().authentication
        const response = await handleFetch('GET', '/configurations', null, token)
        return response.data
    }
)

const storeConfiguration = createAsyncThunk(
    'configurations/storeConfiguration',
    async (payload, store) => {
        const { token } = store.getState().authentication
        const response = await handleFetch('POST', '/configurations', payload, token)
        return response.data
    }
)

const configurationSlice = createSlice({
    name: 'configurations',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchConfigurations.fulfilled]: (state, action) => {
            state.status = 'done'
            state.data = action.payload
        },
        [fetchConfigurations.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchConfigurations.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },
        [fetchConfigurations.fulfilled]: (state, action) => {
            state.data.push(action.payload)
        }
    }
})

export default configurationSlice.reducer