import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '$components/common/Button';

import styles from './index.module.scss';

const audioBkg = require('$assets/images/audio-bkg.png');
const videoBkg = require('$assets/images/video-bkg.png');

const commonStyles = `
  height: 360px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Audio = styled.div`
  background-image: url(${audioBkg});
  ${commonStyles}    
`;

const Video = styled.div`
  background-image: url(${videoBkg});
  ${commonStyles}    
`;

const Hero = (props) => {
  // props
  const {source} = props;

  // handlers
  const handlePlay = () => {
  };

  // render
  return (
    <div className="row align-items-center">
      <div className="col-12 col-md-6">
        <div className="hero-text-container">
          <p className={styles.heroHeading}>Mkondo entertainment platform</p>
          <p className={`${styles.heroSubHeading} pb-4`}>Bringing Entertainment to your door step</p>
          <Button
            onClick={handlePlay}
          >
            Play
          </Button>
        </div>
      </div>
      <div className="col-12 col-md-6">
      {
        source === 'audio' ? 
        <Audio /> :
        <Video />
      }
      </div>
    </div>
  );
};

Hero.defaultProps = {
  source: 'audio',
};

Hero.propTtypes = {
  source: PropTypes.string,
};

export default Hero;
