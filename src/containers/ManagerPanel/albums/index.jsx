import React from 'react'
import styles from './index.module.scss';

export const ManageAlbum = () => {
  return (
    <div className={`${styles.container} container`}>
        <h2 className='text-light'>Manage Albums</h2>
        <div>
            {/* {media.map(_media => <ManageMediaItem key={_media.id} media={_media} />)} */}
        </div>
    </div>
  )
}
