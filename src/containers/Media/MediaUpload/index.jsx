import React, { useState } from 'react';

import DragDrop from '$components/common/DragDrop';
import DraggableList from '$components/common/DraggableList';

import styles from './index.module.scss';

const MediaUpload = () => {
  const [files, setFiles] = useState([]);

  // handlers
  const handleFileChange = (result) => {
    setFiles(result.map((res) => ({
      ...res,
    })));
    console.log('files ', result);
  }

  // render
  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-md-8 offset-md-2 col-10">
        <DragDrop
          onChange={handleFileChange}
        />
        <p className={styles.title}>Track List</p>
        <DraggableList
          list={files}
        />
      </div>
    </div>
  );
}

export default MediaUpload;
