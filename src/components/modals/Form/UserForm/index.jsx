

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../../redux/features/user';
import AvatarInput from '../../../common/AvatarInput';
import InputField from '../../../forms/InputField';
import styles from './../index.module.scss';

const initialState = {
    username: '',
    email: '',
    phone_number: '',
    gerne: '',
    description: '',
    fb: '',
    yt: '',
    twitter: '',
    instagram: '',


}


export const UserForm = (props) => {
    const [coverUrl, setCoverUrl] = useState('');
    const [coverImage, setCoverImage] = useState();
    const [values, setValues] = useState(initialState);
    const [user, setUser] = useState({});
    const { payload, closeModel } = props;
    const { userId } = payload;

    const dispatch = useDispatch();
    const getUserByIdState = useSelector(state => state.user.getUser);
    const token = useSelector(state => state.authentication.token);

    useEffect(() => {
        console.log("state   Triggered");
        if (userId) return;
        dispatch(getUser(userId, token));
        console.log("state   Triggered");

    }, [userId])


    useEffect(() => {
        if (!getUserByIdState.data) return;
        setUser(getUserByIdState.data);

    }, [getUserByIdState.data])



    //console.log(userId);
    return (
        <div className={styles.card}>
            <h2 className="text-light">Update User</h2>
            {getUserByIdState.isLoading && <div className="text-light">Loading...</div>}
            {getUserByIdState.error && <div className="alert alert-danger">Error:{getUserByIdState.error.message}</div>}

        </div>
    )
}

