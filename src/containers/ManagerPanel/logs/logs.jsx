import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { retrieveMedia } from '../../../redux/features/media';
import { useSelector } from 'react-redux';
import * as styles from './index.module.scss';
import { useState } from 'react';
import { formatDate } from '$common/utils';
import { getFormattedDateTime, getFormattedDateTimeWithRelativity } from '../../../common/utils';

export const MediaOptimizationLogs = () => {
    // router
    const history = useHistory();
    const { media_id } = useParams();

    // state
    const [showVideoSteps, setShowVideoSteps] = useState(false);
    const [showAudioSteps, setShowAudioSteps] = useState(false);
    const [showImageSteps, setShowImageSteps] = useState(false);

    // redux
    const dispatch = useDispatch();
    const retrieveMediaState = useSelector(state => state.media.retrieveMedia);

    // effect
    useEffect(() => {
        if (!media_id) return;
        dispatch(retrieveMedia(media_id));
        const intervalId = setInterval(() => {
            if (!retrieveMediaState.loading) {
                dispatch(retrieveMedia(media_id));
            }
        }, 5000);
        return () => {
            console.log('cleanup');
            clearInterval(intervalId);
        } 
    }, [media_id]);

    // helpers
    const getTextColor = (status) => {
        switch (status) {
            case 'done':
                return 'text-success';
            case 'failed':
                return 'text-danger';
            case 'pending':
                return 'text-warning';
            default:
                return 'text-primary';
        }
    }

    const calculateProgress = (steps, inParcentage = false) => {
        const total = steps.length
        const done = steps.filter(step => ['done', 'failed'].includes(step.status)).length
        if (inParcentage) {
            return `${((done/total) * 100)}%`;
        }
        return `${done}/${total}`;
    }

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-12">
                    <button onClick={() => history.goBack()} className="btn btn-primary mb-2">Back</button>
                </div>
            </div>

            <div className="row">
                {/* <div className="col-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <h3 className='cart-title'>Media Details</h3>
                            <table>
                                <tr>
                                    <th>Cover Image</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Media Info</th>
                                    <td></td> 
                                </tr>
                            </table>
                        </div>
                    </div>
                </div> */}

                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <h3 className='cart-title flex-grow-1'>Logs</h3>
                                {retrieveMediaState.loading ? <span className='spinner-border spinner-border-lg'></span> : null}
                            </div>
                            {retrieveMediaState.error ? <span className='text-danger'>Error</span> : null}
                                {retrieveMediaState.data?.media.media_processing ? <span className='text-success'>PROCESS EXISTS</span> : <span>No background process detected.</span>}

                                {retrieveMediaState.data?.media.media_processing && (
                                    <div className='mt-3'>
                                        <h5 className='text-dark'>GENERAL INFO</h5>
                                        <hr />
                                        <table className='table'>
                                            <tr>
                                                <th width="300px">MEDIA ID</th>
                                                <td>{retrieveMediaState.data?.media.media_processing.media_id}</td>
                                            </tr>
                                            <tr>
                                                <th>CATEGORY</th>
                                                <td>{retrieveMediaState.data?.media.media_processing.category}</td>
                                            </tr>
                                            <tr>
                                                <th>MEDIA PROCESSING STATUS</th>
                                                <td className={getTextColor(retrieveMediaState.data?.media.media_processing.status)}>{retrieveMediaState.data?.media.media_processing.status}</td>
                                            </tr>
                                            <tr>
                                                <th>STARTED AT</th>
                                                <td>{getFormattedDateTimeWithRelativity(retrieveMediaState.data?.media.media_processing.started_at)}</td>
                                            </tr>
                                            <tr>
                                                <th>FINISHED AT</th>
                                                <td>{getFormattedDateTimeWithRelativity(retrieveMediaState.data?.media.media_processing.finished_at)}</td>
                                            </tr>
                                            <tr>
                                                <th>HAS ERRORS</th>
                                                <td className={retrieveMediaState.data?.media.media_processing.has_errors ? 'text-danger' : 'text-success'}>{retrieveMediaState.data?.media.media_processing.has_errors ? 'YES' : 'NO'}</td>
                                            </tr>
                                        </table>
                                    </div>
                                )}

                                {retrieveMediaState.data?.media.media_processing && ['video', 'movie', 'episode'].includes(retrieveMediaState.data?.media.media_processing.category)  && (
                                    <div className='mt-5 table-responsive'>
                                        <h5 className='text-dark'>VIDEO PROCESSING</h5>
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" ariaValuenow="75" ariaValuemin="0" ariaValuemax="100" style={{ width: calculateProgress(retrieveMediaState.data?.media.media_processing['video_processing'].steps, true) }}></div>
                                        </div>
                                        <hr />
                                        <table className='table'>
                                            <tr>
                                                <th width="300px">PROCESSING STATUS</th>
                                                <td className={getTextColor(retrieveMediaState.data?.media.media_processing['video_processing'].status)}>{retrieveMediaState.data?.media.media_processing['video_processing'].status}</td>
                                            </tr>
                                            <tr>
                                                <th>STARTED AT</th>
                                                <td>{getFormattedDateTimeWithRelativity(retrieveMediaState.data?.media.media_processing['video_processing'].started_at)}</td>
                                            </tr>
                                            <tr>
                                                <th>FINISHED AT</th>
                                                <td>{getFormattedDateTimeWithRelativity(retrieveMediaState.data?.media.media_processing['video_processing'].finished_at)}</td>
                                            </tr>
                                            <tr>
                                                <th>HAS ERRORS</th>
                                                <td className={retrieveMediaState.data?.media.media_processing['video_processing'].has_errors ? 'text-danger' : 'text-success'}>{retrieveMediaState.data?.media.media_processing['video_processing'].has_errors ? 'YES' : 'NO'}</td>
                                            </tr>
                                            <tr>
                                                <th>PROGRESS</th>
                                                <td>{calculateProgress(retrieveMediaState.data?.media.media_processing['video_processing'].steps)} <button className="btn btn-sm btn-outline-primary" onClick={() => setShowVideoSteps(true)}>logs</button></td>
                                            </tr>
                                        </table>

                                        <div className={`${styles.modal} table-responsive`} style={{ display: showVideoSteps ? 'block' : 'none' }}>
                                            <div className={styles.body}>
                                                <div className="d-flex">
                                                    <div className="flex-grow-1"></div>
                                                    <button className="btn btn-warning" onClick={() => setShowVideoSteps(false)}>X</button>
                                                </div>
                                                <h5 className='text-dark'>VIDEO PROCESSING STEPS</h5>
                                                <hr />
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>S/N</th>
                                                            <th>STEP</th>
                                                            <th>STATUS</th>
                                                            <th style={{whiteSpace: 'nowrap'}}>STARTED AT</th>
                                                            <th style={{whiteSpace: 'nowrap'}}>FINISHED AT</th>
                                                            <th style={{whiteSpace: 'nowrap'}}>ERRORS</th>
                                                            <th>RESULTS</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {retrieveMediaState.data?.media.media_processing['video_processing'].steps.map((step, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{step.description}</td>
                                                                <td className={getTextColor(step.status)}>{step.status}</td>
                                                                <td>{getFormattedDateTimeWithRelativity(step.started_at)}</td>
                                                                <td>{getFormattedDateTimeWithRelativity(step.finished_at)}</td>
                                                                <td className={step.has_errors ? 'text-danger' : 'text-success'}>{step.has_errors ? 'YES' : 'NO'}</td>
                                                                <td>{step.result_description}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {retrieveMediaState.data?.media.media_processing && ['audio'].includes(retrieveMediaState.data?.media.media_processing.category)  && (
                                    <div className='mt-5'>
                                        <h5 className='text-dark'>AUDIO PROCESSING</h5>
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" ariaValuenow="75" ariaValuemin="0" ariaValuemax="100" style={{ width: calculateProgress(retrieveMediaState.data?.media.media_processing['audio_processing'].steps, true) }}></div>
                                        </div>
                                        <hr />
                                        <table className='table'>
                                            <tr>
                                                <th width="300px">PROCESSING STATUS</th>
                                                <td className={getTextColor(retrieveMediaState.data?.media.media_processing['audio_processing'].status)}>{retrieveMediaState.data?.media.media_processing['audio_processing'].status}</td>
                                            </tr>
                                            <tr>
                                                <th>STARTED AT</th>
                                                <td>{getFormattedDateTimeWithRelativity(retrieveMediaState.data?.media.media_processing['audio_processing'].started_at)}</td>
                                            </tr>
                                            <tr>
                                                <th>FINISHED AT</th>
                                                <td>{getFormattedDateTimeWithRelativity(retrieveMediaState.data?.media.media_processing['audio_processing'].finished_at)}</td>
                                            </tr>
                                            <tr>
                                                <th>HAS ERRORS</th>
                                                <td className={retrieveMediaState.data?.media.media_processing['audio_processing'].has_errors ? 'text-danger' : 'text-success'}>{retrieveMediaState.data?.media.media_processing['audio_processing'].has_errors ? 'YES' : 'NO'}</td>
                                            </tr>
                                            <tr>
                                                <th>PROGRESS</th>
                                                <td>{calculateProgress(retrieveMediaState.data?.media.media_processing['audio_processing'].steps)} <button className="btn btn-sm btn-outline-primary" onClick={() => setShowAudioSteps(true)}>logs</button></td>
                                            </tr>
                                        </table>

                                        <div className={`${styles.modal} table-responsive`} style={{ display: showAudioSteps ? 'block' : 'none' }}>
                                            <div className={styles.body}>
                                                <div className="d-flex">
                                                    <div className="flex-grow-1"></div>
                                                    <button className="btn btn-warning" onClick={() => setShowAudioSteps(false)}>X</button>
                                                </div>
                                                <h5 className='text-dark'>AUDIO PROCESSING STEPS</h5>
                                                <hr />
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>S/N</th>
                                                            <th>STEP</th>
                                                            <th>STATUS</th>
                                                            <th style={{whiteSpace: 'nowrap'}}>STARTED AT</th>
                                                            <th style={{whiteSpace: 'nowrap'}}>FINISHED AT</th>
                                                            <th style={{whiteSpace: 'nowrap'}}>ERRORS</th>
                                                            <th>RESULTS</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {retrieveMediaState.data?.media.media_processing['audio_processing'].steps.map((step, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{step.description}</td>
                                                                <td className={getTextColor(step.status)}>{step.status}</td>
                                                                <td>{getFormattedDateTimeWithRelativity(step.started_at)}</td>
                                                                <td>{getFormattedDateTimeWithRelativity(step.finished_at)}</td>
                                                                <td className={step.has_errors ? 'text-danger' : 'text-success'}>{step.has_errors ? 'YES' : 'NO'}</td>
                                                                <td>{step.result_description}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {retrieveMediaState.data?.media.media_processing  && (
                                    <div className='mt-5'>
                                        <h5 className='text-dark'>IMAGE PROCESSING</h5>
                                        <div class="progress">
                                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" ariaValuenow="75" ariaValuemin="0" ariaValuemax="100" style={{ width: calculateProgress(retrieveMediaState.data?.media.media_processing['image_processing'].steps, true) }}></div>
                                        </div>
                                        <hr />
                                        <table className='table'>
                                            <tr>
                                                <th width="300px">IMAGE PROCESSING STATUS</th>
                                                <td className={getTextColor(retrieveMediaState.data?.media.media_processing['image_processing'].status)}>{retrieveMediaState.data?.media.media_processing['image_processing'].status}</td>
                                            </tr>
                                            <tr>
                                                <th>STARTED AT</th>
                                                <td>{retrieveMediaState.data?.media.media_processing['image_processing'].started_at}</td>
                                            </tr>
                                            <tr>
                                                <th>FINISHED AT</th>
                                                <td>{retrieveMediaState.data?.media.media_processing['image_processing'].finished_at}</td>
                                            </tr>
                                            <tr>
                                                <th>HAS ERRORS</th>
                                                <td className={retrieveMediaState.data?.media.media_processing['image_processing'].has_errors ? 'text-danger' : 'text-success'}>{retrieveMediaState.data?.media.media_processing['image_processing'].has_errors ? 'YES' : 'NO'}</td>
                                            </tr>
                                            <tr>
                                                <th>PROGRESS</th>
                                                <td>
                                                    {calculateProgress(retrieveMediaState.data?.media.media_processing['image_processing'].steps)} <button className="btn btn-sm btn-outline-primary" onClick={() => setShowImageSteps(true)}>Logs</button>
                                                </td>
                                            </tr>
                                        </table>

                                        <div className={`${styles.modal} table-responsive`} style={{ display: showImageSteps ? 'block' : 'none' }}>
                                            <div className={styles.body}>
                                                <div className="d-flex">
                                                    <div className="flex-grow-1"></div>
                                                    <button className="btn btn-warning" onClick={() => setShowImageSteps(false)}>X</button>
                                                </div>
                                            <h5 className='text-dark'>IMAGE PROCESSING STEPS</h5>
                                            <hr />
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>S/N</th>
                                                        <th>STEP</th>
                                                        <th>STATUS</th>
                                                        <th style={{whiteSpace: 'nowrap'}}>STARTED AT</th>
                                                        <th style={{whiteSpace: 'nowrap'}}>FINISHED AT</th>
                                                        <th style={{whiteSpace: 'nowrap'}}>ERRORS</th>
                                                        <th>RESULTS</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {retrieveMediaState.data?.media.media_processing['image_processing'].steps.map((step, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{step.description}</td>
                                                            <td className={getTextColor(step.status)}>{step.status}</td>
                                                            <td>{getFormattedDateTimeWithRelativity(step.started_at)}</td>
                                                            <td>{getFormattedDateTimeWithRelativity(step.finished_at)}</td>
                                                            <td className={step.has_errors ? 'text-danger' : 'text-success'}>{step.has_errors ? 'YES' : 'NO'}</td>
                                                            <td>{step.result_description}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
