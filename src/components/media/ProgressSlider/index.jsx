import React from 'react';

import Slider from '$components/common/Slider';

import { formatTime } from '$common/utils';

import styles from './index.module.scss';

const duration = 0;

const ProgressSlider = () => {
  // handlers
  const updateRange = () => {
    console.log('range!');
  }

  // rennder
  return (
    <div className={`d-flex ${styles.playerDurationWrapper}`}>
      <span className={styles.playerTime}>{formatTime(50)}</span>
      <Slider
        value={50}
        maxValue={duration}
        callbacks={{
          updateRange,
        }}
      />
      <span className={styles.playerTime}>{formatTime(10)}</span>
    </div>
  );
}

export default ProgressSlider;
