import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Scroller from '$components/common/Scroller';
import Preview from '$components/common/Preview';
import FeatureHome from '$components/common/FeatureHome';
import SimplePreview from '$components/common/SimplePreview';
import { useDispatch } from 'react-redux';
import { updatePlaylist } from '../../../redux/features/player';

const ScrollMedia = (props) => {
  // props
  const {
    values,
    title,
    isLoading,
    type,
    name,
    viewMore,
  } = props;

  //state
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);

  //store
  const dispatch = useDispatch();

  //effect
  useEffect(() => {
    if (!addedToPlaylist) return;
    console.log("Effect triggered, Determining if its time to update the current playlist", addedToPlaylist, values);
    if (!values.length) return;
    dispatch(updatePlaylist(values));
  }, [addedToPlaylist, values]);

  //hanlde
  const handleFeatureClicked = () => {
    console.log(`${title} Item has been clicked`);
    if (!addedToPlaylist) {
      setAddedToPlaylist(true);
    }
  }

  const getMedia = useCallback((item, idx) => {
    let avatar_url = item.owner_avatar_url;
    if (item.owner_avatar_url == "null") avatar_url = null;

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
      <div style={{marginRight: '15px'}} key={`feature-home-wrapper-${idx}`} onClick={handleFeatureClicked}>
        <FeatureHome
          key={`feature-home-${idx}`}
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
          likes={item.likes || undefined}
          plays={item.plays}
          comment_num={item.comment_num}
        />
      </div>
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
      viewMore={viewMore}
    >
      {
        values.map((item, idx) => getMedia(item, `${title}-${idx}`))
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
  viewMore: PropTypes.string,
};



export default ScrollMedia;

