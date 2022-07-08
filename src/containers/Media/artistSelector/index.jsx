import React from 'react'
import { PropTypes } from 'prop-types';
import styles from './index.module.scss';
import { ArtistListArtistWidget } from '../../Artist/List/widgets/artist/index';
import { useSelector, useDispatch } from 'react-redux';
import { getArtists } from '../../../redux/features/artist';
import { useEffect } from 'react';

const ArtistSelectorComponent = (props) => {
    const { onArtistSelected } = props;

    // store
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    const artists = useSelector(state => state.artist.artists);
    const isFetchingArtist = useSelector(state => state.artist.getArtistsPending);

    useEffect(() => {
        if (!artists.length) {
            dispatch(getArtists());
        }
    }, []);

    return (
        <div className={`row`}>
            <div className={`card ${styles.card}`}>
                <div className="card-body">
                <h3 className="card-title text-white">Select an Artist</h3>

                <div className="row text-light">
                    <div className="mb-2 d-flex align-items-center bg-dark">
                        <ArtistListArtistWidget artist={{ ...user, full_name: "Me" }} />
                        <button className="btn btn-primary btn-xs ml-auto" onClick={() => onArtistSelected(user)}>Select</button>
                    </div>
                    {isFetchingArtist && <p>Fetching artists... <span className='spinner-border text-light'></span></p>}
                    {artists.filter(artist => user.user_type == 'super admin' ? true : artist.admin_id == user.user_id).map(artist => (
                        <div className='mb-2 d-flex align-items-center bg-dark'>
                            <ArtistListArtistWidget artist={artist} />
                            <button className="btn btn-primary btn-xs ml-auto" onClick={() => onArtistSelected(artist)}>Select</button>
                        </div>
                    ))}
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