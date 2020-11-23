import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const sample = require('$assets/images/album-sample.png');

const AlbumMenu = (props) => {
  // props
  const { description, url } = props;

  // render
  return (
    <div className="album-menu">
      <img
        src={url || sample}
        className="album-menu-avatar" 
      />
      <p>{description}</p>
    </div>
  );
}

AlbumMenu.defaultProps = {
  url: null,
  description: 'Lorem ipsum dolor sit, amet, consectetuer ',
};

AlbumMenu.propTypes = {
  url: PropTypes.string,
  description: PropTypes.string,
};

export default AlbumMenu;
