import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory, generatePath } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AlbumMenu from '$components/common/AlbumMenu';
import Button from '$components/common/Button';

import { routePaths } from '$common/routeConfig';

import { clearSearch } from '$redux/features/nav';

import styles from './index.module.scss';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

const ScrollPanel = (props) => {
  // props
  const {
    showHeader,
    isRounded,
    title,
    values,
  } = props;

  // store
  const history = useHistory();
  const dispatch = useDispatch();

  //state
  const [selected, setSelected] = useState(null);

  // ref
  const arrowLeftRef = useRef(null);
  const arrowRightRef = useRef(null);

  // handlers
  const handleArtistNav = (artistId) => {
    dispatch(clearSearch());
    history.push(generatePath(routePaths.viewArtist, { id: artistId }));
  }

  const buildMenu = () => {
    return values.map((value, idx) => (
      <AlbumMenu
        key={`album-menu-${idx}`}
        description={value.full_name}
        url={value.avatar_url}
        handleClick={() => handleArtistNav(value.user_id)}
        isRounded={isRounded}
      />
    ));
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
    </div>
  );
}

ScrollPanel.defaultProps = {
  title: '',
  showHeader: false,
  isRounded: false,
  values: [],
};

ScrollPanel.propTypes = {
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  isRounded: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.object),
};

export default ScrollPanel;

/*
<ScrollMenu
        data={buildMenu()}
        selected={selected}
        onSelect={onSelect}
        arrowLeft={arrowLeft}
        arrowRight={arrowRight}
        alignCenter={false}
      />
*/
