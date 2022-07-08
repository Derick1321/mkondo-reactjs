import React from 'react'
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import placeholder from '$assets/images/user-placeholder.jpeg';
import { useEffect } from 'react';
import { getMediaUrl } from '../../../../common/utils';
import styles from './index.module.scss';
import { useState } from 'react';

const ArtistAvatarComponent = (props) => {
    // props
    const { artist, size } = props;

    //state
    const [avatar, setAvatar] = useState(null);

    //store
    const token = useSelector(state => state.authentication.token);

    //effects
    useEffect(() => {
        if (!artist) return;
        getMediaUrl(artist.avatar_url, token).then(res => setAvatar(res));
    }, [artist]);

    //handlers
    const handleOnError = () => {
        setAvatar(null);
    }
    return (
        <div>
            <img className={styles.avatar} src={avatar ?? placeholder} alt="" onError={handleOnError} height={size} width={size} />
        </div>
    );
}

ArtistAvatarComponent.defaultProps = {
    size: 100,
}

ArtistAvatarComponent.propTypes = {
    artist: PropTypes.object,
    size: PropTypes.number,
}

export default ArtistAvatarComponent;