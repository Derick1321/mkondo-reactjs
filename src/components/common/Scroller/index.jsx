import React, { useCallback, useRef, useEffect } from 'react';
import gsap, { Power4 } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Button from '$components/common/Button';

import styles from './index.module.scss';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollToPlugin);

const Scroller = (props) => {
  // props
  const {
    name,
    children,
    showHeader,
    title,
    isLoading,
  } = props;

  const containerId = `${name}-container`;

  // refs
  const wrapperRef = useRef(null);

  // handlers
  const applyBoounds = useCallback(() => {
    const container = document.getElementById(containerId);
    var minx = window.innerWidth - container.clientWidth - 450;
    var maxx = 0;
    Draggable.get(container).applyBounds({
      minX: minx,
      maxX: maxx
    });
  }, [children]);

  const setup = useCallback(() => {
    const container = document.getElementById(containerId);
    var left = children.length * 300;
    gsap.set(container, {
      width: left,
    });

    Draggable.create(container, {
      type: 'x',
      throwProps: true,
      edgeResistance: 0.95,
      allowNativeTouchScrolling: false,
    })[0];
  }, [children]);

  const handleNavRight = () => {
    gsap.to(document.getElementById(containerId), {
      duration: 2,
      scrollTo: {
        offsetX: 450
      },
      ease: "power2",
    });
  }

  const handleNavLeft = () => {
    gsap.to(document.getElementById(containerId), {
      duration: 2,
      scrollTo: {
        offsetX: -450
      },
      ease: "power2",
    });
  }

  useEffect(() => {
    setup();
    applyBoounds();
  }, [children]);

  // render
  return (
    <div>
      {
        showHeader && (
          <div className="d-flex align-items-center my-4">
            <div className={`d-flex ${styles.titleWrapper}`}>
              <span className={styles.heading}>
                {title}
              </span>
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
      {
        isLoading && (
          <p>Loading...</p>
        )
      }
      <div className={styles.wrapper}>
        <div
          className={styles.container}
          id={containerId}
          ref={wrapperRef.current}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Scroller;
