import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import videoCamera from '$assets/images/icons/video-camera.svg';
import styles from './index.module.scss';
import { handleFetch } from '$common/requestUtils';
import { updateMedia } from '$redux/features/media';

const TheatrePlaylistCoverComponent = (props) => {
  //props
  const { filename, children } = props;

  //state
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("");

  //store
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authentication.token);

  //effects
  useEffect(() => {
    //on mount
    if (!filename) return;
    const effect = handleFetch('GET', `media/presigned-get-url?file_name=${filename}`, null, token);
    effect.then((res) => {
      setUrl(res.response);
      setIsLoading(false);
    });

    return () => {
      effect
    }
  }, [])

  return (
    <div className={styles.wrapper} style={{ backgroundImage: `url(${url})` }} >
      {isLoading || !url ? <img className={styles.cover} src={videoCamera} alt="" height={30} /> : null}
      {children}
    </div>
  )
}

TheatrePlaylistCoverComponent.defaultProps = {
  filename: "",
}

TheatrePlaylistCoverComponent.propTypes = {
    filename: PropTypes.string,
    children: PropTypes.element.isRequired,
}

export default TheatrePlaylistCoverComponent;
