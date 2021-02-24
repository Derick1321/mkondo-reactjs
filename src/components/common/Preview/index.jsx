import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
`;

const Preview = (props) => {
  // props
  const {
    title,
    description,
    source, 
    onClick,
  } = props;

  // state
  const [isActive, setIsActive] = useState(false);

  // handler
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  // render
  return (
    <div className="col-12 col-md-4 col-lg-3">
      <div
        className={styles.previewBkgWrapper}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        <PreviewBkg
          source={source}
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
};

Preview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
};

export default Preview;
