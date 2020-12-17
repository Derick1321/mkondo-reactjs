import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { handleFetch } from '$common/requestUtils';
import { updatePlaylist } from '$redux/features/playlist';

import './index.scss';

const pause = require('$assets/images/icons/pause-icon.svg');
const play = require('$assets/images/icons/play.svg');

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
  } = props;

  // store
  const token = useSelector((store) => store.authentication.token);
  const dispatch = useDispatch();

  // state
  const [avatarUrl, setAvatarUrl] = useState('');

  // effects
  useEffect(async () => {
    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${avatar}`, null, token);
    setAvatarUrl(res.response);
  }, []);

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
    }));
  }

  // render
  return (
    <div className={'feature-wrapper'}>
      <FeatureBkg source={source} />
      <div className="d-flex feature-pane">
        <FeatureAvatar
          source={avatarUrl}
        />
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
}

Feature.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  numOfSongs: PropTypes.string,
  duration: PropTypes.string,
  mediaUrl: PropTypes.string,
  mediaId: PropTypes.string,
}

export default Feature;
