import React from 'react'
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';

//assets
import share from '$assets/images/icons/share.svg';
import shareActive from '$assets/images/icons/share-active.svg';
import favorite from '$assets/images/icons/favorite.svg';


const TheatrePlaylistItemHeaderComponent = (props) => {
    //props
    const { media } = props;

    //store
    const dispatch = useDispatch();
    const token = useSelector((store) => store.authentication.token);

    //effects

    //handlers


    return (
        <div className={styles.wrapper}>
            <span className='mr-auto'>{media.theatre ? 'THEATRE' : (media.premium ? 'PREMIUM' : '')}</span>
            <img src={favorite} alt="" />
            <img src={share} alt="" />
        </div>
    );
}

TheatrePlaylistItemHeaderComponent.propTypes = {
    media: PropTypes.object.isRequired,
}

export default TheatrePlaylistItemHeaderComponent;