import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeatureHome from '../../../components/common/FeatureHome';
import { fetchMedia, fetchMediaMore } from '../../../redux/features/media';
import styles from './index.module.scss';

export const MediaListPage = (props) => {
    // redux
    const dispatch = useDispatch();
    const mediaList = useSelector(state => state.media.media);
    const title = useSelector(state => state.media.mediaFiltersTitle);
    const hasNext = useSelector(state => state.media.mediaPagination.hasNext);

    //effects
    useEffect(() => {
        dispatch(fetchMedia());
    }, []);

    // handlers
    const loadMore = () => {
        dispatch(fetchMediaMore());
    }

    return (
        <div className={styles.mediaList}>
            <h1>{title ? title : 'Media List'}</h1>

            <div className="d-flex flex-wrap">
                {mediaList.map(media => (
                    <div className='mb-1 mr-1'>
                        <FeatureHome media={media} />
                    </div>
                ))}
            </div>

            <div className="mt-2 mb-5">
                <button className="btn btn-lg btn-primary" onClick={loadMore} disabled={!hasNext}>Load More</button>
            </div>
        </div>
    );
}
