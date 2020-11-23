import React, { useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import AlbumMenu from '../AlbumMenu';
import './index.scss';

const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const AlbumMenuPanel = () => {
  //state
  const [selected, setSelected] = useState(null);

  const buildMenu = () => {
    const results = [];
    for (let idx = 0; idx < 10; idx += 1) {
      results.push(<AlbumMenu key={`album-menu-${idx}`}/>);
    }
    return results;
  };

  const onSelect = (key) => {
    setSelected(key);
  }

  // render
  return (
   <div className="scroll-menu-wrapper">
     <ScrollMenu
      data={buildMenu()}
      selected={selected}
      onSelect={onSelect}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
      alignCenter={false}
    />
   </div>
  );
}

export default AlbumMenuPanel;
