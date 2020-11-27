import React from 'react';
import PropTypes from 'prop-types';

import TabMenu from './Menu';

const initialOptions = [
  { name: 'audio', title: 'Audios' },
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
  } = props;

  // render
  return (
    <div className="d-flex">
      {
        options.map((opt, idx) => (
          <TabMenu
            key={`tab-${name}-${idx}`}
            title={opt.title}
            name={opt.name}
            isActive={selected === opt.name}
            onClick={onSelect}
          />
        ))
      }
    </div>
  );
}

Tabs.defaultProps = {
  options: initialOptions,
}

Tabs.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
  })),
}

export default Tabs;

