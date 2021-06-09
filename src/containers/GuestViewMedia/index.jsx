import React, { useEffect } from 'react'
import Header from '$components/common/Header';
import { useParams } from 'react-router-dom';
import { getMedia } from '$redux/features/media'
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from '$components/media/VideoPlayer';

const GuestViewMedia = () => {
    //routes
    const { id: mediaId } = useParams();

    //store
    const dispatch = useDispatch();

    const getMediaPending = useSelector((store) => store.media.getMediaPending);
    const getMediaComplete = useSelector((store) => store.media.getMediaComplete);
    const currentMedia = useSelector((store) => store.media.currentMedia);

    //on mount
    useEffect(() => {
        if (!mediaId) {
            return;
        }
        dispatch(getMedia(mediaId));
    }, []);
    if (getMediaComplete) {
        console.log(currentMedia);
    }
    return (
        <div>
            <div className="container">
                <Header></Header>
                {getMediaPending ? <p>Loading...</p> : <></>}
                <div className="row">
                    <div className="col-md-6">
                        {getMediaComplete ? <VideoPlayer url={currentMedia.media_url} /> : <></>}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default GuestViewMedia
