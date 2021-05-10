import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ScrollMedia from '$components/media/ScrollMedia';
import Tabs from '$components/common/Tabs';

import { getNewReleases, getTopMedias, getRandomMedias, getTrendMedias } from '$redux/features/media';

import styles from './index.module.scss';

const Home = () => {
  // state
  const [selected, setSelected] = useState('audio');

  // store
  const dispatch = useDispatch();
  const newReleases = useSelector((store) => store.media.newReleases);
  const getNewReleasesPending = useSelector((store) => store.media.getNewReleasesPending);
  const topMedias = useSelector((store) => store.media.topMedias);
  const getTopMediasPending = useSelector((store) => store.media.getTopMediasPending);
  const randomMedias = useSelector((store) => store.media.randomMedias);
  const getRandomMediasPending = useSelector((store) => store.media.getRandomMediasPending);
  const trendMedias = useSelector((store) => store.media.trendMedias);
  const getTrendMediasPending = useSelector((store) => store.media.getTrendMediasPending);
  const favorites = useSelector((store) => store.authentication.user.favourites);
  // const user_id = useSelector((store) => store.authentication.user_id);

  // effects
  useEffect(() => {
    // add monitor?
    dispatch(getNewReleases({ category: 'audio' }));
    dispatch(getTopMedias({ category: 'audio' }));
    dispatch(getRandomMedias({ category: 'audio' }));
    dispatch(getTrendMedias({ category: 'audio' }));
  }, []);

  // handlers
  const handleSelect = (name) => {
    setSelected(name);
    if (newReleases[name].length < 1) {
      dispatch(getNewReleases({ category: name }));
    }
    if (topMedias[name].length < 1) {
      dispatch(getTopMedias({ category: name }));
    }
    if (randomMedias[name].length < 1) {
      dispatch(getRandomMedias({ category: name }));
    }
    if (trendMedias[name].length < 1) {
      dispatch(getTrendMedias({ category: name }));
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
          name="audio-new-release"
          showHeader
        />
        <ScrollMedia
          title="Top Medias"
          values={topMedias.audio}
          isLoading={getTopMediasPending && topMedias.audio.length < 1}
          name="audio-top-medias"
          showHeader
        />
        <ScrollMedia
          title="Random Medias"
          values={randomMedias.audio}
          isLoading={getRandomMediasPending && randomMedias.audio.length < 1}
          name="audio-random-medias"
          showHeader
        />
        <ScrollMedia
          title="Trend Medias"
          values={trendMedias.audio}
          isLoading={getTrendMediasPending && trendMedias.audio.length < 1}
          name="audio-trend-medias"
          showHeader
        />
        <ScrollMedia
          title="Favorite"
          name="audio-favorite"
          values={favorites.filter((item) => item.category === 'audio')}
        />
      </div>
      <div className={selected !== 'video' ? 'd-none' : ''}>
        <ScrollMedia
          title="New Releases"
          name="video-new-release"
          values={newReleases.video}
          isLoading={getNewReleasesPending && newReleases.video.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Top Medias"
          name="video-top-medias"
          values={topMedias.video}
          isLoading={getTopMediasPending && topMedias.video.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Random Medias"
          name="video-random-medias"
          values={randomMedias.video}
          isLoading={getRandomMediasPending && randomMedias.video.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Trend Medias"
          name="video-trend-medias"
          values={trendMedias.video}
          isLoading={getTrendMediasPending && trendMedias.video.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Favorite"
          name="video-favorite"
          values={favorites.filter((item) => item.category === 'video')}
          type="video"
        />
      </div>
      <div className={selected !== 'movie' ? 'd-none' : ''}>
        <ScrollMedia
          title="Theatre"
          name="theatre-new-release"
          values={newReleases.movie}
          isLoading={getNewReleasesPending && newReleases.movie.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Top Medias"
          name="theatre-top-medias"
          values={topMedias.movie}
          isLoading={getTopMediasPending && topMedias.movie.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Random Medias"
          name="theatre-random-medias"
          values={randomMedias.movie}
          isLoading={getRandomMediasPending && randomMedias.movie.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Trend Medias"
          name="theatre-trend-medias"
          values={trendMedias.movie}
          isLoading={getTrendMediasPending && trendMedias.movie.length < 1}
          type="video"
        />
        <ScrollMedia
          title="Favorite"
          name="movie-favorite"
          values={favorites.filter((item) => item.category === 'movie')}
          type="video"
        />
      </div>
    </div>
  );
};

export default Home;
