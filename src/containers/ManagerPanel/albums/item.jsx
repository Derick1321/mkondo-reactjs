import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import placeholder from '$assets/images/placeholder.png';
import { getMediaUrl } from '../../../common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateAlbum } from '../../../redux/features/media';
import trash from '$assets/images/icons/trash.svg';
import cogs from '$assets/images/icons/settings.svg';
import { generatePath, useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';

export const ManageAlbumsItem = (props) => {
    //props
    const { album } = props;

    //hooks
    const { push } = useHistory();

    //state
    const [coverUrl, setCoverUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    //store
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.authentication);
    const { updateAlbumPending } = useSelector(state => state.media);

    //effects
    useEffect(() => {
        console.log("manage_album_item: use effect triggered", album.cover_image);
        if (!album) return;
        if (!album.cover_image) return;
        console.log("getting cover url");
        setIsLoading(true)
        getMediaUrl(album.cover_image, token).then(res => {
            console.log("got cover url", res);
            setCoverUrl(res);
        });
    }, [album])

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
            ...album, 
            [key]: value,
        };
        const data = {
            id: album.album_id, 
            payload: payload,}
        dispatch(updateAlbum(data));
    }

    return (
        <div className={styles.wrapper}>
            <img src={coverUrl ?? placeholder} alt="" onLoad={handleOnLoad} onError={handleOnError} />
            <div className="text-light">{album.name}</div>
            <span className='text-light' style={{ fontSize: 10, }}>{album.songs.length} songs</span>
            <div className="mt-2">
                <div className="d-flex">
                    {album.published ? (
                        <button className="btn btn-warning text-light mr-2 text-dark" onClick={() => handleUpdate("published", false)} disabled={updateAlbumPending}>
                            draft { updateAlbumPending && <span className='spinner-border'></span>}
                        </button>
                    ) : (
                        <button className="btn btn-success text-light mr-2"  onClick={() => handleUpdate("published", true)} disabled={updateAlbumPending}>
                            publish { updateAlbumPending && <span className='spinner-border'></span>}
                        </button>
                    ) }
                    <button className='btn btn-info text-light mr-1' onClick={() => push(generatePath(routePaths.manageAlbumSongs, {id: album.album_id}))}>
                        <img src={cogs} className="text-light" alt="" height="18px" width="18px" />
                    </button>
                    <button  className="btn btn-danger text-light">
                        <img src={trash} className="text-light" alt="" height="18px" width="18px" />
                    </button>
                </div>
            </div>
        </div>
    );
}