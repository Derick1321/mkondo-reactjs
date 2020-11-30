import React, { useState } from 'react';

import DragDrop from '$components/common/DragDrop';
import NewItem from '$components/common/NewItem';
import Button from '$components/common/Button';

import './index.scss';

const menus = [
  { name: 'title', type: 'text', placeholder: 'Enter Title', title: 'Title' },
  { name: 'genre', type: 'select', placeholder: 'Enter Genre', title: 'Genre' },
  { name: 'description', type: 'area', placeholder: 'Describe your track', title: 'Description' },
  { name: 'caption', type: 'area', placeholder: 'Add your caption', title: 'Caption' },
];

const metamenus = [
  { name: 'artist', type: 'text', placeholder: 'Artist Name', title: 'Artist' },
  { name: 'publisher', type: 'text', placeholder: 'Publisher Name', title: 'Publisher' },
  { name: 'composer', type: 'text', placeholder: 'Composer Name', title: 'Composer' },
  { name: 'releaseDate', type: 'date', placeholder: 'Release Date', title: 'Release Date' },
  { name: 'albumTitle', type: 'text', placeholder: 'Enter Album Title', title: 'Album Title' },
  { name: 'recordLabel', type: 'text', placeholder: 'Enter Record Label', title: 'Record Label' },
];

const NewMedia = () => {
  // state
  const [files, setFiles] = useState([]);
  const [values, setValues] = useState({
    fullName: '',
    genre: '',
    description: '',
    caption: '',
    privacy: false,
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
    const payload = {
      [name]: value,
    };

    setValues({
      ...values,
      payload,
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
          <p>By uploading, you confirm that your sounds comply with our Terms of Use and you don't infringe anyone else's rights.</p>
       
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
