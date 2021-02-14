import React from 'react';
import PropTypes from 'prop-types';

import Feature from '$components/common/Feature';

const TopSongs = (props) => {
  // props
  const { media } = props;

  // render
  return (
    <div className="container">
      <div className="d-flex flex-column">
        <div className="d-flex flex-wrap">
          {
            media.length < 1 && (
              <p></p>
            )
          }
          {
            media.map((item, index) => (
              <Feature
                key={`feature-top-songs-${index}`}
                mediaUrl={item.media_url}
                mediaId={item.media_id}
                avatar={item.cover_url}
                artistId={item.owner_id}
                source={item.owner_avatar_url}
                subtitle={item.owner_name}
                title={item.name}
                country={item.country}
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
  errorMsg: 'No new releases. Please try again later!',
}

TopSongs.propTypes = {
  media: PropTypes.array,
  errorMsg: PropTypes.string,
}

export default TopSongs;
