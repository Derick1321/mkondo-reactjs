import React, { useState, useRef } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import AlbumMenu from '../AlbumMenu';
import './index.scss';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

const AlbumMenuPanel = () => {
  //state
  const [selected, setSelected] = useState(null);

  // ref
  const arrowLeftRef = useRef(null);
  const arrowRightRef = useRef(null);

  // handlers
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

  const arrowLeft = (
    <div ref={arrowLeftRef} />
  );

  const arrowRight = (
    <div ref={arrowRightRef} />
  );

  // render
  return (
   <div className="scroll-menu-wrapper">
    <div className="d-flex">
      <div className="d-flex">
        <span>Recomended Albums</span>
      </div>
      <div>

      </div>
    </div>
    <ScrollMenu
      data={buildMenu()}
      selected={selected}
      onSelect={onSelect}
      arrowLeft={arrowLeft}
      arrowRight={arrowRight}
      alignCenter={false}
    />
   </div>
  );
}

export default AlbumMenuPanel;
