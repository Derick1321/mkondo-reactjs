import React from 'react'
import { useHistory } from 'react-router';
import { routePaths } from '../../../../common/routeConfig';
import * as styles from './index.module.scss';
export const WithdrawalsList = () => {

    const { push } = useHistory();

    return (
        <div className={` container ${styles.container}`}>
            <button className="btn btn-primary" onClick={() => push(routePaths.createWithdrawal)}>Create</button>
            <h2 className='text-light'>Withdrawals List</h2>
            <div className='row'>
            </div>
        </div>
    );
}
