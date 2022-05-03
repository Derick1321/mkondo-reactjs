import React, { useEffect } from 'react'
import styles from './index.module.scss';
import { getPlaylist } from '../../../redux/features/playlist';
import { MusicPlaylistComponent } from './widgets/playlist';
import { useDispatch, useSelector } from 'react-redux';
import { getNewReleases, getTopMedias, getTrendMedias } from '../../../redux/features/media';
import CarouselFromConfiguration from '../../../components/common/Carousel/carousel_from_configuration';
import { CONFIG_KEY_SLIDER_DASHBOARD } from '../../Configuration/Sliders';
import fireIcon from '$assets/images/icons/fire.svg';
import newTag from '$assets/images/icons/new-tag.svg';

export const MusicContainer = () => {
    //store
    const dispatch = useDispatch();
    const topSongs = useSelector(state => state.media.topMedias.audio);
    const newSongs = useSelector(state => state.media.newReleases.audio);
    const trendingSongs = useSelector(state => state.media.trendMedias.audio);
    const favouriteSongs = useSelector(state => state.authentication.user.favourites.filter(item => item.category == 'audio'));

    //effects
    useEffect(() => {
        const params = {category: 'audio'};
        if (!topSongs.length) {
            dispatch(getTopMedias(params));
        }
        if (!newSongs.lenght) {
            dispatch(getNewReleases(params));
        }
        if (!trendingSongs.lenght) {
            dispatch(getTrendMedias(params));
        }
    }, [])

    return (
        <div>
            <div className={styles.hero}>
                <CarouselFromConfiguration sliderConfigurationKey={CONFIG_KEY_SLIDER_DASHBOARD} />
            </div>

            <div className={`container ${styles.content}`}>
                {trendingSongs.lenght > -1 ? <MusicPlaylistComponent title="Now Trending" icon={fireIcon} media={trendingSongs} /> : null}
                <MusicPlaylistComponent title="Top Songs" icon={fireIcon} media={topSongs} />
                <div className="mt-5"></div>
                <MusicPlaylistComponent title="New Songs" icon={newTag} media={newSongs} />
                <div className="mt-5"></div>
                {favouriteSongs.length > -1 ? <MusicPlaylistComponent title="Favourites" icon={fireIcon} media={favouriteSongs} /> : null}
            </div>

        </div>
    )
}
