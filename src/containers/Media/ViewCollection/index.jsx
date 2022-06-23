import React, { useEffect } from 'react'
import IndividualPlayer from '../../../components/media/IndividualPlayer';
import { useDispatch, useSelector } from 'react-redux';
import FeatureHome from '../../../components/common/FeatureHome';
import { useHistory } from 'react-router-dom';
import { updatePlaylist } from '../../../redux/features/player';

const ViewMediaCollection = () => {
    //router
    const history = useHistory();

    //store
    const dispatch = useDispatch();
    const { type, media } = useSelector(state => state.media.collection);

    //effects
    useEffect(() => {
        if (!media) return;
        dispatch(updatePlaylist(media))
    }, [media])

    return (
        <div className='container mt-3'>
            <div className="row">
                <div className="col-lg-12">
                    <button className='btn btn-primary mb-3' onClick={() => history.goBack()}>Back</button>
                    <IndividualPlayer />
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