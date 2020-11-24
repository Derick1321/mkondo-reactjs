import React from 'react';

import AlbumMenuPanel from '$components/common/AlbumMenuPanel';

import './index.scss';

const sampleSearch = [
  { name: 'Artist 1', type: 'Artist', url: require('$assets/images/sample-search-1.png') },
  { name: 'Artist 2', type: 'Artist', url: require('$assets/images/sample-search-2.png') },
  { name: 'Artist 3', type: 'Artist', url: require('$assets/images/sample-search-3.png') },
];

const SearchResult = () => {
  // handlers
  const buildResult = (res, idx) => {
    const { name, type, url } = res;
    const isLast = sampleSearch.length -1 === idx ? 'is-last' : '';

    // is-last
    return (
      <div
        className={`d-flex search-result-item ${isLast}`}
        key={`search-result-${idx}`}
      >
        <div>
          <img
            src={url}
            className="search-result-image"
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
    <div className="d-flex flex-column search-result-wrapper">
      <p className="heading-3">RECENTLY SEARCHED</p>
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
