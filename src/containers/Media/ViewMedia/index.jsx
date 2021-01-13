import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import Tabs from '$components/common/Tabs';

import { addComment, getComment } from '$redux/features/media';

import styles from './index.module.scss';

const options = [
  { name: 'comments', title: 'Comments' },
  { name: 'description', title: 'Description' },
];

const field = {
  name: 'comments',
  type: 'area',
  placeholder: 'Comments',
  title: '',
};

const ViewMedia = (props) => {
  // props
  const {
    mediaId,
  } = props;

  // state
  const [selected, setSelected] = useState(options[0].name);
  const [value, setValue] = useState('');

  // store
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.authentication.user.user_id);

  // effects
  useEffect(() => {
    dispatch(getComment(mediaId));
  }, []);

  // handlers
  const handleSelect = (item) => {
    setSelected(item);
  }

  const handleChange = (name, value) => {
    setValue(value);
  }

  const handleAddComment = () => {
    dispatch(addComment({
      media_id: mediaId,
      user_id: userId,
      value,
    }));
  }

  // render
  return (
    <div className="d-flex flex-column">
      <Tabs
        options={options}
        onSelect={handleSelect}
        selected={selected}
        name="viewMedia"
        activeColor="#8C8C8C"
      />
      <div className="d-flex">
        <div className={styles.commentsWrapper}>
          <InputField
            field={{
              ...field,
              value,
            }}
            onChange={handleChange}
          />
        </div>
        <Button
          onClick={handleAddComment}
          isLoading={false}
          isCustom
          hideDefault
        >
          Comment
        </Button>
      </div>
    </div>
  );
}

export default ViewMedia;
