import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '$components/common/Button';
import NewItem from '$components/common/NewItem';

import { routePaths } from '$common/routeConfig';

import { saveMedia, addAlbum } from '$redux/features/media';

import { menus, metamenus } from './menus';

import styles from './index.module.scss';
import artist, { getArtists } from '../../../redux/features/artist';

import placeholder from '$assets/images/user-placeholder.jpeg'
import { ArtistListArtistWidget } from '../../Artist/List/widgets/artist';
import ArtistSelectorComponent from '../artistSelector';

const initialState = {
  artist: '',
  album: '',
  genre: '',
  description: '',
  cover_image: '',
  policy: false,
  recordLabel: '',
  releaseDate: '',
  publisher: '',
  location: '',
  country: '',
  file: null,
}

const NewAlbum = () => {
  // state
  const [fields, setFields] = useState(menus);
  const [metaFields, setMetaFields] = useState(metamenus);
  const [values, setValues] = useState(initialState);
  const [coverImage, setCoverImage] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((store) => store.authentication.user.user_id);
  const user = useSelector((store) => store.authentication.user);
  const addAlbumPending = useSelector((store) => store.media.addAlbumPending);
  const addAlbumComplete = useSelector((store) => store.media.addAlbumComplete);
  const albumId = useSelector((store) => store.media.albumId);

  // refs
  const initiatedSave = useRef(false);
  
  useEffect(() => {
    if (!addAlbumComplete || !initiatedSave.current) {
      return;
    }

    initiatedSave.current = false;
    history.push(routePaths.mediaUpload, { albumId });
  }, [addAlbumComplete]);

  // handlers
  const handleChange = (name, value) => {
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleValidation = () => {
    let hasErrors = false;
    var _fields = fields
    if (!values.album) {
      _fields = _fields.map(field => {
        if (field.name == "album") {
          return {...field, error: "Required"}
        }
        return field;
      });
      
      hasErrors = true;
    }

    if (!values.artist) {
      _fields = _fields.map(field => {
        if (field.name == "artist") {
          return {...field, error: "Required"}
        }
        return field;
      });
      hasErrors = true;
    }

    if (!values.genre) {
      _fields = _fields.map(field => {
        if (field.name == "genre") {
          return {...field, error: "Required"}
        }
        return field;
      });
      hasErrors = true;
    }

    setFields(_fields);
    return hasErrors;
  }

  const handleSave = async () => {
    if (handleValidation()) {
      alert('Fill required fields before submitting');
      return;
    }

    if (!values.file) {
      console.log(values);
      alert('No album avatar file submitted!');
      return;
    }

    if (!values.policy) {
      alert('You need to accept the terms and conditions before proceeding!');
      return;
    }

    initiatedSave.current = true;
    dispatch(addAlbum({
      name: values.album,
      description: values.description,
      genres: values.genre.map((item) => item.value),
      country: values.country.value,
      region: values.region,
      cover_image: values.file,
      owner_id: values.owner_id ?? userId, // OR artistId
      publisher: values.publisher,
      release_date: values.releaseDate,
      record_label: values.recordLabel,
      song_writter: values.songWritter,
    }));
  }

  const handleCancel = () => {
    if(addAlbumPending) {
      return;
    }
    setValues(initialState);
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
    <div className={`row ${styles.albumWrapper}`}>
      <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-12">
        <button className="btn btn-primary" onClick={() => history.goBack()}>Back</button>

        <NewItem
          menus={fields}
          metamenus={metaFields}
          onChange={handleChange}
          values={values}
        />
        <div className="d-flex justify-content-end new-item-footer mt-2">
          <Button
            onClick={handleCancel}
            style="btn-cancel"
            isTransparent
            noBorder
          >
            Cancel
            </Button>
          <Button
            onClick={handleSave}
            isLoading={addAlbumPending}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewAlbum;
