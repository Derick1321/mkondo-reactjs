import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import NewItem from '$components/common/NewItem';
import Button from '$components/common/Button';

import { saveMedia } from '$redux/features/media';

import { menus, metamenus } from './menus';

import './index.scss';

const initialState = {
  name: '',
  genre: '',
  description: '',
  phoneNumber: '',
  email: '',
  policy: false,
  file: null,
};

const NewArtist = () => {
  // states
  const [values, setValues] = useState(initialState);

  // store
  const dispatch = useDispatch();

  // handlers
  const handleCancel = () => {
    setValues(initialState);
  };

  const handleSave = () => {
    if (!values.file) {
      alert('No file submitted!');
      return;
    }

    dispatch(saveMedia(values.file[0]));
  };

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

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
              style="btn-cancel"
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

export default NewArtist;
