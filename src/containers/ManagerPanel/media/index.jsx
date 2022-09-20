import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ManageMediaItem } from './item';
import { useLocation, useParams, generatePath, useHistory } from 'react-router-dom';
import { fetchAudios, fetchAudiosMore, fetchMovies, fetchMoviesMore, fetchVideos, fetchVideosMore } from '../../../redux/features/media';
import { routePaths } from '../../../common/routeConfig';


export const ManageMedia = () => {
    //hooks
    const { pathname } = useLocation();
    const { category, id } = useParams();
    const { push, goBack } = useHistory();

    //state
    const [media, setMedia] = useState([]);
    const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);

    //store
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.media.movies);
    const moviesPagination = useSelector((state) => state.media.moviesPagination);
    const isFetchingMovies = useSelector((state) => state.media.fetchMoviesLoading);
    const audios = useSelector((state) => state.media.audios);
    const audiosPagination = useSelector((state) => state.media.audiosPagination);
    const isFetchingAudios = useSelector((state) => state.media.fetchAudiosLoading);
    const videos = useSelector((state) => state.media.videos);
    const videosPagination = useSelector((state) => state.media.videosPagination);
    const isFetchingVideos = useSelector((state) => state.media.fetchVideoesLoading);
    const albums = useSelector((state) => state.media.albums);
    const series = useSelector((state) => state.media.mySeries);

     //effects
     useEffect(() => {
        console.log("Effect triggered", movies, !movies.length);
        if (!movies.length) {
            console.log("dispatching fetching movies action");
            dispatch(fetchMovies());
        }
        if (!audios.length) {
            console.log("dispatching fetching audios action");
            dispatch(fetchAudios());
        }
        if (!videos.length) {
            console.log("dispatching fetching videos action");
            dispatch(fetchVideos());
        }
    }, []);

    //effects
    useEffect(() => {
        if (!category) return;
        handleSetLoadmoreDisabled();
        switch (category) {
            case "movie":
                setMedia(movies);
                break;
            case "audio":
                setMedia(audios);
                break;
            case "video":
                setMedia(videos);
                break;
            default:
                setMedia([]);
                break;
        }
    }, [category, movies, audios, videos]);

    useEffect(() => {
        if (!id || !pathname || !albums) return;
        if (pathname == generatePath(routePaths.manageAlbumSongs, { id: id, })) {
            //albums
            const album = albums.find(x => x.album_id == id);
            if (!album.songs) return;
            setMedia(album.songs);
        }
        if (pathname == generatePath(routePaths.managerPanelManageSeriesEpisods, { id: id, })) {
            //albums
            const _series = series.find(x => x.series_id == id);
            if (!_series.episodes) return;
            setMedia(_series.episodes);
        }
    }, [pathname, id, albums]);

    useEffect(() => {
        handleSetLoadmoreDisabled();
    }, [videosPagination, audiosPagination, moviesPagination]);

    // handlers
    const loadMore = () => {
        switch (category) {
            case "movie":
                dispatch(fetchMoviesMore());
                break;
            case "audio":
                dispatch(fetchAudiosMore());
                break;
            case "video":
                dispatch(fetchVideosMore());
                break;
            default:
                break;
        }
    }

    const handleSetLoadmoreDisabled = () => {
        switch (category) {
            case "movie":
                setLoadMoreDisabled(!moviesPagination.hasNext);
                break;
            case "audio":
                setLoadMoreDisabled(!audiosPagination.hasNext);
                break;
            case "video":
                setLoadMoreDisabled(!videosPagination.hasNext);
                break;
            default:
                setLoadMoreDisabled(true);
                break;
        }
    }

    return (
        <div className={`${styles.container} container`}>
            <button className='btn btn-primary' onClick={() => goBack()}>Back</button>
            <h2 className='text-light'>Manage Media</h2>
            <div className="row">
                {media.map(_media => (
                    <div className="col-lg-3 mb-3 align-items-stretch">
                        <ManageMediaItem key={_media.id} media={_media} />
                    </div>
                ))}

                <div className="mt-2 mb-5">
                    <button className="btn btn-lg btn-primary" onClick={loadMore} disabled={loadMoreDisabled}>Load More</button>
                </div>
            </div>
        </div>
    )
}
