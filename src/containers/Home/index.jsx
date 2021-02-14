import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AlbumMenuPanel from '$components/common/AlbumMenuPanel';
import Tabs from '$components/common/Tabs';
import TopSongs from '$components/common/TopSongs';

import { getNewReleases } from '$redux/features/media';

import styles from './index.module.scss';

const Home = () => {
  // state
  const [selected, setSelected] = useState('audio');

  // store
  const dispatch = useDispatch();
  const newReleases = useSelector((store) => store.media.newReleases);

  // effects
  useEffect(() => {
    // add monitor
    dispatch(getNewReleases());
  }, []);

  // handlers
  const handleSelect = (name) => {
    setSelected(name);
  }

  // render
  return (
    <div className={styles.homeContent}>
      <div className={styles.homeTabsWrapper}>
        <Tabs
          onSelect={handleSelect}
          selected={selected}
        />
      </div>
      <div className={selected !== 'audio' ? 'd-none' : ''}>
        <p className={`${styles.homeHeading} py-4`}>New Releases</p>
        <TopSongs
          media={newReleases}
        />
      </div>
      <div className={selected !== 'video' ? 'd-none' : ''}>
        <p>No Videos available! Please try again later!</p>
      </div>
      <div className={selected !== 'movie' ? 'd-none' : ''}>
        <p>No Movies available! Please try again later!</p>
      </div>
    </div>
  );
};

export default Home;
