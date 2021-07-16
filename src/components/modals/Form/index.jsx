import React from 'react'
import { AudioForm } from './AudioForm'
import styles from './index.module.scss'
import { VideoForm } from './VideoForm/index';

export const FormModal = (props) => {
    const { form } = props
    const forms = {
        'audio-form': AudioForm,
        'video-form': VideoForm,
    }

    const Form = forms[form];
    return (
        <div className={styles.wrapper}>
            <div className="d-flex justify-content-center align-items-center h-100">
                <Form {...props} />
            </div>
        </div>
    )
}
