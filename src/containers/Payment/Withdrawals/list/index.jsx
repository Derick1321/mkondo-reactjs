import React from 'react'
import { useHistory } from 'react-router';
import { routePaths } from '../../../../common/routeConfig';

export const WithdrawalsList = () => {
    
    const { push } = useHistory();

    return (
        <div>
            <h1>Withdrawals List Component</h1>
            <button class="btn btn-primary" onClick={() => push(routePaths.createWithdrawal)}>Create</button>
        </div>
    );
}
