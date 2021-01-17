import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import Tabs from '$components/common/Tabs';

import { genres } from '$common/utils';

import { updateUser } from '$redux/features/user';

import { menus, descriptionField, socials } from './menus';

import styles from './index.module.scss';

const options = [
  { name: 'account', title: 'Account' },
  { name: 'songs', title: 'Songs' },
  { name: 'videos', title: 'Videos' },
];

const initialState = {
  fullName: '',
  description: '',
  phoneNumber: '',
  genre: [],
  email: '',
  fb: '',
  yt: '',
  instagram: '',
  twitter: '',
  avatarUrl: '',
};

const Profile = () => {
  // state
  const [selected, setSelected] = useState(options[0].name);
  const [values, setValues] = useState(initialState);

  // store
  const user = useSelector((store) => store.authentication.user);
  const updateUserPending = useSelector((store) => store.user.updateUserPending);
  const dispatch = useDispatch();

  // effects
  useEffect(() => {
    if (!user || !user.user_id) {
      return;
    }

    setValues({
      fullName: user.full_name,
      description: user.description,
      avatarUrl: user.avatar_url,
      phoneNumber: user.phone_number,
      genre: (user.genres || []).map((genre) => genres.find((v) => v.value === genre)),
      email: user.email,
      fb: user.facebook_link,
      yt: user.youtube_link,
      instagram: user.instagram_link,
      twitter: user.twitter_link,
      avatarUrl: '',
    });
  }, [user]);

  // handlers
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleUpdate = () => {
    dispatch(updateUser({
      id: user.user_id,
      payload: {
        ...user,
        ...values,
      },
    }));
  }

  // render
  return (
    <div className={styles.container}>
      <Tabs
        options={options}
        onSelect={setSelected}
        selected={selected}
        name="profile"
        activeColor="#EA4C89"
      />
      <div className="row mt-4">
        {
          menus.map((menu, idx) => (
            <div
              className="col-12 col-sm-6 col-md-4"
              key={`profile-item-menu-${idx}`}
            >
              <InputField
                field={{
                  ...menu,
                  value: values[menu.name] || '',
                }}
                onChange={handleChange}
              />
            </div>
          ))
        }
      </div>
      <div>
        <InputField
          field={{
            ...descriptionField,
            value: values[descriptionField.name] || '',
          }}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <p className="my-2">Social Media</p>
        {
          socials.map((social, idx) => (
            <div
              className="col-12 col-sm-6 col-md-4"
              key={`social-profile-menu-${idx}`}
            >
              <InputField
                field={{
                  ...social,
                  value: values[social.name] || '',
                }}
                onChange={handleChange}
              />
            </div>
          ))
        }
      </div>
      <div className="d-flex mt-4 pt-4">
        <Button
          onClick={handleUpdate}
          isLoading={updateUserPending}
        >
          Update
      </Button>
      </div>
    </div>
  );
}

export default Profile;
