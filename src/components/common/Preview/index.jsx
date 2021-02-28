import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { handleFetch } from '$common/requestUtils';

import styles from './index.module.scss';

const playBtn = require('$assets/images/icons/play.svg');

const PreviewBkg = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: transform 100ms ease-in-out;
  transform: scale(${props => props.isActive ? 1.3 : 1});
  transform-origin: center;
  background-image: url(${props => props.source});
  background-color: black;
`;

const Preview = (props) => {
  // props
  const {
    title,
    description,
    source, 
    onClick,
    isAvatarLoaded,
  } = props;

  // state
  const [isActive, setIsActive] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // props
  const token = useSelector((store) => store.authentication.token);

  // effects
  useEffect(async () => {
    if (!source) {
      return;
    }

    if (isAvatarLoaded) {
      setAvatarUrl(source)
      return;
    }

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${source}`, null, token);
    setAvatarUrl(res.response);
  }, [source]);

  // handler
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  // render
  return (
    <div className={styles.temp}>
      <div
        className={styles.previewBkgWrapper}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        <PreviewBkg
          source={avatarUrl}
          isActive={isActive}
        />
        <button
          className={styles.previewActionBtn}
          onClick={onClick}
        >
          <img
            className={styles.previewActionIcon}
            src={playBtn}
          />
        </button>
      </div>
      {
        title && <p className={`${styles.title} text-left`}>{title}</p>
      }
      {
        description && <p className={`${styles.description} text-left`}>{description}</p>
      }
    </div>
  );
};

Preview.defaultProps = {
  title: null,
  description: null,
  onClick: () => null,
  isAvatarLoaded: false,
};

Preview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  isAvatarLoaded: PropTypes.bool,
};

export default Preview;
