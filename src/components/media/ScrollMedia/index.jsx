import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import ScrollPanel from '$components/common/ScrollPanel';
import Preview from '$components/common/Preview';
import Feature from '$components/common/Feature';

const ScrollMedia = (props) => {
  // props
  const {
    values,
    title,
    isLoading,
    type,
  } = props;

  const getMedia = useCallback((item, idx) => {
    if (type === 'audio') {
      return (
        <Feature
          key={`feature-home-songs-${idx}`}
          mediaUrl={item.media_url}
          mediaId={item.media_id}
          avatar={item.cover_url}
          artistId={item.owner_id}
          source={item.owner_avatar_url}
          subtitle={item.owner_name}
          title={item.name}
          country={item.country}
          category={item.category}
        />
      );
    }

    return (
      <Preview
        key={`scroll-${idx}-home-${item.name}`}
        title={item.name}
        mediaId={item.media_id}
        description={item.description}
        source={item.cover_url}
      />
    );
  }, [type]);

  // render
  return (
    <ScrollPanel
      isLoading={isLoading}
      title={title}
      showHeader={!!title}
    >
      {
        values.map((item, idx) => getMedia(item, idx))
      }
    </ScrollPanel>
  );
}

ScrollMedia.defaultProps = {
  values: [],
  title: '',
  isLoading: false,
  type: 'audio',
};

ScrollMedia.propTypes = {
  values: PropTypes.array,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};



export default ScrollMedia;

