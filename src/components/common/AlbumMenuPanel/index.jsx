import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import AlbumMenu from '../AlbumMenu';

const AlbumMenuPanel = (props) => {
  // props
  const { onSelect } = props;

  const buildMenu = () => {
  };

  // render
  return (
    <ScrollMenu
      data={menu}
      selected={selected}
      onSelect={onSelect}
    />
  );
}

export default AlbumMenuPanel;
