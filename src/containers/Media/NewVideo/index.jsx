import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';

import DragDrop from '$components/common/DragDrop';
import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';

import { bytesToSize } from '$common/utils';

import { menus, descriptionMenu } from './menus';

import styles from './index.module.scss';

const getType = {
  movie: 'Upload Movie',
  video: 'Upload Video',
};

const NewVideo = () => {
  // store
  const history = useHistory();
  const type = history.location.state && getType[history.location.state.type] || getType['video'];

  // state
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({});

  // hadnlers
  const handleFileChange = (files) => {
    setFile(files[0]);
  }

  const handleChange = () => {
  }

  const handleSave = () => {
  }

  const handleClear = () => {
    setFile(null);
    const file = document.querySelector('#file-input');
    file.value = '';
  }

  // render
  return (
    <div className={styles.panelContainer}>
      <div className="row justify-content-center">
        <div className="col-10 col-sm-10 col-lg-8">
          <div className={`${file ? 'd-none' : ''}`}>
            <DragDrop
              onChange={handleFileChange}
              acceptedFiles="video/mp4,video/x-m4v,video/*"
            />
          </div>
          <div className={`${file ? '' : 'd-none'}`}>
            <p className={styles.paneTitle}>{type}</p>
            <div className={styles.inputContainer}>
              {
                file && (
                  <p className={styles.title}>{file.name} - {bytesToSize(file.size)}</p>
                )
              }
              <div className={styles.inputFormWrapper}>
                <div className="row">
                  {
                    menus.map((menu) => (
                      <div
                        className='col-12 col-md-6'
                        key={`new-video-${menu.name}`}
                      >
                        <InputField
                          field={{
                            ...menu,
                            value: values[menu.name]
                          }}
                          onChange={handleChange}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  {
                    file && (
                      <div className={styles.playerWrapper}>
                        <div className={styles.reactPlayer}>
                          <ReactPlayer
                            url={URL.createObjectURL(file)}
                            controls
                            width='100%'
                            height='100%'
                          />
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className="col-12 col-md-6">
                  <InputField
                    field={{
                      ...descriptionMenu,
                      value: values.description
                    }}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <Button
                isSecondary
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewVideo;
