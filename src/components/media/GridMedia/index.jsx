import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Preview from '$components/common/Preview';
import Feature from '$components/common/Feature';
import SimplePreview from '$components/common/SimplePreview';
import styles from './index.module.scss';

const GridMedia = (props) => {
  // props
  const {
    values,
    title,
    isLoading,
    type,
    name,
  } = props;

  const getMedia = useCallback((item, idx) => {
    let avatar_url = item.owner_avatar_url;
    if(item.owner_avatar_url == "null") avatar_url = null;
    if (type === 'audio') {
      return (
        <Feature
          key={`feature-home-songs-${idx}`}
          mediaUrl={item.media_url}
          mediaId={item.media_id}
          avatar={item.cover_url}
          artistId={item.owner_id}
          source={avatar_url}
          subtitle={item.owner_name}
          title={item.name}
          country={item.country}
          category={item.category}
          description={item.description}

          likes={item.likes}
          plays={item.plays}
        />
      );
    }

    if (type === 'artist') {
      return (
        <SimplePreview
          description={item.full_name}
          url={item.avatar_url}
          handleClick={() => null}
          isRounded
        />
      )
    }

    return (
      <Preview
        key={`scroll-${idx}-home-${item.name}`}
        title={item.name}
        mediaId={item.media_id}
        description={item.description}
        avatar={item.cover_url}
        source={avatar_url}
        likes={item.likes}
        plays={item.plays}
        artistId={item.owner_id}
      />
    );
  }, [type]);

  // render
  return (
    <div className="row">
      {
        values.map((item, idx) => 
            <div key={idx} className={`col-md-4 ${styles.gridItem}`}>{getMedia(item, idx)}</div>
        )
      }
    </div>
  );
}

GridMedia.defaultProps = {
  values: [],
  title: '',
  isLoading: false,
  type: 'audio',
};

GridMedia.propTypes = {
  values: PropTypes.array,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};



export default GridMedia;

