import React from 'react'
import { Form } from './form'
import styles from './index.module.scss'

export const CONFIG_KEY_SLIDER_HOME = "HOME_SLIDER";
export const CONFIG_KEY_SLIDER_DASHBOARD = "DASHBOARD_SLIDER";

export const Sliders = () => {
    return (
        <div className={`${styles.container}`}>
            <h3>Slider Settings</h3>
            
            <div className={styles.tile}>
                <Form configKey={CONFIG_KEY_SLIDER_HOME} />
            </div>

            <div className={styles.tile}>
                <Form configKey={CONFIG_KEY_SLIDER_DASHBOARD} />
            </div>
        </div>
    )
}
