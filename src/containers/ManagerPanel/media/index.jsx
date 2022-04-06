import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { ManageMediaItem } from './item';
import { useParams } from 'react-router-dom';


export const ManageMedia = () => {
    //hooks
    const { category } = useParams();

    //state
    const [media, setMedia] = useState([]);

    //store
    const movies = useSelector((state) => state.media.movies);
    const audios = useSelector((state) => state.media.audios);
    const videos = useSelector((state) => state.media.videos);

    //effects
    useEffect(() => {
        if (!category) return;
        switch (category) {
            case "movie":
                setMedia(movies);
                break;
            case "audio":
                setMedia(audios);
                break;
            case "video":
                setMedia(videos);
                break;
            default:
                setMedia([]);
                break;
        }
    }, [category]);

    return (
        <div className={`${styles.container} container`}>
            <h2 className='text-light'>Manage Media</h2>
            <div>
                {media.map(_media => <ManageMediaItem key={_media.id} media={_media} />)}
            </div>
        </div>
    )
}
