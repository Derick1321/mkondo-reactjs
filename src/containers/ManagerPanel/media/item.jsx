import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import placeholder from '$assets/images/placeholder.png';
import { getMediaUrl } from '../../../common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { SuccessPage } from '$containers/Success';
import { updateMedia } from '../../../redux/features/media';

export const ManageMoviesItem = ( props ) => {
    //hooks
    
    //props
    const { movie, key } = props;

    //state
    const [isLoadingCoverImage, setIsLoadingCoverImage] = useState(true);
    const [coverUrl, setCoverUrl] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    //store
    const token = useSelector((state) => state.authentication.token);
    const dispatch = useDispatch();
    const pendingQueue = useSelector((state) => state.media.updateMediaPendingQueue);
    
    //effects
    useEffect(() => {
        if (!movie || !token) return;
        getMediaUrl(movie.cover_url, token).then(url => setCoverUrl(url));
    }, [movie, token]);

    useEffect(() => {
        if (!movie) return;
        console.log("Pending Queue Changed", pendingQueue.length, movie.media_id, pendingQueue);
        if (pendingQueue.some(id => movie.media_id == id)) {
            setIsUpdating(true);
        } else {
            setIsUpdating(false);
        }
    }, [pendingQueue.length, movie]);

    //handlers
    const handleOnLoad = (e) => {
        if (e.timestamp < 1000) return;
        console.log("On Load Called", e);
        setIsLoadingCoverImage(false);
    }

    const handleOnError = (e) => {
        console.log("On Error Called", e);
        setIsLoadingCoverImage(false);
        setCoverUrl(null);
    }

    //handlers
    const handleUpdateMedia = (key, value) => {
        if (!key) return;
        let payload = {
            id: movie.media_id, 
            payload: {
                [key]: value,
            }
        }
        dispatch(updateMedia(payload));
    }

    return (
        <div key={key} className={`${styles.itemWrapper} mb-2 d-flex`}>
            {isUpdating && (
                <div className={styles.loader}>
                    <span className='text-light spinner spinner-border'></span>
                </div>
            )}
            <div className={styles.cover}>
                { isLoadingCoverImage && <span className='spinner-border'></span> }
                <img src={coverUrl ?? placeholder} alt="" onLoad={handleOnLoad} onError={handleOnError} />
            </div>

            <div className='flex-1 ml-2 px-2 py-2 text-light'>
                <div className='row'>
                    <div className='col-6'>
                        <h6>Movie Name</h6>
                        <p>{movie.name}</p>
                    </div>
                    <div className='col-6'>
                        <h6>Movie Category</h6>
                        <p>{movie.category}</p>
                    </div>
                    <div className='col-6'>
                        <h6>Genres</h6>
                        <p>{movie.genres.join('')}/</p>
                    </div>
                </div>
            </div>
            <div className='text-light px-2 py-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h6>Artist Name</h6>
                        <p>{movie.owner_name}</p>
                    </div>
                    <div className='col-12'>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" checked={movie.premium ? true : false} onChange={() => handleUpdateMedia("premium", !movie.premium)} />
                            <label class="form-check-label" for="inlineCheckbox1">Premium</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1"  checked={movie.theatre ? true : false} onChange={() => handleUpdateMedia("theatre", !movie.theatre)} />
                            <label class="form-check-label" for="inlineCheckbox1">Theatre</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-2'>
                    <div className="col-3 mb-2">
                        <button className='btn btn-primary' onClick={() => push('')}>View</button>
                    </div>
                    <div className="col-3">
                        {!movie.published ? <button className='btn btn-success' onClick={() => handleUpdateMedia("published", true)}>Publish</button> : <button className='btn btn-warning' onClick={() => handleUpdateMedia("published", false)}>Draft</button> }
                    </div>
                </div>
        </div>
    )
}
