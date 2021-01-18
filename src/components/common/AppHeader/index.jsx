import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import DropDownWrapper from '$components/common/DropDownWrapper';
import TextInput from '$components/common/TextInput';
import SearchResult from '$components/common/SearchResult';
import HamburgerMenu from '$components/nav/HamburgerMenu';

import { handleFetch } from '$common/requestUtils';
import { routePaths } from '$common/routeConfig';

import { logout } from '$redux/features/authentication';
import { hideModal } from '$redux/features/modal';

import styles from './index.module.scss';

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
  const [url, setUrl] = useState('');

  // store
  const userName = useSelector((store) => store.authentication.user.full_name);
  const avatar = useSelector((store) => store.authentication.user.avatar_url);
  const token = useSelector((store) => store.authentication.token);
  const modalActive = useSelector((store) => store.modal.type);
  const isMobile = useSelector((store) => store.nav.isMobile);
  const dispatch = useDispatch();
  const history = useHistory();

  // effects
  useEffect(async () => {
    if (!avatar) {
      return;
    }

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${avatar}`, null, token);
    setUrl(res.response);
  }, [avatar])

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
      <div className={`d-flex align-items-center ${styles.appHeaderWrapper} ${modalActive ? styles.searchInactive : ''} ${isMobile ? styles.mobile : ''}`}>
        <div className="d-block d-sm-none">
          <HamburgerMenu />
        </div>
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
            <span className="d-none d-sm-block">{userName || 'Name'}</span>
            <img
              src={url || defaultAvatar}
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
