import React from 'react'
import { PropTypes } from 'prop-types';
import TheatrePlaylistItemComponent from './item';
import styles from './index.module.scss';

const TheatrePlaylistComponent = (props) => {
    const { title, isLoading, movies } = props;
    return (
        <div>
            <h3 className={styles.title}>{title}</h3>
            <p>{isLoading ? 'Loading...' : null}</p>
            <div className={styles.wrapper}>
                {movies.map((movie) => <TheatrePlaylistItemComponent media={movie} />)}
            </div>
        </div>
    );
}

TheatrePlaylistComponent.defaultProps = {
    title: '',
    isLoading: true,
    movies: [],
}

TheatrePlaylistComponent.propTypes = {
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    movies: PropTypes.array,
}

export default TheatrePlaylistComponent;