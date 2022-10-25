import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FeatureHome from '../../../components/common/FeatureHome';
import { fetchVideos, getTopMedias } from '../../../redux/features/media';
import { IconSort } from '../../../components/icons/sort';
import styles from './index.module.scss';
import { useState } from 'react';
import { movieGenres as genres } from '$common/utils';

export const VideosContainer = () => {

    //state
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [filters, setFilters] = useState({order_by_alpha: 'asc'});
    const [sort, setSort] = useState('alpha')

    //redux
    const dispatch = useDispatch();
    const videos = useSelector(state => state.media.videos);
    const fetchVideosPending = useSelector(state => state.media.fetchVideoPending);
    const audiosPagination = useSelector(state => state.media.videosPagination);

    //effects
    useEffect(() => {
        dispatch(fetchVideos(filters));
    }, [filters]);

    useEffect(() => {
        if (selectedGenres.length > 0) {
            let _genres = selectedGenres.join(',');
            setFilters({...filters, genres: _genres});
        } else {
            if (filters.genres) {
                let __filters = {...filters};
                delete __filters['genres'];
                setFilters(__filters);
            }
        }
    }, [selectedGenres]);

    useEffect(() => {
        let __filters = {...filters};

        if (sort == 'oldest') {
            delete __filters['order_by_alpha'];
            setFilters({...__filters, order_by_date: 'oldest'});
        }

        if (sort == 'latest') {
            // setSort('alpha')
            setFilters({...__filters, order_by_date: 'latest'});
        }

        if (sort == 'alpha') {
            // setSort('oldest');
             delete __filters['order_by_date'];
            setFilters({...__filters, order_by_alpha: 'asc'});
        }
    }, [sort])

    // handlers
    const handleSelectGenre = (genre) => {
        // setActiveGenre(genre);
        if (genre == 'all') {
            setSelectedGenres([]);
            return;
        }
        if (selectedGenres.some(g => g == genre)) {
            setSelectedGenres(selectedGenres.filter(g => g != genre));
        } else {
            let _selected = [...selectedGenres];
            _selected.push(genre);
            setSelectedGenres(_selected)
        }
    }

    const handleToggleSort = () => {
        if (sort == 'oldest') {
            setSort('latest')
        }

        if (sort == 'latest') {
            setSort('alpha')
        }

        if (sort == 'alpha') {
            setSort('oldest');
        }
    }
    
    
    return (
        <div className='container mt-3'>
            <div className="row my-3 d-flex">
                <div className="col-lg-11 col-10 flex-grow-1">
                    <div className={styles.pills}>
                    <span className={`${styles.pill} ${selectedGenres.length == 0 ? styles.active : null} mr-2`} onClick={() => handleSelectGenre('all')}>All</span>
                        {genres.map((genre, i) => {
                            return  <span className={`${styles.pill}  ${selectedGenres.includes(genre.value) ? styles.active : null} mr-2`} onClick={() => handleSelectGenre(genre.value)}>{genre.label}</span>;
                        })}
                    </div>
                </div>
                <div className="col-lg-1 col-2">
                    {fetchVideosPending ? <span className="spinner-border"></span> : (
                        <button className="btn btn-outline-secondary d-flex align-items-center justify-content-end" onClick={handleToggleSort}>
                            <IconSort height="22px" width="22px" />
                            <span>{sort.charAt(0).toUpperCase() + sort.slice(1)}</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="row">
                {videos.map((video, i) => (
                    <div className='col-lg-3'>
                        <FeatureHome
                            key={`feature-home-video-${i}`}
                            media={video}
                            />
                    </div>
                ))}
            </div>
        </div>
    );
}
