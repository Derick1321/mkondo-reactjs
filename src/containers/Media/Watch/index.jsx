import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMediaUrl } from '../../../common/utils';
import arrowLeft from '$assets/images/icons/arrow-left.svg';

import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { pause } from '$redux/features/player';

export const WatchMovie = (props) => {
    // ref

    // router
    const history = useHistory();

    // state
    const [movieUrl, setMovieUrl] = useState(null);

    // redux
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token);
    const currentMedia = useSelector(state => state.media.currentMedia);

    // effects
    useEffect(() => {
        dispatch(pause());
        
    }, [])
    useEffect(() => {
        if (!currentMedia) return;
        getMediaUrl(currentMedia.media_url, token).then(url => setMovieUrl(url));
    }, [currentMedia]);

    const handleBack = () => {
        console.debug("handle back clicked");
        history.goBack();
    }

    if (!movieUrl) {
        return (
            <div className={styles.loader}>
                <div className={styles.back} onClick={handleBack}>
                    <img src={arrowLeft} alt="" />
                </div>
                <span className="spinner-border"></span>
            </div>
        )
    }

    return (
        <div className={styles.theatre}>
            <div className={styles.back} onClick={handleBack}>
                <img src={arrowLeft} alt="" />
            </div>
            <center>
                <video src={movieUrl} autoPlay={true} controls={true}>
                </video>
            </center>
        </div>
    );
}
