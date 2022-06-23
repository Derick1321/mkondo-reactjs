import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMediaUrl } from '../../../common/utils';
import placeholder from '$assets/images/placeholder.png';
import styles from './index.module.scss';
import { updateCollectionPayload } from '../../../redux/features/media';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';

export const FeatureAlbum = (props) => {
    //props
    const { album } = props;

    //router
    const history = useHistory();

    //state
    const [cover, setCover] = useState(null);

    //redux
    const dispatch = useDispatch();
    const { token, visitorToken } = useSelector(state => state.authentication);

    //effects
    useEffect(() => {
        if (!album) return;

        if (album.cover_image) {
            getMediaUrl(album.cover_image, token || visitorToken)
                .then(url => setCover(url))
                .catch(e => console.error(e));
        }
    }, [album]);

    //handlers
    const handlePlay = () => {}
    const handleOpen = () => {
        dispatch(updateCollectionPayload({
            key: 'media',
            value: album.songs,
        }));
        history.push(routePaths.viewCollection);
    }

    return (
        <div className={styles.wrapper} onClick={handleOpen}>
            <img src={cover ?? placeholder} height="200px" width="200px" alt="" onLoad={(e) => console.log("Placeholder Loaded:") } onError={() => setCover(null)} />
        </div>
    );
}
