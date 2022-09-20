import React from 'react'
import { PropTypes } from 'prop-types';
import ArtistAvatarComponent from '../artist/avatar';
import { useHistory, generatePath } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';

const FeatureArtist = (props) => {
    // props
    const { artist } = props;

    // router
    const history = useHistory();

    // handlers
    const handleClick = () => {
        history.push(generatePath(routePaths.viewArtist, {id: artist.user_id}))
    }
    return (
        <div onClick={handleClick}>
            <ArtistAvatarComponent artist={artist} size={200} />
            <h5 className="text-center mt-3 text-light">{artist.full_name}</h5>
        </div>
    );
}

FeatureArtist.propTypes = {
    artist: PropTypes.object,
}

export default FeatureArtist;