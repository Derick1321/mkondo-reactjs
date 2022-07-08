import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DragDrop from '$components/common/DragDrop';
import NewItem from '$components/common/NewItem';
import Button from '$components/common/Button';

import { routePaths } from '$common/routeConfig';
import { generatePreview } from '$common/utils';

import { saveMedia, addMedia } from '$redux/features/media';

import { menus, metamenus } from './menus';

import styles from './index.module.scss';
import ArtistSelectorComponent from '../artistSelector/index';

const closeIcon = require('$assets/images/icons/cancel.svg');

const initialState = {
  title: '',
  genre: '',
  description: '',
  policy: false,
  recordLabel: '',
  songWriter: '',
  composer: '',
  file: '',
}

const NewMedia = () => {
  // state
  const [file, setFile] = useState(null);
  const [values, setValues] = useState(initialState);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const addMediaComplete = useSelector((store) => store.media.addMediaComplete);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const user = useSelector((store) => store.authentication.user);
  const userAvatarUrl = useSelector((store) => store.authentication.user.avatar_url);
  const newMediaId = useSelector((store) => store.media.newMediaId);

  // effects
  useEffect(async () => {
    // TODO: use prevProps
    if (addMediaComplete) {
      history.push(routePaths.success, {
        message: 'Congratulations you are all set!',
        link: `https://mkondo.co/app/media/${newMediaId}`,
        country: values.country,
        name: values.title,
        avatar: await generatePreview(values.file),
      });
    }
  }, [addMediaComplete]);

  // handlers
  const handleFileChange = (files) => {
    setFile(files[0]);
  }

  const handleSave = async () => {
    const mediaRes = await dispatch(saveMedia(file));
    const avatarRes = await dispatch(saveMedia(values.file)); // avatar
    //release date is not added
    //TODO: add release date
    dispatch(addMedia({
      name: values.title,
      description: values.description,
      genres: item.genre.map((item) => item.value),
      cover_url: avatarRes.payload,
      media_url: mediaRes.payload,
      owner_id: userId,
      category: 'audio',
      duration: 0, // THIS FILE IS DEPRECATED
      composer: values.composer,
      record_label: values.recordLabel,
      song_writer: values.songWriter,
      owner_avatar_url: userAvatarUrl,
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

  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
  }

  if (!selectedArtist && ['super admin', 'admin'].includes(user.user_type)) {
    return (
      <div className={`row ${styles.albumWrapper}`}>
        <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-12">
          <button className="btn btn-primary" onClick={() => history.goBack()}>Back</button>
          <div className="mt-3">
            <ArtistSelectorComponent onArtistSelected={handleSelectArtist} />
          </div>
        </div>
      </div>
    );
  }

  // render
  return (
    <>
      <div className={styles.newMediaWrapper}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-lg-6">
          <button className="btn btn-primary mb-3" onClick={() => push(routePaths.newMediaCategory)}>Back</button>
            <div className={`${file ? 'd-none' : ''}`}>
              <DragDrop
                onChange={handleFileChange}
                isMulti
              />
            </div>
            <div className={`${file ? '' : 'd-none'}`}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="mr-2">{file.name}</span>
                <button
                  className={styles.newMediaCloseBtn}
                  onClick={handleCancel}
                >
                  <img
                    className={styles.cancelIcon}
                    src={closeIcon}
                    alt=""
                  />
                </button>
              </div>
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
