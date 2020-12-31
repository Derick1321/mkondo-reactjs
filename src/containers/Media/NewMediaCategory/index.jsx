import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import GenreSelector from '$components/common/GenreSelector';
import { routePaths } from '$common/routeConfig';

import styles from './index.module.scss';

const NewMediaCategory = () => {
  // state
  const [selected, setSelected] = useState(['Album']);

  // store
  const history = useHistory();

  // handlers
  const handleNext = () => {
    if (selected[0] === 'Album') {
      history.push(routePaths.newAlbum);
      return;
    }

    history.push(routePaths.mediaUpload);
  }

  const handleSelect = (name) => {
    setSelected([name]);
  }

  // render
  return (
    <div className={`d-flex flex-column ${styles.wrapper}`}>
      <GenreSelector
        handleNext={handleNext}
        handleSelect={handleSelect}
        selected={selected}
        title="What would you like to Upload?"
        type="media"
      />
    </div>
  );
}

export default NewMediaCategory;;
