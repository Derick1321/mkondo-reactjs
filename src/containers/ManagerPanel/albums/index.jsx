import React, { useEffect } from 'react'
import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../../../redux/features/media';
import { ManageAlbumsItem } from './item';
import { useHistory } from 'react-router';

export const ManageAlbum = () => {
  //hooks
  const { goBack } = useHistory();
  //store
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.media.albums);
  const isFetchingAlbums = useSelector((state) => state.media.fetchAlbumsPending);

  //effects
  useEffect(() => {
    if (!albums.length) {
      console.log("dispatching fetching albums action");
      dispatch(fetchAlbums({"ignore_release_date": true}));
    }
  }, []);

  return (
    <div className={`${styles.container} container`}>
        <button className='btn btn-primary' onClick={() => goBack()}>Back</button>
        <h2 className='text-light'>Manage Albums</h2>
        <div className='row'>
            {albums.map(album => <div className='col-lg-2 col-md-4 col-6'><ManageAlbumsItem key={album.album_id} album={album} /></div>)}
        </div>
    </div>
  )
}
