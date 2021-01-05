import React from 'react';

import Share from '$components/common/Share';

import styles from './index.module.scss';

const ShareModal = (props) => {
  // props
  const {
    title, 
    country,
    mediaId,
    avatarUrl,
  } = props;

  // render
  return (
    <div className={styles.shareModalWrapper}>
      <Share
        name={title}
        country={country}
        link={`https//mkondo.co/app/media/${mediaId}`}
        avatar={avatarUrl}
        initialDescription="Checkout this media hosted at www.mkondo.co"
        mediaId={mediaId}
      />
    </div>
  );
}

export default ShareModal;
