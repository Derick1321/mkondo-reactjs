import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from '$components/common/Button';
import Progress from '$components/common/Progress';
import NewItem from '$components/common/NewItem';

import { menus, metamenus } from './menus';
import styles from './index.module.scss';
import DonutProgress from '../../common/DonutProgress';
import { deleteIcon } from '$assets/images/icons/delete.svg';
import { IconDelete } from '../../icons/delete';

const dragIcon = require('$assets/images/icons/drag-icon.svg');
const settingsIcon = require('$assets/images/icons/settings.svg');
const editIcon = require('$assets/images/icons/edit.svg');

const initialState = {
  title: '',
  genre: '',
  description: '',
  policy: false,
  recordLabel: '',
  songWriter: '',
  composer: '',
  file: '',
};

const initialStatus = {
  pending: false,
  completed: false,
}

const UploadCard = (props) => {
  // props
  const {
    name,
    index,
    size,
    onRemove,
    onChange,
    values: allFields,
    status,
  } = props;
  const values = allFields[name];

  //hooks
  const lang = useSelector(store => store.user.language);
  const { t, i18n } = useTranslation('common');
  useEffect(() => { i18n.changeLanguage(lang); }, [lang]);
  // useEffect(() => { 
  //   console.log("")
  //   handleChange('title', name); 
  // }, [name]);

  // state
  const [isOpen, setIsOpen] = useState(false);
  const [mediaUploadProgress, setMediaUploadProgress] = useState(0);

  //redux
  // const addedAlbumPayload = useSelector(state => state.media.addedAlbumPayload);
  const uploadQueue = useSelector(state => state.media.uploadQueue);

  //effects
  useEffect(() => {
    // console.log("Effect", uploadQueue, coverFileName, trailerFileName);
    if (!uploadQueue) return;
    // console.log(uploadQueue);
    uploadQueue.map((uploading) => {
      // console.log(uploading.fileName, coverFileName, trailerFileName);
      if (name === uploading.fileName) {
        setMediaUploadProgress(uploading.progress)
      }
    })
  }, [uploadQueue]);

  // handlers
  const handleView = () => {
    setIsOpen(!isOpen);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleChange = (itemName, value) => {
    console.log("UPLOAD CARD: handleChange(itemName, value)", itemName, value);
    onChange(name, {
      ...initialState,
      ...values,
      [itemName]: value,
    });
  }

  // render
  return (
    <div className={styles.wrapper}>
      <div className="d-flex">
        <div>
          <button onClick={() => onRemove(index)} className="btn btn-sm btn-outline-danger"><IconDelete height="12px" width="12px" /></button>
        </div>
        <div className={`d-flex flex-column ${styles.contentWrapper}`}>
          <div>{name} | {size}</div>
          {/* <Progress
            values={status[name] || initialStatus}
            placeholder={t('uploading')}
          /> */}
        </div>
        <div className='d-flex'>
          <div style={{ height: 25, width: 25 }}>
            <DonutProgress progress={mediaUploadProgress} />
          </div>
          <Button
            onClick={handleView}
            isCustom
            hideDefault
          >
            <img
              className={styles.settingsIcon}
              src={editIcon}
              alt=""
            />
          </Button>

        </div>
      </div>
      {
        isOpen && (
          <div className="d-flex flex-column">
            <NewItem
              menus={menus}
              metamenus={metamenus}
              onChange={handleChange}
              onClose={handleClose}
              values={values || initialState}
            />
            <div className="d-flex">
              {/* <Button
                style={styles.deleteBtn}
                onClick={() => onRemove(index)}
              >
                {t('remove')}
              </Button> */}
              {/* <Button
                onClick={handleClose}
                style={styles.closeBtn}
                isCustom
                hideDefault
              >
                {t('close')}
              </Button> */}
            </div>
          </div>
        )
      }

    </div>
  );
}

export default UploadCard;
