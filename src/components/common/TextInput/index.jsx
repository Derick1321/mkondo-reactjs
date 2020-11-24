import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const icons = {
  search: require('$assets/images/icons/search.svg'),
};

const TextInput = (props) => {
  // props
  const {
    name,
    type,
    onChange,
    placeholder,
    value,
    customWrapperClass,
    icon,
  } = props;

  // handlers
  const handleChange = (evt) => {
    const { value } = evt.target;
    onChange(name, value);
  }

  // render
  return (
    <div className={`text-input-container d-flex justify-content-center ${customWrapperClass}`}>
      <input
        name={name}
        className="text-input-wrapper"
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
      {
        icon && (
          <img
            src={icons[icon]}
            className="text-input-icon"
          />
        )
      }
    </div>
  );
};

TextInput.defaultProps = {
  type: 'text', 
  customWrapperClass: '',
  icon: null,
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  customWrapperClass: PropTypes.string,
  icon: PropTypes.string,
};

export default TextInput;
