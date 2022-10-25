import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAlbums, fetchAudios, fetchAudiosMore } from '../../../redux/features/media';
import artist, { getArtists, getArtistsMore } from '../../../redux/features/artist';
import Tabs from '../../../components/common/Tabs';
import { COLOR_ACCENT } from '$common/constants';
import FeatureHome from '../../../components/common/FeatureHome/index';
import { FeatureAlbum } from '../../../components/common/FeatureAlbum/index';
import { ArtistListArtistWidget } from '../../Artist/List/widgets/artist/index';
import FeatureArtist from '../../../components/common/FeatureArtist';
import { genres } from '../../../common/utils';
import styles from './index.module.scss';
import { IconSort } from '../../../components/icons/sort';

const tabOptions = [
    {name: 'songs', title: 'Songs'},
    {name: 'albums', title: 'Albums'},
    {name: 'artists', title: 'Artists'},
];

export const MusicContainer = () => {

    // state
    const [selectedTab, setSelectedTab] = useState('songs');
    const [activeGenre, setActiveGenre] = useState('all');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [filters, setFilters] = useState({order_by_alpha: 'asc'});
    const [sort, setSort] = useState('alpha')

    // redux
    const dispatch = useDispatch();

    const songs = useSelector(state => state.media.audios);
    const fetchAudioPending = useSelector(state => state.media.fetchAudioPending);
    const audiosPagination = useSelector(state => state.media.audiosPagination);

    const albums = useSelector(state => state.media.albums);
    const fetchAlbumsPending = useSelector(state => state.media.fetchAlbumsPending);
    
    const artists = useSelector(state => state.artist.artists);
    const getArtistsPending = useSelector(state => state.artist.getArtistsPending);
    const artistsPagination = useSelector(state => state.artist.artistsPagination);

    // effects
    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(getArtists());
    }, []);

    useEffect(() => {
        dispatch(fetchAudios(filters));
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
    const handleSelectedTab = (selected) => {
        setSelectedTab(selected)
    }

    // handle load more
    const loadMoreSongs = () => {
        dispatch(fetchAudiosMore());
    }

    const loadMoreArtists = () => {
        dispatch(getArtistsMore());
    }

    const handleSelectGenre = (genre) => {
        setActiveGenre(genre);
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

    // views
    const renderTabBody = () => {
        switch (selectedTab) {
            case "songs":
                return (
                    <div className="row">
                        <div className="col d-flex flex-wrap">

                            {songs.map(_song => {
                                return (
                                    <div className="mr-2 mb-2">
                                         <FeatureHome media={_song} />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-3 mb-5">
                            <button className="btn btn-lg btn-primary" onClick={loadMoreSongs} disabled={!audiosPagination.hasNext}>Load More</button>
                        </div>
                    </div>
                );
            case "albums":
                return (
                    <div className="row">
                        <div className="col d-flex flex-wrap">
                            {albums.map(album => {
                                return (
                                    <div className="mr-2 mb-2">
                                        <FeatureAlbum album={album} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                );
            case "artists":
                return (
                    <div className="row">
                        <div className="col d-flex flex-wrap">
                            {artists.map(_artist => {
                                return (
                                    <div className="mr-2 mb-2">
                                        <FeatureArtist artist={_artist} />
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-3 mb-5">
                            <button className="btn btn-lg btn-primary" onClick={loadMoreArtists} disabled={!artistsPagination.hasNext}>Load More</button>
                        </div>
                    </div>
                );
            default:
                break;
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col">
                    <Tabs options={tabOptions} selected={selectedTab} activeColor={COLOR_ACCENT} onSelect={handleSelectedTab} />
                </div>
            </div>

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
                    {fetchAlbumsPending || fetchAudioPending ? <span className="spinner-border"></span> : (
                        <button className="btn btn-outline-secondary d-flex align-items-center justify-content-end" onClick={handleToggleSort}>
                            <IconSort height="22px" width="22px" />
                            <span>{sort.charAt(0).toUpperCase() + sort.slice(1)}</span>
                        </button>
                    )}
                </div>
            </div>
            <div className="my-4"></div>
            {renderTabBody()}
        </div>
    );
}