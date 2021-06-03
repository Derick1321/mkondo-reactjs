import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Scroller from '$components/common/Scroller';
import Preview from '$components/common/Preview';
import FeatureHome from '$components/common/FeatureHome';
import SimplePreview from '$components/common/SimplePreview';

const ScrollMedia = (props) => {
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
    if (item.owner_avatar_url == "null") avatar_url = null;
    if (type === 'audio') {
      return (
        <div style={{marginRight: '15px'}}>
          <FeatureHome
            key={`feature-home-songs-${idx}`}
            mediaUrl={item.media_url}
            mediaId={item.media_id}
            avatar={item.cover_url}
            artistId={item.owner_id}
            source={avatar_url}
            owner_name={item.owner_name}
            title={item.name}
            country={item.country}
            category={item.category}
            description={item.description}

            likes={item.likes}
            plays={item.plays}
            comment_num={item.comment_num}
          />
        </div>
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
        comment_num={item.comment_num}
        artistId={item.owner_id}
      />
    );
  }, [type]);

  // render
  return (
    <Scroller
      isLoading={isLoading}
      title={title}
      showHeader={!!title}
      total={values.length}
      name={name}
    >
      {
        values.map((item, idx) => getMedia(item, idx))
      }
    </Scroller>
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

