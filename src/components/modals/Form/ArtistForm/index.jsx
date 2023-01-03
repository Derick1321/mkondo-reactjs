import React from 'react'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NewItem from '$components/common/NewItem';
import Button from '$components/common/Button';
import Styles from './../index.module.scss'
import * as styles from './index.module.scss'
import { menus, metamenus } from './menus';
import * as styles from './index.module.scss';
import { getMediaUrl } from '../../../../common/utils';
import { hideModal } from '../../../../redux/features/modal';
import { getArtistById, updateArtist } from '../../../../redux/features/artist';



const initialState = {
    full_name: '',
    genre: '',
    about: '',
    phone_number: '',
    email: '',
    country: '',
    region: '',
    policy: false,
    file: null,
    fb: '',
    yt: '',
    instagram: '',
    twitter: '',
};


const ArtistForm = (props) => {

    const [mounted, setMounted] = useState(false);
    const [values, setValues] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState(null);
    const [mainFields, setMainFields] = useState(menus);
    const [artist, setArtist] = useState({});

    // store

    const history = useHistory();

    ///show model //getArtistById
    const { payload, closeModal } = props;
    const { artistId } = payload;
    const dispatch = useDispatch();


    const token = useSelector(state => state.authentication.token);
    // const addArtistComplete = useSelector((store) => store.artist.addArtistComplete);
    const getArtistByIdState = useSelector((store) => store.artist.getArtistById);
    const adminId = useSelector((store) => store.authentication.user.user_id);
    const updateArtistError = useSelector(state => state.artist.updateArtistError);
    const submitting = useSelector((state) => state.artist.updateArtistPending);
    const updated = useSelector((state) => state.artist.updateArtistComplete);

    useEffect(() => {
        if (!artistId) return;
        dispatch(getArtistById(artistId, token));
    }, [artistId]);

    useEffect(async () => {
        if (!artist) return;
        console.log("Performing instantiation", artist)
        let payload = initialState;
        for (const field in initialState) {
            console.log("field" + field)
            if (field in artist) {
                console.log(`${field} has been detected with value: `, artist[field])
                payload[field] = artist[field]
            }
        }
        setValues(payload);

        //   const res = await handleFetch('GET', `media/presigned-get-url?file_name=${artist.cover_url}`, null, token);
        //    setCoverUrl(res.response);
    }, [artist]);

    useEffect(() => {
        if (!getArtistByIdState.data) return;
        setArtist(getArtistByIdState.data);
    }, [getArtistByIdState.data]);

    useEffect(() => {
        if (!updated) return;
        dispatch(hideModal());
    }, [updated]);

    // effects
    useEffect(() => {
        setMounted(true);
    }, []);



    // useEffect(() => {
    //     console.log("Add Artist Complete Triggered", addArtistComplete);
    //     if (!mounted) return;
    //     if (!addArtistComplete) return;
    //     console.log("Finally Here");
    //     getMediaUrl(values.file, token).then(res => {
    //         history.push(routePaths.success, {
    //             message: 'Congratulations you are all set!',
    //             link: `https//:mkondo.co/app/artist/${newArtistId}`,
    //             country: values.country,
    //             name: values.name,
    //             avatar: res,
    //         });
    //     });
    // }, [addArtistComplete]);

    useEffect(() => {
        if (!updateArtistError) return;
        try {
            json = JSON.parse(updateArtistError.message);
            console.log(json)
            if ("message" in json) {
                console.log("passed", json["message"]);
                setErrorMessage(json["message"]);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 15000);
            }
        } catch (e) {
            console.error(e);
        }
    }, [updateArtistError])

    // handlers
    const handleCancel = () => {
        setValues(initialState);
    };

    const handleUpdate = async () => {
        if (!values.file) {
            alert('No avatar file submitted!');
            return;
        }

        if (!values.policy) {
            alert('You need to accept the terms and conditions before proceeding!');
            return;
        }

        //do some offline validation
        const _clone = [...mainFields];
        var hasErrors = false;
        ['full_name', 'email', 'phone_number', 'genre'].map((v, i) => {
            if (!values[v]) {
                hasErrors = true;
                const index = _clone.findIndex(f => f.name == v);
                if (index > -1) {
                    _clone[index] = { ..._clone[index], error: "Required" };
                }
            }
        });
        setMainFields(_clone);
        if (hasErrors) return;

        dispatch(updateArtist({
            full_name: values.full_name,
            email: values.email,
            phone_number: values.phone_number,
            user_type: 'creator', // shouldn't be necessary
            about: values.about,
            description: values.description,
            country: values.country,
            locality: values.region,
            facebook_link: values.fb,
            instagram_link: values.instagram,
            youtube_link: values.yt,
            twitter_link: values.twitter,
            avatar_url: values.file,
            password: 'Mkondo@123',
            genre: values.genre && values.genre.length ? values.genre.reduce((acc, v) => `${acc}${acc ? ',' : ''}${v.value}`, '') : [],
            admin_id: adminId,
        }));
    };

    const handleChange = (name, value) => {
        setValues({
            ...values,
            [name]: value,
        });
        const index = mainFields.findIndex(f => f.name == name);
        if (index > -1) {
            if (mainFields[index].error) {
                const _cloned = [...mainFields];
                _cloned[index] = { ..._cloned[index], error: null };
                setMainFields(_cloned);
            }
        }
    };
    return (
        < div className={Styles.card}>


            <div className="row justify-content-center">
                <div className="col-12">
                    <div className='text-ligth'>
                        <h2> Update Artist</h2>
                    </div>
                    {getArtistByIdState.loading && <div className="text-light">Loading...</div>}
                    {getArtistByIdState.error && <div className="alert alert-danger">Error: {getArtistByIdState.error}</div>}
                    <div className={`d-flex flex-column`}>
                        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                        <NewItem
                            menus={mainFields}
                            metamenus={metamenus}
                            onChange={handleChange}
                            values={values}
                        />
                        <div className={`d-flex justify-content-end ${styles.newItemFooter}`}>
                            <Button
                                onClick={handleCancel}
                                style={styles.btnCancel}
                                isTransparent
                                isSquare
                            >
                                Cancel
                            </Button>
                            <div className="pt-4"></div>
                            <button className="btn btn-lg btn-success mr-2" onClick={handleUpdate} disabled={submitting}>Update {submitting && <span className="spinner-border"></span>}</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ArtistForm 