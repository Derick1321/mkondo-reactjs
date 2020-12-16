import React from 'react';
import PropTypes from 'prop-types';

import Feature from '$components/common/Feature';

import './index.scss';

// temporary script


const TopSongs = (props) => {
  // props
  const { media } = props;

  // render
  return (
    <div className="container">
      <div className="d-flex flex-column">
        <div className="d-flex flex-wrap">
          {
            media.map((item, index) => (
              <Feature
                key={`feature-top-songs-${index}`}
                mediaUrl={item.media_url}
                mediaId={item.media_id}
                avatar={item.cover_url}
                source={item.cover_url}
                subtitle="Latest Release"
                title={item.name}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

TopSongs.defaultProps = {
  media: [],
}

TopSongs.propTypes = {
  media: PropTypes.array,
}

export default TopSongs;
