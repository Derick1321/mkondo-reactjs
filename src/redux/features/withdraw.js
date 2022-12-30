import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleFetch } from '$common/requestUtils';
import queryString from 'query-string';

const CREATE_WITHDRAW_REQUEST = 'withdraw/CREATE_WITHDRAW_REQUEST';
const FETCH_WITHDRAW_REQUESTS = 'withdraw/FETCH_WITHDRAW_REQUESTS';


export const createWithdrawRequest = createAsyncThunk(
    CREATE_WITHDRAW_REQUEST,
    async (payload, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('POST', `withdrawal-request`, payload, token);
    }
);

export const fetchWithdrawRequests = createAsyncThunk(
    FETCH_WITHDRAW_REQUESTS,
    async (params = {}, store) => {
        const { token } = store.getState().authentication;
        return await handleFetch('GET', `withdrawal-request?${queryString.stringify(params)}`, null, token);
    }
);


const initialState = {
    withdrawals: [],
    fetchWithdrawals: {
        isPending: false,
        isComplete: false,
        error: null,
        data: []
    },
    createWithdrawals: {
        isPending: false,
        isComplete: false,
        error: null,
        data: {}
    }
}
const withdrawSlice = createSlice({
    name: 'withdraw',
    initialState,
    reducers: {

    },
    extraReducers: {
        [createWithdrawRequest.pending]: (state) => {
            state.createWithdrawals.isPending = true;
            state.createWithdrawals.isComplete = false;
            state.createWithdrawals.error = null;
            state.createWithdrawals.data = null;
        },
        [createWithdrawRequest.rejected]: (state, action) => {
            state.createWithdrawals.isPending = false;
            state.createWithdrawals.isComplete = false;
            state.createWithdrawals.error = action.payload ?? action.error;
        },
        [createWithdrawRequest.fulfilled]: (state, action) => {
            state.createWithdrawals.isPending = false;
            state.createWithdrawals.isComplete = true;
            state.createWithdrawals.error = null;
            state.createWithdrawals.data = action.payload;
            // append withdrawls with a new created withdraw
            // state.withdrawals.push(action.payload.withdrawal);
            console.log(action.payload);
        },
        [fetchWithdrawRequests.pending]: (state) => {
            state.fetchWithdrawals.isPending = true;
            state.fetchWithdrawals.isComplete = false;
            state.fetchWithdrawals.error = null;
            state.fetchWithdrawals.data = [];
        },
        [fetchWithdrawRequests.rejected]: (state, action) => {
            state.fetchWithdrawals.isPending = false;
            state.fetchWithdrawals.isComplete = false;
            state.fetchWithdrawals.error = action.payload ?? action.error;
        },
        [fetchWithdrawRequests.fulfilled]: (state, action) => {
            state.fetchWithdrawals.isPending = false;
            state.fetchWithdrawals.isComplete = true;
            state.fetchWithdrawals.error = null;
            state.fetchWithdrawals.data = action.payload;
            // update the withdrawals
            state.withdrawals = action.payload.withdrawal_requests;
            console.log(action.payload);
        }
    }
});

export default withdrawSlice.reducer;