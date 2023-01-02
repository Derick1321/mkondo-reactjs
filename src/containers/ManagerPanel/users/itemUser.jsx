import React from 'react'
import deleteIcon from '$assets/images/icons/delete.svg';
import editIcon from '$assets/images/icons/edit.svg';
import * as styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../redux/features/modal';

export const ItemUser = (props) => {
    const { user } = props;
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(showModal(
            "FORM_MODAL", {
            noWrapper: true,
            preventOutsideClick: true,
            form: "user-form",
            payload: {
                id: user.user_id,
            }
        }
        ))
    }


    return (
        <div className='col-lg-3 mb-3 align-items-stretch'>
            <div className="card">
                <div className="card-header">

                    <div className={styles.userDetails}>
                        <div className={styles.avatarWrapper}>
                            <img src={user.avatar_url} alt="" />
                        </div>
                    </div>
                    <div className=""></div>


                </div>
                <div className="card-body">
                    <div className={styles.userinfo}>
                        <span><p>User Name: {user.full_name}</p></span>
                        <span><p>Type: {user.user_type}</p></span>
                        <span><p>Email: {user.email}</p></span>
                        <span><p>Phone Number: {user.phone_number}</p></span>

                    </div>

                </div>
                <div className='card-footer'>
                    <button type="button" onClick={handleEdit} className="btn btn-sm btn-outline-info ml-2">Edit</button>

                </div>

            </div>

        </div>
    )
}

