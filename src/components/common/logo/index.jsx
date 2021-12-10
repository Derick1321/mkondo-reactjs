import React from 'react'
import logoIcon from '../../../assets/images/logo_icon.png'
import styles from './index.module.scss'

const MkondoLogo = () => {
    return (
        <div class="d-flex">
          <img src={logoIcon} alt="" height="27px" class="mr-1" />
          <h1 class={styles.logo}>Mkondo</h1>
        </div>
    )
}

export default MkondoLogo;