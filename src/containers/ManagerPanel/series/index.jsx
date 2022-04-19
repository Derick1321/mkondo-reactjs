import React, { useEffect } from 'react'
import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums, getSeries } from '../../../redux/features/media';
import { ManageAlbumsItem, ManageSeriesItem } from './item';

export const ManageSeries = () => {
  //store
  const dispatch = useDispatch();
  const series = useSelector((state) => state.media.mySeries);
  const isFetchingSeries = useSelector((state) => state.media.getSeriesPending);

  //effects
  useEffect(() => {
    if (!series.length) {
      console.log("dispatching fetching series action");
      dispatch(getSeries());
    }
  }, []);

  return (
    <div className={`${styles.container} container`}>
        <h2 className='text-light'>Manage Series</h2>
        <div className='row'>
            {series.map(x => <div className='col-lg-2 col-md-4 col-6'><ManageSeriesItem key={x.series_id} series={x} /></div>)}
        </div>
    </div>
  )
}
