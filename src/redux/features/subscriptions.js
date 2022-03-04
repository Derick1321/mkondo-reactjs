import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { handleFetch } from '$common/requestUtils';

const initialState = {
    fetchPaymentIntentLoading: false,
    clientSecret: null,
    fetchPaymentIntentError: null,
    addPaymentMethodLoading: false,
    paymentMethod: null,
    addPaymentMethodError: null,
}

//Actions
const ADD_SETUP_INTENT = 'subscription/ADD_SETUP_INTENT';

export const addSetupIntent = createAsyncThunk(
    ADD_SETUP_INTENT, 
    async (payload, store) => {
        const { token, user } = store.getState().authentication;
        return await handleFetch('POST', `/users/${user.user_id}/payment-methods/setup-intent`, payload, token);
    },
);



const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {},
    extraReducers: {
        [addSetupIntent.pending]: (state, action) => {
            state.fetchPaymentIntentLoading = true;
            state.clientSecret = null;
            state.fetchPaymentIntentError = null;
        },
        [addSetupIntent.fulfilled]: (state, action) => {
            state.fetchPaymentIntentLoading = false;
            state.clientSecret = action.payload.client_secret;
            state.fetchPaymentIntentError = null;
        },
        [addSetupIntent.rejected]: (state, action) => {
            state.fetchPaymentIntentLoading = false;
            state.clientSecret = null;
            state.fetchPaymentIntentError = "Failed to fetch payment intent";
        }
    },
});

export default subscriptionSlice.reducer;

