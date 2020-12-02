import React, { useState } from 'react';

import DragDrop from '$components/common/DragDrop';
import NewItem from '$components/common/NewItem';
import Button from '$components/common/Button';

import { menus, metamenus } from './menus';

import './index.scss';

const NewMedia = () => {
  // state
  const [files, setFiles] = useState([]);
  const [values, setValues] = useState({
    fullName: '',
    genre: '',
    description: '',
    caption: '',
    policy: false,
  });

  // handlers
  const handleFileChange = (values) => {
    setFiles([
      ...files,
      ...values
    ]);
  }

  const handleSave = () => {
    console.log('save')
  }

  const handleCancel = () => {

  }

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  }

  // render
  return (
    <div className="new-media-wrapper">
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6">
          <div className="d-flex flex-column">
            <NewItem 
              menus={menus}
              metamenus={metamenus}
              onChange={handleChange}
              values={values}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              onClick={handleCancel}
              isTransparent
              noBorder
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMedia;
