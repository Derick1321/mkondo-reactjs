import React, { useEffect } from 'react'
import { generatePath, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getMedia } from '../../../redux/features/media';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getMediaUrl } from '../../../common/utils';
import styles from './index.module.scss';
import playSVG from '$assets/images/icons/play.svg';
import cancel from '$assets/images/icons/close.svg';
import Button from '../../../components/common/Button';
import FeatureHome from '../../../components/common/FeatureHome';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';


export const MediaDescriptionPage = (props) => {
    // router
    const { id } = useParams();
    const { push, goBack } = useHistory();

    // state
    const [trailerUrl, setTrailerUrl] = useState();

    // redux
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token ?? state.authentication.visitorToken);
    const currentMedia = useSelector(state => state.media.currentMedia);
    const getMediaPending = useSelector(state => state.media.getMediaPending);
    const getMediaError = useSelector(state => state.media.getMediaError);
    const fetchMoviesPending = useSelector(state => state.media.fetchMoviesPending);
    const similarMovies = useSelector(state => state.media.movies.slice(0, 4));

    // effects
    useEffect(() => {
        console.debug("DESC PAGE: id", id);
        if (!id) return;
        dispatch(getMedia(id));
    }, [id]);

    // effects
    useEffect(() => {
        console.debug("DESC PAGE: currentMedia", currentMedia);
        if (!currentMedia) return;
        if (currentMedia.series_id) {
            dispatch(fetchMovies({series_id: currentMedia.series_id, category: 'episode'}));
        } else {
            dispatch(fetchMovies({genres: currentMedia.genres ? currentMedia.genres.join(",") : ''}));
        }
        getMediaUrl(currentMedia.media_url, token).then(url => setTrailerUrl(url));
    }, [currentMedia]);

    const handleWatch = () => {
        push(generatePath(routePaths.watchMovie, {id: id}));
    }


    if (getMediaPending) {
        return (
            <div className={styles.loader}>
                <span className="spinner-border"></span>
            </div>
        )
    }

    if (getMediaError) {
        return <p>Sorry, Failed to Retrieve the media</p>
    }

    if (!currentMedia) {
        return <p>Sorry, Media not found</p>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.trailer}>
                {trailerUrl ? (
                    <video src={trailerUrl} muted={true} autoPlay={true}>
                    </video>
                ) : null}

                <div className={styles.close} onClick={goBack}>
                    <img src={cancel} alt="" />
                </div>

                <div className={styles.shade}></div>
                <div className={styles.description}>
                    <h1>{currentMedia.name}</h1>
                    <div className={styles.actions}>
                        <Button icon="play" onClick={handleWatch}>Play</Button>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.description}>
                    <p>{currentMedia.description}</p>
                </div>
                <div className={styles.extra}>
                    <p>
                        <span>Cast: </span>  {currentMedia.staring}
                    </p>
                    <p>
                        <span>Genres: </span> {currentMedia.genres ? currentMedia.genres.join(", ") : "N/A"}
                    </p>
                </div>
            </div>

            <div className={styles.similar}>
                <h2>More Like This</h2>
                {fetchMoviesPending ? <p>Fetching similar movies...</p> : null}

                <div className={styles.media}>
                    {similarMovies.map(movie => <FeatureHome media={movie} />)}
                </div>
            </div>

            <div className={styles.moreDetails}>
                <h2>About {currentMedia.name}</h2>
                <div>
                    <p>
                        <span>Director: </span>  {currentMedia.movie_director}
                    </p>
                    <p>
                        <span>Cast: </span>  {currentMedia.staring}
                    </p>
                    <p>
                        <span>Genres: </span> {currentMedia.genres ? currentMedia.genres.join(", ") : "N/A"}
                    </p>
                    <p>
                        <span>Production: </span> {currentMedia.production_company}
                    </p>
                </div>
            </div>
        </div>
    );
}
