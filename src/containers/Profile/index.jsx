import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AvatarInput from '$components/common/AvatarInput';
import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import Tabs from '$components/common/Tabs';

import { genres, generatePreview } from '$common/utils';
import { handleFetch } from '$common/requestUtils';

import { saveMedia } from '$redux/features/media';
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
  const [localAvatarUrl, setLocalAvatarUrl] = useState('');
  const [file, setFile] = useState(null);

  // store
  const user = useSelector((store) => store.authentication.user);
  const updateUserPending = useSelector((store) => store.user.updateUserPending);
  const token = useSelector((store) => store.authentication.token);
  const dispatch = useDispatch();

  // effects
  useEffect(async () => {
    if (!user || !user.user_id) {
      return;
    }

    setValues({
      fullName: user.full_name,
      description: user.description,
      avatarUrl: user.avatar_url, // TODO: Should depricate?
      phoneNumber: user.phone_number,
      genre: (user.genres || []).map((genre) => genres.find((v) => v.value === genre)),
      email: user.email,
      fb: user.facebook_link,
      yt: user.youtube_link,
      instagram: user.instagram_link,
      twitter: user.twitter_link,
      avatarUrl: '',
    });

    if (!user.avatar_url) {
      return;
    }

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${user.avatar_url}`, null, token);
    setLocalAvatarUrl(res.response);
  }, [user]);

  // handlers
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleUpdate = async () => {
    let url = null;
    if (file) {
      const res = await dispatch(saveMedia(file));
      url = res.response;
    }

    await dispatch(updateUser({
      id: user.user_id,
      payload: {
        ...user,
        ...values,
        avatarUrl: url ? url : user.avatar_url,
      },
    }));
  }

  const handleAvatarChange = async (files) => {
    const url = await generatePreview(files[0]);
    setLocalAvatarUrl(url);
    setFile(files[0]);
  }

  // render
  return (
    <div className={styles.container}>
      <div className={`d-flex ${styles.avatarContainer}`}>
        <div className={styles.avatarWrapper}>
          <AvatarInput
            url={localAvatarUrl}
            onChange={handleAvatarChange}
          />
        </div>
        <div className="d-flex flex-column">
          <p>Mkondo {user.user_type}</p>
          <p className={styles.title}>{user.full_name}</p>
        </div>
      </div>
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
