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


export const SeriesDescriptionPage = (props) => {
    // router
    const { id, series_id } = useParams();
    const { push, goBack } = useHistory();

    // state
    const [trailerUrl, setTrailerUrl] = useState();
    const [series, setSeries] = useState(null);
    const [isFetchingTrailerUrl, setIsFetchingTrailerUrl] = useState(false);

    // redux
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token ?? state.authentication.visitorToken);
    const currentMedia = useSelector(state => state.media.currentMedia);
    const getMediaPending = useSelector(state => state.media.getMediaPending);
    const getMediaError = useSelector(state => state.media.getMediaError);
    const fetchMoviesPending = useSelector(state => state.media.fetchMoviesPending);
    const similarMovies = useSelector(state => state.media.movies.slice(0, 4));
    const seriesbag = useSelector(state => state.media.mySeries);

    // effects
    // useEffect(() => {
    //     console.debug("DESC PAGE: id", id);
    //     if (!id) return;
    //     dispatch(getMedia(id));
    // }, [id]);

    // effects
    useEffect(() => {
        console.debug("DESC PAGE: series", series);
        if (!seriesbag) return;
        if (!series_id) return;

        let _series = seriesbag.find(s => s.series_id == series_id);
        if (series) {
            setSeries(_series);
        }
    }, [seriesbag, series_id]);

    useEffect(() => {
        if (!series) return;
        setIsFetchingTrailerUrl(true)
        getMediaUrl(series.trailer_url, token)
            .then(url => {
                setTrailerUrl(url)
                setIsFetchingTrailerUrl(false);
            })
            .catch(e => setIsFetchingTrailerUrl(false));
    }, [series])

    const handleWatch = () => {
        push(generatePath(routePaths.watchMovie, {id: series.episodes[0].media_id}));
    }


    if (!series) {
        return (
            <div className={styles.loader}>
                <span className="spinner-border mr-2"></span>
                <span>Fetching Series</span>
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
                    <h1>{series.title}</h1>
                    <div className={styles.actions}>
                        <Button icon="play" onClick={handleWatch}>Play</Button>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.description}>
                    <p>{series.description}</p>
                </div>
                <div className={styles.extra}>
                    {/* <p>
                        <span>Cast: </span>  {currentMedia.staring}
                    </p>
                    <p>
                        <span>Genres: </span> {currentMedia.genres ? currentMedia.genres.join(", ") : "N/A"}
                    </p> */}
                </div>
            </div>

            <div className={styles.similar}>
                <h2>Episodes</h2>

                <div className={styles.media}>
                    {series.episodes.map(ep => <FeatureHome media={ep} />)}
                </div>
            </div>
        </div>
    );
}
