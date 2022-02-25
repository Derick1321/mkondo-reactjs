import React from 'react'
import { Route, Switch } from 'react-router-dom';
import RouteWithSubRoutes from '../../components/common/RouteWithSubRoutes';
import { PaymentMethodsContainer } from './PaymentMethods';

const PaymentContainer = (props) => {
    const { routes, location } = props;
    
    return (
        <Switch>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            <Route>
                <PaymentMethodsContainer />
            </Route>
        </Switch>
    );
}

export default PaymentContainer;