import React from 'react';

import './index.scss';

const icons = [
  { 
    icon: require('$assets/images/icons/home.svg'),
    activeIcon: require('$assets/images/icons/home-active.svg'),
    title: 'Home'
  },
  {
    icon: require('$assets/images/icons/recommandation.svg'),
    activeIcon: require('$assets/images/icons/recommandation-active.svg'),
    title: 'Recommendation',
  },
  {
    icon: require('$assets/images/icons/calendar.svg'),
    activeIcon: require('$assets/images/icons/calendar-active.svg'),
    title: 'New Release'
  },
  {
    icon: require('$assets/images/icons/top-chart.svg'),
    activeIcon: require('$assets/images/icons/top-chart-active.svg'),
    title: 'Top Chart'
  },
  {
    icon: require('$assets/images/icons/feeds.svg'),
    activeIcon: require('$assets/images/icons/feeds-active.svg'),
    title: 'Feeds',
  },
];

const SideMenu = () => {
  // render
  return (
    <div className="side-menu">
      <p className="header-title text-center">Mkondo</p>
      <div className="side-menus-wrapper">
        <p className="sidemenu-subtitle">Browse</p>
        {
          icons.map((item, idx) => (
            <div className="sidemenu-item" key={`sidemenu-${idx}`}>
              <img src={item.icon} className="sidemenu-item-icon" />
              <span className="sidemenu-item-title">{item.title}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SideMenu;
