import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '$components/common/Button';

import { addFavorite, removeFavorite } from '$redux/features/user';
import { handleFetch } from '$common/requestUtils';
import { showModal } from '$redux/features/modal';

import { updatePlaylist, updateLocalPlaylist } from '$redux/features/playlist';

import styles from './index.module.scss';

const Image = styled.div`
  height: 50px;
  width: 50px;
  margin-right: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${props => props.source}); 
  background-color: #8C8C8C;
`;

const Row = (props) => {
  // props
  const {
    name,
    avatarUrl,
    artistName,
    mediaId,
    recordLabel,
    mediaUrl,
    playlistId,
  } = props;

  // store
  const token = useSelector((store) => store.authentication.token);
  const favourites = useSelector((store) => store.authentication.user.favourites);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const dispatch = useDispatch();

  const isFavorite = favourites.find((media) => media.media_id === mediaId);

  // state
  const [url, setUrl] = useState('');

  // effects
  useEffect(async () => {
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${avatarUrl}`, null, token);
    setUrl(res.response);
  }, [avatarUrl]);

  // handlers
  const handlePlay = async () => {
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${mediaUrl}`, null, token);
    dispatch(updateLocalPlaylist({
      url: res.response,
      avatar: url,
      howl: null,
      name,
      mediaId,
    }));
  }

  const handleRemove = async (name) => {
    dispatch(updatePlaylist({
      playlistId,
      mediaId,
      ownerId: userId,
    }));
  }

  const handleShare = () => {
    dispatch(showModal('SHARE_MODAL', {
      title: name,
      country: recordLabel,
      id: mediaId,
      avatarUrl: url,
    }));
  }

  const handleFavorite = () => {
    const data = {
      media_id: mediaId,
    };

    if (isFavorite) {
      dispatch(removeFavorite(data));
    } else {
      dispatch(addFavorite(data));
    }
  }

  const generateButton = (icon, func) => (
    <Button
      onClick={func}
      icon={icon}
      isCustom
      hideDefault
    />
  )

  // render
  return (
    <div className={`d-flex my-2 ${styles.container}`}>
      <div className={`row align-items-center ${styles.wrapper}`}>
        <div className="d-flex align-items-center col-12 col-sm-6">
          {
            url && (
              <Image source={url} />
            )
          }
          <span>{name}</span>
        </div>
        <div className="col-12 col-sm-3">
          <span>{artistName}</span>
        </div>
        <div className="col-12 col-sm-3">
          <Button
            onClick={handlePlay}
            style={styles.playBtn}
            isCustom
            hideDefault
          >
            Play
        </Button>
        </div>
      </div>
      <div className="d-flex align-items-center">
        {generateButton('share', handleShare)}
        {generateButton(isFavorite ? 'favoriteActive' : 'favorite', handleFavorite)}
        {generateButton('cancel', handleRemove)}
      </div>
    </div>
  );
}

Row.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  mediaId: PropTypes.string.isRequired,
  mediaUrl: PropTypes.string.isRequired,
}

export default Row;
