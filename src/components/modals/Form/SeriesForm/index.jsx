import React from 'react'
import { useState } from 'react';
import { movieGenres } from '../../../../common/utils';
import { CoverInputComponent, VideoInputComponent } from '../../../../containers/Media/NewSeries';
import InputField from '../../../forms/InputField';
import parentStyle from './../index.module.scss'
import styles from './index.module.scss'

const initialState = {}

const SeriesForm = (props) => {
    const { payload: data, closeModal } = props;

    // state
    const [payload, setPayload] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [submitting, setSubmitting] = useState(false);


    // handlers
    const handleChange = (name, value) => {
        // name is genres
        if (name === 'genres') {
            setSelectedGenres(value);
            setPayload({ ...payload, [name]: value.map(option => option.value) });
            return;
        }
        setPayload({ ...payload, [name]: value });
    }

    const handleUpdate = () => {

    }

    return (
        <div className={parentStyle.card}>
            <h1>Update Series</h1>
            {Object.keys(payload).map((key) => {
                return (
                    <div className="d-flex">
                        <div className="mr-2">{key}</div>
                        <div>{payload[key]}</div>
                    </div>
                );
            })}
            <div className="d-flex">
                <div className={`${styles.cover} mr-2`}>
                    <CoverInputComponent name="cover_url"  onChange={handleChange} /> 
                </div>
                <div className="flex-grow-1">
                    <VideoInputComponent name="trailer_url" onChange={handleChange} />
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-lg-12">
                <InputField field={{ 
                        type: "text",
                        name: "title",
                        title: "Title",
                        placeholder: "Series Title",
                        value: payload.title,
                    }} error={fieldErrors.title} onChange={handleChange} />
                    <InputField field={{ 
                        name: 'genres',
                        type: 'select',
                        placeholder: 'Enter Genre',
                        title: 'Genre',
                        options: movieGenres,
                        isMulti: true,
                        value: selectedGenres,
                     }} error={fieldErrors.genres}  onChange={handleChange} />
                    <InputField field={{ 
                        type: "area", 
                        name: "description",
                        title: "Description", 
                        placeholder: "Brief about the series you are uploading.",
                        value: payload.description,
                    }}  onChange={handleChange} error={fieldErrors.description} isGrey={true} />
                </div>
            </div>

            <div className="row">
                    <div className="col-md-auto ml-auto">
                        <button className="btn btn-lg btn-primary mr-2" onClick={handleUpdate} disabled={submitting}>Update {submitting && <span className="spinner-border"></span>}</button>
                        <button className="btn btn-lg btn-outline-primary" onClick={closeModal}>Close</button>
                    </div>
                </div>
        </div>
    );
}

export default SeriesForm;