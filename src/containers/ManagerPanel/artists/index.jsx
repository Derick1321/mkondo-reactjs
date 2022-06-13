import React from 'react'
import styles from './index.module.scss';
import { ManageArtistItem } from './item';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export const ManageArtists = () => {
  //hooks
  const { goBack } = useHistory();
  //store
  const artists = useSelector((state) => state.artist.artists);
  const isFetchingArtists = useSelector((state) => state.artist.getArtistPending);

  return (
    <div className={`${styles.container} container`}>
        <button className='btn btn-primary' onClick={() => goBack()}>Back</button>
        <h2 className='text-light'>Manage Artists</h2>
        <div className={styles.listWrapper}>
            {artists.map(_artist => <ManageArtistItem artist={_artist} />)}
        </div>
    </div>
  )
}
