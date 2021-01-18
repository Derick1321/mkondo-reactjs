import React from 'react';

import styles from './index.module.scss';

const List = (props) => {
  // props
  const { num, title, description } = props;
  return (
    <div className="d-flex">
      <div className={`d-flex justify-content-center align-items-center ${styles.listNumWrapper}`}>
        <span>{num}</span>
      </div>
      <div className={styles.listContentWrapper}>
        <p className={`${styles.listHeader} mb-0`}>{title}</p>
        <p className={`${styles.listDescription}`}>{description}</p>
      </div>
    </div>
  );
}

export default List;
