import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import DragDrop from '$components/common/DragDrop';
import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import AvatarInput from '$components/common/AvatarInput';
import VideoPlayer from '$components/media/VideoPlayer';

import { bytesToSize, generatePreview, movieGenres, getDuration } from '$common/utils';
import { addMedia, saveMedia } from '$redux/features/media';

import { menus, descriptionMenu } from './menus';

import styles from './index.module.scss';
import { routePaths } from '../../../common/routeConfig';
import { crop } from '../../../redux/features/croptool';
import DonutProgress from '../../../components/common/DonutProgress/index';
import { saveMediaPro } from '../../../redux/features/media';
import ArtistSelectorComponent from '../artistSelector';

const getType = {
  movie: 'Upload Movie',
  video: 'Upload Video',
};

const NewVideo = () => {

  // refs
  const coverRef = useRef(null);

  //state
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [coverFileName, setCoverFileName] = useState(null);
  const [coverUploadProgress, setCoverUploadProgress] = useState(0)

  // store
  const history = useHistory();
  const push = history.push;
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.authentication.user.user_id);
  const user = useSelector((store) => store.authentication.user);
  const userAvatarUrl = useSelector((store) => store.authentication.user.avatar_url);
  const addMediaPending = useSelector((store) => store.media.addMediaPending);
  const addMediaUploadProgress = useSelector((store) => store.media.addMediaUploadProgress);
  const addMediaUploadedSize = useSelector((store) => store.media.addMediaUploadedSize);
  const addMediaTotalSize = useSelector((store) => store.media.addMediaTotalSize);
  const addMediaError = useSelector((store) => store.media.addMediaError);
  const croppedImage = useSelector((state) => state.croptool.cropped)
  const uploadQueue = useSelector(state => state.media.uploadQueue);

  const uploadType = (history.location.state && history.location.state.type) || 'video';
  const type = getType[uploadType];

  // state
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    duration: 0,
  });
  const [mediaUploadComplete, setMediaUploadComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const [localCoverUrl, setLocalCoverUrl] = useState(null);

  const [videoFile, setVideoFile] = useState(null);
  const [videoFileName, setVideoFileName] = useState(null);
  const [videoFileProgress, setVideoFileProgress] = useState(null);

  const [coverFile, setCoverFile] = useState(null);

  useEffect(async () => {
    if (!croppedImage) return;
    const file = await fetch(croppedImage).then(res => res.blob());
    const url = await generatePreview(file)
    setLocalCoverUrl(url);

    // setCoverFile(file);
    dispatch(saveMediaPro({filename: coverFileName, file: file})).then(action => handleChange("cover_url", action.payload));
  }, [croppedImage]);

  useEffect(() => {
    console.log("Effect", uploadQueue, videoFileName);
    if (!uploadQueue) return;
    // console.log(uploadQueue);
    uploadQueue.map((uploading) => {
        if (videoFileName && videoFileName === uploading.fileName) {
            console.debug("File Upload Progress", uploading.progress);
            setVideoFileProgress(uploading.progress);

            if (uploading.isUploaded) {
              setValues(prevState => {
                return {
                  ...prevState,
                  media_url: uploading.mediaUrl,
                }
              })
              setMediaUploadComplete(true);
              setSuccessMessage("File Uploaded")
              setTimeout(() => {
                setSuccessMessage(null);
              }, 1000);
              console.debug("File uploaded");
            }
        }
    })
  }, [uploadQueue, videoFileName]);

  useEffect(() => {
    if (!uploadQueue) return;
    if (!coverFileName) return;

    uploadQueue.map((uploading) => {
      if (coverFileName === uploading.filename) {
        setCoverUploadProgress(uploading.progress);
      }
    });
  }, [uploadQueue, coverFileName]);

  useEffect(() => {
    if (!addMediaError) return;
    try {
      let err = addMediaError.message ? JSON.parse(addMediaError.message) : JSON.parse(addMediaError);
      let _errors = {}
      let _e = err.message ?? err;

      if (_e) {
        if ('name' in _e) {
          _errors['title'] = "Invalid";
        }
  
        if ('description' in _e) {
          _errors['description'] = "Invalid";
        }
  
        if ('genres' in _e) {
          _errors['genre'] = "Invalid";
        }
      }
      setErrors(_errors);
      console.log("Add Media Error equals", _e);
    } catch (e) {
      console.log("failed to parse the add media error", addMediaError);
      console.error(e);
    }
  }, [addMediaError]);

  // hadnlers
  const handleVideoChange = (files) => {
    console.log("Handling video change", files);
    setFile(files[0]);
    generatePreview(files[0]).then(url =>  setVideoFile(url));
    setVideoFileName(files[0].name);
    getDuration(files[0], 'video', (value) => {
      handleChange('duration', value);
    });
    console.log("save media pro payload", files[0].name, files[0]);
    dispatch(saveMediaPro({
      'filename': files[0].name,
      'file': files[0],
    }));
    
  }

  const handleChange = (name, value) => {
    setValues(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    });
  }

  const handleSave = async () => {
    //saving the cover file
    console.log("handling save");
    
    var payload = {
      name: values.title,
      description: values.description,
      owner_id: selectedArtist ? selectedArtist.user_id : userId,
      category: uploadType,
      duration: values.duration,
      owner_avatar_url: userAvatarUrl,
      production_company: values.productionCompany,
      movie_director: values.director,
      staring: values.starring,
      release_date: values.startingDate,
      media_url: values.media_url,
      cover_url: values.cover_url,
    }
    
    if (values.genre) {
      payload["genres"] = values.genre.map((item) => item.value);
    }

    // if (coverFile) {
    //   console.log("cover url uploading")
    //   const mediaRes = await dispatch(saveMedia(coverFile));
    //   // payload['cover_url'] =  mediaRes.payload
    // }


    //saving the video file
    // const videoRes = await dispatch(saveMedia(file))
    console.log("payload", payload);
    const res = await dispatch(addMedia(payload));
    console.log("add media response", res);
  }

  const handleClear = () => {
    setFile(null);
    // const fileDom = document.querySelector('#file-input');
    // fileDom.value = '';
  }

  const handleCoverChange = async (files) => {
    console.log("Cover photo changed");
    const url = await generatePreview(files[0]);
    setCoverFileName(files[0].name);

    dispatch(crop({
      src: url,
      aspectRatio: uploadType == 'movie' ? 27/40 : 16/9,
      width: 1000, 
      locked: false,
    }))
  }

  const buildInputPanel = () => {
    return (
      <>
        {successMessage && <div className={styles.notification}>{successMessage}</div>}
        <p className={styles.paneTitle}>{type}</p>

        <div className={styles.inputContainer}>
          <p className={styles.title}>{file.name} - {bytesToSize(file.size)}</p>
          
          <div className={styles.inputFormWrapper}>
            <div className="row">
              <div className="col-md-4">
                <div className={`${styles.cover} ${uploadType == 'movie' ? styles.movieAspectRatio : styles.videoAspectRatio}`}>
                  <AvatarInput
                    url={localCoverUrl}
                    onChange={handleCoverChange}
                  />
                </div>
              </div>

              <div className="col-md-8">
                <div className="row">
                  {
                    menus.map((menu) => {
                      const item = {
                        ...menu,
                      };

                      if (item.options && uploadType === 'movie') {
                        item.options = movieGenres;
                      }

                      return (
                        <div
                          className='col-12 col-md-6'
                          key={`new-video-${menu.name}`}
                        >
                          <InputField
                            field={{
                              ...item,
                              value: values[menu.name]
                            }}
                            error={errors[menu.name]}
                            onChange={handleChange}
                          />
                        </div>
                      )
                    })
                  }
                </div>
                <div className="row">
                  <div className="col">
                    <InputField
                      field={{
                        ...descriptionMenu,
                        value: values.description
                      }}
                      error={errors.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              {videoFile && (
                <div>
                  <video width="100%" height="100%" autoPlay muted>
                      <source src={videoFile} />
                      Your browser does not support the video tag.
                  </video>
                  
                </div>
              )}
              <div className="d-flex align-items-center">
                <div className=''>
                  <DonutProgress progress={videoFileProgress} height="50px" width="50px" />
                </div>
                {mediaUploadComplete ? <span className='ml-2 text-success'>Upload Complete!</span> : <span className='ml-2'>Uploading...</span>}
              </div>

            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Button
            isSecondary
            onClick={handleClear}
          >
            Clear
              </Button>
          <Button
            onClick={handleSave}
            disabled={!mediaUploadComplete}
          >
            Save
          </Button>
        </div>
      </>
    );
  }

  const getContent = () => {
    if (addMediaPending) {
      return (
        <div className="d-flex">
          <div className={`spinner-border ${styles.spinnerLg}`} role="status" />
          <div className="ml-4">
            <p>Your {type} is getting uploaded.</p>
            <p>Please don&apos;t refresh your browser.</p>
            <p>You may continue using other functions of the app</p>
            {/* Progress indicator */}
            {/* <p><strong>Total: </strong> {bytesToSize(addMediaTotalSize)}</p> */}
            <p><strong>Uploaded: </strong> {bytesToSize(addMediaUploadedSize, 3)}</p>
            <div className="d-flex align-items-center progress-wrapper mx-5">
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${addMediaUploadProgress}%` }} />
                </div>
                <span className="mx-2">
                  {parseInt(addMediaUploadProgress)}% {'uploading'}
                </span>
              </div>
          </div>
        </div>
      );
    }

    if (file) {
      return buildInputPanel();
    }

    return (
      <div>
        {/* <button className="btn btn-primary mb-3" onClick={() => push(routePaths.newMediaCategory)}>Back</button> */}
        <DragDrop
          onChange={handleVideoChange}
          acceptedFiles="video/mp4,video/x-m4v,video/*"
        />
      </div>
    )
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
    <div className={styles.panelContainer}>
      <div className="row justify-content-center">
        <div className="col-10 col-sm-10 col-lg-8">
          {/* <button className="btn btn-primary" onClick={() => history.goBack()}>Back</button> */}
          {getContent()}
        </div>
      </div>
    </div>
  );
}

export default NewVideo;
