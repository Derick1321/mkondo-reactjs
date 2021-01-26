import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { handleFetch } from '$common/requestUtils';

import styles from './index.module.scss';

const singer = require('$assets/images/singer.svg');

const AlbumMenu = (props) => {
  // props
  const {
    description,
    url,
    isRounded,
    handleClick,
  } = props;

  // store
  const token = useSelector((store) => store.authentication.token);

  // state
  const [avatarUrl, setAvatarUrl] = useState('');

  // effects
  useEffect(async () => {
    if (!url) {
      return;
    }

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${url}`, null, token);
    setAvatarUrl(res.response);
  }, [url]);

  // render
  return (
    <div
      onClick={handleClick}
      className={styles.albumMenu}
    >
      <div className={`${styles.albumMenuAvatar} ${isRounded ? styles.albumMenuAvatarRounded : ''}`}>
        <img
          src={avatarUrl || singer}
          className={styles.img}
        />
      </div>
      <p>{description}</p>
    </div>
  );
}

AlbumMenu.defaultProps = {
  url: null,
  description: 'Lorem ipsum dolor sit, amet, consectetuer ',
  isRounded: false,
};

AlbumMenu.propTypes = {
  url: PropTypes.string,
  description: PropTypes.string,
  isRounded: PropTypes.bool,
};

export default AlbumMenu;
