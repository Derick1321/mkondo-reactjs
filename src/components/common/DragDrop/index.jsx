import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '$components/common/Button';

import './index.scss';

const DragDrop = (props) => {
  // props
  const { onChange } = props;

  // state
  const [active, setActive] = useState(false);

  // refs
  const fileRef = useRef(null);

  // handlers
  const handleDrop = (ev) => {
    ev.preventDefault();
    let currentUpload = [];

    if (ev.dataTransfer.items) {
      for (let i = 0; i < ev.dataTransfer.items.length; i += 1) {
        if (ev.dataTransfer.items[i].kind === 'file') {
          const file = ev.dataTransfer.items[i].getAsFile();
          currentUpload.push(file);
        }
      }
    } else {
      currentUpload = ev.dataTransfer.files;
    }

    onChange(currentUpload);
  }

  const handleDragOver = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  const handleDragEnter = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    setActive(true);
  }

  const handleDragLeave = (ev) => {
    ev.preventDefault();
    setActive(false);
  }

  const handleSelectFile = () => {
    fileRef.current.click();
  }

  const handleChange = () => {
    console.log('log ', fileRef.current.files);
  }

  // render
  return (
    <>
      <div
        className={`d-flex justify-content-center align-items-center drag-and-drop-wrapper ${active ? 'drag-active' : ''}`}
      >
        <div
          className={`drag-and-drop-inner d-flex justify-content-center align-items-center ${active ? 'drag-active' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
        >
          {
            active ? (
              <p className="text-center drag-title">
                Drop your Tracks Here
              </p>
            ) : (
              <p className="text-center">
                Drag and Drop your Tracks Here
              </p>
            )
          }
        </div>
      </div>
      {
        !active && (
          <>
            <div className="d-flex align-items-center">
              <div className="hr" />
              <span>OR</span>
              <div className="hr" />
            </div>
            <Button
              onClick={handleSelectFile}
              style="mk-btn-secondary"
            >
              Choose files  to upload
            </Button>
          </>
        )
      }
      <input
        className="d-none"
        type="file"
        ref={fileRef}
        onChange={handleChange}
        multiple
      />
    </>
  );
}

DragDrop.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default DragDrop;
