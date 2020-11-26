import React, { useState } from 'react';

import Button from '$components/common/Button';

// icons
const icons = {
  fb: { name: 'fb', icon: require('$assets/images/socials/fb.svg'), iconActive: require('$assets/images/socials/fb-active.svg'),},
  yt: { name: 'yt', icon: require('$assets/images/socials/yt.svg'), iconActive: require('$assets/images/socials/yt-active.svg'),},
  twitter: { name: 'twitter', icon: require('$assets/images/socials/twitter.svg'), iconActive: require('$assets/images/socials/twitter-active.svg'),},
  instagram: { name: 'instagram', icon: require('$assets/images/socials/instagram.svg'), iconActive: require('$assets/images/socials/instagram-active.svg'),},
}

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
        Object.values(icons).map((item, idx) => (
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
        ))
      }
    </div>
  )
}

export default Social;
