import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

import './index.scss';

// don't forget to register plugins
gsap.registerPlugin(Draggable); 

// New Timeline
const tl = gsap.timeline({
  paused: true,
});

const Slider = (props) => {
  // props
  const { callbacks, position, isVolume } = props;
  // TODO? should we use Redux?

  // refs
  const knobRef = useRef(null);
  const progressBarRef = useRef(null);
  const rangeRef = useRef(null);

  // effects
  useEffect(() => {
    Draggable.create(knobRef.current, {
      type: "x",
      trigger: progressBarRef.current,
      bounds: progressBarRef.current,
      edgeResistance: 1,
      lockAxis: true,
      cursor: "pointer",
      ease: "power1.inOut",
      onDrag: updateRange,
      onPressInit: updatePosition,
      onClick: updateRange,
    });

    if (isVolume) {
      update(null, true);
    }
  }, []);

  useEffect(() => {
    update(position);
  }, [position]);

  // handlers
  // To syncronise both audio and timeline
  const update = (value, useXValue) => {
    const knobRect = knobRef.current.getBoundingClientRect();
    const progRect = progressBarRef.current.getBoundingClientRect();

    tl.progress(value); // NOTE: audio.currentTime / audio.duration
    console.log('ppp ', useXValue, useXValue ? (progRect.width - progRect.left) : (progRect.width - knobRect.width) * value);
    gsap.set(knobRef.current, {
      x: useXValue ? (progRect.width - progRect.left) : (progRect.width - knobRect.width) * value,
    });
    gsap.set(rangeRef.current, {
      width: knobRect.left + knobRect.width - progRect.left
    });
  }

  function updatePosition() {
    const knobRect = knobRef.current.getBoundingClientRect();
    const progRect = progressBarRef.current.getBoundingClientRect();
    gsap.set(knobRef.current, {
      x: this.pointerX - progRect.left - knobRect.width / 2,
    });

    gsap.set(rangeRef.current, {
      width: knobRect.left + knobRect.width - progRect.left
    });
    // CALLBACK TO SEEK
  }

  // repositions tl + elements when user clicks on audio scrub
  function updateRange() {
    const knobRect = knobRef.current.getBoundingClientRect();
    const progRect = progressBarRef.current.getBoundingClientRect();

    const currentPosition = this.x / (progRect.width - knobRect.width);
    console.log('this.x ', currentPosition, knobRect.left + knobRect.width - progRect.left)

    tl.progress(currentPosition);
    gsap.set(rangeRef.current, {
      width: knobRect.left + knobRect.width - progRect.left
    });

    callbacks.updateRange(currentPosition);
  }

  // render
  return (
    <div className="progressBar" ref={progressBarRef}>
      <div className="knobMenu" ref={knobRef} />
      <div className="rangeMenu" ref={rangeRef} />
    </div>
  );
}

Slider.defaultProps = {
  callbacks: {},
};

Slider.propTypes = {
  callbacks: PropTypes.objectOf(PropTypes.func),
};

export default Slider;

/*
// controle the sound
function updateSound() {
  // need to add back the loss in which the knob takes off - beter way of doing this
  audio.volume = this.x * 1.11111111 / 100;

  // needs re-calculating not working
  TweenMax.set(range2, { width: this.x });
}
*/