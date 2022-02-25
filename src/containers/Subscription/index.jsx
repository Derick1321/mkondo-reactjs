import React from 'react'
import { Route, Switch } from 'react-router-dom';
import RouteWithSubRoutes from '../../components/common/RouteWithSubRoutes';
import SubscriptionsListContainer from './list';

export const SubscriptionContainer = (props) => {
    const { routes, location } = props;
    return (
        <Switch>
            {routes.map((route,i) => <RouteWithSubRoutes key={i} {...route} />)}
            <Route>
                <SubscriptionsListContainer />
            </Route>
        </Switch>
    );
}
