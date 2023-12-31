import React from 'react'
import ArtistForm from './ArtistForm';
import AlbumForm from './Album';
import { AudioForm } from './AudioForm'
import styles from './index.module.scss'
import { MovieForm } from './MovieForm';
import { UserForm } from './UserForm';
import { VideoForm } from './VideoForm/index';
import SeriesForm from './SeriesForm/index';



export const FormModal = (props) => {
    const { form } = props
    const forms = {
        'audio-form': AudioForm,
        'video-form': VideoForm,
        'movie-form': MovieForm,
        'user-form': UserForm,
        'artist-form': ArtistForm,
        'album-form': AlbumForm,
        'series-form': SeriesForm,
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
