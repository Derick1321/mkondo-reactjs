import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { routePaths } from '$common/routeConfig';

import './index.scss';

const SideMenu = () => {
  // store
  const history = useHistory();

  const artistIcons = [
    { 
      icon: require('$assets/images/icons/add-artist.svg'),
      activeIcon: require('$assets/images/icons/add-artist-active.svg'),
      title: 'Add Artist',
      path: routePaths.newArtist,
    },
    { 
      icon: require('$assets/images/icons/stats.svg'),
      activeIcon: require('$assets/images/icons/stats-active.svg'),
      title: 'Stats',
      path: routePaths.statsArtist,
    },
    {
      icon: require('$assets/images/icons/upload.svg'),
      activeIcon: require('$assets/images/icons/upload-active.svg'),
      title: 'New Media',
      path: routePaths.newMedia,
    },
  ];

  const icons = [
    { 
      icon: require('$assets/images/icons/home.svg'),
      activeIcon: require('$assets/images/icons/home-active.svg'),
      title: 'Home',
      path: routePaths.home,
    },
    {
      icon: require('$assets/images/icons/recommandation.svg'),
      activeIcon: require('$assets/images/icons/recommandation-active.svg'),
      title: 'Recommendation',
      path: routePaths.recommendation,
    },
    {
      icon: require('$assets/images/icons/calendar.svg'),
      activeIcon: require('$assets/images/icons/calendar-active.svg'),
      title: 'New Release',
      path: routePaths.newRelease,
    },
    {
      icon: require('$assets/images/icons/top-chart.svg'),
      activeIcon: require('$assets/images/icons/top-chart-active.svg'),
      title: 'Top Chart',
      path: routePaths.topChart,
    },
    {
      icon: require('$assets/images/icons/feeds.svg'),
      activeIcon: require('$assets/images/icons/feeds-active.svg'),
      title: 'Artist (Dev Only)',
      path: routePaths.viewArtist,
    },
  ];

  // render
  return (
    <div className="side-menu">
      <p className="header-title text-center">Mkondo</p>
      <div className="side-menus-wrapper d-flex flex-column">
        <p className="sidemenu-subtitle">Browse</p>
        {
          icons.map((item, idx) => (
            <NavLink
              to={item.path}
              className="sidemenu-item"
              activeClassName="active"
              key={`sidemenu-${idx}`}
            >
              <img
                src={history.location.pathname === item.path ? item.activeIcon : item.icon}
                className="sidemenu-item-icon"
              />
              <span className="sidemenu-item-title">{item.title}</span>
            </NavLink>
          ))
        }
        <div className="d-flex flex-column artist-menus">
          <p className="sidemenu-subtitle">Artist Panel</p>
          {
            artistIcons.map((item, idx) => (
              <NavLink
                to={item.path}
                className="sidemenu-item"
                activeClassName="active"
                key={`sidemenu-${idx}`}
              >
                {
                  <img
                    src={history.location.pathname === item.path ? item.activeIcon : item.icon}
                    className="sidemenu-item-icon"
                  />
                }
                <span className="sidemenu-item-title">{item.title}</span>
              </NavLink>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SideMenu;
