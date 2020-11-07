import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TabMenu = (props) => {
  // props
  const {name, isActive, title, onClick} = props;

  // handlers
  const handleClick = () => {
    onClick(name);
  };

  // render
  return (
    <button
      className={`tab-menu ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      type="button"
    >
      <span>{title}</span>
      <div className={`active-tab-menu ${isActive ? 'visible' : 'invisible'}`} />
    </button>
  );
}

TabMenu.defaultProps = {
  isActive: false,
};

TabMenu.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default TabMenu;
