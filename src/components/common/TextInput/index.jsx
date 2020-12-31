import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const icons = {
  search: require('$assets/images/icons/search.svg'),
};

const TextInput = (props) => {
  // props
  const {
    name,
    type,
    onChange,
    onFocus,
    placeholder,
    value,
    customWrapperClass,
    icon,
    disabled,
    title,
  } = props;

  // handlers
  const handleChange = (evt) => {
    const { value } = evt.target;
    onChange(name, value);
  }

  // render
  return (
    <>
      <p>{title}</p>
      <div className={`d-flex justify-content-center ${styles.textInputContainer} ${customWrapperClass}`}>
        <input
          name={name}
          className={styles.textInputWrapper}
          type={type}
          onChange={handleChange}
          onFocus={onFocus}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
        {
          icon && (
            <img
              src={icons[icon]}
              className={styles.textInputIcon}
            />
          )
        }
      </div>
    </>
  );
};

TextInput.defaultProps = {
  type: 'text', 
  customWrapperClass: '',
  icon: null,
  disabled: false,
  onFocus: () => null,
  title: '',
  value: '',
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  customWrapperClass: PropTypes.string,
  onFocus: PropTypes.func,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default TextInput;
