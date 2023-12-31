import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import TabMenu from './Menu';

import styles from './index.module.scss';

const initialOptions = [
  { name: 'audio', title: 'Songs' },
  { name: 'video', title: 'Videos' },
  { name: 'movie', title: 'Movies' },
];

const Tabs = (props) => {
  // props
  const {
    name,
    selected,
    onSelect,
    options,
    activeColor,
  } = props;

  const lang = useSelector(store => store.user.language);
  const { t, i18n } = useTranslation('common');
  useEffect(() => { i18n.changeLanguage(lang); }, [lang]);

  // render
  return (
    <>
    <div className="d-flex flex-wrap">
      {
        options.map((opt, idx) => (
          <TabMenu
            key={`tab-${name}-${idx}`}
            title={t(opt.title)}
            name={opt.name}
            isActive={selected === opt.name}
            onClick={onSelect}
            activeColor={activeColor}
          />
        ))
      }
    </div>
    <div
      className={styles.tabLine}
      style={{
        backgroundColor: activeColor,
        borderColor: activeColor,
      }}
    />
    </>
  );
}

Tabs.defaultProps = {
  options: initialOptions,
  activeColor: null,
}

Tabs.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  activeColor: PropTypes.string,
}

export default Tabs;

