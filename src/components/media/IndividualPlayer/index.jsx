import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '$components/common/Button';

import { showModal } from '$redux/features/modal';
import { addFavorite, removeFavorite } from '$redux/features/user';

import { handleFetch } from '$common/requestUtils';

import styles from './index.module.scss';

const prevIcon = require('$assets/images/player/prev.svg');
const nextIcon = require('$assets/images/player/next.svg');
const playIcon = require('$assets/images/player/play.svg');
const pauseIcon = require('$assets/images/player/pause.svg');
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
  ${commonStyle}
  border-radius: 50%;
  height: 80px;
  width: 80px;
  border: 0.8rem solid #3B8CBC;
  background-image: url(${props => props.url});
  background-color: #3B8CBC;
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

  // store
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authentication.token);
  const favourites = useSelector((store) => store.authentication.user.favourites);

  const isFavorite = favourites.find((media) => media.media_id === mediaId);

  // state
  const [avatarSrc, setAvatarSrc] = useState('');
  const [coverSrc, setCoverSrc] = useState('');

  // effects
  useEffect(() => {
    if (!mediaUrl) {
      return;
    }

    handleFetch('GET', `media/presigned-get-url?file_name=${avatarUrl}`, null, token)
      .then((res) => {
        setAvatarSrc(res.response);
      });

    handleFetch('GET', `media/presigned-get-url?file_name=${coverUrl}`, null, token)
      .then((res) => {
        setCoverSrc(res.response);
      });

  }, [mediaUrl]);

  // handlers
  const handlePlay = () => {
    // play
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
              src={isFavorite ? favoriteActive : favoriteIcon}
            />
          </Button>
          <Button
            onClick={handleShare}
            isTransparent
            noBorder
          >
            <img
              src={shareIcon}
            />
          </Button>
        </div>
        <div className={`d-flex align-items-center ${styles.contentWrapper}`}>
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
              <img
                className={styles.playIcon}
                src={playIcon}
                alt=""
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
          <AvatarImage url={avatarSrc} />
          <div className="d-flex flex-column justify-content-center">
            <p className={styles.artistName}>{artistName}</p>
            <p className={styles.title}>{title}</p>
          </div>
        </div>
      </div>
      <div className={styles.playerWrapper}></div>
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
