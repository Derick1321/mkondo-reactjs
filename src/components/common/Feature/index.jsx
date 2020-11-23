import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import './index.scss';

const pause = require('../../../assets/images/icons/pause-icon.svg');
const play = require('../../../assets/images/icons/play.svg');

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
    duration
  } = props;

  // render
  return (
    <div className={'feature-wrapper'}>
      <FeatureBkg source={source} />
      <div className="d-flex feature-pane">
        <FeatureAvatar source={avatar} />
        <div className="feature-content-wrapper">
          <p>{subtitle}</p>
          <div className="d-flex">
            <img
              src={play}
              className="feature-action-btn"
            />
            <div className="d-flex flex-column feature-summary">
              <span>{title}</span>
              <span>{numOfSongs} Songs, {duration}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Feature;
