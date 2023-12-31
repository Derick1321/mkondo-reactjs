import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Wrapper,
  Button,
  Menu,
  MenuItem,
} from 'react-aria-menubutton';

import { showModal, hideModal } from '$redux/features/modal';

import styles from './index.module.scss';
import { toggleSideMenu } from '$redux/features/nav';

const DropDown = (props) => {
  // props
  const {
    children,
    options,
    optionElement,
    handleSelect,
    handleToggle,
  } = props;

  // store
  const dispatch = useDispatch();

  // handler
  const handleClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(showModal('EMPTY', {
      noWrapper: true,
    }));
  }

  // handle menu toggle
  const handleMenuToggle = (evt) => {
    if (handleToggle) {
      handleToggle();
    }
  }

  // deprecated
  const updateBound = {
  }

  const content = optionElement ? (
    <div className={styles.dropdownElementMenu}>
      {optionElement}
    </div>
  ) : (
    <div className={styles.dropdownBubbleMenu}>
      {
        options.map((opt, idx) => (
          <a
            key={`opt-${name}-${idx}`}
            onClick={(evt) => {
              evt.preventDefault();
              evt.stopPropagation();
              handleSelect(opt.name);
              dispatch(hideModal());
            }}
            className={`${styles.dropdownOption} ${opt.style ? opt.style : ''}`}
          >
            {opt.title}
          </a>
        ))
      }
    </div>
  );

  // render
  return (
    <Wrapper
      className='MyMenuButton'
      onSelection={handleClick}
      onMenuToggle={handleMenuToggle}
    >
      <Button className='MyMenuButton-button'>
        { children }
      </Button>
      <Menu className={styles.content}>
        { content }
      </Menu>
    </Wrapper>
  );
}

export default DropDown;
