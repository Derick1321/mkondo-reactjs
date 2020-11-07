import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Button = (props) => {
  // props
  const {
    children,
    isTransparent,
    isSquare,
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

    console.log('custom ', customStyle, isTransparent, isSquare)

    return customStyle;
  }

  // render
  return (
    <button
      className={`mk-btn ${getCustomStyle()}`}
      onClick={onClick}
    >
      { children }
    </button>
  );
};

Button.defaultProps = {
  isTransparent: false,
  isSquare: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isTransparent: PropTypes.bool,
  isSquare: PropTypes.bool,
}

export default Button;
