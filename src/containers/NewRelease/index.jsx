import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridMedia from '$components/media/GridMedia';
import Tabs from '$components/common/Tabs';

import { getNewReleases } from '$redux/features/media';

import styles from './index.module.scss';

const NewRelease = () => {
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
        <GridMedia
          title="New Releases"
          values={newReleases.audio}
          isLoading={getNewReleasesPending && newReleases.audio.length < 1}
          name="audio-new-release"
          showHeader
        />
      </div>
      <div className={selected !== 'video' ? 'd-none' : ''}>
        <GridMedia
          title="New Releases"
          name="video-new-release"
          values={newReleases.video}
          isLoading={getNewReleasesPending && newReleases.video.length < 1}
          type="video"
        />
      </div>
      <div className={selected !== 'movie' ? 'd-none' : ''}>
        <GridMedia
          title="Theatre"
          name="theatre-new-release"
          values={newReleases.movie}
          isLoading={getNewReleasesPending && newReleases.movie.length < 1}
          type="video"
        />
      </div>
    </div>
  );
};

export default NewRelease;
