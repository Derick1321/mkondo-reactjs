import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const icons = {
  next: require('$assets/images/icons/arrow-next.svg'),
}

const Button = (props) => {
  // props
  const {
    children,
    style,
    isTransparent,
    isSquare,
    isStretch,
    onClick,
    onMouseEnter,
    onMouseLeave,
    noBorder,
    icon,
  } = props;

  // handler
  const getCustomStyle = () => {
    let customStyle = '';
    if (isTransparent) {
      customStyle = `${customStyle} mk-btn-transparent`;
    }

    if (isSquare) {
      customStyle = `${customStyle} mk-btn-square`;
    }

    if (isStretch) {
      customStyle = `${customStyle} mk-btn-stretch`;
    }

    if (noBorder) {
      customStyle = `${customStyle} no-border`;
    }

    return customStyle;
  }

  // render
  return (
    <button
      className={`mk-btn ${getCustomStyle()} ${style}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-100">
        { children }
      </div>
      {
        icon && (
          <img
            src={icons[icon]}
            className="btn-icon"
          />
        )
      }
    </button>
  );
};

Button.defaultProps = {
  isTransparent: false,
  isSquare: false,
  isStretch: false,
  noBorder: false,
  style: '',
  icon: null,
  onMouseEnter: () => null,
  onMouseLeave: () => null,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isTransparent: PropTypes.bool,
  isSquare: PropTypes.bool,
  isStretch: PropTypes.bool,
  noBorder: PropTypes.bool,
  style: PropTypes.string,
  icon: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

export default Button;
