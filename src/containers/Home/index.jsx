import React, { useState } from 'react';

import AlbumMenuPanel from '$components/common/AlbumMenuPanel';
import Tabs from '$components/common/Tabs';
import TopSongs from '$components/common/TopSongs';

import './index.scss';

const Home = () => {
   // state
  const [selected, setSelected] = useState('audio');

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
        <div className="tab-line" />
      </div>
      <p className="home-heading py-4">New Releases</p>
      <TopSongs />
      <AlbumMenuPanel
        showHeader
      />
    </div>
  );
};

export default Home;
