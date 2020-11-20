import React from 'react';

import Slider from '$components/common/Slider';

import './index.scss';

const avatar = require('$assets/images/player/avatar.png')
const menuIcon = require('$assets/images/player/list-alt.svg');
const repeatIcon = require('$assets/images/player/repeat.svg');
const shuffleIcon = require('$assets/images/player/shuffle.svg');
const prevIcon = require('$assets/images/player/prev.svg');
const nextIcon = require('$assets/images/player/next.svg');
const playIcon = require('$assets/images/player/play.svg');
const volumeFullIcon = require('$assets/images/player/volume-full.svg');

const Player = () => {
  // handlers
  const buildPlayerControls = () => {
    return (
      <>
        <button className="player-btn">
          <img src={repeatIcon} />
        </button>
        <button className="player-btn">
          <img src={prevIcon} />
        </button>
        <button className="player-btn">
          <img src={playIcon} />
        </button>
        <button className="player-btn">
          <img src={nextIcon} />
        </button>
        <button className="player-btn">
          <img src={shuffleIcon} />
        </button>
      </>
    )
  }

  const updateRange = (value) => {
    console.log('from audio ', value);
  }

  const updateVolume = (value) => {
    console.log('valume ', value);
  }

  // render
  return (
    <div className="d-flex player-wrapper align-items-center">
      <div className="d-flex player-name-wrapper">
        <img src={avatar} className="player-avatar mx-1" />
        <div className="d-flex flex-column mx-2">
          <span>Only Girl</span>
          <span>Adekunle Gold </span>
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
            callbacks={{
              updateRange: updateVolume,
            }}
          />
        </div>
        <div className="player-duration-wrapper">
          <Slider
            callbacks={{
              updateRange,
            }}
          />
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