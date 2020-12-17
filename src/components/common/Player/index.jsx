import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Slider from '$components/common/Slider';

import AudioPlayer from '$common/player';
import { formatTime } from '$common/utils';

import './index.scss';

const avatar = require('$assets/images/player/avatar.png');
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

// sample playlist
const playlists = [
  { 'name': 'Song 1', album: 'Next Album', url: 'https://drive.google.com/u/0/uc?id=1-74MGu-MEKUg7c8QQIvp0ojpKEPXgtks&export=download', avatar: avatar, }, 
  { 'name': 'Song 2', album: 'Moo', url: 'https://drive.google.com/u/0/uc?id=1ZhVuR3wVf7IYS8YM7PFrFk3cw1AvJSfs&export=download', }, 
  { 'name': 'Song 3', url: 'https://drive.google.com/u/0/uc?id=1ZhVuR3wVf7IYS8YM7PFrFk3cw1AvJSfs&export=download', }
];

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

  // store
  const currentPlaylist = useSelector((store) => store.playlist.currentPlaylist);

  // functions
  const onPlay = (dur) => {
    setIsPlaying(true);
    setDuration(dur);
  }

  const onPause = (dur) => {
    setIsPlaying(false);
  }

  // effects
  useEffect(() => {
    const callbacks = {
      onPlay,
      onPause,
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

  useEffect(() => {
    const cb = () => {
      const obj = audioRef.current;
      const sound = obj.playlist[obj.index].howl;
      seekPosRef.current = sound.seek();
      setSeekPos(sound.seek());
    };

    if (isPlaying) {
      timerRef.current = window.setInterval(cb, 1000);
      return;
    }

    window.clearInterval(timerRef.current);
    timerRef.current = null;
    return () => { // Return callback to run on unmount.
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  // handlers
  const resetPos = () => {
    setDuration(0);
    setSeekPos(0);
  }

  const handlePlay = () => {
    // need a way to play current index
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play(audioRef.current.index);
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
    return (
      <>
        <button className="player-btn" onClick={handleRepeat}>
          <img src={isRepeat ? repeatActiveIcon : repeatIcon} />
        </button>
        <button className="player-btn" onClick={handlePrev}>
          <img src={prevIcon} />
        </button>
        <button className="player-btn" onClick={handlePlay}>
          {
            isPlaying ? (
              <div className="pause-btn-wrapper">
                <img src={pauseIcon} />
              </div>
            ) : (
              <img src={playIcon} />
            )
          }
        </button>
        <button className="player-btn" onClick={handleNext}>
          <img src={nextIcon} />
        </button>
        <button className="player-btn" onClick={handleShuffle}>
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
    audioRef.current.volume(value);
  }

  const album = audioRef.current ? (currentPlaylist[audioRef.current.index].composer || 'Unknown') : '';

  // render
  return (
    <div className="d-flex player-wrapper align-items-center">
      <div className="d-flex player-name-wrapper">
        <img
          src={(audioRef.current && currentPlaylist[audioRef.current.index].avatar) || defaultAvatar}
          className="player-avatar mx-1"
        />
        <div className="d-flex flex-column justify-content-center mx-2">
          <span>{(audioRef.current && currentPlaylist[audioRef.current.index].name)|| 'None'}</span>
          {
            album && <span>{album}</span>
          }
        </div>
      </div>
      <div className="player-controls-wrapper mx-4">
        {buildPlayerControls()}
      </div>
      <div className="d-flex player-slider-wrapper px-2">
        <div className="d-flex player-volume-wrapper">
          <button className="player-btn player-volume-btn">
            <img src={volumeFullIcon} />
          </button>
          <Slider
            isVolume
            callbacks={{
              updateRange: updateVolume,
            }}
          />
        </div>
        <div className="player-duration-wrapper d-flex">
          <span className="player-time">{formatTime(seekPos)}</span>
          <Slider
            position={(seekPos / duration)}
            callbacks={{
              updateRange,
            }}
          />
          <span className="player-time">{formatTime(duration - seekPos)}</span>
        </div>
      </div>
      <div className="player-menu-wrapper">
        <button className="player-btn">
          <img src={menuIcon} />
        </button>
      </div>
    </div> 
  );
};

export default Player;