import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

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
    <div className={styles.playerWrapper}>
      <div className={styles.reactPlayer}>
        <ReactPlayer
          url={url || localUrl}
          controls
          width='100%'
          height='100%'
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
