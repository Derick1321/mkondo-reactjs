import React from 'react'
import * as styles from '../index.module.scss';
import MkondoLogo from '../../../components/common/logo/index';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';

export const MarketingPageHeaderComponent = () => {
    const { push } = useHistory();

    return (
        <div className={`${styles.header} px-4 py-3`}>
            <MkondoLogo />
            <div className={styles.menu}>
            <NavLink to="/" className={`btn btn-link`}>Home</NavLink>
            <NavLink to="/about" className={`btn btn-link`}>About Us</NavLink>
            <NavLink to="/contact" className={`btn btn-link`}>Contact Us</NavLink>
            </div>
            <button onClick={() => push(routePaths.login)} className="btn btn-primary">Login</button>
            <button onClick={() => push(routePaths.register)} className="btn btn-primary ml-2">Register</button>
        </div>
    )
}
