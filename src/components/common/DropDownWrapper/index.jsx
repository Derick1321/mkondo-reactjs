import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'; 
import styled from 'styled-components';

import { showModal } from '$redux/features/modal';

import './index.scss';

const Container = styled.div`
  position: absolute;
  background-color: #FFFFFF;
  padding: 1rem 0.5rem;
  width: 180px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: 3999;
`;

const DropDownWrapper = (props) => {
  // refs
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  // state
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
  });

  // props
  const { children, options, handleSelect } = props;
  const dispatch = useDispatch();

  // effects
  useEffect(() => {
    document.addEventListener("click", handleClose);
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 27 || evt.key === "Escape" || evt.key === "Esc") {
      updateBounds(true);
    }
  }

  const updateBounds = (isClear) => {
    if (!isClear) {
      return;
    }

    setBounds({
      top: 0,
      left: 0,
    });
  }

  const handleClose = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)
    ) {
      updateBounds(true);
    }
  }, [bounds]);

  // handler
  const handleClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const bound = btnRef.current.getBoundingClientRect();
    dispatch(showModal('EMPTY', {
      noWrapper: true,
    }));

    setBounds({
      top: bound.bottom + 10,
      left: bound.left - (bound.width * 1.2),
    });
  }

  const buildDropDown = () => {
    return (
      <Container
        top={bounds.top}
        left={bounds.left}
        ref={dropdownRef}
      >
        <div className="dropdown-bubble-menu">
          {
            options.map((opt, idx) => (
              <a
                key={`opt-${name}-${idx}`}
                onClick={() => handleSelect(opt.name)}
                className={`dropdown-option ${opt.style ? opt.style : ''}`}
              >
                {opt.title}
              </a>
            ))
          }
        </div>
      </Container>
    );
  }

  // render
  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className="dropdown-wrapper-btn"
    >
      {children}
      {
        bounds.top ? 
          buildDropDown() : null
      }
    </button>
  )
}

DropDownWrapper.defaultProps = {
  options: [],
  handleSelect: () => null,
};

DropDownWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  handleSelect: PropTypes.func,
};

export default DropDownWrapper;
