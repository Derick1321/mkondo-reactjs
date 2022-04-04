import React from 'react';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { ManageMoviesItem } from './item';


export const ManageMedia = () => {
    //store
    const movies = useSelector((state) => state.media.movies);

    return (
        <div className={`${styles.container} container`}>
            <h2 className='text-light'>Manage Movies</h2>
            <div>
                {movies.map(movie => <ManageMoviesItem key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}
