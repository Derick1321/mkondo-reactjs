import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Button = (props) => {
  // props
  const {
    children,
    style,
    isTransparent,
    isSquare,
    isStretch,
    onClick,
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

    return customStyle;
  }

  // render
  return (
    <button
      className={`mk-btn ${getCustomStyle()} ${style}`}
      onClick={onClick}
    >
      { children }
    </button>
  );
};

Button.defaultProps = {
  isTransparent: false,
  isSquare: false,
  isStretch: false,
  style: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isTransparent: PropTypes.bool,
  isSquare: PropTypes.bool,
  isStretch: PropTypes.bool,
  style: PropTypes.string,
}

export default Button;
