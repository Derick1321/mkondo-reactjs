import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Menu = (props) => {
  // props
  const {name, title, isActive, onClick} = props;

  // handlers
  const handleClick = () => {
    onClick(name);
  }

  // return
  return (
    <button
      className="d-flex flex-column align-items-center menu-btn px-2"
      onClick={handleClick}
      type="button"
    >
      <span className="menu-text">{title}</span>
      <div className={`active-dot ${isActive ? 'visible' : 'invisible'}`} />
    </button>
  )
}

Menu.defaultProps = {
  isActive: false,
};

Menu.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

export default Menu;
