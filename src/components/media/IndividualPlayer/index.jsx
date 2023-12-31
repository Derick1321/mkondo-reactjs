import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '$components/common/Button';
import ProgressSlider from '$components/media/ProgressSlider';
import PlayBtn from '$components/media/PlayBtn';

import { handleFetch } from '$common/requestUtils';

import { showModal } from '$redux/features/modal';
import { addFavorite, removeFavorite } from '$redux/features/user';
import { loadMedia } from '$redux/features/player';

import { COLOR_PRIMARY } from '$common/constants';

import styles from './index.module.scss';
import { useHistory, generatePath } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';

const prevIcon = require('$assets/images/player/prev.svg');
const nextIcon = require('$assets/images/player/next.svg');
const favoriteActive = require('$assets/images/icons/favorite-active.svg');
const favoriteIcon = require('$assets/images/icons/favorite.svg');
const shareIcon = require('$assets/images/icons/share.svg');

// Styled Div
const commonStyle = `
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Cover = styled.div`
  ${commonStyle}
  position: absolute;
  background-image: url(${props => props.url});
  background-color: #514E4E;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;

const AvatarImage = styled.div`
  border-radius: 999px;
  height: 80px;
  width: 80px;
  border: 0.5rem solid ${props => props.bg};
  background-image: url(${props => props.url});
  background-size: cover;
  background-color: ${props => props.bg};
  margin-right: 1rem;

`;

const IndividualPlayer = (props) => {
  // props
  const {
    mediaId,
    mediaUrl,
    coverUrl,
    avatarUrl,
    title,
    artistName,
  } = props;

  //hooks
  const history = useHistory();

  // store
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authentication.token);
  const favourites = useSelector((store) => store.authentication.user.favourites);
  const isLoading = useSelector((store) => store.player.isLoading);
  const isPlaying = useSelector((store) => store.player.isPlaying);
  const position = useSelector((store) => store.player.position);
  const duration = useSelector((store) => store.player.duration);
  const artistId = useSelector((store) => store.player.currentPlaylist.length ? store.player.currentPlaylist[0].artistId : '');

  const isFavorite = favourites && favourites.find((media) => media.media_id === mediaId);

  // state
  const [avatarSrc, setAvatarSrc] = useState('');
  const [coverSrc, setCoverSrc] = useState('');

  // effects
  useEffect(() => {
    if (!coverUrl) return;
    handleFetch('GET', `media/presigned-get-url?file_name=${coverUrl}`, null, token)
    .then((res) => {
      setCoverSrc(res.response);
    });
  }, [coverUrl]);

  useEffect(() => {
    if (!avatarUrl) return;
    handleFetch('GET', `media/presigned-get-url?file_name=${avatarUrl}`, null, token)
      .then((res) => {
        setAvatarSrc(res.response);
      });
  }, [avatarUrl]);
  
  useEffect(() => {
    if (!mediaUrl) return;
    handlePlay();
  }, [mediaUrl]);

  // handlers
  const handlePlay = () => {
    // play
    dispatch(loadMedia({
      mediaId,
      url: mediaUrl,
      howl: null,
      avatar: avatarSrc,
      name: title,
      artistName,
    }));
  }

  const handlePrev = () => {
    // prev
  }

  const handleNext = () => {
    // next
  }

  const handleLike = () => {
    if (!mediaId) {
      return;
    }

    const data = {
      media_id: mediaId,
    };

    if (isFavorite) {
      dispatch(removeFavorite(data));
    } else {
      dispatch(addFavorite(data));
    }
  }

  const handleShare = () => {
    dispatch(showModal('SHARE_MODAL', {
      title,
      country: artistName,
      id: mediaId,
      avatarUrl: avatarSrc,
    }));
  }

  // panel
  const playPanel = () => {
    if (isLoading) {

    }
  }

  // render
  return (
    <div className={styles.wrapper}>
      <div className={`d-flex ${styles.coverWrapper}`}>
        <Cover url={coverSrc} />
        <div className={`d-flex justify-content-end ${styles.header}`}>
          <Button
            onClick={handleLike}
            isTransparent
            noBorder
          >
            <img
              className={styles.headerIcon}
              src={isFavorite ? favoriteActive : favoriteIcon}
            />
          </Button>
          <Button
            onClick={handleShare}
            isTransparent
            noBorder
          >
            <img
              className={styles.headerIcon}
              src={shareIcon}
            />
          </Button>
        </div>

        <div className={`d-flex align-items-center ${styles.contentWrapper}`}>
          <div className="">
            <div className={`d-flex align-items-center ${styles.controlWrapper}`}>
              <Button
                onClick={handlePrev}
                isCustom
                hideDefault
              >
                <img
                  className={styles.icon}
                  src={prevIcon}
                  alt=""
                />
              </Button>
              <Button
                onClick={handlePlay}
                isCustom
                hideDefault
              >
                <PlayBtn
                  isLoading={isLoading}
                  isPlaying={isPlaying}
                />
              </Button>
              <Button
                onClick={handleNext}
                isCustom
                hideDefault
              >
                <img
                  className={styles.icon}
                  src={nextIcon}
                  alt=""
                />
              </Button>
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center px-3">
              <div style={{ height: '80px', width: "80px", marginRight: "15px" }}><AvatarImage onClick={() => history.push(generatePath(routePaths.viewArtist, { id: artistId }))} url={avatarSrc} bg={COLOR_PRIMARY} /></div>
              <div className="d-flex flex-column justify-content-center">
                <p className={styles.artistName}  onClick={() => history.push(generatePath(routePaths.viewArtist, { id: artistId }))}>{artistName}</p>
                <p className={styles.title}>{title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.playerWrapper}>
        <ProgressSlider
          position={position}
          duration={duration}
        />
      </div>
    </div>
  );
}

IndividualPlayer.defaultProps = {
  mediaId: null,
  mediaUrl: null,
  coverUrl: null,
  avatarUrl: null,
  title: '',
  artistName: '',
}

IndividualPlayer.propTypes = {
  mediaId: PropTypes.string,
  mediaUrl: PropTypes.string,
  coverUrl: PropTypes.string,
  avatarUrl: PropTypes.string,
  title: PropTypes.string,
  artistName: PropTypes.string,
}

export default IndividualPlayer;
