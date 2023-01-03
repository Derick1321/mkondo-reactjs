import React, { useEffect, useState } from 'react'
import IndividualPlayer from '../../../components/media/IndividualPlayer';
import { useDispatch, useSelector } from 'react-redux';
import FeatureHome from '../../../components/common/FeatureHome';
import { useHistory } from 'react-router-dom';
import { loadMedia, updatePlaylist } from '../../../redux/features/player';


const ViewMediaCollection = () => {
    //router
    const history = useHistory();

    //store
    const dispatch = useDispatch();
    const { type, media } = useSelector(state => state.media.collection);
    // select current playlist
    const currentPlaylist = useSelector(state => state.player.currentPlaylist);
    const currentIndex = useSelector(state => state.player.index);

    // state
    const [currentMedia, setCurrentMedia] = useState({});


    //effects
    useEffect(() => {
        if (!media) return;
        dispatch(updatePlaylist(media))
    }, [media])

    useEffect(() => {
        if (!currentPlaylist) return;
        setCurrentMedia(currentPlaylist[currentIndex] ?? {});
    }, [currentPlaylist, currentIndex]);


    return (
        <div className='container mt-3'>
            <div className="row">
                <div className="col-lg-12">
                    <button className='btn btn-primary mb-3' onClick={() => history.goBack()}>Back</button>
                    <IndividualPlayer
                        mediaId={currentMedia.media_id}
                        mediaUrl={currentMedia.media_url}
                        coverUrl={currentMedia.cover_url}
                        avatarUrl={currentMedia.avatar_url}
                        title={currentMedia.name}
                        artistName={currentMedia.artist_name}
                    />
                </div>
            </div>
            <div className="mt-5">
                {media.map(content => (
                    <div className='row'>
                        <div className="col-lg-12">
                            <FeatureHome media={content} type="row" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewMediaCollection;