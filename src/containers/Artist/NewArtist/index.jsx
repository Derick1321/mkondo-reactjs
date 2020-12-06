import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NewItem from '$components/common/NewItem';
import Button from '$components/common/Button';

import { routePaths } from '$common/routeConfig';

import { saveMedia } from '$redux/features/media';
import { addArtist } from '$redux/features/artist';

import { menus, metamenus } from './menus';

import './index.scss';


const initialState = {
  name: '',
  genre: [],
  description: '',
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

const NewArtist = () => {
  // states
  const [values, setValues] = useState(initialState);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const addArtistComplete = useSelector((store) => store.artist.addArtistComplete);
  const newArtistId = useSelector((store) => store.artist.newArtistId);

  // effects
  useEffect(() => {
    if (addArtistComplete) {
      history.push(routePaths.success, {
        message: 'Congratulations you are all set!',
        link: `https//mkondo.co/app/artist/${newArtistId}`,
        country: values.country,
        name: values.name,
      });
    }
  }, [addArtistComplete]);

  // handlers
  const handleCancel = () => {
    setValues(initialState);
  };

  const handleSave = async () => {
    if (!values.file) {
      alert('No avatar file submitted!');
      return;
    }

    const res = await dispatch(saveMedia(values.file[0]));
    dispatch(addArtist({
      full_name: values.name,
      email: values.email,
      phone_number: values.phoneNumber,
      user_type: 'creator', // shouldn't be necessary
      about: values.description,
      country: values.country,
      locality: values.region,
      facebook_link: values.fb,
      instagram_link: values.instagram,
      youtube_link: values.yt,
      twitter_link: values.twitter,
      avatar_url: res.payload,
      password: '123456',
      genre: values.genre.reduce((acc, v) => `${acc}${acc ? ',' : ''}${v.value}`, '')
    }));
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
        <div className="col-10 col-sm-8">
          <div className="d-flex flex-column">
            <NewItem 
              menus={menus}
              metamenus={metamenus}
              onChange={handleChange}
              values={values}
            />
          </div>
          <div className="d-flex justify-content-end new-item-footer">
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
