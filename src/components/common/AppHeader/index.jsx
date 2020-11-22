import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DropDownWrapper from '$components/common/DropDownWrapper';
import TextInput from '$components/common/TextInput';

import './index.scss';

const defaultAvatar = require('$assets/images/profile-user.svg');

const headerMenus = [
  { name: 'account', title: 'My Account', },
  { name: 'logout', title: 'Log Out', style: 'opt-secondary'},
];

const AppHeader = () => {
  //state
  const [search, setSearch] = useState('');

  // store
  const userName = useSelector((store) => store.authentication.user.name);

  // handlers
  const handleChange = (name, value) => {
    setSearch(value);
  }

  const handleSelect = (name) => {
    console.log('value ', name);
  }

  // render
  return (
    <div className="d-flex align-items-center app-header-wrapper">
      <TextInput
        name="search"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        customWrapperClass="app-header-input"
      />
      <DropDownWrapper
        options={headerMenus}
        handleSelect={handleSelect}
      >
        <div className="d-flex align-items-center app-header-name">
          <span>{userName || 'Name'}</span>
          <img src={defaultAvatar} className="app-header-avatar" />
        </div>
      </DropDownWrapper>
    </div>
  );
}

export default AppHeader;
