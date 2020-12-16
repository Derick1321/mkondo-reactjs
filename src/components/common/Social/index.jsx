import React, { useState } from 'react';

import Button from '$components/common/Button';
import { socialIcons } from '$common/icons';

const Social = (props) => {
  // props
  const {
    links,
  } = props;

  // state
  const [active, setActive] = useState('');

  const handleFocus = (value) => {
    setActive(value);
  }

  const handleBlur = (value) => {
    if (value === active) {
      setActive(null);
    }
  }

  const handleClick = (value) => {
    window.open(links[value], '_blank');
  }

  // socials
  return (
    <div className="d-flex">
      {
        Object.values(socialIcons).map((item, idx) => {
          
          if (!links[item.name]) {
            return null;
          }

          return (
            <Button
              key={`social-btn-${idx}`}
              onClick={() => handleClick(item.name)}
              onMouseEnter={() => handleFocus(item.name)}
              onMouseLeave={() => handleBlur(item.name)}
              isTransparent
              noBorder
            >
              <img
                src={active === item.name ? item.iconActive : item.icon}
                className="social-icon"
              />
            </Button>
          )
        })
      }
    </div>
  )
}

export default Social;
