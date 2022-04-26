import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import TheatrePlaylistCoverComponent from './cover';
import styles from "./index.module.scss";
import ActionHeader from '../../../../../../components/media/ActionHeader/index';
import TheatrePlaylistItemHeaderComponent from './header';
import { setTheatreCurrentMedia } from '../../../../../../redux/features/theatre';
import { useDispatch } from 'react-redux';
import { retrieveMedia } from '../../../../../../redux/features/media';
import { showModal } from '../../../../../../redux/features/modal';

const TheatrePlaylistItemComponent = (props) => {
  //props
  const { media } = props;
  const { media_id, cover_url, name, description } = media;

  //store
  const dispatch = useDispatch();

  const handleSelect = (media) => {
    console.log("handle selected called");
    dispatch(retrieveMedia(media.media_id));
    dispatch(setTheatreCurrentMedia(media));
    // dispatch(showModal('ALERT_MODAL'))
  }

  return (
    <div className={styles.wrapper} onClick={() => handleSelect(media)}>
      <TheatrePlaylistCoverComponent filename={cover_url}>
        <div className={styles.backgroundWrapper}>
          <div className={styles.header}>
            <TheatrePlaylistItemHeaderComponent media={media} />
          </div>
        </div>
      </TheatrePlaylistCoverComponent>
      {/* <h4 className={styles.title}>{name}</h4> */}
    </div>
  )
}

TheatrePlaylistItemComponent.defaultProps = {
  media: {},
}

TheatrePlaylistItemComponent.propTypes = {
    media: PropTypes.object
}

export default TheatrePlaylistItemComponent;