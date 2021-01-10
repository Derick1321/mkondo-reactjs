import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import AlbumMenu from '$components/common/AlbumMenu';
import Button from '$components/common/Button';

import styles from './index.module.scss';

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
   <div className={styles.scrollMenuWrapper}>
    {
      showHeader && (
        <div className="d-flex align-items-center my-4">
          <div className={`d-flex ${styles.albumMenuTitleWrapper}`}>
            <span className={styles.heading}>{title}</span>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              onClick={handleNavLeft}
              isCustom
              hideDefault
            >
              <img src={arrowLeftIcon} />
            </Button>
            <Button
              onClick={handleNavRight}
              isCustom
              hideDefault
            >
              <img src={arrowRightIcon} />
            </Button>
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
  title: 'Recomended Artists',
  showHeader: false,
  isRounded: false,
};

AlbumMenuPanel.propTypes = {
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  isRounded: PropTypes.bool,
};

export default AlbumMenuPanel;
