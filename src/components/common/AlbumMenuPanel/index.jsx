import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import AlbumMenu from '../AlbumMenu';
import './index.scss';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

const AlbumMenuPanel = (props) => {
  // props
  const { showHeader, isRounded, title } = props;

  //state
  const [selected, setSelected] = useState(null);

  // ref
  const arrowLeftRef = useRef(null);
  const arrowRightRef = useRef(null);

  // handlers
  const buildMenu = () => {
    const results = [];
    for (let idx = 0; idx < 10; idx += 1) {
      results.push(
        <AlbumMenu
          key={`album-menu-${idx}`}
          isRounded={isRounded}
        />
      );
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

  const handleNavRight = () => {
    arrowRightRef.current.click();
  }

  const handleNavLeft = () => {
    arrowLeftRef.current.click();
  }

  // render
  return (
   <div className="scroll-menu-wrapper">
    {
      showHeader && (
        <div className="d-flex align-items-center my-4">
          <div className="d-flex album-menu-title-wrapper">
            <span className="heading-3">{title}</span>
          </div>
          <div className="d-flex justify-content-end">
            <button className="custom-btn" onClick={handleNavLeft}>
              <img src={arrowLeftIcon} />
            </button>
            <button className="custom-btn" onClick={handleNavRight}>
              <img src={arrowRightIcon} />
            </button>
          </div>
        </div>
      )
    }
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

AlbumMenuPanel.defaultProps = {
  title: 'Recomended Albums',
  showHeader: false,
  isRounded: false,
};

AlbumMenuPanel.propTypes = {
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  isRounded: PropTypes.bool,
};

export default AlbumMenuPanel;
