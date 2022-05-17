import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FeatureHome from '../../../components/common/FeatureHome';
import { getTopMedias } from '../../../redux/features/media';

export const VideosContainer = () => {
    //redux
    const dispatch = useDispatch();
    const videos = useSelector(state => state.media.topMedias.video);

    //effects
    useEffect(() => {
        if (videos.length) return;
        const params = {category: 'video'};
        dispatch(getTopMedias(params));
    }, [])
    return (
        <div className='container mt-3'>
            <div className="row">
                {videos.map((video, i) => (
                    <div className='col-lg-3'>
                        <FeatureHome
                                key={`feature-home-video-${i}`}
                                mediaUrl={video.media_url}
                                mediaId={video.media_id}
                                avatar={video.cover_url}
                                artistId={video.owner_id}
                                owner_name={video.owner_name}
                                title={video.name}
                                country={video.country}
                                category={video.category}
                                description={video.description}
                                likes={video.likes || undefined}
                                plays={video.plays}
                                comment_num={video.comment_num}
                                />
                    </div>
                ))}
            </div>
        </div>
    );
}
