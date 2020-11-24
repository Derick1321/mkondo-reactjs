import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import DropDownWrapper from '$components/common/DropDownWrapper';
import TextInput from '$components/common/TextInput';

import { logout } from '$redux/features/authentication';

import './index.scss';

const defaultAvatar = require('$assets/images/profile-user.svg');

const headerMenus = [
  { name: 'account', title: 'My Account', },
  { name: 'logout', title: 'Log Out', style: 'opt-secondary'},
];

const AppHeader = (props) => {
  // props
  const { showSearch } = props;

  //state
  const [search, setSearch] = useState('');

  // store
  const userName = useSelector((store) => store.authentication.user.full_name);
  const avatar = useSelector((store) => store.authentication.user.avatar_url);
  const dispatch = useDispatch();

  // handlers
  const handleChange = (name, value) => {
    setSearch(value);
  }

  const handleSelect = (name) => {
    if (name === 'logout') {
      dispatch(logout());
      return;
    }
  }

  // render
  return (
    <div className="d-flex align-items-center app-header-wrapper">
      {
        showSearch && (
          <TextInput
            name="search"
            placeholder="Search"
            value={search}
            onChange={handleChange}
            customWrapperClass="app-header-input"
          />
        )
      }
      <DropDownWrapper
        options={headerMenus}
        handleSelect={handleSelect}
      >
        <div className="d-flex align-items-center app-header-name">
          <span>{userName || 'Name'}</span>
          <img src={avatar || defaultAvatar} className="app-header-avatar" />
        </div>
      </DropDownWrapper>
    </div>
  );
}

AppHeader.defaultProps = {
  showSearch: true,
}

AppHeader.propTypes = {
  showSearch: PropTypes.bool,
}

export default AppHeader;
