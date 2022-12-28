import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';
import placeholder from '$assets/images/placeholder.png';
import { getMediaUrl } from '../../../common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { SuccessPage } from '$containers/Success';
import { deleteMedia, updateMedia, optimizeMedia as optimize } from '../../../redux/features/media';
import { generatePath, useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';
import DropDown from '../../../components/common/DropDown';
import deleteIcon from '$assets/images/icons/delete.svg';
import { useHistory } from 'react-router-dom';
import { formatDate } from '$common/utils';

const mediaActions = [
    { name: 'view', title: 'View', },
    { name: 'logout', title: 'Log Out', style: styles.optSecondary },
];

export const ManageMediaItem = ( props ) => {
    //hooks
    const { push } = useHistory();
    
    //props
    const { media, key } = props;

    // router
    const history = useHistory()

    //state
    const [mount, setMount] = useState(false);
    const [isLoadingCoverImage, setIsLoadingCoverImage] = useState(true);
    const [coverUrl, setCoverUrl] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [coverStyle, setCoverStyle] = useState(styles.audio);
    const [cardWidth, setCardWidth] = useState(0);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizeRequested, setOptimizeRequested] = useState(false);
    const [optimizeRequestedErrorReported, setOptimizeRequestedErrorReported] = useState(false);
    // const [coverHeight, setCoverHeight] = useState(100);


    //refs
    const cardRef = useRef(null)

    //store
    const token = useSelector((state) => state.authentication.token);
    const dispatch = useDispatch();
    const pendingQueue = useSelector((state) => state.media.updateMediaPendingQueue);
    const optimizeMedia = useSelector((state) => state.media.optimizeMedia)
    
    //effects
    useEffect(() => {
        setMount(true);
    }, []);

    useEffect(() => {
        if (!media || !token) return;
        getMediaUrl(media.cover_url_compressed ?? media.cover_url, token).then(url => setCoverUrl(url));
        switch (media.category) {
            case 'movie':
                setCoverStyle(styles.movie);
                // setCoverHeight(150);
                break;
            case 'audio':
                setCoverStyle(styles.audio);
                // setCoverHeight(100);
                break;
            case 'video':
                setCoverStyle(styles.video);
                // setCoverHeight(70);
                break;
            default:
                break;
        }
    }, [media, token]);

    useEffect(() => {
        if (!media) return;
        console.log("Pending Queue Changed", pendingQueue.length, media.media_id, pendingQueue);
        if (pendingQueue.some(id => media.media_id == id)) {
            setIsUpdating(true);
        } else {
            setIsUpdating(false);
        }
    }, [pendingQueue.length, media]);

    useEffect(() => {
        if (!cardRef.current) return;
        setCardWidth(cardRef.current.clientWidth);
    }, [cardRef])

    useEffect(() => {
        if (!mount) return;
        if (!optimizeMedia.isLoading) return;

        if (optimizeMedia.isLoading.includes(media.media_id)) {
            setIsOptimizing(true);
        } else {
            setIsOptimizing(false);
        }
    }, [optimizeMedia.isLoading])

    useEffect(() => {
        if (!mount) return;
        if (optimizeRequested) return;
        if (!optimizeMedia.isSuccessfull) return
        if (!optimizeMedia.isSuccessfull.includes(media.media_id)) return;
        setOptimizeRequested(true);
        // alert(`Optmized Media ${media.name}`);
    }, [optimizeMedia.isSuccessfull])

    useEffect(() => {
        if (!mount) return;
        if (optimizeRequestedErrorReported) return;
        if (!optimizeMedia.errors) return;
        if (!optimizeMedia.errors.includes(media.media_id)) return;
        setOptimizeRequestedErrorReported(true);
        // alert(`Failed to optimize the media ${media.name}`);
    }, [optimizeMedia.error])
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
            id: media.media_id, 
            payload: {
                [key]: value,
            }
        }
        dispatch(updateMedia(payload));
    }

    const handleArchive = () => {
        dispatch(deleteMedia(media.media_id));
    }

    const handleOptimize = () => {
        if (optimizeRequested) return;
        setOptimizeRequestedErrorReported(false);
        dispatch(optimize(media.media_id));
    }

    const handleViewLogs = () => {
        history.push(generatePath(routePaths.managerPanelMediaOptimizationLogs, {media_id: media.media_id}));
    }

    return (
        <div key={key} className="card h-100" ref={cardRef}>
            {isUpdating && (
                 <div className={styles.loader}>
                     <span className='text-light spinner spinner-border'></span>
                 </div>
             )}
            {media.category == 'video' && <img src={coverUrl ?? placeholder} class="card-img-top"  alt="" onLoad={handleOnLoad} onError={handleOnError} height={cardWidth * 9/16} style={{ objectFit: 'cover'  }}  />    }
            <div className="card-body">
                <div className="d-flex">
                    <div className="ml-auto">
                        <button className='btn btn-sm btn-outline-primary' onClick={() => push(generatePath(routePaths.viewMedia, { "id": media.media_id }))}>Play</button>
                    </div>
                </div>
                <div className="d-flex">
                    {media.category == 'movie' && (
                        <div className={`${styles.cover} ${coverStyle}`} style={{ height: "150px" }}>
                            { isLoadingCoverImage && <span className='spinner-border'></span> }
                            <img src={coverUrl ?? placeholder} alt="" onLoad={handleOnLoad} onError={handleOnError}  />
                        </div>
                    )}
                    {media.category == 'audio' && (
                        <div className={`${styles.cover} ${coverStyle}`} style={{ height: "100px", width: "100px" }}>
                            { isLoadingCoverImage && <span className='spinner-border'></span> }
                            <img src={coverUrl ?? placeholder} alt="" onLoad={handleOnLoad} onError={handleOnError}  />
                        </div>
                    )}
                    <div className='ml-2 flex-fill'>
                        <h6 class="card-subtitle mb-2 text-muted my-0 py-0">{media.category}</h6>
                        <h5 class="card-title my-0 py-0">{media.name}</h5>
                        <p className='text-primary' style={{ fontSize: 11 }}>By {media.owner_name}</p>
                        <p className='text-secondary' style={{ fontSize: 11 }}>{media.release_date}</p>
                        {/* <p className='text-secondary'>{media.genres.join(', ')}</p> */}

                        <div className='d-flex'>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" checked={media.premium ? true : false} onChange={() => handleUpdateMedia("premium", !media.premium)} />
                                <label className="form-check-label" for="inlineCheckbox1">Premium</label>
                            </div>
                            {media.category == 'movie' && (
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1"  checked={media.theatre ? true : false} onChange={() => handleUpdateMedia("theatre", !media.theatre)} />
                                    <label className="form-check-label" for="inlineCheckbox1">Theatre</label>
                                </div>
                            )}
                        </div>
                        {media.cover_url_compressed ? <p>Cover Image Compressed</p> : <p>Cover Image Not Compressed</p>}
                        {(media.category != 'audio' && media.video_qualities) ? <p>{Object.keys(media.video_qualities).map(key => `${key}p, `)}</p> : <p>Media has no other qualities</p>}
                        <button onClick={handleOptimize} disabled={optimizeRequested} className='btn btn-primary btn-sm'>Optimize {isOptimizing ? <span className='spinner-border spinner-border-sm'></span> : null}</button>
                        <button onClick={handleViewLogs} className="btn btn-outline-primary btn-sm ml-2">Logs</button>
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex">
                <p class="card-text"><small class="text-muted text-xs">Uploaded {formatDate(media.added)}</small></p>
                <div className='ml-auto d-flex'>
                {!media.published ? <button className='btn btn-success' onClick={() => handleUpdateMedia("published", true)}>Publish</button> : <button className='btn btn-warning' onClick={() => handleUpdateMedia("published", false)}>Draft</button> }
                <button className='btn btn-danger ml-2' onClick={handleArchive}><img src={deleteIcon} height={18} width={18} /> </button>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div key={key} className={`${styles.itemWrapper} mb-2 d-flex`}>
    //         {isUpdating && (
    //             <div className={styles.loader}>
    //                 <span className='text-light spinner spinner-border'></span>
    //             </div>
    //         )}
    //         <div className={`${styles.cover} ${coverStyle}`}>
    //             { isLoadingCoverImage && <span className='spinner-border'></span> }
    //             <img src={coverUrl ?? placeholder} alt="" onLoad={handleOnLoad} onError={handleOnError}  />
    //         </div>

    //         <div className='flex-1 ml-2 px-2 py-2 text-light'>
    //             <div className='row'>
    //                 <div className='col-6'>
    //                     <h6>Media Name</h6>
    //                     <p>{media.name}</p>
    //                 </div>
    //                 <div className='col-6'>
    //                     <h6>Media Category</h6>
    //                     <p>{media.category}</p>
    //                 </div>
    //                 <div className='col-6'>
    //                     <h6>Genres</h6>
    //                     <p>{media.genres.join('')}/</p>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className='text-light px-2 py-2'>
    //             <div className='row'>
    //                 <div className='col-12'>
    //                     <h6>Artist Name</h6>
    //                     <p>{media.owner_name}</p>
    //                 </div>
    //                 <div className='col-12'>
    //                     <div className="form-check form-check-inline">
    //                         <input className="form-check-input" type="checkbox" id="inlineCheckbox1" checked={media.premium ? true : false} onChange={() => handleUpdateMedia("premium", !media.premium)} />
    //                         <label className="form-check-label" for="inlineCheckbox1">Premium</label>
    //                     </div>
    //                     {media.category == 'movie' && (
    //                         <div className="form-check form-check-inline">
    //                             <input className="form-check-input" type="checkbox" id="inlineCheckbox1"  checked={media.theatre ? true : false} onChange={() => handleUpdateMedia("theatre", !media.theatre)} />
    //                             <label className="form-check-label" for="inlineCheckbox1">Theatre</label>
    //                         </div>
    //                     )}
                        
    //                 </div>
    //             </div>
    //         </div>
            
    //         <div className='p-2'>
    //                 <div className="col-3 mb-2">
    //                     <button className='btn btn-primary' onClick={() => push(generatePath(routePaths.viewMedia, { "id": media.media_id }))}>View</button>
    //                 </div>
    //                 <div className="col-3 mb-2">
    //                     {!media.published ? <button className='btn btn-success' onClick={() => handleUpdateMedia("published", true)}>Publish</button> : <button className='btn btn-warning' onClick={() => handleUpdateMedia("published", false)}>Draft</button> }
    //                 </div>
    //                 <div className='col-3'>
    //                  <button className='btn btn-danger' onClick={handleArchive}>Archive</button>
    //                 </div>
    //         </div>
    //     </div>
    // )
}
