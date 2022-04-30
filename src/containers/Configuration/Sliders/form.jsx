import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConfigurations, selectConfigurationByKey, selectConfigurations, storeConfiguration, updateConfiguration } from '../../../redux/features/configuration'
import slider, { fetchSliders, selectAllSliders } from '../../../redux/features/slider'
import styles from './index.module.scss';

export const Form = (props) => {
    //props
    const { configKey } = props;

    const [payload, setPayload] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const slider = useSelector(state => state.slider)
    const configuration = useSelector(state => state.configuration)
    const slider_setting = useSelector(state => selectConfigurationByKey(state, configKey))
    
    const dispatch = useDispatch()

    useEffect(() => {
        if (!slider.data.length && slider.status === 'idle') {
            dispatch(fetchSliders())
        }
    }, [slider])

    useEffect(() => {
        if (configuration.status === 'idle') {
            dispatch(fetchConfigurations())
        }
    }, [configuration])

    useEffect(() => {
        if (slider_setting) {
            setPayload(slider_setting.value)
        }
    }, [slider_setting])

    const handleChange = e => setPayload(e.target.value)

    const handleSave = async () => {
        setSubmitting(false)
        try {
            if (slider_setting) {
                // the configuration already exists so update it
                const _payload = {
                    id: slider_setting.configuration_id,
                    data: {
                        value: payload
                    }
                }
                const resultAction = await unwrapResult(dispatch(updateConfiguration(_payload)))
            } else {
                // the configuration does not exist so create it
                const _payload = {
                    key: configKey,
                    value: payload
                }
                const resultActon = await unwrapResult(dispatch(storeConfiguration(_payload)))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="row">
            <div className="col">
                <h4 className={styles.capitalize}>{configKey.split('_').join(' ').toLowerCase()}</h4>
            </div>
            <div className="col">
                {slider_setting ? <span>Setting Found</span> : <span>Unknown</span>}
            </div>
            <div className="col">
                <p>Select Slider</p>
                {slider.status === 'loading' ? <p>Loading...</p> : (
                    <select value={payload} onChange={handleChange}>
                        <option value="">Choose...</option>
                        {slider.data.map(item => <option key={item.slider_id} value={item.slider_id}>{item.name}</option>)}
                    </select>
                )}
            </div>
            <div className="col">
                <button onClick={handleSave} disabled={submitting}>Save</button>
            </div>
        </div>
    )
}
