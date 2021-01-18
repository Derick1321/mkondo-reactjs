import React from 'react';
import { useSelector } from 'react-redux';

import AlbumMenuPanel from '$components/common/AlbumMenuPanel';

import styles from './index.module.scss';

const sampleSearch = [
  { name: 'Artist 1', type: 'Artist', url: require('$assets/images/sample-search-1.png') },
  { name: 'Artist 2', type: 'Artist', url: require('$assets/images/sample-search-2.png') },
  { name: 'Artist 3', type: 'Artist', url: require('$assets/images/sample-search-3.png') },
];

const SearchResult = () => {
  // store
  const isMobile = useSelector((store) => store.nav.isMobile);

  // handlers
  const buildResult = (res, idx) => {
    const { name, type, url } = res;
    const isLast = sampleSearch.length -1 === idx ? 'is-last' : '';

    // is-last
    return (
      <div
        className={`d-flex ${styles.searchResultItem} ${isLast}`}
        key={`search-result-${idx}`}
      >
        <div>
          <img
            src={url}
            className={styles.searchResultImage}
          />
        </div>
        <div className="d-flex flex-column">
          <p>{name}</p>
          <p>{type}</p>
        </div>
      </div>
    );
  }

  // render
  return (
    <div className={`d-flex flex-column ${styles.searchResultWrapper} ${isMobile ? styles.searchWrapperMobile : ''}`}>
      <p className={styles.heading}>RECENTLY SEARCHED</p>
      {
        sampleSearch.map((item, idx) => buildResult(item, idx))
      }
      <AlbumMenuPanel
        showHeader
      />
    </div>
  );
}

export default SearchResult;
