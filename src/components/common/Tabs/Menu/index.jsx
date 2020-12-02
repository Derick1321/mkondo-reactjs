import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TabMenu = (props) => {
  // props
  const {
    name,
    isActive,
    title,
    onClick,
    activeColor,
  } = props;

  // handlers
  const handleClick = () => {
    onClick(name);
  };

  const customStyle = {};

  if (activeColor) {
    customStyle.color = activeColor;
  }

  // render
  return (
    <button
      className={`tab-menu ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      type="button"
    >
      <span style={customStyle}>{title}</span>
      <div className={`active-tab-menu ${isActive ? 'visible' : 'invisible'}`} />
    </button>
  );
}

TabMenu.defaultProps = {
  isActive: false,
  activeColor: '',
};

TabMenu.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  activeColor: PropTypes.string,
};

export default TabMenu;
