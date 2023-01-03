import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import placeholder from '$assets/images/placeholder.png';
import { getMediaUrl } from '../../../common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { removeSeries, udpateSeries, updateAlbum } from '../../../redux/features/media';
import trash from '$assets/images/icons/trash.svg';
import cogs from '$assets/images/icons/settings.svg';
import { generatePath, useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';
import { showModal } from '$redux/features/modal';

export const ManageSeriesItem = (props) => {
    //props
    const { series } = props;

    //hooks
    const { push } = useHistory();

    //state
    const [coverUrl, setCoverUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    //store
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.authentication);
    const { updateSeriesPending } = useSelector(state => state.media);
    const pendingQueue = useSelector((state) => state.media.updateSeriesPendingQueue);
    const areDeleting = useSelector(state => state.media.removeSeriesPendingQueue);

    //effects
    useEffect(() => {
        console.log("manage_series_item: use effect triggered", series.cover_image);
        if (!series) return;
        if (!series.cover_image) return;
        console.log("getting cover url");
        setIsLoading(true)
        getMediaUrl(series.cover_image, token).then(res => {
            console.log("got cover url", res);
            setCoverUrl(res);
        });
    }, [series]);

    useEffect(() => {
        if (!series) return;
        console.log("Pending Queue Changed", pendingQueue.length, series.series_id, pendingQueue);
        if (pendingQueue.some(id => series.series_id == id)) {
            setIsUpdating(true);
        } else {
            setIsUpdating(false);
        }
    }, [pendingQueue.length, series]);

    useEffect(() => {
        if (areDeleting.some(id => id == series.series_id)) {
            setIsDeleting(true);
            return;
        }
        setIsDeleting(false);
    }, [areDeleting]);

    //handlers
    const handleOnLoad = (e) => {
        if (e.timestamp < 1000) return;
        console.log("On Load Called", e);
        setIsLoading(false);
    }

    const handleOnError = (e) => {
        console.log("On Error Called", e);
        setIsLoading(false);
        setCoverUrl(null);
    }

    const handleUpdate = (key, value) => {
        const payload = {
            ...series, 
            [key]: value,
        };
        const data = {
            id: series.series_id, 
            payload: payload,}
        dispatch(udpateSeries(data));
    }

    const handleDelete = () => {
        dispatch(removeSeries(series.series_id));
    }

    const handleEdit = () => {
        dispatch(showModal('FORM_MODAL', {
            'noWrapper':true,
            'preventOutsideClick': true,
            'form': 'series-form',
            'payload': {
                'series_id':  null,
            },
        }))
    }

    return (
        <div className={styles.wrapper}>
            <button className="btn btn-outline-primary btn-sm" onClick={handleEdit}>Edit</button>
            <img src={coverUrl ?? placeholder} alt="" onLoad={handleOnLoad} onError={handleOnError} />
            <div className="text-light">{series.title}</div>
            <span className='text-light' style={{ fontSize: 10, }}>{series.episodes.length} episods</span>
            <div className="mt-2">
                <div className="d-flex">
                    {series.published ? (
                        <button className="btn btn-warning text-light mr-2 text-dark" onClick={() => handleUpdate("published", false)} disabled={isUpdating}>
                            draft { isUpdating && <span className='spinner-border'></span>}
                        </button>
                    ) : (
                        <button className="btn btn-success text-light mr-2"  onClick={() => handleUpdate("published", true)} disabled={isUpdating}>
                            publish { isUpdating && <span className='spinner-border'></span>}
                        </button>
                    ) }
                    <button className='btn btn-info text-light mr-1' onClick={() => push(generatePath(routePaths.managerPanelManageSeriesEpisods, {id: series.series_id}))}>
                        <img src={cogs} className="text-light" alt="" height="18px" width="18px" />
                    </button>
                    <button onClick={handleDelete}  className="btn btn-danger text-light" disabled={isDeleting}>
                        {isDeleting ? <span className='spinner-border text-light'></span> : <img src={trash} className="text-light" alt="" height="18px" width="18px" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
