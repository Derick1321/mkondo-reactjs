import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TextArea = (props) => {
  // props
  const { value, onChange, placeholder, title } = props;

  // render
  return (
    <div className="form-text-area-wrapper">
      <p>{title}</p>
      <textarea
        className="form-text-area"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

TextArea.defaultProps = {
  title: '',
  value: '',
}

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextArea;
