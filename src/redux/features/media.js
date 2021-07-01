import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { handleFetch, buildFormData } from '$common/requestUtils';
import { async } from 'regenerator-runtime';

const ADD_MEDIA = 'media/ADD_MEDIA';
const GET_ALL_MEDIA = 'media/GET_ALL_MEDIA';
const SAVE_MEDIA = 'media/SAVE_MEDIA';
const GET_MEDIA = 'media/GET_MEDIA';
const UPDATE_MEDIA = 'media/UPDATE_MEDIA';
const GET_NEW_RELEASES = 'media/GET_NEW_RELEASES';
const GET_TOP_MEDIAS = 'media/GET_TOP_MEDIAS';
const GET_RANDOM_MEDIAS = 'media/GET_RANDOM_MEDIAS';
const GET_TREND_MEDIAS = 'media/GET_TREND_MEDIAS';
const UPDATE_SHARE_COUNT = 'media/UPDATE_SHARE_COUNT';
const ADD_ALBUM = 'media/ADD_ALBUM';
const GET_ALBUMS = 'media/GET_ALBUMS';
const ADD_COMMENT = 'media/ADD_COMMENT';
const ADD_MEDIA_COMMENT = 'media/ADD_MEDIA_COMMENT';
const ADD_COMMENT_COMMENT = 'media/ADD_COMMENT_COMMENT';
const ADD_COMMENT_LIKE = 'media/ADD_COMMENT_LIKE';
const GET_COMMENT = 'media/GET_COMMENT';
const GET_COMMENT_REPLIES = 'media/GET_COMMENT_REPLIES';
const DELETE_COMMENT = 'media/DELETE_COMMENT';
const GET_RECOMENDED = 'media/GET_RECOMENDED';
const GET_POPULAR_RECOMENDED = 'media/GET_POPULAR_RECOMENDED';
const GET_SIMILAR_RECOMENDED = 'media/GET_SIMILAR_RECOMENDED';
const UPDATE_LIKE = 'media/UPDATE_LIKE';

// actions
export const addMedia = createAsyncThunk(
    ADD_MEDIA,
    async(data, param) => {
        const { token } = param.getState().authentication;
        if (data.file) {
            return await handleFetch('POST', 'media', data, token);
        }
        return await handleFetch('POST', 'media', data, token, '');
    }
);

export const getAllMedia = createAsyncThunk(
    GET_ALL_MEDIA,
    async(id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('GET', 'media', null, token);
    }
);

export const updateShareCount = createAsyncThunk(
    UPDATE_SHARE_COUNT,
    async(id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('POST', `media/${id}/shares`, null, token);
    }
);

export const getMedia = createAsyncThunk(
    GET_MEDIA,
    async(id, param) => {
        const { token, visitorToken } = param.getState().authentication;
        return await handleFetch('GET', `media/${id}`, null, token ?? visitorToken );
    }
);

export const getNewReleases = createAsyncThunk(
    GET_NEW_RELEASES,
    async(data, param) => {
        const { token, visitorToken } = param.getState().authentication;
        return await handleFetch('GET', `media/new-release?${queryString.stringify(data)}`, null, token || visitorToken);
    }
);

export const getTopMedias = createAsyncThunk(
    GET_TOP_MEDIAS,
    async(data, param) => {
        const { token, visitorToken } = param.getState().authentication;
        return await handleFetch('GET', `media/top-medias?${queryString.stringify(data)}`, null, token || visitorToken);
    }
);

export const getRandomMedias = createAsyncThunk(
    GET_RANDOM_MEDIAS,
    async(data, param) => {
        const { token, visitorToken } = param.getState().authentication;
        return await handleFetch('GET', `media/random-medias?${queryString.stringify(data)}`, null, token || visitorToken);
    }
);

export const getTrendMedias = createAsyncThunk(
    GET_TREND_MEDIAS,
    async(data, param) => {
        const { token, visitorToken } = param.getState().authentication;
        return await handleFetch('GET', `media/trend-medias?${queryString.stringify(data)}`, null, token || visitorToken);
    }
);

export const addAlbum = createAsyncThunk(
    ADD_ALBUM,
    async(data, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('POST', 'albums', data, token);
    }
);

export const addComment = createAsyncThunk(
    ADD_COMMENT,
    async(data, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('POST', 'comments', data, token);
    }
);

export const addMediaComment = createAsyncThunk(
    ADD_MEDIA_COMMENT,
    async(data, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('POST', `media/${data['media_id']}/comments`, data, token);
    }
)

export const addCommentLike = createAsyncThunk(
    ADD_COMMENT_LIKE, async (data, param) => {
        const { token, user } = param.getState().authentication;
        const payload = {
            "user_id": user.user_id,
        }
        return await handleFetch('POST', `comments/${data['comment_id']}/likes`, payload, token);
    }
)

export const addCommentComment = createAsyncThunk(
    ADD_COMMENT_COMMENT,
    async(data, store) => {
        const { token } = store.getState().authentication;
        return await handleFetch('POST', `comments/${data['comment_id']}/comments`, data, token);
    }
)

export const getComment = createAsyncThunk(
    GET_COMMENT,
    async(id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('GET', `media/${id}/comments`, null, token);
    }
);

export const getCommentReplies = createAsyncThunk(
    GET_COMMENT_REPLIES,
    async(id, store) => {
        const { token } = store.getState().authentication;
        updateCurrentComment(id);
        return await handleFetch('GET', `comments/${id}/comments`, null, token);
    }
)

export const deleteComment = createAsyncThunk(
    DELETE_COMMENT,
    async(id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('DELETE', `comments/${id}`, null, token);
    }
);

export const getRecommended = createAsyncThunk(
    GET_RECOMENDED,
    async(id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('GET', `media/recommended/${id}/similar`, null, token);
    }
);

export const getPopularRecommended = createAsyncThunk(
    GET_POPULAR_RECOMENDED,
    async(id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('GET', `media/recommended/${id}/popular`, null, token);
    }
);

export const getSimilarRecommended = createAsyncThunk(
    GET_SIMILAR_RECOMENDED,
    async(id, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('GET', `media/recommended/${id}/popular`, null, token);
    }
);

export const updateMedia = createAsyncThunk(
    UPDATE_MEDIA,
    async(data, param) => {
        const { token } = param.getState().authentication;
        return await handleFetch('PUT', `media/${data.id}`, data.payload, token);
    }
);

export const updateLike = createAsyncThunk(
    UPDATE_LIKE,
    async(mediaId, param) => {
        const { token, user } = param.getState().authentication;
        return await handleFetch('POST', `media/${mediaId}/like`, {user_id: user.user_id}, token);
    }
);

// save to digital ocean spaces
export const saveMedia = createAsyncThunk(
    SAVE_MEDIA,
    async(file, param) => {
        const { token } = param.getState().authentication;
        const fileName = `${Math.random().toString(36).substring(5)}${file.name}`;
        const result = await handleFetch('GET', `media/presigned-post-url?file_name=${fileName}`, null, token);
        const { fields, url } = result.response;

        try {
            const { headers, body: formData } = buildFormData(url, {
                ...fields,
                file,
            });

            const res = await fetch(url, {
                method: 'POST',
                body: formData,
                headers,
            });

            await res.text();
            return fileName;
        } catch (error) {
            throw error;
        }
    }
);

const initialState = {
    addMediaPending: false,
    addMediaError: null,
    addMediaComplete: false,
    getMediaPending: false,
    getMediaComplete: false,
    getMediaError: null,
    saveMediaPending: false,
    saveMediaError: null,
    saveMediaComplete: false,
    newMediaId: null,
    getNewReleasesPending: false,
    getNewReleasesComplete: false,
    getNewReleasesError: null,
    getTopMediasPending: false,
    getTopMediasComplete: false,
    getTopMediasError: null,
    getRandomMediasPending: false,
    getRandomMediasComplete: false,
    getRandomMediasError: null,
    getTrendMediasPending: false,
    getTrendMediasComplete: false,
    getTrendMediasError: null,
    updateShareCountPending: false,
    updateShareCountError: null,
    updateShareCountComplete: false,
    addAlbumPending: false,
    addAlbumError: null,
    addAlbumComplete: false,
    getCommentPending: false,
    getCommentError: null,
    getCommentComplete: false,
    getCommentRepliesPending: false,
    getCommentRepliesError: null,
    getCommentRepliesComplete: false,
    addCommentPending: false,
    addCommentError: null,
    addCommentComplete: false,
    replyCommentPending: false,
    replyCommentError: null,
    replyCommentComplete: false,
    deleteCommentPending: false,
    deleteCommentError: null,
    deleteCommentComplete: false,
    updateMediaPending: false,
    updateMediaError: null,
    updateMediaComplete: false,
    addCommentLikePending: false,
    addCommentLikeError: null,
    addCommentLikeComplete: false,
    currentMedia: {
        media_id: null,
        name: '',
        cover_url: null,
        owner_avatar_url: null,
    },
    newReleases: {
        audio: [],
        video: [],
        movie: [],
    },
    topMedias: {
        audio: [],
        video: [],
        movie: [],
    },
    randomMedias: {
        audio: [],
        video: [],
        movie: [],
    },
    trendMedias: {
        audio: [],
        video: [],
        movie: [],
    },
    albumId: null,
    comments: [],
    currentComment: null,
    recommendedMedia: [],
    popularRecommendedMedia: {
        success: '',
        media: []
    },
    similarRecommendedMedia: {
        success: '',
        media: []
    },
    lastUploaded: null,
};

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        clearNewMediaId(state) {
            state.newMediaId = null;
        },
        clearMedia(state) {
            state = initialState;
        },
        updateCurrentComment(state, action) {
            state.currentComment = action.payload ?? null;
        },
    },
    extraReducers: {
        [addMedia.pending]: (state, action) => {
            state.addMediaPending = true;
            state.addMediaComplete = false;
            state.addMediaError = null;
            state.newMediaId = null;
            state.lastUploaded = null;
        },
        [addMedia.fulfilled]: (state, action) => {
            state.addMediaPending = false;
            state.addMediaComplete = true;
            state.addMediaError = null;
            state.newMediaId = action.payload.media_id; // Prepare Deprecation
            state.lastUploaded = {
                ...action.meta.arg,
                mediaId: action.payload.media_id,
            };
        },
        [addMedia.rejected]: (state, action) => {
            state.addMediaPending = false;
            state.addMediaComplete = false;
            state.addMediaError = action.error;
        },
        [getMedia.pending]: (state, action) => {
            state.getMediaPending = true;
            state.getMediaComplete = false;
            state.getMediaError = null;
        },
        [getMedia.fulfilled]: (state, action) => {
            state.getMediaPending = false;
            state.getMediaComplete = true;
            state.getMediaError = null;
            state.currentMedia = action.payload.media;
        },
        [getMedia.rejected]: (state, action) => {
            state.getMediaPending = false;
            state.getMediaComplete = true;
            state.getMediaError = action.error;
        },
        [updateShareCount.pending]: (state, action) => {
            state.updateShareCountPending = true;
            state.updateShareCountComplete = false;
            state.updateShareCountError = null;
        },
        [updateShareCount.fulfilled]: (state, action) => {
            state.updateShareCountPending = false;
            state.updateShareCountComplete = true;
            state.updateShareCountError = null;
        },
        [updateShareCount.rejected]: (state, action) => {
            state.updateShareCountPending = false;
            state.updateShareCountComplete = false;
            state.updateShareCountError = action.error;
        },
        [addAlbum.pending]: (state, action) => {
            state.addAlbumPending = true;
            state.addAlbumComplete = false;
            state.addAlbumError = null;
            state.albumId = null;
        },
        [addAlbum.fulfilled]: (state, action) => {
            state.addAlbumPending = false;
            state.addAlbumComplete = true;
            state.addAlbumError = null;
            state.albumId = action.payload.album_id;
        },
        [addAlbum.rejected]: (state, action) => {
            state.addAlbumPending = false;
            state.addAlbumComplete = false;
            state.addAlbumError = action.error;
        },
        [saveMedia.pending]: (state, action) => {
            state.saveMediaPending = true;
            state.saveMediaComplete = false;
            state.saveMediaError = null;
        },
        [saveMedia.fulfilled]: (state, action) => {
            state.saveMediaComplete = true;
            state.saveMediaError = null;
            state.saveMediaPending = false;
            state.media = action.payload;
        },
        [saveMedia.rejected]: (state, action) => {
            state.saveMediaComplete = false;
            state.saveMediaError = action.error;
            state.saveMediaPending = false;
        },
        [getRecommended.pending]: (state, action) => {
            state.getRecommendedPending = true;
            state.getRecommendedComplete = false;
            state.getRecommendedError = null;
        },
        [getRecommended.fulfilled]: (state, action) => {
            state.getRecommendedPending = false;
            state.getRecommendedComplete = true;
            state.getRecommendedError = null;
            state.recommendedMedia = action.payload;
        },
        [getRecommended.rejected]: (state, action) => {
            state.getRecommendedPending = false;
            state.getRecommendedComplete = false;
            state.getRecommendedError = action.error;
        },
        [getPopularRecommended.pending]: (state, action) => {
            state.getPopularRecommendedPending = true;
            state.getPopularRecommendedComplete = false;
            state.getPopularRecommendedError = null;
        },
        [getPopularRecommended.fulfilled]: (state, action) => {
            state.getPopularRecommendedPending = false;
            state.getPopularRecommendedComplete = true;
            state.getPopularRecommendedError = null;
            state.popularRecommendedMedia = action.payload;
        },
        [getPopularRecommended.rejected]: (state, action) => {
            state.getPopularRecommendedPending = false;
            state.getPopularRecommendedComplete = false;
            state.getPopularRecommendedError = action.error;
        },
        [getSimilarRecommended.pending]: (state, action) => {
            state.getSimilarRecommendedPending = true;
            state.getSimilarRecommendedComplete = false;
            state.getSimilarRecommendedError = null;
        },
        [getSimilarRecommended.fulfilled]: (state, action) => {
            state.getSimilarRecommendedPending = false;
            state.getSimilarRecommendedComplete = true;
            state.getSimilarRecommendedError = null;
            state.similarRecommendedMedia = action.payload;
        },
        [getSimilarRecommended.rejected]: (state, action) => {
            state.getSimilarRecommendedPending = false;
            state.getSimilarRecommendedComplete = false;
            state.getSimilarRecommendedError = action.error;
        },
        [getNewReleases.pending]: (state, action) => {
            state.getNewReleasesPending = true;
            state.getNewReleasesComplete = false;
            state.getNewReleasesError = null;
        },
        [getNewReleases.fulfilled]: (state, action) => {
            state.getNewReleasesPending = false;
            state.getNewReleasesComplete = true;
            state.getNewReleasesError = null;
            state.newReleases[action.meta.arg.category] = action.payload.media;
        },
        [getNewReleases.rejected]: (state, action) => {
            state.getNewReleasesPending = false;
            state.getNewReleasesComplete = true;
            state.getNewReleasesError = action.error;
        },
        [getTopMedias.pending]: (state, action) => {
            state.getTopMediasPending = true;
            state.getTopMediasComplete = false;
            state.getTopMediasError = null;
        },
        [getTopMedias.fulfilled]: (state, action) => {
            state.getTopMediasPending = false;
            state.getTopMediasComplete = true;
            state.getTopMediasError = null;
            state.topMedias[action.meta.arg.category] = action.payload.media;
        },
        [getTopMedias.rejected]: (state, action) => {
            state.getTopMediasPending = false;
            state.getTopMediasComplete = true;
            state.getTopMediasError = action.error;
        },
        [getRandomMedias.pending]: (state, action) => {
            state.getRandomMediasPending = true;
            state.getRandomMediasComplete = false;
            state.getRandomMediasError = null;
        },
        [getRandomMedias.fulfilled]: (state, action) => {
            state.getRandomMediasPending = false;
            state.getRandomMediasComplete = true;
            state.getRandomMediasError = null;
            state.randomMedias[action.meta.arg.category] = action.payload.media;
        },
        [getRandomMedias.rejected]: (state, action) => {
            state.getRandomMediasPending = false;
            state.getRandomMediasComplete = true;
            state.getRandomMediasError = action.error;
        },
        [getTrendMedias.pending]: (state, action) => {
            state.getTrendMediasPending = true;
            state.getTrendMediasComplete = false;
            state.getTrendMediasError = null;
        },
        [getTrendMedias.fulfilled]: (state, action) => {
            state.getTrendMediasPending = false;
            state.getTrendMediasComplete = true;
            state.getTrendMediasError = null;
            state.trendMedias[action.meta.arg.category] = action.payload.media;
        },
        [getTrendMedias.rejected]: (state, action) => {
            state.getTrendMediasPending = false;
            state.getTrendMediasComplete = true;
            state.getTrendMediasError = action.error;
        },
        [addComment.pending]: (state, action) => {
            state.addCommentPending = true;
            state.addCommentComplete = false;
            state.addCommentError = null;
        },
        [addComment.fulfilled]: (state, action) => {
            state.addCommentPending = false;
            state.addCommentComplete = true;
            state.addCommentError = null;
        },
        [addComment.rejected]: (state, action) => {
            state.addCommentPending = false;
            state.addCommentComplete = true;
            state.addCommentError = action.error;
        },
        [addMediaComment.pending]: (state, action) => {
            state.addCommentPending = true;
            state.addCommentComplete = false;
            state.addCommentError = null;
        },
        [addMediaComment.fulfilled]: (state, action) => {
            state.addCommentPending = false;
            state.addCommentComplete = true;
            state.addCommentError = null;
        },
        [addMediaComment.rejected]: (state, action) => {
            state.addCommentPending = false;
            state.addCommentComplete = true;
            state.addCommentError = action.error;
        },
        [addCommentComment.pending]: (state, action) => {
            state.replyCommentPending = true;
            state.replyCommentError = null;
            state.replyCommentComplete = false;
        }, 
        [addCommentComment.fulfilled]: (state, action) => {
            state.replyCommentPending = false;
            state.replyCommentComplete = true;
            state.replyCommentError = null;

            //updating the replies
            let commentIndex = state.comments.findIndex((comment => comment.comment_id == state.currentComment));
            console.debug(commentIndex, current(state), current(state.comments), state.currentComment);
            if (state.comments[commentIndex]) {
                //the comment exists
                let comment = state.comments[commentIndex]
                if (comment.comments && comment.no_of_replies) {
                    comment.comments.push(action.payload["comment"])
                    comment.no_of_replies++;
                } else {
                    comment.comments = [].push(action.payload["comment"])
                    comment.no_of_replies = 1;
                }
                state.comments[commentIndex] = comment;
            }
            
        },
        [addCommentComment.rejected]: (state, action) => {
            state.replyCommentPending = false;
            state.replyCommentError = action.error;
            state.replyCommentSuccess = false;
        },
        [getComment.pending]: (state, action) => {
            state.getCommentPending = true;
            state.getCommentComplete = false;
            state.getCommentError = null;
            state.comments = [];
        },
        [getComment.fulfilled]: (state, action) => {
            state.getCommentPending = false;
            state.getCommentComplete = true;
            state.getCommentError = null;
            state.comments = action.payload.comments;
        },
        [getComment.rejected]: (state, action) => {
            state.getCommentPending = false;
            state.getCommentComplete = true;
            state.getCommentError = action.error;
        },
        [getCommentReplies.pending]: (state, action) => {
            state.getCommentRepliesPending = true;
            state.getCommentRepliesError = null;
            state.getCommentRepliesComplete = false;
        },
        [getCommentReplies.fulfilled]: (state, action) => {
            state.getCommentRepliesPending = false;
            state.getCommentRepliesError = null;
            state.getCommentRepliesComplete = true;
            //updating the replies
            let commentIndex = state.comments.find((comment => comment.comment_id == state.media.current_comment));
            state.comments[commentIndex].comments = action.payload.comments;
        },
        [getCommentReplies.rejected]: (state, action) => {
            state.getCommentRepliesPending = false;
            state.getCommentRepliesError = action.error;
            state.getCommentRepliesComplete = false;
        },
        [deleteComment.pending]: (state, action) => {
            state.deleteCommentPending = true;
            state.deleteCommentComplete = false;
            state.deleteCommentError = null;
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.deleteCommentPending = false;
            state.deleteCommentComplete = true;
            state.deleteCommentError = null;
        },
        [deleteComment.rejected]: (state, action) => {
            state.deleteCommentPending = false;
            state.deleteCommentComplete = true;
            state.deleteCommentError = action.error;
        },
        [updateMedia.pending]: (state, action) => {
            state.updateMediaPending = true;
            state.updateMediaComplete = false;
            state.updateMediaError = null;
            state.comments = [];
        },
        [updateMedia.fulfilled]: (state, action) => {
            state.updateMediaPending = false;
            state.updateMediaComplete = true;
            state.updateMediaError = null;
        },
        [updateMedia.rejected]: (state, action) => {
            state.updateMediaPending = false;
            state.updateMediaComplete = true;
            state.updateMediaError = action.error;
        },
        [addCommentLike.pending]: (state, action) => {
            state.addCommentLikePending = true;
            state.addCommentLikeComplete = false;
            state.addCommentLikeError = null;
        },
        [addCommentLike.fulfilled]: (state, action) => {
            state.addCommentLikePending = false;
            state.addCommentLikeComplete = true;
            state.addCommentLikeError = null;
        },
        [addCommentLike.rejected]: (state, action) => {
            state.addCommentLikePending = false;
            state.addCommentLikeComplete = false;
            state.addCommentLikeError = action.error;
        },
    }
});

export const { clearNewMediaId, clearMedia, updateCurrentComment } = mediaSlice.actions;
export default mediaSlice.reducer;