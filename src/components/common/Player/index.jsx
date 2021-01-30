// TO BE DEPRECATED

import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PlayBtn from '$components/media/PlayBtn';
import ProgressSlider from '$components/media/ProgressSlider';
import Slider from '$components/common/Slider';

import { play, pause } from '$redux/features/player';

import styles from './index.module.scss';

const defaultAvatar = require('$assets/images/profile-user.svg');
const menuIcon = require('$assets/images/player/list-alt.svg');
const repeatIcon = require('$assets/images/player/repeat.svg');
const repeatActiveIcon = require('$assets/images/player/repeat-active.svg');
const shuffleIcon = require('$assets/images/player/shuffle.svg');
const shuffleActiveIcon = require('$assets/images/player/shuffle-active.svg');
const prevIcon = require('$assets/images/player/prev.svg');
const nextIcon = require('$assets/images/player/next.svg');
const volumeFullIcon = require('$assets/images/player/volume-full.svg');

const Player = () => {
  // refs
  const audioRef = useRef(null);

  // state
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [volume, setVolume] = useState(100);

  // store
  const currentPlaylist = useSelector((store) => store.player.currentPlaylist);
  const isPlaying = useSelector((store) => store.player.isPlaying);
  const isLoading = useSelector((store) => store.player.isLoading);
  const position = useSelector((store) => store.player.position);
  const duration = useSelector((store) => store.player.duration);
  const dispatch = useDispatch();

  // handlers
  const handlePlay = () => {
    if (isPlaying) {
      dispatch(pause());
      return;
    }
    dispatch(play());
  }

  const handleRepeat = () => {
    // audioRef.current.repeat();
    // setIsRepeat(audioRef.current.isRepeat);
  }

  const handleShuffle = () => {
    // audioRef.current.shuffle();
    // setIsShuffle(audioRef.current.isOnShuffle);
  }

  const handleNext = () => {
    // audioRef.current.skip('next');
  }

  const handlePrev = () => {
    // audioRef.current.skip('prev');
  }

  const playerControls = (
    <>
      <button className={styles.playerBtn} onClick={handleRepeat}>
        <img src={isRepeat ? repeatActiveIcon : repeatIcon} />
      </button>
      <button className={styles.playerBtn} onClick={handlePrev}>
        <img src={prevIcon} />
      </button>
      <button
        className={styles.playerBtn}
        onClick={handlePlay}
      >
        <PlayBtn
          isLoading={isLoading}
          isPlaying={isPlaying}
        />
      </button>
      <button className={styles.playerBtn} onClick={handleNext}>
        <img src={nextIcon} />
      </button>
      <button className={styles.playerBtn} onClick={handleShuffle}>
        <img src={isShuffle ? shuffleActiveIcon : shuffleIcon} />
      </button>
    </>
  );

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

  if (currentPlaylist[0]) {
    avatar = currentPlaylist[0].avatar;
    album = currentPlaylist[0].artistName;
    artistName = currentPlaylist[0].name
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
      <div className="d-flex align-items-center h-100 mx-4">
        {playerControls}
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
          <ProgressSlider
            position={position}
            duration={duration}
          />
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