import React, { useState } from 'react';

import Header from '$components/common/Header';
import menus from './menus';
import './index.scss';

const happyFace = require('$assets/images/home/happy-face.svg');

const OnBoarding = () => {
  // state
  const [selected, setSelected] = useState([]);
  // handlers
  const handleSelect = (name) => {
    if (selected.indexOf(name) > -1) {
      selected.splice(selected.indexOf(name), 1);
      setSelected([...selected]);
      return;
    }
    setSelected([...selected, name]);
  }

  // render
  return (
    <div className="onboarding-wrapper">
      <Header />
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6 onboarding-content">
          <div className="d-flex justify-content-center align-items-center onboarding-header">
            <img
              src={happyFace}
              alt="Happy Face"
            />
            <div className="onboarding-header-wrapper">
              <p className="onboarding-header">We are Happy to have you here...</p>
              <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
            </div>
          </div>
          <div className="d-flex flex-wrap onboarding-menus justify-content-center">
            {
              menus.map((menu) => {
                const isActive = selected.indexOf(menu.name) > -1 ? 'active' : '';
                const icon = isActive ? menu.iconActive : menu.icon;
                return (
                  <div
                    className={`d-flex flex-column justify-content-center align-items-center onboarding-menu ${isActive}`}
                    key={`onboarding-${menu.name}`}
                    onClick={() => handleSelect(menu.name)}
                  >
                    <div className="d-flex justify-content-center align-items-center onboarding-menu-image">
                        <img src={icon} />
                    </div>
                    <span>{menu.title}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnBoarding;
