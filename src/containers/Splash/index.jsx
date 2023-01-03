import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { routePaths } from '$common/routeConfig';

export const SplashPage = () => {
    const { push } = useHistory();

    useEffect(() => {
        push(routePaths.home);
    }, []);
    return <p>redirecting...</p>
}
