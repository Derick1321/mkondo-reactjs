import React, { useEffect, useState } from 'react'
import placeholder from '$assets/images/placeholder.png';
import styles from './index.module.scss';
import trash from '$assets/images/icons/trash.svg';
import publish from '$assets/images/icons/upload.svg';
import draft from '$assets/images/icons/trash.svg';
import { getMediaUrl } from '../../../common/utils';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/features/user';
import { deleteArtist, updateArtist } from '../../../redux/features/artist';

export const ManageArtistItem = (props) => {
    //props
    const { artist } = props;

    //state
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    //store
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.authentication);
    const { updateUserPending } = useSelector(state => state.user);
    const deleting = useSelector(state => state.artist.deleteArtistPendingQueue);

    //effects
    useEffect(() => {
        console.log("use effect triggered", artist.avatar_url);
        if (!artist) return;
        if (!artist.avatar_url) return;
        console.log("getting media url");
        setIsLoading(true)
        getMediaUrl(artist.avatar_url, token).then(res => {
            console.log("got media url", res);
            setAvatarUrl(res);

        });
    }, [artist]);

    useEffect(() => {
        if (!deleting.length) return;
        if (deleting.some(id => id == artist.user_id)) {
            setIsDeleting(true);
        } else {
            setIsDeleting(false);
        }
    }, [deleting])

     //handlers
     const handleOnLoad = (e) => {
        if (e.timestamp < 1000) return;
        console.log("On Load Called", e);
        setIsLoading(false);
    }

    const handleOnError = (e) => {
        console.log("On Error Called", e);
        setIsLoading(false);
        setAvatarUrl(null);
    }

    const handleUpdate = (key, value) => {
        const payload = {...artist, id: artist.user_id, [key]: value}
        dispatch(updateArtist(payload))
    }

    const handleDelete = () => {
        if (isDeleting) return;
        
        const payload = {
            id: artist.user_id
        }
        dispatch(deleteArtist(payload));
    }

    return (
        <div className={`text-light ${styles.artistItemContainer}`}>
            <div className={styles.avatarWrapper}>
                <img src={avatarUrl ?? placeholder} alt="" onLoad={handleOnLoad} onError={handleOnError} />
            </div>
            <span>{artist.full_name}</span>
            <div className="d-flex">
                {artist.publish ? (
                    <button className="btn btn-warning text-light mr-2 text-dark" onClick={() => handleUpdate("publish", false)} disabled={updateUserPending}>
                        draft { updateUserPending && <span className='spinner-border'></span>}
                    </button>
                ) : (
                    <button className="btn btn-success text-light mr-2"  onClick={() => handleUpdate("publish", true)} disabled={updateUserPending}>
                        publish { updateUserPending && <span className='spinner-border'></span>}
                    </button>
                ) }
                <button onClick={handleDelete}  className="btn btn-danger text-light">
                    {isDeleting ? <span className='spinner-border text-light'></span> : <img src={trash} className="text-light" alt="" height="18px" width="18px" /> }
                </button>
            </div>
        </div>
    )
}
