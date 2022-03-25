import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import { PropTypes } from 'prop-types';

const Tile = (props) => {
    // props
    const { link, title } = props;
    // hooks
    const { pathname } = useLocation()
    const { push } = useHistory()
    
    return (
        <div className={`${styles.tile}`} onClick={() => push(`${pathname}${link}`)}>
            <h2>{title}</h2>
        </div>
    )
}

Tile.defaultProps = {
    link: '/',
    title: 'Configuration Title',
}

Tile.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, 
}

export default Tile;