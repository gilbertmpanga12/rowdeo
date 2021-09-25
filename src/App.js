import React, { useEffect } from 'react';
import {
    Switch,
    useLocation
} from 'react-router-dom';

import './css/style.scss';

import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';

//from reactfire
import { AuthProvider, FirestoreProvider, useFirebaseApp, useInitPerformance } from 'reactfire';

//from firebase
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

//from utils/router
import {AuthenticatedRedirect, ProtectedRoute} from './utils/router'

//Route Paths
import {INDEX_PATH, DASHBOARD_PATH, SIGNIN_PATH, SIGNUP_PATH, RESET_PASSWORD_PATH} from './constants/paths';

//View Components
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/dashboard';



function App() {
    const location = useLocation();
   
    const app = useFirebaseApp();
    const auth = getAuth(app);
    //const database = getDatabase(app);
    const firestore = getFirestore(app);

    useInitPerformance(async (firebaseApp) => {
        const { getPerformance } = await import('firebase/performance');
        return getPerformance(firebaseApp);
    });

    useEffect(() => {
        AOS.init({
            once: true,
            disable: 'phone',
            duration: 700,
            easing: 'ease-out-cubic',
        });
    });

    useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto'
        window.scroll({ top: 0 })
        document.querySelector('html').style.scrollBehavior = ''
        focusHandling('outline');
    }, [location.pathname]); // triggered on route change

    return (
        <>
            <AuthProvider sdk={auth}>
                    <FirestoreProvider sdk={firestore}>
                        <Switch>
                            <AuthenticatedRedirect exact path={INDEX_PATH}>
                                <Home />
                            </AuthenticatedRedirect>
                            <AuthenticatedRedirect path={SIGNIN_PATH}>
                                <SignIn />
                            </AuthenticatedRedirect>
                            <AuthenticatedRedirect path={SIGNUP_PATH}>
                                <SignUp />
                            </AuthenticatedRedirect>
                            <AuthenticatedRedirect path={RESET_PASSWORD_PATH}>
                                <ResetPassword />
                            </AuthenticatedRedirect>
                            <ProtectedRoute path={DASHBOARD_PATH}>
                                <Dashboard />
                            </ProtectedRoute>
                        </Switch>
                    </FirestoreProvider>
            </AuthProvider>
        </>
    );
}

export default App;
