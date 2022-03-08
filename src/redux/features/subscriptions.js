import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { handleFetch } from '$common/requestUtils';
import { async } from 'regenerator-runtime';

const initialState = {
    fetchPaymentIntentLoading: false,
    clientSecret: null,
    fetchPaymentIntentError: null,
    addPaymentMethodLoading: false,
    paymentMethod: null,
    addPaymentMethodError: null,
    fetchPaymentMethodsLoading: false,
    paymentMethods: [],
    fetchPaymentMethodsError: null,
    setDefaultPaymentMethodLoading: false,
    setDefaultPaymentMethodSuccess: null,
    setDefaultPaymentMethodError: null,
    fetchProductsLoading: false,
    products: [],
    fetchProductsError: null,
}

//Actions
const ADD_SETUP_INTENT = 'subscription/ADD_SETUP_INTENT';
const ADD_PAYMENT_METHOD = 'subscription/ADD_PAYMENT_METHOD';
const FETCH_PAYMENT_METHODS = 'subscription/FETCH_PAYMENT_METHOD';
const SET_DEFAULT_PAYMENT_METHOD = 'subscriptions/SET_DEFAULT_PAYMENT_METHOD';
const FETCH_PRODUCTS = 'subscriptions/FETCH_PRODUCTS';

export const addSetupIntent = createAsyncThunk(
    ADD_SETUP_INTENT, 
    async (payload, store) => {
        const { token, user } = store.getState().authentication;
        return await handleFetch('POST', `/users/${user.user_id}/payment-methods/setup-intent`, payload, token);
    },
);

export const addPaymentMethod = createAsyncThunk(
    ADD_PAYMENT_METHOD,
    async (payment_method, store) => {
        const {token, user } = store.getState().authentication;
        const payload = {
            "payment_method": payment_method,
        };
        return await handleFetch('POST', `/users/${user.user_id}/payment-methods`, payload, token);
    }
);

export const fetchPaymentMethods = createAsyncThunk(
    FETCH_PAYMENT_METHODS,
    async (payload, store) => {
        const { token, user } = store.getState().authentication;
        return await handleFetch('GET', `/users/${user.user_id}/payment-methods`, payload, token);
    }
);

export const setDefaultPaymentMethod = createAsyncThunk(
    SET_DEFAULT_PAYMENT_METHOD, 
    async (payment_method_id, store) => {
        const { token, user } = store.getState().authentication;
        return await handleFetch('POST', `users/${user.user_id}/payment-methods/${payment_method_id}/set-default`, null, token);
    }
);

export const fetchProducts = createAsyncThunk(
    FETCH_PRODUCTS,
    async (filters, store) => {
        const { token, user } = store.getState().authentication;
        return await handleFetch('GET', `/products`, null, token);
    }
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
        },
        [addPaymentMethod.pending]: (state, action) => {
            state.addPaymentMethodLoading = true;
            state.paymentMethod = null;
            state.addPaymentMethodError = null;
        },
        [addPaymentMethod.fulfilled]: (state, action) => {
            state.addPaymentMethodLoading = false;
            state.paymentMethod = action.payload.payment_method;
            state.addPaymentMethodError = null;
        },
        [addPaymentMethod.rejected]: (state, action) => {
            state.addPaymentMethodLoading = false;
            state.paymentMethod = null;
            state.addPaymentMethodError = action.error;
        },
        [fetchPaymentMethods.pending]: (state, action) => {
            state.fetchPaymentMethodsLoading = true;
            state.paymentMethods = [];
            state.fetchPaymentMethodsError = null;
        },
        [fetchPaymentMethods.fulfilled]: (state, action) => {
            state.fetchPaymentMethodsLoading = false;
            state.paymentMethods = action.payload.payment_methods;
            state.fetchPaymentMethodsError = null;
        },
        [fetchPaymentMethods.rejected]: (state, action) => {
            state.fetchPaymentMethodsLoading = false;
            state.paymentMethods = [];
            state.fetchPaymentMethodsError = action.error;
        },
        [setDefaultPaymentMethod.pending]: (state, action) => {
            state.setDefaultPaymentMethodLoading = true;
            state.setDefaultPaymentMethodSuccess = null;
            state.setDefaultPaymentMethodError = null;
        },
        [setDefaultPaymentMethod.fulfilled]: (state, action) => {
            state.setDefaultPaymentMethodLoading = false;
            state.setDefaultPaymentMethodSuccess = action.payload;
            state.setDefaultPaymentMethodError = null;
        },
        [setDefaultPaymentMethod.rejected]: (state, action) => {
            state.setDefaultPaymentMethodLoading = false;
            state.setDefaultPaymentMethodSuccess = null;
            state.setDefaultPaymentMethodError = action.error; 
        },
        [fetchProducts.pending]: (state, action) => {
            state.fetchProductsLoading = true;
            state.fetchProductsError = null;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.fetchProductsLoading = false;
            state.products = action.payload.products;
            state.fetchProductsError = null;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.fetchPaymentIntentLoading = false;
            state.fetchProductsError = action.error;
        }
    },
});

export default subscriptionSlice.reducer;

