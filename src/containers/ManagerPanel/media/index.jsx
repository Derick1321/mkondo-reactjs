import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ManageMediaItem } from './item';
import { useLocation, useParams, generatePath } from 'react-router-dom';
import { fetchAudios, fetchMovies, fetchVideos } from '../../../redux/features/media';
import { routePaths } from '../../../common/routeConfig';


export const ManageMedia = () => {
    //hooks
    const { pathname } = useLocation();
    const { category, id } = useParams();

    //state
    const [media, setMedia] = useState([]);

    //store
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.media.movies);
    const isFetchingMovies = useSelector((state) => state.media.fetchMoviesLoading);
    const audios = useSelector((state) => state.media.audios);
    const isFetchingAudios = useSelector((state) => state.media.fetchAudiosLoading);
    const videos = useSelector((state) => state.media.videos);
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
    }, [pathname, id, albums])

    return (
        <div className={`${styles.container} container`}>
            <h2 className='text-light'>Manage Media</h2>
            <div className="row">
                {media.map(_media => (
                    <div className="col-lg-3 mb-3 align-items-stretch">
                        <ManageMediaItem key={_media.id} media={_media} />
                    </div>
                ))}
            </div>
        </div>
    )
}
