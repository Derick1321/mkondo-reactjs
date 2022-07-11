import React from 'react';
import { useState, useEffect } from 'react';
import { getMediaUrl } from '../../../../../common/utils';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import placeholder from '$assets/images/placeholder.png';

const SeriesItemComponent = (props) => {
    //props
    const { series } = props;

    //state
    const [coverUrl, setCoverUrl] = useState();

    //redux
    const token = useSelector(state => state.authentication.token);

    //effects
    useEffect(() => {
        if (!series) return;
        getMediaUrl(series.cover_url, token).then(res => setCoverUrl(res));
    }, [series])
    
    return (
        <div className={styles.wrapper}>
            <img src={coverUrl ?? placeholder} alt="" />
        </div>
    );
}

export default SeriesItemComponent;
