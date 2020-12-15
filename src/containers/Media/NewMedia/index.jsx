import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DragDrop from '$components/common/DragDrop';
import NewItem from '$components/common/NewItem';
import Button from '$components/common/Button';

import { routePaths } from '$common/routeConfig';

import { saveMedia, addMedia } from '$redux/features/media';

import { menus, metamenus } from './menus';

import './index.scss';

const closeIcon = require('$assets/images/icons/cancel.svg');

const initialState = {
  title: '',
  genre: '',
  description: '',
  policy: false,
  recordLabel: '',
  songWritter: '',
  composer: '',
  file: '',
}

const NewMedia = () => {
  // state
  const [file, setFile] = useState(null);
  const [values, setValues] = useState(initialState);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const addMediaComplete = useSelector((store) => store.media.addMediaComplete);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const newMediaId = useSelector((store) => store.media.newMediaId);

  // effects
  useEffect(async () => {
    if (addMediaComplete) {
      history.push(routePaths.success, {
        message: 'Congratulations you are all set!',
        link: `https//mkondo.co/app/artist/${newMediaId}`,
        country: values.country,
        name: values.title,
        avatar: await generatePreview(values.file),
      });
    }
  }, [addMediaComplete]);

  // handlers
  const handleFileChange = (files) => {
    console.log('files[0] ', files[0]);
    setFile(files[0]);
  }

  const handleSave = async () => {
    const mediaRes = await dispatch(saveMedia(file));
    const avatarRes = await dispatch(saveMedia(values.file)); // avatar
    dispatch(addMedia({
      name: values.name,
      description: values.description,
      genre: values.genre.reduce((acc, v) => `${acc}${acc ? ',' : ''}${v.value}`, ''),
      cover_url: avatarRes.payload,
      media_url: mediaRes.payload,
      owner_id: userId,
      category: 'audio', // TODO
      duration: 0, // TODO
      composer: values.composer,
      recordLabel: values.recordLabel,
      songWritter: values.songWritter,
    }));
  };

  const handleCancel = () => {
    setFile(null);
  };

  const handleClear = () => {
    setFile(null);
    setValues(initialState);
  }

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  }

  // render
  return (
    <>
      <div className="new-media-wrapper">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-lg-6">
            <div className={`${file ? 'd-none' : ''}`}>
              <DragDrop
                onChange={handleFileChange}
              />
            </div>
            <div className={`${file ? '' : 'd-none'}`}>
              {
                file && (
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mr-2">{file.name}</span>
                  <button
                    className="new-media-close-btn"
                    onClick={handleCancel}
                  >
                    <img className="cancel-icon" src={closeIcon} alt=""/>
                  </button>
                </div>
                )
              }
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
                  onClick={handleClear}
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
      </div>
    </>
  );
}

export default NewMedia;
