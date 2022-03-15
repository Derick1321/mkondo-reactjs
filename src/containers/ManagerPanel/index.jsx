import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../redux/features/media';
import styles from './index.module.scss';

export const ManagerPanel = () => {
    //store
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.media.movies);
    const isFetchingMovies = useSelector((state) => state.media.fetchMoviesLoading);

    //effects
    useEffect(() => {
        console.log("Effect triggered", movies, !movies.length);
        if (!movies.length) {
            console.log("dispatching fetching movies action");
            dispatch(fetchMovies());
        }
    }, [dispatch]);


    return (
        <div className={`${styles.container} container`}>
            <h1 className="text-light">Manager Panel</h1>
            <div className="row">
                <div className={`col-md-4`}>
                    <div className={`${styles.tile}`}>
                        <h3>Artists</h3>
                        <span>0</span>
                    </div>
                </div>
                <div className={`col-md-4`}>
                    <div className={`${styles.tile}`}>
                        <h3>Songs</h3>
                        <span>0</span>
                    </div>
                </div>
                <div className={`col-md-4`}>
                    <div className={`${styles.tile}`}>
                        <h3>Videos</h3>
                        <span>0</span>
                    </div>
                </div>
                <div className={`col-md-4`}>
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
    )
}
