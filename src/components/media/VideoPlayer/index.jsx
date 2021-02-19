import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import PlayBtn from '$components/media/PlayBtn';
import Button from '$components/common/Button';

import { getFileURL } from '$common/utils';

import styles from './index.module.scss';

const VideoPlayer = (props) => {
  // props
  const {
    file,
    url,
  } = props;

  // state
  const [localUrl, setLocalUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if (!file) {
      return;
    }

    setLocalUrl(getFileURL(file));
  }, [file]);

  // render
  if (!url && !localUrl) {
    return null;
  }

  return (
    <>
      <div className={styles.playerWrapper}>
        <div className={styles.reactPlayer}>
          <ReactPlayer
            url={url || localUrl}
            playing={isPlaying}
            width='100%'
            height='100%'
          />
        </div>
      </div>
      <div className={`d-flex ${styles.playerBar}`}>
        <Button
          onClick={togglePlay}
          isTransparent
          noBorder
        >
          <PlayBtn
            isPlaying={isPlaying}
          />
        </Button>
      </div>
    </>
  );
};

export default VideoPlayer;
