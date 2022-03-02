import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    fetchPaymentIntentLoading: false,
    clientSecret: null,
    fetchPaymentIntentError: null,
    addPaymentMethodLoading: false,
    paymentMethod: null,
    addPaymentMethodError: null,
}

//Actions
const ADD_SETUP_INTENT = 'subscription/ADD_POST';

export const addSetupIntent = createAsyncThunk(
    ADD_SETUP_INTENT, 
    async (payload, store));

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {},
    extraReducers: {},
});