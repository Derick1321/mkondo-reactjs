import React from 'react';
import { useDispatch } from 'react-redux';

import Slider from '$components/common/Slider';
import { formatTime } from '$common/utils';
import { seek } from '$redux/features/player';

import styles from './index.module.scss';

const ProgressSlider = (props) => {
  // props
  const {
    position,
    duration,
  } = props;

console.log('zz ', position, duration);
  // store
  const dispatch = useDispatch();

  // handlers
  const updateRange = (value) => {
    dispatch(seek(value));
  }

  // render
  return (
    <div className={`d-flex ${styles.playerDurationWrapper}`}>
      <span className={styles.playerTime}>{formatTime(position)}</span>
      <Slider
        position={(position / duration)}
        callbacks={{
          updateRange,
        }}
      />
      <span className={styles.playerTime}>{formatTime(duration - position)}</span>
    </div>
  );
}

export default ProgressSlider;
