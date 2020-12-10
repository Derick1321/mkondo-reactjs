import React from 'react';

import TextInput from '$components/common/TextInput';
import { socialIcons } from '$common/icons';

import './index.scss';

const SocialInput = (props) => {
  // props
  const {
    name,
    onChange,
    value,
    placeholder,
    icon,
  } = props;

  // render
  return (
    <div className="d-flex align-items-center">
      <img
        src={socialIcons[icon].iconActive}
        className="social-input-icon"
        alt=""
      />
      <TextInput
        name={name}
        customWrapperClass="social-input-text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default SocialInput;
