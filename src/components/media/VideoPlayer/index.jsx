import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import screenfull from 'screenfull'

import PlayBtn from '$components/media/PlayBtn';
import Button from '$components/common/Button';
import ProgressSlider from '$components/media/ProgressSlider';
import VolumeSlider from '$components/media/VolumeSlider';

import { getFileURL } from '$common/utils';
import { toggleFooterPlayer } from '$redux/features/nav';
import { pause } from '$redux/features/player';

import styles from './index.module.scss';

import videojs from "video.js";
import "video.js/dist/video-js.css";
import { handleFetch } from '../../../common/requestUtils';

const fullscreen = require('$assets/images/icons/fullscreen.svg');

const VideoPlayer = (props) => {
  // props
  const {
    file,
    url,
  } = props;

  const dispatch = useDispatch();

  const token = useSelector((store) => store.authentication.token);
  const volume = useSelector((store) => store.player.volume);

  // state
  const [localUrl, setLocalUrl] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isFixed, setIsFixed] = useState(false)

  
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  // effects
  useEffect(() => {
    dispatch(toggleFooterPlayer(false));
    window.addEventListener("scroll", listenScrollEvent)
    return () => {
      dispatch(toggleFooterPlayer(true));
      window.removeEventListener('scroll', listenScrollEvent);
    }
  }, []);

  useEffect(() => {
    if (!url) return;
    handleFetch('GET', `media/presigned-get-url?file_name=${url}`, null, token)
      .then((res) => {
        setMediaUrl(res.response);
      });
  }, [url]);

  useEffect(() => {
    if (!file) {
      return;
    }
    setLocalUrl(getFileURL(file));
  }, [file]);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, {}, () => {
        console.log("player is ready");
        setIsReady(true);
      });
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [videoRef]);

  useEffect(() => {
    const player = playerRef.current;
    
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef])

  // handler
  const handleProgress = (data) => {
    setPosition(data.playedSeconds);
  }

  const handleSeek = (value) => {
    if (!playerRef.current) {
      return;
    }
    playerRef.current.seekTo(value);
  }

  const handleDuration = (dur) => {
    setDuration(dur);
  }

  const togglePlay = () => {
    dispatch(pause());
    setIsPlaying(!isPlaying);
  }

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request(playerRef.current.wrapper);
    }
  }

  const listenScrollEvent = e => {
    console.log("Scroll event", playerRef.current.offsetTop);
    if (playerRef.current.offsetTop < 1) {
      if (!isFixed) {
        setIsFixed(true);
      }
    } else {
      if (isFixed) {
        setIsFixed(false);
      }
    }
  }

  // render

  if (!url && !localUrl) {
    return null;
  }

  return (
    <>
      <div className={styles.playerWrapper} style={{ 
          position: isFixed ? 'fixed' : 'relative',
        }}>
        <div className={styles.reactPlayer}>
          <div style={{ width:"100%", height:"100%" }} data-vjs-player>
            <video width="100%" height="100%" ref={videoRef} src={mediaUrl} autoPlay="true" controls="true" className="video-js vjs-big-play-centered"></video>
          </div>
          {/* <ReactPlayer
            ref={playerRef}
            url={url || localUrl}
            playing={isPlaying}
            volume={volume}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onBuffer={() => setIsLoading(true)}
            onBufferEnd={() => setIsLoading(false)}
            onReady={() => setIsReady(true)}
            width='100%'
            height='100%'
            controls={true}
          /> */}
          {
            !isReady && (
              <div className={`d-flex justify-content-center align-items-center ${styles.videoCover}`}>
                <div
                  className={`spinner-border spinner-dark ${styles.loader}`}
                  role="status"
                />
                <span className="mx-4 text-dark">Loading...</span>
              </div>
            )
          }
        </div>
      </div>
      {/* <div className={`d-flex ${styles.playerBar}`}>
        <Button
          onClick={togglePlay}
          isTransparent
          noBorder
        >
          <PlayBtn
            isPlaying={isPlaying}
            isLoading={isLoading}
          />
        </Button>
        <ProgressSlider
          position={position}
          duration={duration}
          progressInterval={250}
          onSeek={handleSeek}
        />
        <div className="mx-2">
          <VolumeSlider
            position={volume}
            setVolume
          />
        </div>
        <div>
          <Button
            onClick={handleFullScreen}
            isTransparent
            noBorder
          >
            <img
              className={styles.fullscreen}
              src={fullscreen}
              alt=""
            />
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default VideoPlayer;
