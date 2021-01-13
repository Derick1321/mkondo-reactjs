import React from 'react';
import { useSelector } from 'react-redux';

import TopSongs from '$components/common/TopSongs';

import styles from './index.module.scss';

const Favorites = () => {
  const favorites = useSelector((store) => store.authentication.user.favourites);

  // render
  return (
    <div className={`${styles.homeContent} ${styles.favoritesContentTop}`}>
      <p className={`${styles.homeHeading} py-4`}>Favorites</p>
      {
        favorites ? (
          <TopSongs
            media={favorites}
          />
        ) : (
          <p className="text-center">You don&apos;t have favorited media :(</p>
        )
      }
    </div>
  );
}

export default Favorites;
