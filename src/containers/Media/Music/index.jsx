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

const tabOptions = [
    {name: 'songs', title: 'Songs'},
    {name: 'albums', title: 'Albums'},
    {name: 'artists', title: 'Artists'},
];

export const MusicContainer = () => {

    // state
    const [selectedTab, setSelectedTab] = useState('songs');

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
        dispatch(fetchAudios());
        dispatch(fetchAlbums());
        dispatch(getArtists());
    }, []);

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
            <div className="my-4"></div>
            {renderTabBody()}
        </div>
    );
}