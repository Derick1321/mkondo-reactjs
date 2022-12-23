import React, { useEffect, useState } from "react";
import * as styles from "../index.module.scss";
import styled from "styled-components";
import { PropTypes } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getArtistMedia } from "../../../../redux/features/artist";
import Social from "$components/common/Social";

const defaultAvatar = require("$assets/images/profile-user.svg");

const Cover = styled.div`
  background-image: url(${(props) => props.source});
  background-color: #f7f5f5;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 100%;
`;

const Avatar = styled.div`
  background-image: url(${(props) => props.source});
  height: 110px;
  width: 110px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  background-color: #c1c1c1;
`;

const ArtistHero = ({ artist }) => {
  // constants
  const currentArtist = artist;

  const socialLinks = {
    fb: currentArtist.facebook_link,
    yt: currentArtist.youtube_link,
    instagram: currentArtist.instagram_link,
    twitter: currentArtist.instagram_link,
  };

  // state
  const [coverUrl, setCoverUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // redux
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.authentication.token);

  useEffect(async () => {
    if (!currentArtist) {
      return;
    }

    if (currentArtist.avatar_url) {
      const res = await handleFetch(
        "GET",
        `media/presigned-get-url?file_name=${currentArtist.avatar_url}`,
        null,
        token
      );
      setAvatarUrl(res.response);
    }

    if (currentArtist.cover_url) {
      const res = await handleFetch(
        "GET",
        `media/presigned-get-url?file_name=${currentArtist.cover_url}`,
        null,
        token
      );
      setCoverUrl(res.response);
    }
  }, [currentArtist]);

  return (
    <div>
      <div className={styles.artistCoverWrapper}>
        <Cover source={coverUrl} />
      </div>
      <div className={`row ${styles.artistHeaderWrapper}`}>
        <div
          className={`d-flex col-12 col-md-6 ${styles.artistHeaderInfopane}`}
        >
          <Avatar source={avatarUrl || defaultAvatar} />
          <div className="ml-4 mt-2">
            <p className={`${styles.artistTitle} mt-2`}>
              {currentArtist.full_name}
            </p>
            <span className={`d-none d-sm-block ${styles.artistSubtitle} pb-2`}>
              About
            </span>
            <p>{artist.description}</p>
          </div>
        </div>
        <div
          className={`d-flex col-12 col-md-6 ${styles.artistHeaderActionpane}`}
        >
          {/* <Button
                onClick={handleFavorite}
            >
            {isFavorite ? 'Following' : 'Follow'}
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
            </Button> */}
        </div>
      </div>
    </div>
  );
};

ArtistHero.propTypes = {
  artist: PropTypes.object,
};

export default ArtistHero;
