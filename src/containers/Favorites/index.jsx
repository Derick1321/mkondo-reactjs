import React from 'react';
import { useSelector } from 'react-redux';

import TopSongs from '$components/common/TopSongs';

import './index.scss';

const Favorites = () => {
  const favorites = useSelector((store) => store.authentication.user.favourites);

  // render
  return (
    <div className="home-content favorites-content-top">
      <p className="home-heading py-4">Favorites</p>
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