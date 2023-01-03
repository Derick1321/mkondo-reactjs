

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetch } from '../../../../common/requestUtils';
import { generatePreview, genres } from '../../../../common/utils';
import { hideModal } from '../../../../redux/features/croptool';
import { saveMedia } from '../../../../redux/features/media';
import { getUser, updateUser } from '../../../../redux/features/user';
import AvatarInput from '../../../common/AvatarInput';
import InputField from '../../../forms/InputField';
import styles from './../index.module.scss';





const initialState = {
    full_name: '',
    email: '',
    phone_number: '',
    gerne: '',
    description: '',
    facebook_link: '',
    youtube_link: '',
    twitter_link: '',
    instagram_link: '',


}


export const UserForm = (props) => {
    const { payload, closeModal } = props;
    const { id } = payload;

    const [coverUrl, setCoverUrl] = useState('');
    const [coverImage, setCoverImage] = useState();
    const [values, setValues] = useState(initialState);
    const [user, setUser] = useState({});

    const dispatch = useDispatch();
    const getUserByIdState = useSelector(state => state.user.getUser);
    const token = useSelector(state => state.authentication.token);
    const updated = useSelector(state => state.user.updateUserComplete);
    const submitting = useSelector(state => state.user.updateUserPending);

    useEffect(() => {
        console.log("state   Triggered", id);
        if (!id) return;
        dispatch(getUser({ id: id }));
    }, [id])
    useEffect(async () => {
        if (!user) return;
        console.log(" instantiation user values:", user)
        let payload = initialState;
        for (const field in initialState) {
            console.log(field)
            if (field in user) {
                console.log(`${field} has been detected with value: `, user[field])
                payload[field] = user[field]
            }
        }
        setValues(payload);
        console.log(payload);
        //console.log(updated);

        const res = await handleFetch('GET', `media/presigned-get-url?file_name=${user.cover_url}`, null, token);
        setCoverUrl(res.response);
    }, [user]);

    useEffect(() => {
        if (!updated) return;
        dispatch(hideModal());
    }, [updated]);


    useEffect(() => {
        if (!getUserByIdState.data) return;
        setUser(getUserByIdState.data.user);
        console.log("Iam setting user data:" + getUserByIdState.data.user);

    }, [getUserByIdState.data])

    const handleChange = (name, value) => {
        console.log('Handle change called: ', name, value)
        if (name in values) {
            if (name === 'genres') {
                setValues({ ...values, 'genres': value.map((val) => val.value) })
                return;
            }
            setValues({ ...values, [name]: value });
            console(setValues({ ...values, [name]: value }));
        }
    }

    const handleUpdate = async () => {
        //handle upload
        let payload = values;
        if (coverImage) {
            let response = await dispatch(saveMedia(coverImage))
            payload['cover_url'] = response.payload
        }

        dispatch(updateUser({
            id: user.user_id,
            payload: payload,
        }));
        console.log(payload);
    }

    const handleFileChange = async (files) => {
        let url = await generatePreview(files[0])
        setCoverUrl(url);
        setCoverImage(files[0]);
    }





    //console.log(userId);
    return (
        <div className={styles.card}>
            <h2 className="text-light">Update User</h2>
            {getUserByIdState.isLoading && <div className="text-light">Loading...</div>}
            {getUserByIdState.error && <div className="alert alert-danger">Error:{getUserByIdState.error.message}</div>}
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className={styles.avatarInputWrapper}>
                        <AvatarInput url={coverUrl} onChange={handleFileChange} />
                    </div>
                </div>
                <div className="col-md-8">
                    <InputField field={{
                        name: 'full_name',
                        type: 'text',
                        placeholder: 'Username',
                        title: 'User Name',
                        value: values.full_name,
                    }} onChange={handleChange} />
                    <InputField field={{
                        name: 'email',
                        type: 'text',
                        placeholder: 'Email Address',
                        title: 'Email Address',
                        value: values.email,
                    }} onChange={handleChange} />
                    <InputField field={{
                        name: 'phone_number',
                        type: 'number',
                        placeholder: 'Phone Number',
                        title: 'Phone Number',
                        value: values.phone_number,
                    }} onChange={handleChange} />
                    <InputField field={{
                        name: 'genres',
                        type: 'select',
                        placeholder: 'Select Genre',
                        title: 'Genre',
                        options: genres,
                        isMulti: true,
                        // value: genres.filter((genre) => values.genres.includes(genre.value))
                    }} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <InputField
                        field={{
                            name: 'description',
                            type: 'area',
                            placeholder: '',
                            title: 'Description',
                            value: values.description
                        }}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                {usermeta.map((meta) => (
                    <div className="col-md-4">
                        <InputField field={{ ...meta, value: values[meta.name] }} onChange={handleChange} />
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col-md-auto ml-auto">
                    <button className="btn btn-lg btn-primary mr-2" onClick={handleUpdate} disabled={submitting}>Update {submitting && <span className="spinner-border"></span>}</button>
                    <button className="btn btn-lg btn-outline-primary" onClick={closeModal}>Close</button>
                </div>
            </div>



        </div>
    )
}

export const usermeta = [
    { name: 'facebook_link', type: 'text', placeholder: 'facebook link', title: 'Facebook' },
    { name: 'youtube_link', type: 'text', placeholder: 'youtube link', title: 'Youtube' },
    { name: 'instagram_link', type: 'text', placeholder: 'instagram link', title: 'Instagram' },
    { name: 'twitter_link', type: 'text', placeholder: 'twitter link', title: 'Twitter' },

];