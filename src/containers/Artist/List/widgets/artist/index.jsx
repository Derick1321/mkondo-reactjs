import React from 'react'
import { useState, useEffect } from 'react';
import placeholder from '$assets/images/user-placeholder.jpeg';
import { getMediaUrl } from '../../../../../common/utils';
import { useSelector } from 'react-redux';

export const ArtistListArtistWidget = (props) => {
    //props
    const { artist } = props;
    const { full_name, avatar_url } = artist

    //state
    const token = useSelector(state => state.authentication.token);
    const [avatarUrl, setAvatarUrl] = useState(null);

    //effects
    useEffect(() => {
        if (!avatar_url) return;
        getMediaUrl(avatar_url, token).then(url => setAvatarUrl(url));
    }, [avatar_url])

    //handlers
    const handleOnAvatarLoadError = () => {
        setAvatarUrl(null);
    }

    return (
        <div className='d-flex'>
            <img src={avatarUrl ?? placeholder} alt="" height="45px" width="45px" className='mr-2' onError={handleOnAvatarLoadError} />
            <div>
                {full_name || 'NIL'}
            </div>
        </div>
    );
}
