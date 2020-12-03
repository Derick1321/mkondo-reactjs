import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const TextArea = (props) => {
  // props
  const { name, value, onChange, placeholder, title } = props;

  // handlers
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    onChange(name, value);
  }

  // render
  return (
    <>
      <p>{title}</p>
      <div className="form-text-area-wrapper">
        <textarea
          name={name}
          className="form-text-area"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </>
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
