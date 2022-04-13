import React, { useEffect, useState } from 'react'
import placeholder from '$assets/images/placeholder.png';
import styles from './index.module.scss';
import trash from '$assets/images/icons/trash.svg';
import publish from '$assets/images/icons/upload.svg';
import draft from '$assets/images/icons/trash.svg';
import { getMediaUrl } from '../../../common/utils';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/features/user';
import { updateArtist } from '../../../redux/features/artist';

export const ManageArtistItem = (props) => {
    //props
    const { artist } = props;

    //state
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //store
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.authentication);
    const { updateUserPending } = useSelector(state => state.user);

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
    }, [artist])

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
                <button  className="btn btn-danger text-light">
                    <img src={trash} className="text-light" alt="" height="18px" width="18px" />
                </button>
            </div>
        </div>
    )
}
