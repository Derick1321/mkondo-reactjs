import React, {useState} from 'react';

import Menu from './Menu';

import './index.scss';

const Header = () => {
  // state
  const [activeMenu, setActiveMenu] = useState('');

  // handlers
  const handleClick = (value) => {
    setActiveMenu(value);
  };

  // render
  return (
    <div className="d-flex header-wrapper">
      <div className="header-panel">
        <p className="header-title">Mkondo</p>
      </div>
      <div className="d-flex header-panel">
        <Menu
          name="about"
          title="About"
          isActive={activeMenu === 'about'}
          onClick={handleClick}
        />
        <Menu
          name="login"
          title="Contributors Login"
          isActive={activeMenu === 'login'}
          onClick={handleClick}
        />
        <Menu
          name="signup"
          title="Sign Up"
          isActive={activeMenu === 'signup'}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Header;
