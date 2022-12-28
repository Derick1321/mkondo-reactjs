import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as styles from './index.module.scss';
import { ItemUser } from './itemUser';

import { getUserMore } from '../../../redux/features/user';


export const ManageUsers = () => {
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.user.getUsers.pagination);

    const handleMore = () => {
        dispatch(getUserMore());

    }
    const users = useSelector((state) => state.user.users.data);
    const userList = users.map((user) => <ItemUser key={user.user_id} user={user} />);
    //console.log("users " + users.length);
    const { goBack } = useHistory();
    return (
        <div className={`${styles.container} container`}>
            <button className='btn btn-primary' onClick={() => goBack()}>Back</button>
            <h2 className='text-light'>Manage Users</h2>
            <div className='row'>

                {userList}

            </div>
            <div className="mt-2 mb-5">
                <button className="btn btn-lg btn-primary" onClick={handleMore} disabled={!pagination.hasNext} >Load More</button>
            </div>
        </div>
    )
}

