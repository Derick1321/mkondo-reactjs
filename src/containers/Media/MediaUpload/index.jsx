import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '$components/common/Button';
import DragDrop from '$components/common/DragDrop';
import DraggableList from '$components/common/DraggableList';
import UploadCard from '$components/media/UploadCard';

import { routePaths } from '$common/routeConfig';
import { bytesToSize, generatePreview, getDuration } from '$common/utils';

import { saveMedia, addMedia, clearNewMediaId } from '$redux/features/media';

import styles from './index.module.scss';
import { saveMediaPro } from '../../../redux/features/media';

const MediaUpload = () => {
  //hooks

  const lang = useSelector(store => store.user.language);
  const { t, i18n } = useTranslation('common');
  useEffect(() => { i18n.changeLanguage(lang); }, [lang]);

  //router
  const { push } = useHistory()

  // state
  const [files, setFiles] = useState([]);
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState({});
  const [mediaUrls, setMediaUrls] = useState({});
  const [dirty, setDirty] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const userAvatarUrl = useSelector((store) => store.authentication.user.avatar_url);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const addMediaPending = useSelector((store) => store.media.addMediaPending);
  const newMediaId = useSelector((store) => store.media.newMediaId);
  const addedAlbumPayload = useSelector(state => state.media.addedAlbumPayload);
  const lastUploaded = useSelector(state => state.media.lastUploaded);

  // refs
  const currentSaved = useRef(null);
  const completedFiles = useRef(0);

  // functions
  const handleNext = async () => {
    const item = values[files[files.length - 1].name];
    history.push(routePaths.success, {
      message: 'Congratulations you are all set!',
      link: `https//:mkondo.co/app/media/${newMediaId}`,
      country: item.recordLabel,
      name: item.title, 
      avatar: await generatePreview(item.file),
    });

    completedFiles.current = 0;
    dispatch(clearNewMediaId());
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
  }, [addMediaPending]);

  useEffect(() => {
    if (!newMediaId) {
      return;
    }

    completedFiles.current += 1;
    if (completedFiles.current === files.length) {
      handleNext();
    }
  }, [newMediaId]);

  useEffect(() => {
    console.log("last uploaded changed", lastUploaded);
    if (!lastUploaded) return;
    let _files = files.filter(file => file.name != lastUploaded.media_url);
    setFiles(_files);
    if (_files.length == 0 && dirty) {
      setSuccessMessage("Tracks Uploaded Successfull");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 10000);
    }
  }, [lastUploaded]);

  // handlers
  const handleFileChange = (result) => {
    console.log("File Changed");
    const fileList = [];
    const __values = {};
    for (let index = 0; index < result.length; index += 1) {
      setDirty(true);
      fileList.push({
        name: result[index].name,
        size: bytesToSize(result[index].size),
        binary: result[index],
      });
      const _file = {
        filename: result[index].name,
        file: result[index],
      };
      dispatch(saveMediaPro(_file)).then(action => {
        var _payload = {
          ...values[result[index].name],
          media_url: action.payload,
        };
        console.debug("CALLING HANLDE CHANGE FROM UPDATE MEDIA URL", result[index].name, _payload);
        handleChange(result[index].name, _payload);
      });
      
      getDuration(result[index], 'audio', (duration) => {
        var _payload = {
          ...values[result[index].name],
          duration,
        };
        console.debug("CALLING HANLDE CHANGE FROM UPDATE DURATION", result[index].name, _payload);
        handleChange(result[index].name, _payload);
      });

      const { state } = history.location;

      //preparing the payload
      var __data = {
        ...values[result[index].name],
        title: result[index].name.split(".")[0],
      };

      //patching data from album
      if (state && state.albumId) {
        __data["genres"] = addedAlbumPayload.genres;
        __data["description"] = addedAlbumPayload.description;
        __data["cover_url"] = addedAlbumPayload.cover_image;
      }

      //adding data to list of files needs to be updated
      __values[result[index].name] = __data;
    }
    console.debug("CALLING SET VALUES WITH PAYLOAD", __values);
    setValues(__values);
    setFiles(fileList);
  }

  const handleRemove = (index) => {
    setFiles(files.filter((file, idx) => (idx !== index)));
  }

  const handleReorder = (list) => {
    setFiles(list);
  }

  const handleChange = (name, value) => {
    console.log('handle change called ', name, value);
    setValues({
      ...values,
      [name]: {...values[name], ...value},
    });
    // console.debug(values);
  }

  const handleContinue = () => {
    setIsLoading(true);
    files.forEach(async (file) => {
      currentSaved.current = file.name;
      const item = values[file.name];
      console.log(item);
      // const mediaRes = await dispatch(saveMedia(file.binary));
      // const avatarRes = await dispatch(saveMedia(item.file));

      if (item) {
        const data = {
          name: item.title,
          description: item.description,
          genres: item.genres && item.genres.length ? item.genres.map((item) => item.value ?? item) : (item.genre && item.genre.length ? item.genre.map((item) => item.value ?? item) : []),
          cover_url: item.cover_url ?? item.file,
          media_url: item.media_url,
          owner_id: userId,
          category: 'audio',
          duration: values.duration || 0,
          composer: item.composer,
          record_label: item.recordLabel,
          song_writer: item.songWriter,
          owner_avatar_url: userAvatarUrl,
        };
        
        const { state } = history.location;
  
        if (state && state.albumId) {
          data.album_id = state.albumId;
        }
  
        await dispatch(addMedia(data));
      }
    });

    // handleNext();
    setIsLoading(false);
  }

  // render
  return (
    <div className={`row ${styles.wrapper}`}>
      <div className="col-md-8 offset-md-2 col-10">
        <button className="btn btn-primary mb-3" onClick={() => push(routePaths.newMediaCategory)}>Back</button>
        {successMessage && <div className='alert alert-success'>{successMessage}</div>}
        <DragDrop
          onChange={handleFileChange}
          isMulti
        />
        {
          files.length > 0 && (
            <>
              <p className={styles.title}>{t('track_list')} </p>
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
                  {t('continue')}
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
