import React from 'react'
import { Route, Switch } from 'react-router-dom';
import RouteWithSubRoutes from '../../../components/common/RouteWithSubRoutes';
import { MoneyWithdrawContanier } from './withdraw';

export const CreateWithDrawMethod = (props) => {
    const { routes, location } = props;

    return (
        <Switch>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            <Route>
                <MoneyWithdrawContanier />
            </Route>
        </Switch>
    );

}
