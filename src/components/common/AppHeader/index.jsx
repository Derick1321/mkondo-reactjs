import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import DropDownWrapper from '$components/common/DropDownWrapper';
import TextInput from '$components/common/TextInput';
import SearchResult from '$components/common/SearchResult';

import { routePaths } from '$common/routeConfig';

import { logout } from '$redux/features/authentication';

import styles from './index.module.scss';
import { hideModal } from '$redux/features/modal';

const defaultAvatar = require('$assets/images/profile-user.svg');

const headerMenus = [
  { name: 'account', title: 'My Account', },
  { name: 'logout', title: 'Log Out', style: styles.optSecondary},
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
  const history = useHistory();

  // handlers
  const handleChange = (name, value) => {
    setSearch(value);
  }

  const handleSelect = (name) => {
    if (name === 'logout') {
      dispatch(logout());
      return;
    }

    history.push(routePaths.profile);
  }
  const handleFocus = () => { // hacky way to hideModal
    dispatch(hideModal());
  }

  // render
  return (
    <>
      <div className={`d-flex align-items-center ${styles.appHeaderWrapper} ${modalActive ? styles.searchInactive : ''}`}>
        {
          showSearch && (
            <TextInput
              name="search"
              placeholder="Search"
              value={search}
              onChange={handleChange}
              customWrapperClass={styles.appHeaderInput}
              icon="search"
              onFocus={handleFocus}
            />
          )
        }
        <DropDownWrapper
          options={headerMenus}
          handleSelect={handleSelect}
        >
          <div className={`d-flex align-items-center ${styles.appHeaderName}`}>
            <span>{userName || 'Name'}</span>
            <img
              src={avatar || defaultAvatar}
              className={styles.appHeaderAvatar}
              alt=""
            />
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
