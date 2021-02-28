import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Button from '$components/common/Button';

import styles from './index.module.scss';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

// don't forget to register plugins
gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollToPlugin); // ??

let v = 0;

const ScrollPanel = (props) => {
  // props
  const {
    showHeader,
    title,
    children,
  } = props;

  // store
  const history = useHistory();
  const dispatch = useDispatch();

  //state
  const [selected, setSelected] = useState(null);

  // ref
  const wrapperBox = useRef(null);

  useEffect(() => {
    Draggable.create("#wrapperBoxes", {
      bounds: "#dragSpace",
      type: "x",
      throwProps: true,
      // snap: (endValue) => Math.round(endValue / 300) * 300,
    });
  }, []);

  // handlers
  const handleNavRight = () => {
    if (-(children.length * 200) > v) {
      return;
    }
    v -= 900;
    gsap.to(wrapperBox.current, { duration: 2, x: v });
  }

  const handleNavLeft = () => {
    if (v > -900) {
      return;
    }
    v += 900;
    gsap.to(wrapperBox.current, { duration: 2, x: v });
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
      <div id="dragSpace" className={styles.dragSpace}>
        <div id="wrapperBoxes" ref={wrapperBox} className={`${styles.wrapperBoxes}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

ScrollPanel.defaultProps = {
  title: '',
  showHeader: false,
  isRounded: false,
  children: null,
};

ScrollPanel.propTypes = {
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  isRounded: PropTypes.bool,
  children: PropTypes.node,
};

export default ScrollPanel;
