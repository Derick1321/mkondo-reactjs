import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import Slider from '$components/common/Slider';
import Slider from '$components/media/Slider';

import AudioPlayer from '$common/player';
import { formatTime } from '$common/utils';

import { addHistory } from '$redux/features/user';
import { setCurrentMediaId } from '$redux/features/media';

import styles from './index.module.scss';

const defaultAvatar = require('$assets/images/profile-user.svg');
const menuIcon = require('$assets/images/player/list-alt.svg');
const repeatIcon = require('$assets/images/player/repeat.svg');
const repeatActiveIcon = require('$assets/images/player/repeat-active.svg');
const shuffleIcon = require('$assets/images/player/shuffle.svg');
const shuffleActiveIcon = require('$assets/images/player/shuffle-active.svg');
const prevIcon = require('$assets/images/player/prev.svg');
const nextIcon = require('$assets/images/player/next.svg');
const playIcon = require('$assets/images/player/play.svg');
const pauseIcon = require('$assets/images/player/pause.svg');
const volumeFullIcon = require('$assets/images/player/volume-full.svg');

const Player = () => {
  // refs
  const audioRef = useRef(null);
  const seekPosRef = useRef(0);
  const timerRef = useRef(null);

  // state
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekPos, setSeekPos] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(100);

  // store
  const currentPlaylist = useSelector((store) => store.playlist.currentPlaylist);
  const dispatch = useDispatch();

  // functions
  const onPlay = (dur, mediaId) => {
    setIsPlaying(true);
    setDuration(dur);
    setIsLoading(false);
    dispatch(setCurrentMediaId(mediaId));
  }

  const onPause = (dur) => {
    onEnd();
  }

  const onEnd = () => {
    setIsPlaying(false);
    dispatch(setCurrentMediaId(null));
  }

  const onLoad = (mediaId) => {
    dispatch(addHistory({
      media_id: mediaId,
    }));
  }

  // effects
  useEffect(() => {
    const callbacks = {
      onPlay,
      onPause,
      onLoad,
      onEnd,
    }

    const newPlaylist = JSON.parse(JSON.stringify(currentPlaylist))
    audioRef.current = new AudioPlayer(newPlaylist, callbacks);
  }, []);

  useEffect(() => {
    const newPlaylist = JSON.parse(JSON.stringify(currentPlaylist));
    audioRef.current.updatePlaylist(newPlaylist);
    if (newPlaylist.length < 1) {
      return;
    }
    handlePlay();
  }, [currentPlaylist]);

  const getSeekPosition = () => {
    const obj = audioRef.current;
    const sound = obj.playlist[obj.index].howl;
    seekPosRef.current = sound.seek();
    setSeekPos(sound.seek());
  }

  const loop = () => {
    getSeekPosition();
    cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(() => loop());
  }

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(timerRef.current);
      return;
    }

    loop();

    return () => { // Return callback to run on unmount.
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isPlaying]);

  // handlers
  const resetPos = () => {
    setDuration(0);
    setSeekPos(0);
  }

  const handlePlay = () => {
    if (isLoading) {
      return;
    }

    // need a way to play current index
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play(audioRef.current.index);
      setIsLoading(true);
    }
  }

  const handleRepeat = () => {
    audioRef.current.repeat();
    setIsRepeat(audioRef.current.isRepeat);
  }

  const handleShuffle = () => {
    audioRef.current.shuffle();
    setIsShuffle(audioRef.current.isOnShuffle);
  }

  const handleNext = () => {
    audioRef.current.skip('next');
    resetPos();
  }

  const handlePrev = () => {
    audioRef.current.skip('prev');
    resetPos();
  }

  const buildPlayerControls = () => {
    let actionBtn = <img src={playIcon} />;
    if (isPlaying) {
      actionBtn = (
        <div className={styles.pauseBtnWrapper}>
          <img src={pauseIcon} />
        </div>
      );
    }

    if (isLoading) {
      actionBtn = (
        <span
          className="spinner-border text-light spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      );
    }

    return (
      <>
        <button className={styles.playerBtn} onClick={handleRepeat}>
          <img src={isRepeat ? repeatActiveIcon : repeatIcon} />
        </button>
        <button className={styles.playerBtn} onClick={handlePrev}>
          <img src={prevIcon} />
        </button>
        <button className={styles.playerBtn} onClick={handlePlay}>
          {actionBtn}
        </button>
        <button className={styles.playerBtn} onClick={handleNext}>
          <img src={nextIcon} />
        </button>
        <button className={styles.playerBtn} onClick={handleShuffle}>
          <img src={isShuffle ? shuffleActiveIcon : shuffleIcon} />
        </button>
      </>
    )
  }

  const updateRange = (value) => {
    audioRef.current.seek(value);
    // setSeekPos(value);
    // TODO fix bug on seek
  }

  const updateVolume = (value) => {
    setVolume(value);
    audioRef.current.volume(value / 100);
  }

  let album = 'Unknown';
  let avatar = null;
  let artistName = '';

  if (audioRef.current && currentPlaylist[audioRef.current.index]) {
    avatar = currentPlaylist[audioRef.current.index].avatar;
    album = currentPlaylist[audioRef.current.index].composer;
    artistName = currentPlaylist[audioRef.current.index].name
  }

  // render
  return (
    <div className={`d-flex align-items-center flex-wrap ${styles.playerWrapper}`}>
      <div className={`d-flex ${styles.playerNameWrapper}`}>
        <img
          src={avatar || defaultAvatar}
          className={`${styles.playerAvatar} mx-1`}
        />
        <div className="d-flex flex-column justify-content-center mx-2">
          <span>{artistName}</span>
          {
            album && <span>{album}</span>
          }
        </div>
      </div>
      <div className="mx-4">
        {buildPlayerControls()}
      </div>
      <div className={`d-flex ${styles.playerSliderWrapper} px-2`}>
        <div className={`d-flex ${styles.playerVolumeWrapper}`}>
          <button className={`${styles.playerBtn} ${styles.playerVolumeBtn}`}>
            <img src={volumeFullIcon} />
          </button>
          <Slider
            value={volume}
            callbacks={{
              updateRange: updateVolume,
            }}
          />
        </div>
        <div className={`d-flex ${styles.playerDurationWrapper}`}>
          <span className={styles.playerTime}>{formatTime(seekPosRef.current)}</span>
          <Slider
            value={seekPosRef.current}
            maxValue={duration}
            callbacks={{
              updateRange,
            }}
          />
          <span className={styles.playerTime}>{formatTime(duration - seekPos)}</span>
        </div>
      </div>
      <div className={styles.playerMenuWrapper}>
        <button className={styles.playerBtn}>
          <img src={menuIcon} />
        </button>
      </div>
    </div>
  );
};

export default Player;