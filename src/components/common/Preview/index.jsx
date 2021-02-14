import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from './index.module.scss';

const playBtn = require('$assets/images/icons/play.svg');

const PreviewBkg = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: ${props => props.isActive ? '160%;' : 'cover'};
  background-repeat: no-repeat;
  transition: background-size 150ms linear;
  background-image: url(${props => props.source}); 
`;

const Preview = (props) => {
  // props
  const { description, source } = props;

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
        <button className={styles.previewActionBtn}>
          <img
            className={styles.previewActionIcon}
            src={playBtn}
          />
        </button>
      </div>
      {
        description && <p className={`${styles.description} text-left`}>{description}</p>
      }
    </div>
  );
};

Preview.defaultProps = {
  description: null,
};

Preview.propTypes = {
  description: PropTypes.string,
};

export default Preview;
