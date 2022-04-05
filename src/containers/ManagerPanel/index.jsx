import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory, generatePath } from 'react-router-dom';
import RouteWithSubRoutes from '../../components/common/RouteWithSubRoutes';
import { fetchMovies, fetchAudios, fetchVideos } from '../../redux/features/media';
import styles from './index.module.scss';
import { routePaths } from '../../common/routeConfig';

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
    const isFetchingMovies = useSelector((state) => state.media.fetchMoviesLoading);
    const audios = useSelector((state) => state.media.audios);
    const isFetchingAudios = useSelector((state) => state.media.fetchAudiosLoading);
    const videos = useSelector((state) => state.media.videos);
    const isFetchingVideos = useSelector((state) => state.media.fetchVideoesLoading);

    //effects
    useEffect(() => {
        console.log("Effect triggered", movies, !movies.length);
        if (!movies.length) {
            console.log("dispatching fetching movies action");
            dispatch(fetchMovies());
        }
        if (!audios.length) {
            console.log("dispatching fetching audios action");
            dispatch(fetchAudios());
        }
        if (!videos.length) {
            console.log("dispatching fetching videos action");
            dispatch(fetchVideos());
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
                        <div className={`${styles.tile}`}>
                            <h3>Artists</h3>
                            <span>0</span>
                        </div>
                    </div>
                    <div className={`col-md-4`} onClick={() => push(generatePath(routePaths.manageMedia, {'category': 'movie'}))}>
                        <div className={`${styles.tile}`}>
                            <h3>Songs</h3>
                            <span>{audios.length}</span>
                        </div>
                    </div>
                    <div className={`col-md-4`} onClick={() => push(generatePath(routePaths.manageMedia, {'category': 'video'}))}>
                        <div className={`${styles.tile}`}>
                            <h3>Videos</h3>
                            <span>{videos.length}</span>
                        </div>
                    </div>
                    <div className={`col-md-4`} onClick={() => push(generatePath(routePaths.manageMedia, {'category': 'movie'}))}>
                        <div className={`${styles.tile}`}>
                            <h3>Movies</h3>
                            {isFetchingMovies ? <span className='spinner-border'></span> : <span>{movies.length}</span>}
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <div className={`${styles.tile}`}>
                            <h3>Albums</h3>
                            <span>0</span>
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <div className={`${styles.tile}`}>
                            <h3>Series</h3>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </div>
      </Switch>
    )
}
