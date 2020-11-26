import React, { useState } from 'react';

import DragDrop from '$components/common/DragDrop';

import './index.scss';

const NewMedia = () => {
  // state
  const [files, setFiles] = useState([]);

  // handlers
  const handleChange = (values) => {
    setFiles([...files, ...values]);
  }

  // render
  return (
    <div className="new-media-wrapper">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <div className="d-flex flex-column">
            <DragDrop
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMedia;
