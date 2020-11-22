import React, { useState } from 'react';

import AppHeader from '$components/common/AppHeader';
import Player from '$components/common/Player';
import Tabs from '$components/common/Tabs';
import TopSongs from '$components/common/TopSongs';
import SideMenu from '$components/common/SideMenu';

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
    <div className="d-flex vh-100">
      <div className="side-menu-wrapper">
        <SideMenu />
      </div>
      <div className="content">
        <AppHeader />
        <div className="home-tabs-wrapper"> 
          <Tabs
            onSelect={handleSelect}
            selected={selected}
          />
          <div className="tab-line" />
        </div>
        <p className="home-heading py-4">New Releases</p>
        <TopSongs />
      </div>
      <div className="home-footer">
        <Player />
      </div>
    </div>
  );
};

export default Home;
