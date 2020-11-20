import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TextInput = (props) => {
  // props
  const {
    name,
    type,
    onChange,
    placeholder,
    value,
  } = props;

  // handlers
  const handleChange = (evt) => {
    const { value } = evt.target;
    onChange(name, value);
  }

  // render
  return (
    <div className="text-input-container d-flex justify-content-center">
      <input
        name={name}
        className="text-input-wrapper"
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

TextInput.defaultProps = {
  type: 'text', 
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default TextInput;
