import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import './index.scss';

const playBtn = require('$assets/images/icons/play.svg');

const PreviewBkg = styled.div`
  height: 100%;
  width: 100%;
  background-position: center;
  background-size: ${props => props.isActive ? '150%;' : '110%'};
  background-repeat: no-repeat;
  transition: background-size 150ms linear;
  background-image: url(${props => props.source}); 
`;

const Preview = (props) => {
  // props
  const { isWide, description, source } = props;
  
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
    <div className={`preview-wrapper ${isWide ? 'preview-wide' : ''}`}>
      <div
        className="preview-bkg-wrapper"
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        <PreviewBkg
          source={source}
          isActive={isActive}
        />
        <button className="preview-action-btn">
          <img
            className="preview-action-icon"
            src={playBtn}
          />
        </button>
      </div>
      { description && <p className="text-left">{description}</p> }
    </div>
  );
};

Preview.defaultProps = {
  isWide: false,
  description: null,
};

Preview.propTypes = {
  isWide: PropTypes.bool,
  description: PropTypes.string,
};

export default Preview;
