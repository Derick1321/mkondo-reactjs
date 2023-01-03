import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import placeholder from '$assets/images/placeholder.png';
import { getMediaUrl } from '../../../common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateAlbum, deleteAlbum } from '../../../redux/features/media';
import trash from '$assets/images/icons/trash.svg';
import cogs from '$assets/images/icons/settings.svg';
import { generatePath, useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';
import { showModal } from '../../../redux/features/modal';

export const ManageAlbumsItem = (props) => {
    //props
    const { album } = props;

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
    const { updateAlbumPending } = useSelector(state => state.media);
    const areDeleting = useSelector(state => state.media.deleteAlbumPendingQueue);
    const pendingQueue = useSelector((state) => state.media.updateAlbumPendingQueue);

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

    useEffect(() => {
        if (!album) return;
        console.log("Pending Queue Changed", pendingQueue.length, album.album_id, pendingQueue);
        if (pendingQueue.some(id => album.album_id == id)) {
            setIsUpdating(true);
        } else {
            setIsUpdating(false);
        }
    }, [pendingQueue.length, album]);

    useEffect(() => {
        if (areDeleting.some(id => album.album_id == id)) {
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
            ...album,
            [key]: value,
        };
        const data = {
            id: album.album_id,
            payload: payload,
        }
        dispatch(updateAlbum(data));
    }
    const handleDelete = () => {
        dispatch(deleteAlbum({
            id: album.album_id
        }));
    }
    //console.log('id the value is:' + album.album_id);
    const handleEditMedia = () => {
        dispatch(
            showModal("FORM_MODAL", {
                noWrapper: true,

                preventOutsideClick: true,
                form: "album-form",
                payload: {
                    id: album.album_id
                }
            })
        );
    }
    return (
        <div className={styles.wrapper}>
            <button className='btn btn-sm btn-outline-info ml-2' onClick={handleEditMedia}>Edit</button>
            <img src={coverUrl ?? placeholder} alt="" onLoad={handleOnLoad} onError={handleOnError} />
            <div className="text-light">{album.name}</div>
            <span className='text-light' style={{ fontSize: 10, }}>{album.songs.length} songs</span>
            <div className="mt-2">
                <div className="d-flex">
                    {album.published ? (
                        <button className="btn btn-warning text-light mr-2 text-dark" onClick={() => handleUpdate("published", false)} disabled={isUpdating}>
                            draft {isUpdating && <span className='spinner-border'></span>}
                        </button>
                    ) : (
                        <button className="btn btn-success text-light mr-2" onClick={() => handleUpdate("published", true)} disabled={isUpdating}>
                            publish {isUpdating && <span className='spinner-border'></span>}
                        </button>
                    )}
                    <button className='btn btn-info text-light mr-1' onClick={() => push(generatePath(routePaths.manageAlbumSongs, { id: album.album_id }))}>
                        <img src={cogs} className="text-light" alt="" height="18px" width="18px" />
                    </button>
                    <button className="btn btn-danger text-light" onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? <span className='spinner-border text-white'></span> : <img src={trash} className="text-light" alt="" height="18px" width="18px" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
