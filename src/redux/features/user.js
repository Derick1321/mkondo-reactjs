import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { handleFetch } from '$common/requestUtils';
import { async } from 'regenerator-runtime';

const UPDATE_USER = 'user/UPDATE_USER';
const ADD_FAVORITE = 'user/ADD_FAVORITE';
const REMOVE_FAVORITE = 'user/REMOVE_FAVORITE';
const ADD_LIKE = 'user/ADD_LIKE';
const REMOVE_LIKE = 'user/REMOVE_LIKE';
const ADD_HISTORY = 'user/ADD_HISTORY';
const GET_MEDIA = 'user/GET_MEDIA';
const GET_HISTORY = 'user/GET_HISTORY';
const ADD_FOLLOWERS = 'user/ADD_FOLLOWERS';
const REMOVE_FOLLOWERS = 'user/REMOVE_FOLLOWERS';
const GET_SYSTEM_INSIGHT = 'user/GET_SYSTEM_INSIGHT';
const SEARCH_USERS = 'user/SEARCH_USERS';
const UPDATE_SYSTEM_USER = 'user/UPDATE_SYSTEM_USER';
const GET_ADMIN_INSIGHTS = 'user/GET_ADMIN_INSIGHTS';
const GET_USER = 'user/GET_USER';
const GET_USERS = 'user/GET_USERS';
const GET_USERMORE = 'user/GET_USERMORE';

// actions
export const updateUser = createAsyncThunk(
    UPDATE_USER,
    async (data, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('PUT', `users/${data.id}`, data.payload, token);
    }
);

export const addFavorite = createAsyncThunk(
    ADD_FAVORITE,
    async (data, param) => {
        const { token, user } = param.getState().authentication;
        return await handleFetch('POST', `users/${user.user_id}/favourites`, data, token);
    }
);

export const removeFavorite = createAsyncThunk(
    REMOVE_FAVORITE,
    async (data, param) => {
        const { token, user } = param.getState().authentication;
        return await handleFetch('DELETE', `users/${user.user_id}/favourites`, data, token);
    }
);

export const addLikes = createAsyncThunk(
    ADD_LIKE,
    async (data, param) => {
        // payload {media_id: value}
        const { token, user } = param.getState().authentication;
        return await handleFetch('POST', `users/${user.user_id}/likes`, data, token);
    }
);

export const removeLikes = createAsyncThunk(
    REMOVE_LIKE,
    async (data, param) => {
        // payload {media_id: value}
        const { token, user } = param.getState().authentication;
        return await handleFetch('DELETE', `users/${user.user_id}/likes`, data, token);
    }
);

export const addFollowers = createAsyncThunk(
    ADD_FOLLOWERS,
    async (data, param) => {
        const { token, user } = param.getState().authentication;
        return await handleFetch('POST', `users/${user.user_id}/followers`, data, token);
    }
);

export const removeFollowers = createAsyncThunk(
    REMOVE_FOLLOWERS,
    async (data, param) => {
        const { token, user } = param.getState().authentication;
        return await handleFetch('DELETE', `users/${user.user_id}/followers`, data, token);
    }
);

export const addHistory = createAsyncThunk(
    ADD_HISTORY,
    async (data, param) => {
        const { token, user } = param.getState().authentication;
        return await handleFetch('POST', `users/${user.user_id}/history`, data, token);
    }
);

export const getUserMedia = createAsyncThunk(
    GET_MEDIA,
    async (data, param) => {
        const { token, user } = param.getState().authentication;
        return await handleFetch('GET', `users/${user.user_id}/media`, null, token);
    }
);

export const getHistory = createAsyncThunk(
    GET_HISTORY,
    async (data, param) => {
        const { token, user } = param.getState().authentication;
        return await handleFetch('GET', `users/${user.user_id}/history`, null, token);
    }
);


export const getSystemInsight = createAsyncThunk(
    GET_SYSTEM_INSIGHT,
    async (id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('GET', 'insights/audio/users', null, token);
    }
);

export const searchUsers = createAsyncThunk(
    SEARCH_USERS,
    async (id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('GET', 'users', null, token);
    }
);

export const updateSystemUser = createAsyncThunk(
    UPDATE_SYSTEM_USER,
    async (data, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('PUT', 'users', data, token);
    }
);

export const getAdminInsights = createAsyncThunk(
    GET_ADMIN_INSIGHTS,
    async (data, store) => {
        const token = store.getState().authentication.token;
        const userId = store.getState().authentication.user.user_id;
        return handleFetch('GET', `admin/${userId}/insights`, null, token);
    }
);

export const getUser = createAsyncThunk(
    GET_USER,
    async (data, store) => {
        const token = store.getState().authentication.token;
        const userId = store.getState().authentication.user.user_id;
        return handleFetch('GET', `users/${userId}`, null, token);
    }
)

export const getUsers = createAsyncThunk(GET_USERS, async (data, store) => {
    const token = store.getState().authentication.token;
    return handleFetch('GET', `users`, null, token);
})
export const getUserMore = createAsyncThunk(GET_USERMORE, async (data, store) => {
    const token = store.getState().authentication.token;
    const { hasNext, next } = store.getState().user.getUsers.pagination;
    if (!hasNext) return;
    return await handleFetch('GET', next, null, token);

});



const initialState = {
    updateUserPending: false,
    updateUserError: null,
    updateUserComplete: false,
    addFavoritePending: false,
    addFavoriteError: null,
    addFavoriteComplete: false,
    removeFavoritePending: false,
    removeFavoriteError: null,
    removeFavoriteComplete: false,
    addLikesPending: false,
    addLikesError: null,
    addLikesComplete: false,
    removeLikesPending: false,
    removeLikesError: null,
    removeLikesComplete: false,
    addFollowersPending: false,
    addFollowersError: null,
    addFollowersComplete: false,
    removeFollowersPending: false,
    removeFollowersError: null,
    removeFollowersComplete: false,
    updateSystemUserPending: false,
    updateSystemUserError: null,
    updateSystemUserComplete: false,
    addHistoryPending: false,
    addHistoryError: null,
    addHistoryComplete: false,
    getHistoryPending: false,
    getHistoryError: null,
    getHistoryComplete: false,
    history: [],
    getUserMediaPending: false,
    getUserMediaError: null,
    getUserMediaComplete: false,
    searchUsersPending: false,
    searchUsersError: null,
    searchUsersComplete: false,
    getSystemInsightPending: false,
    getSystemInsightError: null,
    getSystemInsightComplete: false,
    getAdminInsightsPending: false,
    getAdminInsightsComplete: false,
    getAdminInsightsError: null,
    //none

    getUserMorePending: true,
    getUserMoreError: null,
    //none
    userMedia: [],
    currentPagination: {},
    insights: {},
    adminInsights: {},
    users: {
        total: 0,
        isDatamore: false,
        data: [],
    },
    getUser: {
        isLoading: false,
        isSuccessful: false,
        error: null,
        data: {},
    },
    getUsers: {
        isLoading: false,
        isSuccessful: false,
        error: null,
        data: {},
        isDataMore: false,
        pagination: {}

    },
    language: 'en',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLanguage(state, action) {
            console.log("[set Language]")
            state.language = action.payload;
        }
    },
    extraReducers: {
        [addFavorite.pending]: (state, action) => {
            state.addFavoritePending = true;
            state.addFavoriteComplete = false;
            state.addFavoriteError = null;
            state.newMediaId = null;
        },
        [addFavorite.fulfilled]: (state, action) => {
            state.addFavoritePending = false;
            state.addFavoriteComplete = true;
            state.addFavoriteError = null;
        },
        [addFavorite.rejected]: (state, action) => {
            state.addFavoritePending = false;
            state.addFavoriteComplete = false;
            state.addFavoriteError = action.error;
        },
        [removeFavorite.pending]: (state, action) => {
            state.removeFavoritePending = true;
            state.removeFavoriteComplete = false;
            state.removeFavoriteError = null;
            state.newMediaId = null;
        },
        [removeFavorite.fulfilled]: (state, action) => {
            state.removeFavoritePending = false;
            state.removeFavoriteComplete = true;
            state.removeFavoriteError = null;
        },
        [removeFavorite.rejected]: (state, action) => {
            state.removeFavoritePending = false;
            state.removeFavoriteComplete = false;
            state.removeFavoriteError = action.error;
        },
        [addLikes.pending]: (state, action) => {
            state.addLikesPending = true;
            state.addLikesComplete = false;
            state.addLikesError = null;
            state.newMediaId = null;
        },
        [addLikes.fulfilled]: (state, action) => {
            state.addLikesPending = false;
            state.addLikesComplete = true;
            state.addLikesError = null;
        },
        [addLikes.rejected]: (state, action) => {
            state.addLikesPending = false;
            state.addLikesComplete = false;
            state.addLikesError = action.error;
        },
        [removeLikes.pending]: (state, action) => {
            state.removeLikesPending = true;
            state.removeLikesComplete = false;
            state.removeLikesError = null;
            state.newMediaId = null;
        },
        [removeLikes.fulfilled]: (state, action) => {
            state.removeLikesPending = false;
            state.removeLikesComplete = true;
            state.removeLikesError = null;
        },
        [removeLikes.rejected]: (state, action) => {
            state.removeLikesPending = false;
            state.removeLikesComplete = false;
            state.removeLikesError = action.error;
        },
        [addFollowers.pending]: (state, action) => {
            state.addFollowersPending = true;
            state.addFollowersComplete = false;
            state.addFollowersError = null;
            state.newMediaId = null;
        },
        [addFollowers.fulfilled]: (state, action) => {
            state.addFollowersPending = false;
            state.addFollowersComplete = true;
            state.addFollowersError = null;
        },
        [addFollowers.rejected]: (state, action) => {
            state.addFollowersPending = false;
            state.addFollowersComplete = false;
            state.addFollowersError = action.error;
        },
        [removeFollowers.pending]: (state, action) => {
            state.removeFollowersPending = true;
            state.removeFollowersComplete = false;
            state.removeFollowersError = null;
            state.newMediaId = null;
        },
        [removeFollowers.fulfilled]: (state, action) => {
            state.removeFollowersPending = false;
            state.removeFollowersComplete = true;
            state.removeFollowersError = null;
        },
        [removeFollowers.rejected]: (state, action) => {
            state.removeFollowersPending = false;
            state.removeFollowersComplete = false;
            state.removeFollowersError = action.error;
        },
        [addHistory.pending]: (state, action) => {
            state.addHistoryPending = true;
            state.addHistoryComplete = false;
            state.addHistoryError = null;
        },
        [addHistory.fulfilled]: (state, action) => {
            state.addHistoryPending = false;
            state.addHistoryComplete = true;
            state.addHistoryError = null;
        },
        [addHistory.rejected]: (state, action) => {
            state.addHistoryPending = false;
            state.addHistoryComplete = false;
            state.addHistoryError = action.error;
        },
        [getHistory.pending]: (state, action) => {
            state.getHistoryPending = true;
            state.getHistoryComplete = false;
            state.getHistoryError = null;
        },
        [getHistory.fulfilled]: (state, action) => {
            state.getHistoryPending = false;
            state.getHistoryComplete = true;
            state.getHistoryError = null;
            state.history = action.payload.media;
        },
        [getHistory.rejected]: (state, action) => {
            state.getHistoryPending = false;
            state.getHistoryComplete = false;
            state.getHistoryError = action.error;
            state.history = [];
        },
        [updateUser.pending]: (state, action) => {
            state.updateUserPending = true;
            state.updateUserComplete = false;
            state.updateUserError = null;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.updateUserPending = false;
            state.updateUserComplete = true;
            state.updateUserError = null;
        },
        [updateUser.rejected]: (state, action) => {
            state.updateUserPending = false;
            state.updateUserComplete = false;
            state.updateUserError = action.error;
        },
        [getUserMedia.pending]: (state, action) => {
            state.getUserMediaPending = true;
            state.getUserMediaComplete = false;
            state.getUserMediaError = null;
        },
        [getUserMedia.fulfilled]: (state, action) => {
            const { pagination, data } = action.payload.media;
            state.getUserMediaPending = false;
            state.getUserMediaComplete = true;
            state.getUserMediaError = null;
            state.userMedia = data;
            state.currentPagination = pagination;
        },
        [getUserMedia.rejected]: (state, action) => {
            state.getUserMediaPending = false;
            state.getUserMediaComplete = false;
            state.getUserMediaError = action.error;
        },
        [getSystemInsight.pending]: (state, action) => {
            state.getSystemInsightPending = true;
            state.getSystemInsightComplete = false;
            state.getSystemInsightError = null;
        },
        [getSystemInsight.fulfilled]: (state, action) => {
            state.getSystemInsightPending = false;
            state.getSystemInsightComplete = true;
            state.getSystemInsightError = null;
            state.insights = action.payload
        },
        [getSystemInsight.rejected]: (state, action) => {
            state.getSystemInsightPending = false;
            state.getSystemInsightComplete = false;
            state.getSystemInsightError = action.error;
        },
        [searchUsers.pending]: (state, action) => {
            state.searchUsersPending = true;
            state.searchUsersComplete = false;
            state.searchUsersError = null;
            state.users = initialState.users;
        },
        [searchUsers.fulfilled]: (state, action) => {
            state.searchUsersPending = false;
            state.searchUsersComplete = true;
            state.users = action.payload.users;
        },
        [searchUsers.rejected]: (state, action) => {
            state.searchUsersPending = false;
            state.searchUsersComplete = false;
            state.searchUsersError = action.error;
        },
        [updateSystemUser.pending]: (state, action) => {
            state.updateSystemUserPending = true;
            state.updateSystemUserComplete = false;
            state.updateSystemUserError = null;
            state.newMediaId = null;
        },
        [updateSystemUser.fulfilled]: (state, action) => {
            state.updateSystemUserPending = false;
            state.updateSystemUserComplete = true;
            state.updateSystemUserError = null;
        },
        [updateSystemUser.rejected]: (state, action) => {
            state.updateSystemUserPending = false;
            state.updateSystemUserComplete = false;
            state.updateSystemUserError = action.error;
        },
        [getAdminInsights.pending]: (state, action) => {
            state.getAdminInsightsPending = true;
            state.getAdminInsightsComplete = false;
            state.getAdminInsightsError = null;
        },
        [getAdminInsights.fulfilled]: (state, action) => {
            state.getAdminInsightsPending = false;
            state.getAdminInsightsComplete = true;
            state.adminInsights = action.payload;
        },
        [getAdminInsights.rejected]: (state, action) => {
            state.getAdminInsightsPending = false;
            state.getAdminInsightsComplete = false;
            state.getAdminInsightsError = action.error;
        },
        [getUser.pending]: (state, action) => {
            state.getUser.isLoading = true;
        },
        [getUsers.pending]: (state, action) => {
            state.getUsers.isLoading = true;
            state.getUsers.isSuccessful = false;
            state.getUsers.error = null;
        },
        [getUsers.rejected]: (state, action) => {
            state.getUsers.isLoading = false;
            state.getUsers.isSuccessful = false;
            state.getUsers.error = action.error;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.getUsers.isLoading = false;
            state.getUsers.isSuccessful = true;
            state.getUsers.error = null;
            state.getUsers.data = action.payload;
            state.users.data = action.payload.users.data
            state.users.total = action.payload.users.pagination.totalElements;
            state.getUsers.isDataMore = action.payload.users.pagination.hasNext;
            state.getUsers.pagination = action.payload.users.pagination
        },
        [getUserMore.pending]: (state) => {
            state.getUserMorePending = true;
            state.getUserMoreError = null;
        },
        [getUserMore.rejected]: (state, action) => {
            state.getUserMorePending = false;
            state.getUserMoreError = action.error;
        },
        [getUserMore.fulfilled]: (state, action) => {
            state.getUserMorePending = false;
            state.getUserMoreError = null;
            //console.log(action);
            state.users.data.push(...action.payload.users.data);
            /// state.getUsers.isDataMore = action.payload.users.pagination.hasNext;
        }
    }
});

export const { setLanguage } = userSlice.actions;

export default userSlice.reducer;

// selectors
// export const usersPaginationSelector = (state) => {
//     if (state.getUsers.data.users.pagination.hasNext) {
//         return state.getUsers.data.users.pagination.hasNext;
//     } else {
//         return {};
//     }
// }