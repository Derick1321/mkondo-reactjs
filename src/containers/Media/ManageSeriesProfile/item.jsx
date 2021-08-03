import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getMediaUrl } from '../../../common/utils';
import styles from './index.module.scss';

export const SeriesListItem = (props) => {
    //props
    const { series } = props;

    //state
    const [coverUrl, setCoverUrl] = useState(null)

    //store
    const token = useSelector(state => state.authentication.token);
    
    //effects
    useEffect(async () => {
        if (!series.cover_url) return;
        const _url = await getMediaUrl(series.cover_url, token);
        setCoverUrl(_url);
    }, [series.cover_url]);
    return (
        <div className={styles.itemWrapper}>
            <img src={coverUrl} alt="" />
            {/* <p>{series.title}</p>
            <p>{series.genres.join(', ')}</p>
            <p>{series.description}</p>
            <p>{series.cover_url}</p>
            <p>{series.trailer_url}</p> */}
            <div className={styles.details}>
                <div>
                    <p>{series.title}</p>
                </div>
            </div>
        </div>
    )
}
