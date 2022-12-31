
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NewItem from '$components/common/NewItem';
import Button from '$components/common/Button';

import { routePaths } from '$common/routeConfig';
import { generatePreview } from '$common/utils';

import { saveMedia } from '$redux/features/media';
import { addArtist } from '$redux/features/artist';

import { menus, metamenus } from './menus';

import * as styles from './index.module.scss';
import { getMediaUrl } from '../../../../common/utils';

const initialState = {
  name: '',
  genre: null,
  about: '',
  phoneNumber: '',
  email: '',
  country: '',
  region: '',
  policy: false,
  file: null,
  fb: '',
  yt: '',
  instagram: '',
  twitter: '',
};

const ManagerPanelEditArtist = () => {
  // states
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mainFields, setMainFields] = useState(menus);

  // store
  const dispatch = useDispatch();
  const history = useHistory();

  const token = useSelector(state => state.authentication.token);
  const addArtistComplete = useSelector((store) => store.artist.addArtistComplete);
  const newArtistId = useSelector((store) => store.artist.newArtistId);
  const adminId = useSelector((store) => store.authentication.user.user_id);
  const addArtistError = useSelector(state => state.artist.addArtistError);
  const submitting = useSelector((state) => state.artist.updateArtistPending)

  // effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("Add Artist Complete Triggered", addArtistComplete);
    if (!mounted) return;
    if (!addArtistComplete) return;
    console.log("Finally Here");
    getMediaUrl(values.file, token).then(res => {
      history.push(routePaths.success, {
        message: 'Congratulations you are all set!',
        link: `https//:mkondo.co/app/artist/${newArtistId}`,
        country: values.country,
        name: values.name,
        avatar: res,
      });
    });
  }, [addArtistComplete]);

  useEffect(() => {
    if (!addArtistError) return;
    try {
      json = JSON.parse(addArtistError.message);
      console.log(json)
      if ("message" in json) {
        console.log("passed", json["message"]);
        setErrorMessage(json["message"]);
        setTimeout(() => {
          setErrorMessage(null);
        }, 15000);
      }
    } catch (e) {
      console.error(e);
    }
  }, [addArtistError])

  // handlers
  const handleCancel = () => {
    setValues(initialState);
  };

  const handleUpdate = async () => {
    if (!values.file) {
      alert('No avatar file submitted!');
      return;
    }

    if (!values.policy) {
      alert('You need to accept the terms and conditions before proceeding!');
      return;
    }

    //do some offline validation
    const _clone = [...mainFields];
    var hasErrors = false;
    ['name', 'email', 'phoneNumber', 'genre'].map((v, i) => {
      if (!values[v]) {
        hasErrors = true;
        const index = _clone.findIndex(f => f.name == v);
        if (index > -1) {
          _clone[index] = { ..._clone[index], error: "Required" };
        }
      }
    });
    setMainFields(_clone);
    if (hasErrors) return;

    dispatch(addArtist({
      full_name: values.name,
      email: values.email,
      phone_number: values.phoneNumber,
      user_type: 'creator', // shouldn't be necessary
      about: values.about,
      description: values.about,
      country: values.country,
      locality: values.region,
      facebook_link: values.fb,
      instagram_link: values.instagram,
      youtube_link: values.yt,
      twitter_link: values.twitter,
      avatar_url: values.file,
      password: 'Mkondo@123',
      genre: values.genre && values.genre.length ? values.genre.reduce((acc, v) => `${acc}${acc ? ',' : ''}${v.value}`, '') : [],
      admin_id: adminId,
    }));
  };

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
    const index = mainFields.findIndex(f => f.name == name);
    if (index > -1) {
      if (mainFields[index].error) {
        const _cloned = [...mainFields];
        _cloned[index] = { ..._cloned[index], error: null };
        setMainFields(_cloned);
      }
    }
  };

  // render
  return (
    <div className={styles.newArtistWrapper}>

      <div className="row justify-content-center">
        <div className="col-10 col-sm-8">
          <div className='text-ligth'>
            <h2> Update Artist</h2>
          </div>
          <div className={`d-flex flex-column`}>
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            <NewItem
              menus={mainFields}
              metamenus={metamenus}
              onChange={handleChange}
              values={values}
            />
            <div className={`d-flex justify-content-end ${styles.newItemFooter}`}>
              <Button
                onClick={handleCancel}
                style={styles.btnCancel}
                isTransparent
                isSquare
              >
                Cancel
              </Button>
              <button className="btn btn-lg btn-primary mr-2" onClick={handleUpdate} disabled={submitting}>Update {submitting && <span className="spinner-border"></span>}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ManagerPanelEditArtist;
