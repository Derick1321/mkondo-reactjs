import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const getNewReleasesPending = useSelector((store) => store.media.getNewReleasesPending);

  // effects
  useEffect(() => {
    // add monitor?
    dispatch(getNewReleases({
      category: 'audio',
    }));
  }, []);

  // handlers
  const handleSelect = (name) => {
    setSelected(name);
    if (newReleases[name].length < 1) {
      dispatch(getNewReleases({
        category: name,
      }));
    }
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
          media={newReleases.audio}
          isLoading={getNewReleasesPending && newReleases.audio.length < 1}
        />
      </div>
      <div className={selected !== 'video' ? 'd-none' : ''}>
        <p className={`${styles.homeHeading} py-4`}>New Releases</p>
        <TopSongs
          media={newReleases.video}
          isLoading={getNewReleasesPending && newReleases.video.length < 1}
        />
      </div>
      <div className={selected !== 'movie' ? 'd-none' : ''}>
        <p className={`${styles.homeHeading} py-4`}>Theatre</p>
        <TopSongs
          media={newReleases.movie}
          isLoading={getNewReleasesPending && newReleases.movie.length < 1}
        />
      </div>
    </div>
  );
};

export default Home;
