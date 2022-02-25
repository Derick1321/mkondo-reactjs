import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.scss';
import ScrollMedia from '../../../components/media/ScrollMedia/index';
import TheatrePlaylistComponent from './widgets/playlist';
import bg from '$assets/images/theatre-video-sample.png';
import play from '$assets/images/icons/play.svg';
import favourite from '$assets/images/icons/favorite.svg';
import share from '$assets/images/icons/share.svg';
import { useEffect, useState } from 'react';
import { getNewReleases } from '../../../redux/features/media';
import { handleFetch } from '../../../common/requestUtils';
import VideoPlayer from '../../../components/media/VideoPlayer/index';

export const TheatreContainer = () => {
    //state
    const [cover, setCover] = useState(bg);
    const [mediaUrl, setMediaUrl] = useState(null);

    //store
    const dispatch = useDispatch();
    const token = useSelector((store) => store.authentication.token);
    const currentMedia = useSelector((store) => store.theatre.currentMedia);
    const newInTheatreLoading = useSelector((store) => store.media.getNewReleasesPending);
    const newInTheatre = useSelector((store) => store.media.newReleases.movie);

    //effects
    useEffect(() => {
        console.debug("Theatre Container mounted", newInTheatre);
        if (!newInTheatre.length) {
            console.debug("Fetching new releases");
            dispatch(getNewReleases({
                category: "movie",
            }));
        }
    }, []);

    useEffect(() => {
        if (!currentMedia) return;
        setMediaUrl(null);
        //check if the current media has a cover url and obtain its url
        const effect = handleFetch('GET', `media/presigned-get-url?file_name=${currentMedia.cover_url}`, null, token);
        effect.then((res) => {
          setCover(res.response);
        });
    
        return () => {
          effect
        }
    }, [currentMedia]);

    const handlePlay = () => {
        // const res = await handleFetch('GET', `media/presigned-get-url?file_name=${currentMedia.media_url}`, null, token);
        setMediaUrl(currentMedia.media_url);
    }
    
    return (
        <>
        {currentMedia && (mediaUrl ? <VideoPlayer url={mediaUrl} /> : (
            <div className={styles.theatre} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.50)), url(${cover})`, }}>
                <div className={styles.actions}>
                    <img src={favourite} alt="" />
                    <img src={share} alt="" />
                </div>
                <div className={styles.description}>
                    <h1>{currentMedia.name}</h1>
                    <p>{currentMedia.description}</p>
                    <div className={styles.details}>
                        <p><strong>Directors: </strong>{currentMedia.movie_director}</p>
                        <p><strong>Staring: </strong>{currentMedia.staring}</p>
                        <p><strong>Genres: </strong>{currentMedia.genres.join()}</p>
                    </div>
                    <div className={styles.play} onClick={handlePlay}>
                        <img src={play} alt="" />
                        <span>Play</span>
                    </div>
                </div>
            </div>
        ))}



            <div class={styles.container}>
                <h1 class={styles.heading1}>Movie Theatre</h1>

                <div className={styles.margin}>
                    <TheatrePlaylistComponent
                        title="New in Theatre"
                        isLoading={newInTheatreLoading}
                        movies={newInTheatre}
                    />
                </div>

                <div className={styles.margin}>
                    <TheatrePlaylistComponent
                        title="Trending in Theatre"
                        isLoading={newInTheatreLoading}
                        movies={newInTheatre}
                    />
                </div>

                <div className={styles.margin}>
                    <TheatrePlaylistComponent
                        title="Popular"
                        isLoading={newInTheatreLoading}
                        movies={newInTheatre}
                    />
                </div>
            </div>
        </>
    );

}
