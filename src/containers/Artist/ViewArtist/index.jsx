import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '$components/common/Button';
import Social from '$components/common/Social';
import AlbumMenuPanel from '$components/common/AlbumMenuPanel';

import { handleFetch } from '$common/requestUtils';

import { showModal } from '$redux/features/modal';
import { getArtistById } from '$redux/features/artist';

import styles from './index.module.scss';
import { current } from '@reduxjs/toolkit';

const shareIcon = require('$assets/images/icons/share.svg');
const favoriteIcon = require('$assets/images/icons/favorite.svg');
const defaultAvatar = require('$assets/images/profile-user.svg');

const Cover = styled.div`
  background-image: url(${props => props.source});
  background-color: #F7F5F5;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 100%;
`;

const Avatar = styled.div`
  background-image: url(${props => props.source});
  height: 110px;
  width: 110px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

const ViewArtist = () => {
  // store
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentArtist = useSelector((store) => store.artist.currentArtist);
  const token = useSelector((store) => store.authentication.token);

  const socialLinks = {
    fb: currentArtist.facebook_link,
    yt: currentArtist.youtube_link,
    instagram: currentArtist.instagram_link,
    twitter: currentArtist.instagram_link,
  };

  // state
  const [coverUrl, setCoverUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // effects
  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(getArtistById(id));
  }, [id]);

  useEffect(async () => {
    if (!currentArtist) {
      return;
    }

    if (currentArtist.avatar_url) {
      const res = await handleFetch('GET', `media/presigned-get-url?file_name=${currentArtist.avatar_url}`, null, token);
      setAvatarUrl(res.response);
    }

    if (currentArtist.cover_url) {
      const res = await handleFetch('GET', `media/presigned-get-url?file_name=${currentArtist.cover_url}`, null, token);
      setCoverUrl(res.response);
    }
  }, [currentArtist]);

  // handler
  const handlePlay = () => {
    console.log("Play");
  }

  const handleShare = () => {
    dispatch(showModal('SHARE_MODAL', {
      title: currentArtist.full_name,
      country: currentArtist.country,
      id: currentArtist.user_id,
      avatarUrl: avatarUrl,
      isArtist: true,
    }));
  }

  const handleFavorite = () => {
  }

  // render
  return (
    <div className={styles.artistViewContainer}>
      <div className={styles.artistCoverWrapper}>
        <Cover
          source={coverUrl}
        />
        <div className={`row ${styles.artistHeaderWrapper}`}>
          <div className={`d-flex col-12 col-md-6 ${styles.artistHeaderInfopane}`}>
            <Avatar
              source={avatarUrl || defaultAvatar}
            />
            <div className="ml-4 mt-2">
              <p className={`${styles.artistTitle} mt-2`}>{currentArtist.full_name}</p>
              <span className={`d-none d-sm-block ${styles.artistSubtitle} pb-2`}>About</span>
            </div>
          </div>
          <div className={`d-flex col-12 col-md-6 ${styles.artistHeaderActionpane}`}>
            <Button onClick={handlePlay}>Play</Button>
            <Button
              onClick={handleFavorite}
              isTransparent
              noBorder
            >
              <img
                className={styles.artistActionIcon}
                src={favoriteIcon}
              />
            </Button>
            <Button
              onClick={handleShare}
              isTransparent
              noBorder
            >
              <img
                src={shareIcon}
                className={styles.artistActionIcon}
              />
            </Button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8">
            <div className="px-2">
              <p>{currentArtist.description}</p>
            </div>
            <Social
              links={socialLinks}
            />
            <AlbumMenuPanel
              showHeader
              title="Similar Artists"
              isRounded
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewArtist;
