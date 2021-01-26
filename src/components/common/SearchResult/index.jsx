import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AlbumMenuPanel from '$components/common/AlbumMenuPanel';
import TopSongs from '$components/common/TopSongs';
import Button from '$components/common/Button';

import styles from './index.module.scss';

const SearchResult = () => {
  // store
  const isMobile = useSelector((store) => store.nav.isMobile);
  const users = useSelector((store) => store.nav.searchResults.users);
  const media = useSelector((store) => store.nav.searchResults.media);
  const albums = useSelector((store) => store.nav.searchResults.albums);
  const querySearchPending = useSelector((store) => store.nav.querySearchPending);
  const querySearchComplete = useSelector((store) => store.nav.querySearchComplete);

  const [active, setActive] = useState('all');

  // handlers
  const handleAll = () => {
    setActive('all');
  }

  const handleMedia = () => {
    setActive('media');
  }

  const handleUsers = () => {
    setActive('users');
  }

  // render
  return (
    <div className={`d-flex flex-column ${styles.searchResultWrapper} ${isMobile ? styles.searchWrapperMobile : ''}`}>
      <div className="d-flex flex-wrap">
        <div className="mr-4 mb-4">
          <Button
            style={`${active !== 'all' ? styles.isNotActive : ''}`}
            onClick={handleAll}
          >
            All
          </Button>
        </div>
        <div className="mr-4">
           <Button
            style={`${active !== 'media' ? styles.isNotActive : ''}`}
            onClick={handleMedia}
          >
            Media
          </Button>
        </div>
        <Button
          style={`${active !== 'users' ? styles.isNotActive : ''}`}
          onClick={handleUsers}
        >
          Artists
        </Button>
      </div>
      {
        querySearchPending  && <p className="pl-4">Searching...</p>
      }
      {
        (['all', 'media'].includes(active)) && (
          <>
            <p className={styles.heading}>Songs</p>
            <TopSongs
              media={media}
            />
            {
              querySearchComplete && media.length < 1 && (
                <p>No Media preset!</p>
              )
            }
          </>
        )
      }
      {
        (['all', 'users'].includes(active)) && (
          <>
            <p className={styles.heading}>Artists</p>
            {
              querySearchComplete && users.length < 1 && (
                <p>No Artists preset!</p>
              )
            }
            <AlbumMenuPanel
              values={users}
            />
          </>
        )
      }
    </div>
  );
}

export default SearchResult;
