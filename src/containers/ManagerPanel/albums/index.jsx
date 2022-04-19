import React, { useEffect } from 'react'
import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums } from '../../../redux/features/media';
import { ManageAlbumsItem } from './item';

export const ManageAlbum = () => {
  //store
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.media.albums);
  const isFetchingAlbums = useSelector((state) => state.media.fetchAlbumsPending);

  //effects
  useEffect(() => {
    if (!albums.length) {
      console.log("dispatching fetching albums action");
      dispatch(fetchAlbums());
    }
  }, []);

  return (
    <div className={`${styles.container} container`}>
        <h2 className='text-light'>Manage Albums</h2>
        <div className='row'>
            {albums.map(album => <div className='col-lg-2 col-md-4 col-6'><ManageAlbumsItem key={album.album_id} album={album} /></div>)}
        </div>
    </div>
  )
}
