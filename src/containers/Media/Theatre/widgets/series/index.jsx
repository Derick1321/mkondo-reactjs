import React from 'react';
import { useState, useEffect } from 'react';
import { getMediaUrl } from '../../../../../common/utils';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import placeholder from '$assets/images/placeholder.png';
import { useHistory } from 'react-router-dom';

const SeriesItemComponent = (props) => {
    //props
    const { series } = props;

    // router
    const history = useHistory();

    //state
    const [coverUrl, setCoverUrl] = useState();

    //redux
    const token = useSelector(state => state.authentication.token);

    //effects
    useEffect(() => {
        if (!series) return;
        
        getMediaUrl(series.cover_url, token).then(res => {
            console.debug("SERIES ITEM COMPONENT: Obtained Cover URL", series.cover_url, res);
            setCoverUrl(res)
        });
    }, [series]);

    const handleSeriesClicked = (series) => {
        history.push(generatePath(routePaths.describeSeries, {series_id: series.series_id}));
    }
    
    return (
        <div className={styles.wrapper} onClick={handleSeriesClicked}>
            <img src={coverUrl ?? placeholder} alt="" />
        </div>
    );
}

export default SeriesItemComponent;
