import React from 'react';
import { useSelector } from 'react-redux';

import TopSongs from '$components/common/TopSongs';

import './index.scss';

const History = () => {
  const userHistory = useSelector((store) => store.authentication.user.history);

  // render
  return (
    <div className="home-content history-content-top">
      <p className="home-heading py-4">History</p>
      {
        userHistory ? (
          <TopSongs
            media={userHistory}
          />
        ) : (
          <p>You don&apos;t have previously played media</p>
        )
      }
    </div>
  );
}

export default History;