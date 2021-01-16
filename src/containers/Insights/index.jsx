import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Tabs from '$components/common/Tabs';
import { kFormatter } from '$common/utils';
import { getInsight } from '$redux/features/artist';

import styles from './index.module.scss';

const options = [
  { name: 'insights', title: 'Insights' },
];

const Insights = () => {
  // state
  const [selected, setSelected] = useState('insights');

  // store
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.authentication.user.user_id);
  const data = useSelector((store) => store.artist.insights);

  // effects
  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(getInsight(userId));
  }, [userId]);

  // handlers
  const buildPane = (name, value) => (
    <div className={`d-flex flex-column text-center ${styles.bubbleWrapper}`}>
      <p className={styles.bubbleTitle}>{name}</p>
      <div className={`d-flex justify-content-center align-items-center ${styles.bubble}`}>
        <span>{value}</span>
      </div>
    </div>
  );

  // render
  return (
    <div className={styles.container}>
      <div className={styles.tabsWrapper}>
        <Tabs
          onSelect={setSelected}
          selected={selected}
          options={options}
          name="insights"
          activeColor="#8C8C8C"
        />
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="d-flex flex-column">
            <span className={styles.title}>{data.plays || 0} Plays</span>
            <div className={styles.titleBorder} />
          </div>
          <div className={`d-flex flex-wrap ${styles.dataWrapper}`}>
            { buildPane('Likes', kFormatter(data.likes || 0)) }
            { buildPane('Shares', kFormatter(data.shares || 0)) }
            { buildPane('Comments', kFormatter(data.comments || 0)) }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;
