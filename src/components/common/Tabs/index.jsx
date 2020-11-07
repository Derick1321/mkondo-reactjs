import React from 'react';

import TabMenu from './Menu';

const Tabs = (props) => {
  // props
  const { selected, onSelect } = props;

  // render
  return (
    <div className="d-flex">
      <TabMenu
        title="Audios"
        name="audio"
        isActive={selected === "audio"}
        onClick={onSelect}
      />
      <TabMenu
        title="Videos"
        name="video"
        isActive={selected === "video"}
        onClick={onSelect}
      />
      <TabMenu
        title="Movies"
        name="movies"
        isActive={selected === "movies"}
        onClick={onSelect}
      />
    </div>
  );
}

export default Tabs;

