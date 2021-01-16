import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '$components/common/Button';
import DragDrop from '$components/common/DragDrop';
import DraggableList from '$components/common/DraggableList';
import UploadCard from '$components/media/UploadCard';

import { routePaths } from '$common/routeConfig';
import { bytesToSize } from '$common/utils';

import { saveMedia, addMedia } from '$redux/features/media';

import styles from './index.module.scss';

const MediaUpload = () => {
  // state
  const [files, setFiles] = useState([]);
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState({});

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const userAvatarUrl = useSelector((store) => store.authentication.user.avatar_url);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const addMediaPending = useSelector((store) => store.media.addMediaPending);
  const addMediaFulfilled = useSelector((store) => store.media.addMediaFulfilled);
  const newMediaId = useSelector((store) => store.media.newMediaId);

  // refs
  const currentSaved = useRef(null);
  const completedFiles = useRef(0);

  // functions
  const handleNext = async () => {
    const item = values[files[files.length - 1].name];
    history.push(routePaths.success, {
      message: 'Congratulations you are all set!',
      link: `https//mkondo.co/app/media/${newMediaId}`,
      country: item.recordLabel,
      name: item.title,
      avatar: await generatePreview(files[files.length - 1].binary),
    });
  }

  // effects
  useEffect(() => {
    if (!currentSaved.current) {
      return;
    }

    if (addMediaPending) {
      setSaveStatus({
        ...saveStatus,
        [currentSaved.current]: {
          pending: true,
          completed: false,
        },
      });
      return;
    }

    setSaveStatus({
      ...saveStatus,
      [currentSaved.current]: {
        pending: true,
        completed: true,
      },
    });
  }, [addMediaPending, addMediaFulfilled]);

  useEffect(() => {
    completedFiles.current += 1;
    if (completedFiles.current === files.length) {
      handleNext();
    }
  }, [newMediaId]);

  // handlers
  const handleFileChange = (result) => {
    const fileList = [];
    for (let index = 0; index < result.length; index += 1) {
      fileList.push({
        name: result[index].name,
        size: bytesToSize(result[index].size),
        binary: result[index],
      });
    }
    setFiles(fileList);
  }

  const handleRemove = (index) => {
    setFiles(files.filter((file, idx) => (idx !== index)));
  }

  const handleReorder = (list) => {
    setFiles(list);
  }

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleContinue = () => {
    setIsLoading(true);
    files.forEach(async (file) => {
      currentSaved.current = file.name;
      const item = values[file.name];
      const mediaRes = await dispatch(saveMedia(file.binary));
      const avatarRes = await dispatch(saveMedia(item.file));
      await dispatch(addMedia({
        name: item.title,
        description: item.description,
        genre: item.genre.reduce((acc, v) => `${acc}${acc ? ',' : ''}${v.value}`, ''),
        cover_url: avatarRes.payload,
        media_url: mediaRes.payload,
        owner_id: userId,
        category: 'audio', // TODO
        duration: 0, // TODO
        composer: item.composer,
        record_label: item.recordLabel,
        song_writer: item.songWriter,
        owner_avatar_url: userAvatarUrl,
      }));
    });

    // handleNext();
    setIsLoading(false);
  }

  // render
  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-md-8 offset-md-2 col-10">
        <DragDrop
          onChange={handleFileChange}
          isMulti
        />
        {
          files.length > 0 && (
            <>
              <p className={styles.title}>Track List</p>
              <DraggableList
                list={files}
                listElement={UploadCard}
                params={{
                  onRemove: handleRemove,
                  onReorder: handleReorder,
                  onChange: handleChange,
                  status: saveStatus,
                  values,
                }}
              />
              <div className={styles.footerWrapper}>
                <Button
                  onClick={handleContinue}
                  isLoading={isLoading}
                >
                  Continue
                </Button>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default MediaUpload;
