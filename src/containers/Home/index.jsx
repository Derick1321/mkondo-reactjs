import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ScrollMedia from '$components/media/ScrollMedia';
import Tabs from '$components/common/Tabs';

import { getNewReleases } from '$redux/features/media';

import styles from './index.module.scss';

const Home = () => {
  // state
  const [selected, setSelected] = useState('audio');

  // store
  const dispatch = useDispatch();
  const newReleases = useSelector((store) => store.media.newReleases);
  const getNewReleasesPending = useSelector((store) => store.media.getNewReleasesPending);
  const favorites = useSelector((store) => store.authentication.user.favourites);

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
        <ScrollMedia
          title="New Releases"
          values={newReleases.audio}
          isLoading={getNewReleasesPending && newReleases.audio.length < 1}
          showHeader
        />
        <ScrollMedia
          title="Favorite"
          values={favorites.filter((item) => item.category === 'audio')}
        />
      </div>
      <div className={selected !== 'video' ? 'd-none' : ''}>
        <ScrollMedia
          title="New Releases"
          values={newReleases.video}
          isLoading={getNewReleasesPending && newReleases.video.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Favorite"
          values={favorites.filter((item) => item.category === 'video')}
        />
      </div>
      <div className={selected !== 'movie' ? 'd-none' : ''}>
        <ScrollMedia
          title="Theatre"
          values={newReleases.movie}
          isLoading={getNewReleasesPending && newReleases.movie.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Favorite"
          values={favorites.filter((item) => item.category === 'movie')}
        />
      </div>
    </div>
  );
};

export default Home;
