import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TabsArtist from '$components/common/TabsArtist';
import InputField from '$components/forms/InputField';
import AvatarInput from '$components/common/AvatarInput';
import Progress from '$components/common/Progress';

import { generatePreview } from '$common/utils';

import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '$redux/features/modal';
import { crop } from '../../../redux/features/croptool';
import DonutProgress from '../DonutProgress';
import { saveMediaPro } from '../../../redux/features/media';

const options = [
  { name: 'basic', title: 'basic' },
  { name: 'metadata', title: 'metadata' },
]

const NewItem = (props) => {
  // props
  const {
    menus,
    metamenus,
    onChange,
    values,
  } = props;

  // console.log(menus);

  // state
  const [mediaUploadProgress, setMediaUploadProgress] = useState(0);
  const [selected, setSelected] = useState(options[0].name);
  const [avatarFileName, setAvatarFileName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);

  // redux
  const croppedImage = useSelector((state) => state.croptool.cropped)
  const dispatch = useDispatch();

  const uploadQueue = useSelector(state => state.media.uploadQueue);

  //effects
  useEffect(() => {
    // console.log("Effect", uploadQueue, coverFileName, trailerFileName);
    if (!uploadQueue) return;
    // console.log(uploadQueue);
    uploadQueue.map((uploading) => {
          // console.log(uploading.fileName, coverFileName, trailerFileName);
          if (avatarFileName === uploading.fileName) {
              setMediaUploadProgress(uploading.progress);
          }
      })
  }, [uploadQueue]);

  useEffect(async () => {
    // console.log("dslfjlsdjfl: cropped image detected");
    if (!croppedImage) return;
    const file = await fetch(croppedImage).then(res => res.blob());
    const url = await generatePreview(file)
    setAvatarUrl(url);
    // console.log("dslfjlsdjfl: dispatching save media pro")
    dispatch(saveMediaPro({filename: avatarFileName, file: file})).then(action => onChange('file', action.payload));
    // onChange('file', file);
  }, [croppedImage]);

  // handlers
  const handleSelect = (item) => {
    setSelected(item);
  }

  const handleAvatarChange = async (file) => {
    const url = await generatePreview(file[0]);
    setAvatarFileName(file[0].name);
    // onChange('file', file[0].name);
    dispatch(crop({
      src: url,
      aspectRatio: 1/1,
      width: 100, 
      locked: true,
    }));
  }

  // render
  return (
    <div className="">
      <div className="d-flex flex-column mt-4">
        <Progress
          values={values}
        />
      </div>
      <div  className={styles.newContent}>
        {/* <div className="d-flex flex-column mt-4">
          <TabsArtist
            options={options}
            onSelect={handleSelect}
            selected={selected}
            name="newItem"
            activeColor="#8C8C8C"
          />
        </div> */}
        <div className={`row mt-4 ${selected === 'basic' ? '' : 'd-none'}`}>
          <div className="col-12 col-md-6 col-lg-5">
            <div className={styles.avatar}>
              <AvatarInput
                url={avatarUrl}
                onChange={handleAvatarChange}
              />
              <div className={styles.avatarUploadProgress}>
                <DonutProgress progress={mediaUploadProgress} />
              </div>
            </div>
            {
              menus.map((menu, idx) => (
                menu.type == 'area' && <div className="" key={`new-item-menu-${idx}`}>
                  <InputField
                    field={{
                      ...menu,
                      value: values[menu.name]
                    }}
                    error={menu.error}
                    isGrey
                    onChange={onChange}
                  />
                </div>
              ))
            }
          </div>
          <div className="col-12 col-md-6 col-lg-7">
            {
              menus.map((menu, idx) => (
                menu.type != 'area' && menu.name != 'policy' && <div className="" key={`new-item-menu-${idx}`}>
                  <InputField
                    field={{
                      ...menu,
                      value: values[menu.name]
                    }}
                    error={menu.error}
                    isGrey
                    onChange={onChange}
                  />
                </div>
              ))
            }
          </div>
          <div className="col-12 col-md-6 col-lg-12">
            {
              menus.map((menu, idx) => (
                menu.name == 'policy' && <div className="" key={`new-item-menu-${idx}`}>
                  <InputField
                    field={{
                      ...menu,
                      value: values[menu.name]
                    }}
                    isGrey
                    onChange={onChange}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className={`d-flex flex-wrap mt-4 ${selected === 'metadata' ? '' : 'd-none'}`}>
          {
            metamenus.map((menu, idx) => (
              <div
                className=""
                key={`new-item-menumetas-${idx}`}
              >
                <InputField
                  field={{
                    ...menu,
                    value: values[menu.name]
                  }}
                  isGrey
                  onChange={onChange}
                />
              </div>
            ))
          }
        </div>
        <div className="d-flex justify-content-end">
          {selected == "basic" && <button className="btn btn-primary" onClick={() => handleSelect(options[1].name)}>Next</button>}
          {selected == "metadata" && <button className="btn btn-warning" onClick={() => handleSelect(options[0].name)}>Previous</button>}
        </div>
      </div>
    </div>
  );
}

NewItem.defaultProps = {
  title: 'Create Artist',
};

NewItem.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default NewItem;
