import React, { useState } from 'react';

import Button from '$components/common/Button';
import DragDrop from '$components/common/DragDrop';
import DraggableList from '$components/common/DraggableList';
import UploadCard from '$components/media/UploadCard';

import { bytesToSize } from '$common/utils';

import styles from './index.module.scss';

const MediaUpload = () => {
  const [files, setFiles] = useState([]);

  // handlers
  const handleFileChange = (result) => {
    setFiles(result.map((res) => ({
      name: res.name,
      size: bytesToSize(res.size),
    })));
  }

  const handleRemove = (index) => {
    console.log('handleRemove ', index);
    setFiles(files.slice(0, index).concat(files.slice(-index)));
  }

  const handleReorder = (list) => {
    setFiles(list);
  }

  const handleContinue = () => {

  }

  // render
  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-md-8 offset-md-2 col-10">
        <DragDrop
          onChange={handleFileChange}
        />
        {
          files.length > 0 && (
            <>
              <p className={styles.title}>Track List</p>
              <DraggableList
                list={files}
                listElement={UploadCard}
                callbacks={{
                  onRemove: handleRemove,
                  onReorder: handleReorder,
                }}
              />
              <div className={styles.footerWrapper}>
                <Button
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default MediaUpload;
