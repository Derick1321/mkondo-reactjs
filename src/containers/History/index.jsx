import React from 'react';
import { useSelector } from 'react-redux';

import TopSongs from '$components/common/TopSongs';

import styles from './index.module.scss';

const History = () => {
  const userHistory = useSelector((store) => store.user.history);

  // render
  return (
    <div className={`${styles.homeContent} ${styles.historyContentTop}`}>
      <p className={`${styles.homeHeading} py-4`}>History</p>
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