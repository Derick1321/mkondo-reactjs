import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AlbumMenuPanel from '$components/common/AlbumMenuPanel';
import Tabs from '$components/common/Tabs';
import TopSongs from '$components/common/TopSongs';

import { getNewReleases } from '$redux/features/media';

import './index.scss';

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
    <div className="home-content">
      <div className="home-tabs-wrapper"> 
        <Tabs
          onSelect={handleSelect}
          selected={selected}
        />
      </div>
      <p className="home-heading py-4">New Releases</p>
      <TopSongs
        media={newReleases}
      />
      <AlbumMenuPanel
        showHeader
      />
    </div>
  );
};

export default Home;
