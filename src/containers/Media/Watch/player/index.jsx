import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMediaUrl } from '../../../../common/utils';
import arrowLeft from '$assets/images/icons/arrow-left.svg';

import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { pause } from '$redux/features/player';

import settings from '$assets/images/icons/settings.svg';
import { IconSettings } from '../../../../components/icons/settings';
import { IconPlay } from '../../../../components/icons/play';
import { IconArrowLeft } from '../../../../components/icons/arrow-left';
import { IconPause } from '../../../../components/icons/pause';
import { IconPrev } from '../../../../components/icons/prev';
import { IconNext } from '../../../../components/icons/next';
import player from '../../../../redux/features/player';
import { IconVolume } from '../../../../components/icons/volume';
import { IconMute } from '../../../../components/icons/mute';

const VideoPlayer = (props) => {
    // ref
    const playerRef = useRef();

    // router
    const history = useHistory();

    // state
    const [videoUrl, setVideoUrl] = useState(null);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [durationFormated, setDurationFormated] = useState('00:00')
    const [progress, setProgress] = useState(0);
    const [progressFormated, setProgressFormated] = useState('00:00')
    const [progressPercent, setProgressPercent] = useState(0);
    const [showQuality, toggleQuality] = useState(false);
    const [qualities, setQualities] = useState([]);
    const [currentQuality, setCurrentQuality] = useState('DEFAULT');

    const [volume, setVolume] = useState(1);
    const [mute, setMute] = useState(false);

    const [isPlaying, setIsPlaying] = useState(true);

    // redux
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token);
    const currentMedia = useSelector(state => state.media.currentMedia);

    // effects
    useEffect(() => {
        dispatch(pause());
    }, []);

    useEffect(() => {
        if (!playerRef.current) return;

        const player = playerRef.current;

        player.addEventListener('timeupdate', handleTimeUpdate);
        player.addEventListener('durationchange', handleDurationChange);
        player.addEventListener('progress', handleBuffered);

        return () => {
            player.removeEventListener('timeupdate', handleTimeUpdate);
            player.removeEventListener('durationchange', handleDurationChange);
            player.removeEventListener('progress', handleBuffered);
        };
    }, [playerRef]);

    useEffect(() => {
        if (!currentMedia) return;
        
        getMediaUrl(currentMedia.media_url, token).then(url => setVideoUrl(url));

        if (currentMedia.video_qualities) {
            _qualities = Object.keys(currentMedia.video_qualities).map(key => {
                if (['1080', '720', '480', '360', '240', '144'].includes(key)) {
                    return key;
                } else {
                    if (key > 720) {
                        return key;
                    }
                }
            }).filter(f => f);
            setQualities(_qualities);
        }
    }, [currentMedia]);

    useEffect(() => {
        setProgressPercent((progress/duration)*100);
    }, [progress, duration]);

    useEffect(() => {
        setProgressFormated(durationToTime(progress));
    }, [progress]);

    useEffect(() => {
        setDurationFormated(durationToTime(duration));
    }, [duration]);

    useEffect(() => {
        if (currentQuality == 'DEFAULT') {
            getMediaUrl(currentMedia.media_url, token).then(url => setVideoUrl(url));
            return;
        }

        if (currentMedia.video_qualities[currentQuality]) {
            getMediaUrl(currentMedia.video_qualities[currentQuality], token).then(url => setVideoUrl(url));
            return;
        } else {
            getMediaUrl(currentMedia.media_url, token).then(url => setVideoUrl(url));
            return;
        }
    }, [currentQuality])

    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;
        player.volume = volume;
    }, [volume, playerRef])

    const handleBack = () => {
        console.debug("handle back clicked");
        history.goBack();
    }

    const handleSetQuality = (q) => {
        setCurrentQuality(q)
    }

    // player based functions
    const togglePlay = () => {
        if (!playerRef.current) return;
        const player = playerRef.current;
        if (player.paused || player.ended) {
            player.play();
            setIsPlaying(true);
        } else {
            player.pause();
            setIsPlaying(false);
        }
    }

    // if (!videoUrl) {
    //     return (
    //         <div className={styles.loader}>
    //             <div className={styles.back} onClick={handleBack}>
    //                 <img src={arrowLeft} alt="" />
    //             </div>
    //             <span className="spinner-border"></span>
    //         </div>
    //     )
    // }
    // player actions
    const handleSeek = (e) => {
        const player = playerRef.current;
        player.currentTime = e.target.value
        setProgress(e.target.value)
    }

    const handleFoward = () => {
        const player = playerRef.current;
        player.currentTime += 10;
    }

    const handleRewind = () => {
        const player = playerRef.current;
        player.currentTime -= 10;
    }

    const handleVolume = (e) => {
        setVolume(e.target.value);
    }
 
    // player event handlers
    const handleTimeUpdate = () => {
        const player = playerRef.current;
        setProgress(player.currentTime);
        console.log("PLAYER: currentTiem", player.currentTime);
    }

    const handleDurationChange = () => {
        const player = playerRef.current;
        setDuration(player.duration);
        console.log("PLAYER: duration", player.duration);
    }

    const handleBuffered = () => {
        const player = playerRef.current;
        setBuffered(player.buffered.end(0));
        console.log("PLAYER: buffered", player.buffered.end(0));
    }

    const handleWaiting = () => {}
    const handleSeeking = () => {}
    const handleEnded = () => {}
    const handleEmptied = () => {}

    const durationToTime = (duration) => {
        let hours = parseInt((duration / 60 / 60) % 60);
        let sec = parseInt(duration % 60);
        let mins = parseInt((duration / 60) % 60);
        
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

    return (
        <div className={styles.theatre}>
            <center>
                <video ref={playerRef} src={videoUrl} autoPlay={true} controls={false} controlsList="nodownload">
                </video>
            </center>

            <div className={styles.controls}>
                {/* <div className={`spinner-border spinner-lg ${styles.loader}`}></div> */}
                <div className={styles.range}>
                    <div className={styles.sliderWrapper}>
                        <div className={styles.bottom}></div>
                        <div style={{ width: `${(buffered/duration*100)}%` }} className={styles.buffered}></div>
                        <div style={{ width: `${(progress/duration*100)}%` }} className={styles.progress}></div>
                        <input className={styles.slider} type="range" min="0" max={duration} value={progress} step={0.01} onChange={handleSeek} />
                    </div>
                    <span>{progressFormated} / {durationFormated}</span>
                </div>
               
               <div className={styles.actions}>
                    <div className={styles.main}>
                        <div className={styles.playBtn} onClick={togglePlay}>
                            {isPlaying ? <IconPause height="30px" width="30px" /> : <IconPlay height="30px" width="30px" />}
                        </div>

                        <div className='d-flex'>
                            <div className="mx-3" onClick={handleRewind}>
                                <IconPrev height="24px" width="24px" />
                            </div>
                            <div className="" onClick={handleFoward}>
                                <IconNext height="24px" width="24px" />
                            </div>
                        </div>

                        <div className={styles.volume}>
                            <div className="" onClick="">
                                {volume > 0 ? <IconVolume height="24px" width="24px" /> : <IconMute height="24px" width="24px" />}
                            </div>

                            <div className={styles.sliderWrapper}>
                                <div className={styles.bottom}></div>
                                <div style={{ width: `${volume * 100}px` }} className={styles.progress}></div>
                                <input className={styles.slider} type="range" min="0" max="1" value={volume} step={0.01} onChange={handleVolume} />
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.quality} onClick={() => toggleQuality(!showQuality)}>
                        <IconSettings height="22px" width="22px" />
                        <div className={styles.menu} style={{ display: showQuality ? 'block' : 'none' }}>
                            {qualities.map(q => <div className={currentQuality == q ? styles.active : null} onClick={() => handleSetQuality(q)}>{q > 720 ? 1080 : q}p</div>)}
                            <div className={currentQuality == 'DEFAULT' ? styles.active : null} onClick={() => handleSetQuality('DEFAULT')}>DEFAULT</div>
                            {/* <div>1080p</div>
                            <div>720p</div>
                            <div>480p</div>
                            <div>360p</div>
                            <div>240p</div>
                            <div>144p</div> */}
                        </div>
                    </div>
               </div>
            </div>
        </div>
    );
}

export default VideoPlayer;