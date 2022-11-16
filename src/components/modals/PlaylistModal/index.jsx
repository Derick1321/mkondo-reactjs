import React, { useEffect } from 'react';

import PlaylistMenu from '$components/common/PlaylistMenu';

import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { toggleSideMenu } from '$redux/features/nav';

const PlaylistModal = (props) => {
  // redux
  const dispatch = useDispatch();

  // effects
  useEffect(() => {
    dispatch(toggleSideMenu(false));
  }, []);

  // render
  return (
    <div className={styles.playlistWrapper}>
      <PlaylistMenu
        {...props}
      />
    </div>
  );
}

export default PlaylistModal;
