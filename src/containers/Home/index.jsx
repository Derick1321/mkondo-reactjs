import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Preview from '$components/common/Preview';
import Tabs from '$components/common/Tabs';
import Feature from '$components/common/Feature';
import ScrollPanel from '$components/common/ScrollPanel';

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

  const handlePlay = (a, b) => {
    console.log('aaa ', a, b);
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
        <ScrollPanel
          isLoading={getNewReleasesPending && newReleases.audio.length < 1}
          showHeader
        >
          {
            newReleases.audio.map((item, index) => (
              <Feature
                key={`feature-home-songs-${index}`}
                mediaUrl={item.media_url}
                mediaId={item.media_id}
                avatar={item.cover_url}
                artistId={item.owner_id}
                source={item.owner_avatar_url}
                subtitle={item.owner_name}
                title={item.name}
                country={item.country}
                category={item.category}
              />
            ))
          }
        </ScrollPanel>
      </div>
      <div className={selected !== 'video' ? 'd-none' : ''}>
        <p className={`${styles.homeHeading} py-4`}>New Releases</p>
        <ScrollPanel
          isLoading={getNewReleasesPending && newReleases.video.length < 1}
          showHeader
        >
          {
            newReleases.video.map((item, idx) => (
              <Preview
                key={`${selected}-${idx}-home-${item.name}`}
                title={item.name}
                description={item.description}
                source={item.cover_url}
                onClick={handlePlay}
              />
            ))
          }
        </ScrollPanel>
      </div>
      <div className={selected !== 'movie' ? 'd-none' : ''}>
        <p className={`${styles.homeHeading} py-4`}>Theatre</p>
        <ScrollPanel
          isLoading={getNewReleasesPending && newReleases.movie.length < 1}
          showHeader
        >
          {
            newReleases.movie.map((item, idx) => (
              <Preview
                key={`${selected}-${idx}-home-${item.name}`}
                title={item.name}
                description={item.description}
                source={item.cover_url}
                onClick={handlePlay}
              />
            ))
          }
        </ScrollPanel>
      </div>
    </div>
  );
};

export default Home;
