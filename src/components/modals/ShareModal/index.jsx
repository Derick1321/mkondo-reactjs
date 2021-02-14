import React from 'react';
import PropTypes from 'prop-types';

import Share from '$components/common/Share';

import styles from './index.module.scss';

const ShareModal = (props) => {
  // props
  const {
    title, 
    country,
    id,
    avatarUrl,
    isArtist,
  } = props;

  const param = isArtist ? 'artist' : 'media';

  // render
  return (
    <div className={styles.shareModalWrapper}>
      <Share
        name={title}
        country={country}
        link={`https://mkondo.co/app/${param}/${id}`}
        avatar={avatarUrl}
        initialDescription={`Checkout this ${param} hosted at www.mkondo.co`}
        id={id}
      />
    </div>
  );
}

ShareModal.defaultProps  = {
  isArtist: false,
  country: '',
  avatarUrl: '',
}

ShareModal.propTypes  = {
  title: PropTypes.string.isRequired, 
  id: PropTypes.string.isRequired,
  isArtist: PropTypes.bool,
  country: PropTypes.string,
  avatarUrl: PropTypes.string.isRequired,
}

export default ShareModal;
