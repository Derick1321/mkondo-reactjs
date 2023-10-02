import React from 'react'
import { PropTypes } from 'prop-types';
import styles from './index.module.scss';
import { ArtistListArtistWidget } from '../../Artist/List/widgets/artist/index';
import { useSelector, useDispatch } from 'react-redux';
import { getArtists } from '../../../redux/features/artist';
import { useEffect } from 'react';
import { useState } from 'react';


const ArtistSelectorComponent = (props) => {
    const { onArtistSelected } = props;

    // store
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    const artists = useSelector(state => state.artist.artists);
    const isFetchingArtist = useSelector(state => state.artist.getArtistsPending);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArtists, setFilteredArtists] = useState([]);

    const handleSearch = () => {

        const filteredArtists = artists.filter((artist) =>
            artist.full_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredArtists(filteredArtists);
    };

    useEffect(() => {
        if (!artists.length) {
            dispatch(getArtists());
        }
    }, []);


    return (
        <div className={`row`}>
            <div className={`card ${styles.card}`}>
                <div className="card-body">
                    <h3 className="card-title text-white">Select an Artist </h3>

                    {/* Search input field */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search artist"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>
                            Search
                        </button>
                    </div>

                    <div className="row text-light">
                        {/* Display filtered artists */}
                        {filteredArtists.length > 0 ? (
                            filteredArtists.map((artist) => (
                                <div key={artist.user_id} className='mb-2 d-flex align-items-center bg-dark'>
                                    <ArtistListArtistWidget artist={artist} />
                                    <button className="btn btn-primary btn-xs ml-auto" onClick={() => onArtistSelected(artist)}>Select</button>
                                </div>
                            ))
                        ) : (
                            <p>No artists found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

ArtistSelectorComponent.propTypes = {
    onArtistSelected: PropTypes.func,
}

export default ArtistSelectorComponent;