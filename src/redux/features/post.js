import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { handleFetch } from "../../common/requestUtils";
import { async } from 'regenerator-runtime';

const initialState = {
    addPostPending: false,
    addPostSuccess: false,
    addPostError: null,
    getPostsPending: false,
    getPostsSuccess: false,
    getPostsError: null,
    deletePostPending: false,
    deletePostSuccess: false,
    deletePostError: null,
    feed: [],
}

//Actions
const ADD_POST = 'post/ADD_POST';
const GET_POSTS = 'post/GET_POSTS';
const DELETE_POST = 'post/DELETE_POST';

export const addPost = createAsyncThunk(
    ADD_POST,
    async (payload, store) => {
        const { token } = store.getState().authentication;
        return await handleFetch('POST', '/posts', payload, token);
    }
);

export const getPosts = createAsyncThunk(
    GET_POSTS,
    async (params, store) => {
        const { token } = store.getState().authentication;
        return await handleFetch('GET', '/posts', params, token);
    }
)

export const deletePost = createAsyncThunk(
    DELETE_POST,
    async (post_id, store) => {
        const { token } = store.getState().authentication;
        return await handleFetch('DELETE', `posts/${post_id}`, null, token)
    } 
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        [addPost.pending]: (state, action) => {
            state.addPostPending = true;
            state.addPostSuccess = false;
            state.addPostError = null;
        },
        [addPost.fulfilled]: (state, action) => {
            state.addPostPending = false;
            state.addPostSuccess = true;
            state.addPostError = null;
            state.feed.unshift(action.payload.post);
        },
        [addPost.rejected]: (state, action) => {
            state.addPostPending = false;
            state.addPostSuccess = false;
            state.addPostError = action.error;
        },
        [getPosts.pending]: (state, action) => {
            state.getPostsPending = true;
            state.getPostsSuccess = false;
            state.getPostsError = null;
        }, 
        [getPosts.fulfilled]: (state, action) => {
            state.getPostsPending = false;
            state.getPostsSuccess = true;
            state.getPostsError = null;
            console.log(action);
            state.feed = action.payload.posts;
        },
        [getPosts.rejected]: (state, action) => {
            state.getPostsPending = false;
            state.getPostsSuccess = false;
            state.getPostsError = action.payload;
        },
        [deletePost.pending]: (state, action) => {
            state.deletePostPending = true;
            state.deletePostSuccess = false;
            state.deletePostError = null;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.deletePostPending = false;
            state.deletePostSuccess = true;
            state.deletePostError = null;
            state.feed = state.feed.filter(post => post.post_id != action.meta.arg);
        }, 
        [deletePost.rejected]: (state, action) => {
            state.deletePostPending = false;
            state.deletePostSuccess = false;
            state.deletePostError = action.error;
        }
    }
});

export default postSlice.reducer;