import React from 'react'
import { Switch, Route } from 'react-router-dom';
import RouteWithSubRoutes from '../../../components/common/RouteWithSubRoutes';

export const WithdrawalsRoutes = (props) => {
    const { routes } = props;

    return (
        <Switch>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
    );
}
