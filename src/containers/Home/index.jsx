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
      <p className={`${styles.homeHeading} py-4`}>New Releases</p>
      {
        newReleases.length < 1 && (
          <p>No new releases. Please try again later!</p>
        )
      }
      <TopSongs
        media={newReleases}
      />
    </div>
  );
};

export default Home;
