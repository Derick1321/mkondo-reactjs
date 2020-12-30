import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { handleFetch } from '$common/requestUtils';

import DropDownWrapper from '$components/common/DropDownWrapper';

import { updatePlaylist } from '$redux/features/playlist';
import { addFavorite, removeFavorite } from '$redux/features/user';
import { showModal } from '$redux/features/modal';

import './index.scss';

const defaultAvatar = require('$assets/images/profile-user.svg');
const pause = require('$assets/images/icons/pause-icon.svg');
const play = require('$assets/images/icons/play.svg');
const favoriteActive = require('$assets/images/icons/favorite-active.svg');
const favorite = require('$assets/images/icons/favorite.svg');
const share = require('$assets/images/icons/share.svg');

const commonStyle = `
  background-repeat: no-repeat;
  background-position: center;
`;

const FeatureBkg = styled.div`
  ${commonStyle}
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: 100%;
  background-image: url(${props => props.source}); 
  mix-blend-mode: multiply;
`;

const FeatureAvatar = styled.div`
  ${commonStyle}
  height: 80px;
  width: 80px;
  margin-right: 10px;
  background-size: cover;
  background-image: url(${props => props.source}); 
`;

const Feature = (props) => {
  // props
  const {
    avatar,
    source,
    subtitle,
    title,
    numOfSongs,
    duration,
    mediaUrl,
    mediaId,
    artistId,
    country,
  } = props;

  // store
  const token = useSelector((store) => store.authentication.token);
  const favourites = useSelector((store) => store.authentication.user.favourites);
  const dispatch = useDispatch();

  // state
  const [avatarUrl, setAvatarUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // ref
  const isMounted = useRef(false);

  // effects
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (!favourites) {
      return;
    }

    const res = favourites.find((media) => media.media_id === mediaId);
    if (!res) {
      return;
    }
    setIsFavorite(true);
  }, [favourites]);

  useEffect(async () => {
    if (!token || !isMounted.current) {
      return;
    }

    const sourceAvatar = await handleFetch('GET', `media/presigned-get-url?file_name=${source}`, null, token);
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${avatar}`, null, token);
    if (isMounted.current) {
      setAvatarUrl(res.response);
      setSourceUrl(sourceAvatar.response);
    }
  }, [token]);

  // handlers
  const handlePlay = async () => {
    // temporarily load it on player
    // TODO: navigate to player component
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${mediaUrl}`, null, token);
    dispatch(updatePlaylist({
      url: res.response,
      avatar: avatarUrl,
      name: title,
      howl: null,
      mediaId,
    }));
  }

  const handleFavorite = () => {
    const data = {
      media_id: mediaId,
    };

    if (!isFavorite) {
      dispatch(addFavorite(data));
    } else {
      dispatch(removeFavorite(data));
    }
    setIsFavorite(!isFavorite);
  }

  const handleShare = () => {
    dispatch(showModal('SHARE_MODAL', {
      title, 
      country,
      mediaId,
      avatarUrl,
    }));
  }

  // render
  return (
    <div className={'feature-wrapper'}>
      <FeatureBkg source={avatarUrl} />
      <div className="d-flex justify-content-between feature-header-wrapper mt-2 px-2">
        <div className="feature-header-wrapper-title px-2">FEATURE</div>
        <div className="d-flex">
          <button
            className="feature-play-btn"
            onClick={handleFavorite}
          >
            <img
              src={isFavorite ? favoriteActive : favorite}
              className=""
            />
          </button>
          <button
            className="feature-play-btn"
            onClick={handleShare}
          >
            <img
              src={share}
              className=""
            />
          </button>
        </div>
      </div>
      <div className="d-flex feature-pane">
        {
          !source && (
            <img
              src={defaultAvatar}
              className="default-feature-avatar"
            />
          )
        }
        {
          source && (
            <FeatureAvatar
              source={sourceUrl}
            />
          )
        }
        <div className="feature-content-wrapper">
          <p>{subtitle}</p>
          <div className="d-flex">
            <button
              className="feature-play-btn"
              onClick={handlePlay}
            >
              <img
                src={play}
                className="feature-action-btn"
              />
            </button>
            <div className="d-flex flex-column feature-summary">
              <span>{title}</span>
              {
                numOfSongs && (
                  <span>{numOfSongs} Songs, {duration}</span>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Feature.defaultProps = {
  numOfSongs: null,
  duration: null,
  country: '',
  mediaId: null,
  artistId: null,
  mediaUrl: '',
}

Feature.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  numOfSongs: PropTypes.string,
  duration: PropTypes.string,
  mediaUrl: PropTypes.string,
  mediaId: PropTypes.string,
  country: PropTypes.string,
  artistId: PropTypes.string,
}

export default Feature;
