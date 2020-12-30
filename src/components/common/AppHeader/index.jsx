import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import DropDownWrapper from '$components/common/DropDownWrapper';
import TextInput from '$components/common/TextInput';
import SearchResult from '$components/common/SearchResult';

import { logout } from '$redux/features/authentication';

import './index.scss';
import { hideModal } from '$redux/features/modal';

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
  const modalActive = useSelector((store) => store.modal.type);
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

  const handleFocus = () => { // hacky way to hideModal
    dispatch(hideModal());
  }

  // render
  return (
    <>
      <div className={`d-flex align-items-center app-header-wrapper ${modalActive ? 'search-inactive' : ''}`}>
        {
          showSearch && (
            <TextInput
              name="search"
              placeholder="Search"
              value={search}
              onChange={handleChange}
              customWrapperClass="app-header-input"
              icon="search"
              onFocus={handleFocus}
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
      {
        search && (
          <SearchResult />
        )
      }
    </>
  );
}

AppHeader.defaultProps = {
  showSearch: true,
}

AppHeader.propTypes = {
  showSearch: PropTypes.bool,
}

export default AppHeader;
