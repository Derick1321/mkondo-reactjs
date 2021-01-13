import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '$components/authentication/Alert';
import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import Tabs from '$components/common/Tabs';

import { createPlaylist } from '$redux/features/playlist';

import styles from './index.module.scss';

const options = [
  { name: 'existing', title: 'Existing Playlist' },
  { name: 'new', title: 'New Playlist' },
];

const field = {
  name: 'title',
  type: 'text',
  placeholder: 'Playlist Name',
  title: '',
};

const PlaylistMenu = (props) => {
  // props
  const { title, mediaId } = props;

  // store
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.authentication.user.user_id);
  const createPlaylistPending = useSelector((store) => store.playlist.createPlaylistPending);

  // state
  const [selected, setSelected] = useState(options[0].name);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  // handlers
  const handleSelect = (item) => {
    setSelected(item);
  }

  const handleAddPlaylist = async () => {
    // TODO Api call
    if (!value) {
      setMessage({
        content: 'Playlist name missing!',
        type: 'error',
      });
      return;
    }

    try {
      await dispatch(createPlaylist({
        name: value,
        owner_id: userId,
      }));

      setMessage({
        content: 'Playlist successfully added!',
        type: 'success',
      });
    } catch (error) {
      // show error
      setMessage({
        content: 'Incorrect playlist name!',
        type: 'error',
      });
    }
  };

  const onChange = (name, value) => {
    if (message) {
      setMessage(null);
    }
    setValue(value);
  }

  const newPlaylistPanel = (
    <div className="d-flex">
      <div className={styles.inputWrapper}>
        <InputField
          field={{
            ...field,
            value,
          }}
          onChange={onChange}
        />
      </div>
      <Button
        onClick={handleAddPlaylist}
        isLoading={createPlaylistPending}
        isCustom
        hideDefault
      >
        Add to Playlist
      </Button>
    </div>
  );

  const buildExistingPanel = () => {
    return (
      <div className="d-flex flex-column">
        <InputField
          field={{
            ...field,
            placeholder: 'Existing Playlist',
            value,
          }}
          onChange={onChange}
        />
      </div>
    )
  }

  // render
  return (
    <div className={styles.wrapper}>
      {
        message && (
          <Alert
            content={message.content}
            type={message.type}
          />
        )
      }
      <div className={styles.container}>
        <Tabs
          options={options}
          onSelect={handleSelect}
          selected={selected}
          name="newItem"
          activeColor="#8C8C8C"
        />
        {
          selected === 'new' ?
            newPlaylistPanel :
            buildExistingPanel()
        }
      </div>
    </div>
  );
}

export default PlaylistMenu;
