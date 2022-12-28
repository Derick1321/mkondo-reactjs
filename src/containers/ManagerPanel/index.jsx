import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory, generatePath } from 'react-router-dom';
import RouteWithSubRoutes from '../../components/common/RouteWithSubRoutes';
import { fetchMovies, fetchAudios, fetchVideos, fetchAlbums, getSeries } from '../../redux/features/media';
import styles from './index.module.scss';
import { routePaths } from '../../common/routeConfig';
import { getArtists } from '../../redux/features/artist';

export const ManagerPanel = (props) => {
     // props
    const {
        routes,
        location,
    } = props;

    //hooks
    const { push } = useHistory();

    //store
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.media.movies);
    const moviesCount = useSelector((state) => state.media.moviesCount);
    const isFetchingMovies = useSelector((state) => state.media.fetchMoviesLoading);
    const audios = useSelector((state) => state.media.audios);
    const audiosCount = useSelector((state) => state.media.audiosCount);
    const isFetchingAudios = useSelector((state) => state.media.fetchAudiosLoading);
    const videos = useSelector((state) => state.media.videos);
    const videosCount = useSelector((state) => state.media.videosCount);
    const isFetchingVideos = useSelector((state) => state.media.fetchVideoesLoading);
    const artists = useSelector((state) => state.artist.artists);
    const isFetchingArtists = useSelector((state) => state.artist.getArtistPending);
    const albums = useSelector((state) => state.media.albums);
    const isFetchingAlbums = useSelector((state) => state.media.fetchAlbumsPending);
    const series = useSelector((state) => state.media.mySeries);
    const isFetchingSeries = useSelector((state) => state.media.getSeriesPending);


    //effects
    useEffect(() => {
        console.log("Effect triggered", movies, !movies.length);
        if (!movies.length) {
            console.log("dispatching fetching movies action");
            dispatch(fetchMovies({ "ignore_release_date": true }));
        }
        if (!audios.length) {
            console.log("dispatching fetching audios action");
            dispatch(fetchAudios({ "ignore_release_date": true }));
        }
        if (!videos.length) {
            console.log("dispatching fetching videos action");
            dispatch(fetchVideos({ "ignore_release_date": true }));
        }
        if (!artists.length) {
            console.log("dispatching fetching artists action");
            dispatch(getArtists());
        }
        if (!albums.length) {
            console.log("dispatching fetching albums action");
            dispatch(fetchAlbums({ "ignore_release_date": true }));
        }
        if (!series.length) {
            console.log("dispatching fetching series action");
            dispatch(getSeries({ "ignore_release_date": true }));
        }
    }, []);


    return (
        <Switch>
            {
                routes.map((route, i) => (
                    <RouteWithSubRoutes
                    key={i}
                    {...route}
                    />
                ))
            }

            <div className={`${styles.container} container`}>
                <h1 className="text-light">Manager Panel</h1>
                <div className="row">
                    <div className={`col-md-4`}>
                        <div className={`${styles.tile}`} onClick={() => push(routePaths.manageArtist)}>
                            <h3>Artists</h3>
                            <span>{artists.length??0}</span>
                        </div>
                    </div>
                    <div className={`col-md-4`} onClick={() => push(generatePath(routePaths.manageMedia, {'category': 'audio'}))}>
                        <div className={`${styles.tile}`}>
                            <h3>Songs</h3>
                            <span>{audiosCount}</span>
                        </div>
                    </div>
                    <div className={`col-md-4`} onClick={() => push(generatePath(routePaths.manageMedia, {'category': 'video'}))}>
                        <div className={`${styles.tile??0}`}>
                            <h3>Videos</h3>
                            <span>{videosCount}</span>
                        </div>
                    </div>
                    <div className={`col-md-4`} onClick={() => push(generatePath(routePaths.manageMedia, {'category': 'movie'}))}>
                        <div className={`${styles.tile}`}>
                            <h3>Movies</h3>
                            {isFetchingMovies ? <span className='spinner-border'></span> : <span>{moviesCount}</span>}
                        </div>
                    </div>
                    <div className={`col-md-4`} onClick={() => push(routePaths.manageAlbums)}>
                        <div className={`${styles.tile}`}>
                            <h3>Albums</h3>
                            <span>{albums.length}</span>
                        </div>
                    </div>
                    <div className={`col-md-4`} onClick={() => push(routePaths.managerPanelManageSeries)}>
                        <div className={`${styles.tile}`}>
                            <h3>Series</h3>
                            <span>{series.length}</span>
                        </div>
                    </div>
                </div>
            </div>
      </Switch>
    )
}
