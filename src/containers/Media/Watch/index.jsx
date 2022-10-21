import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMediaUrl } from '../../../common/utils';
import arrowLeft from '$assets/images/icons/arrow-left.svg';

import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { pause } from '$redux/features/player';

import settings from '$assets/images/icons/settings.svg';
import { IconSettings } from '../../../components/icons/settings';
import { IconPlay } from '../../../components/icons/play';
import { IconArrowLeft } from '../../../components/icons/arrow-left';

export const WatchMovie = (props) => {
    // ref
    const playerRef = useRef();

    // router
    const history = useHistory();

    // state
    const [movieUrl, setMovieUrl] = useState(null);
    const [duration, setDuration] = useState(100);
    const [progress, setProgress] = useState(0);
    const [progressPercent, setProgressPercent] = useState(0);
    const [showQuality, toggleQuality] = useState(false);

    // redux
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token);
    const currentMedia = useSelector(state => state.media.currentMedia);

    // effects
    useEffect(() => {
        dispatch(pause());
    }, []);

    useEffect(() => {
        if (!currentMedia) return;
        getMediaUrl(currentMedia.media_url, token).then(url => setMovieUrl(url));
    }, [currentMedia]);

    useEffect(() => {
        setProgressPercent((progress/duration)*100);
    }, [progress, duration]);

    const handleBack = () => {
        console.debug("handle back clicked");
        history.goBack();
    }

    // player based functions
    const togglePlay = () => {
        if (!playerRef.current) return;
        const player = playerRef.current;
        if (player.paused || player.ended) {
            player.play();
        } else {
            player.pause();
        }
    }

    // if (!movieUrl) {
    //     return (
    //         <div className={styles.loader}>
    //             <div className={styles.back} onClick={handleBack}>
    //                 <img src={arrowLeft} alt="" />
    //             </div>
    //             <span className="spinner-border"></span>
    //         </div>
    //     )
    // }

    return (
        <div className={styles.theatre}>
            <div className={styles.back} onClick={handleBack}>
                <IconArrowLeft height="30px" width="30px" color="white" />
            </div>
            <center>
                <video ref={playerRef} src={movieUrl} autoPlay={true} controls={false} controlsList="nodownload">
                </video>
            </center>

            <div className={styles.controls}>
                <div className={styles.range}>
                    <div className={styles.sliderWrapper}>
                        <div className={styles.bottom}></div>
                        <div style={{ width: `${(progress/duration*100)}%` }} className={styles.buffered}></div>
                        <div style={{ width: `${(progress/duration*100)}%` }} className={styles.progress}></div>
                        <input className={styles.slider} type="range" min="0" max={duration} value={progress} step={0.01} onChange={e => setProgress(e.target.value)} />
                    </div>
                    <span>01:20</span>
                </div>
               
               <div className={styles.actions}>
                    <div className={styles.main}>
                        <div className={styles.playBtn} onClick={togglePlay}>
                            <IconPlay height="30px" width="30px" />
                        </div>
                    </div>
                    <div className={styles.quality} onClick={() => toggleQuality(!showQuality)}>
                        <IconSettings height="22px" width="22px" />
                        <div className={styles.menu} style={{ display: showQuality ? 'block' : 'none' }}>
                            <div>1080p</div>
                            <div>720p</div>
                            <div>480p</div>
                            <div>360p</div>
                            <div>240p</div>
                            <div>144p</div>
                        </div>
                    </div>
               </div>

                

            </div>
        </div>
    );
}
