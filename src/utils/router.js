import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {SIGNIN_PATH, DASHBOARD_PATH } from '../constants/paths';
import { useSigninCheck } from 'reactfire';

/**
 * Checks if authentication is valid: If authentication is true, the children elements are rendered. 
 * Or else the user is redirected to sigin path.
 * @param {*} children - JSX child element(s) that will be rendered if condition passes
 * @param { Object } rest - Props and other stuff
 */
export const ProtectedRoute = ({ children, ...rest }) => {
    const { status, data: signInCheckResult } = useSigninCheck();
    return (
        <Route
            {...rest}
            render={
                () => {
                       if( status === 'laoding') return <div>Loading...</div>
                       return signInCheckResult.signedIn ? children : <Redirect to={SIGNIN_PATH}/>
                }
            }
        />
    )
}

/**
 * Checks if authentication is valid: If authentication is true, User is redirected to dashboard. 
 * @param {*} children - JSX child element(s) that will be rendered if condition passes
 * @param { Object } rest - Props and other stuff
 */
export const AuthenticatedRedirect = ({ children, ...rest }) => {
    const { status, data: signInCheckResult } = useSigninCheck();
    return (
        <Route
            {...rest}
            render={
                () => {
                      if(status === 'loading') return <div>Loading...</div>
                     return signInCheckResult.signedIn ? <Redirect to={DASHBOARD_PATH} /> : children
                }
            }
        />
    )
}