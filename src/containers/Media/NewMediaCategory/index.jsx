import React, { useState } from 'react';

import GenreSelector from '$components/common/GenreSelector';

import styles from './index.module.scss';

const NewMediaCategory = () => {
  // state
  const [selected, setSelected] = useState(['album']);

  // handlers
  const handleNext = () => {
    console.log('next...');
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
  )
}

export default NewMediaCategory;;
