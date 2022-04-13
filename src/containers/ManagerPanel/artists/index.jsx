import React from 'react'
import styles from './index.module.scss';
import { ManageArtistItem } from './item';
import { useSelector } from 'react-redux';

export const ManageArtists = () => {

  //store
  const artists = useSelector((state) => state.artist.artists);
  const isFetchingArtists = useSelector((state) => state.artist.getArtistPending);

  return (
    <div className={`${styles.container} container`}>
        <h2 className='text-light'>Manage Artists</h2>
        <div className={styles.listWrapper}>
            {artists.map(_artist => <ManageArtistItem artist={_artist} />)}
        </div>
    </div>
  )
}
