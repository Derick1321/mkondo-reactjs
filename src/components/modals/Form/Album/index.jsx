import React from 'react'
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '$components/common/Button';
import NewItem from '$components/common/NewItem';
import { routePaths } from '$common/routeConfig';
import { saveMedia, addAlbum } from '$redux/features/media';
import { menus, metamenus } from './menus';
import styles from './../index.module.scss';
import { getAlbum, updateAlbum } from '../../../../redux/features/media';




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

const AlbumForm = (props) => {
  // state
  const [bannerUrl, setBannerUrl] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [fields, setFields] = useState(menus);
  const [metaFields, setMetaFields] = useState(metamenus);
  const [values, setValues] = useState(initialState);
  //const [coverImage, setCoverImage] = useState(null);
  //const [selectedArtist, setSelectedArtist] = useState(null);
  // const [avatar, setAvatar] = useState(null);
  const [album, setAlbum] = useState({})

  //props
  const { payload, closeModal } = props;
  const { id } = payload;



  // store
  const dispatch = useDispatch();
  const history = useHistory();
  // const userId = useSelector((store) => store.authentication.user.user_id);
  // const user = useSelector((store) => store.authentication.user);
  const getAlbumState = useSelector((store) => store.media.getAlbum);

  //const addAlbumComplete = useSelector((store) => store.media.addAlbumComplete);
  // const albumId = useSelector((store) => store.media.albumId);
  //  const retrieveMediaState = useSelector(state => state.media.retrieveMedia);

  const token = useSelector((state) => state.authentication.token)
  const submitting = useSelector((state) => state.media.updateMediaPending)
  const updated = useSelector(state => state.media.updateMediaComplete);


  // refs
  // const initiatedSave = useRef(false);

  // useEffect(() => {
  //   if (!addAlbumComplete || !initiatedSave.current) {
  //     return;
  //   }

  useEffect(() => {
    console.log("get album by id");
    dispatch(getAlbum({ id: id }));
  });

  useEffect(() => {
    if (!id) return;
    //console.log("from current state:" + id)
    console.log("state   Triggered", id);
    dispatch(getAlbum({ id: id }));
  }, [id])

  useEffect(async () => {
    if (!album) return;
    console.log("Performing instantiation", album)
    let payload = initialState;
    for (const field in initialState) {
      console.log(field)
      if (field in album) {
        console.log(`${field} has been detected with value: `, album[field])
        payload[field] = album[field]
      }
    }
    setValues(payload);

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${album.cover_url}`, null, token);
    setBannerUrl(res.response);
  }, [album])




  useEffect(() => {
    if (!getAlbumState.data) return;
    setAlbum(getAlbumState.data.album);
  }, [getAlbumState.data]);

  useEffect(() => {
    if (!updated) return;
    dispatch(hideModal());
  }, [updated]);

  //   initiatedSave.current = false;
  //   history.push(routePaths.mediaUpload, { albumId });
  // }, [addAlbumComplete]);

  // handlers
  const handleChange = (name, value) => {
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleUpdate = async () => {
    //handle upload
    let payload = values;
    if (bannerImage) {
      let response = await dispatch(saveMedia(bannerImage))
      payload['cover_url'] = response.payload
    }

    dispatch(updateAlbum({
      id: album.album_id,
      payload: payload,
    }));
  }

  const handleValidation = () => {
    let hasErrors = false;
    var _fields = fields
    if (!values.album) {
      _fields = _fields.map(field => {
        if (field.name == "album") {
          return { ...field, error: "Required" }
        }
        return field;
      });

      hasErrors = true;
    }

    if (!values.artist) {
      _fields = _fields.map(field => {
        if (field.name == "artist") {
          return { ...field, error: "Required" }
        }
        return field;
      });
      hasErrors = true;
    }

    if (!values.genre) {
      _fields = _fields.map(field => {
        if (field.name == "genre") {
          return { ...field, error: "Required" }
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

    //initiatedSave.current = true;
    // dispatch(addAlbum({
    //   name: values.album,
    //   description: values.description,
    //   genres: values.genre.map((item) => item.value),
    //   country: values.country.value,
    //   region: values.region,
    //   cover_image: values.file,
    //   owner_id: values.owner_id ?? userId, // OR artistId
    //   publisher: values.publisher,
    //   release_date: values.releaseDate,
    //   record_label: values.recordLabel,
    //   song_writter: values.songWritter,
    // }));
  }

  // const handleCancel = () => {
  //   if (addAlbumPending) {
  //     return;
  //   }
  //   setValues(initialState);
  // }

  // const handleSelectArtist = (artist) => {
  //   setSelectedArtist(artist);
  // }

  //   if (!selectedArtist && ['super admin', 'admin'].includes(user.user_type)) {
  //     return (
  //       <div className={`row ${styles.albumWrapper}`}>
  //         <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-12">
  //           <button className="btn btn-primary" onClick={() => history.goBack()}>Back</button>

  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className={styles.card}>
      <div className="col-md-12 offset-md-3 col-sm-12 offset-sm-1 col-12">
        {getAlbumState.isLoading && <div className="text-light">Loading...</div>}
        {getAlbumState.error && <div className="alert alert-danger">Error:{getAlbumState.error.message}</div>}
        <button className="btn btn-primary" onClick={() => history.goBack()}>Back</button>

        <NewItem
          menus={fields}
          metamenus={metaFields}
          onChange={handleChange}
          values={values}
        />
        <div className="d-flex justify-content-end new-item-footer mt-2">
          <Button
            onClick={closeModal}
            style="btn-cancel"
            isTransparent
            noBorder
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            isLoading={submitting}
          >
            Update
            {submitting && <span className="spinner-border"></span>}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AlbumForm
