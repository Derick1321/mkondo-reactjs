import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ManageMediaItem } from './item';
import { useParams } from 'react-router-dom';
import { fetchAudios, fetchMovies, fetchVideos } from '../../../redux/features/media';


export const ManageMedia = () => {
    //hooks
    const { category } = useParams();

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

    return (
        <div className={`${styles.container} container`}>
            <h2 className='text-light'>Manage Media</h2>
            <div>
                {media.map(_media => <ManageMediaItem key={_media.id} media={_media} />)}
            </div>
        </div>
    )
}
