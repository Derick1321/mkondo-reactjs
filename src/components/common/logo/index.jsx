import React from 'react'
import logoIcon from '../../../assets/images/logo_icon.png'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';

const MkondoLogo = () => {
    const history = useHistory();

    return (
        <div className="d-flex" onClick={() => history.push(routePaths.home)}>
          <img src={logoIcon} alt="" height="27px" className="mr-1" />
          <h1 className={styles.logo}>Mkondo</h1>
        </div>
    )
}

export default MkondoLogo;