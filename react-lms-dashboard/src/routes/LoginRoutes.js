import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));
const CodeVerification3 = Loadable(lazy(() => import('views/pages/authentication/authentication1/CodeVerification1')));
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: '/login/verification',
            element: <CodeVerification3 />
        },
        {
            path: '*',
            element: <AuthLogin />
        }
        // {
        //     path: '/account-setting',
        //     element: <AccountProfile />
        // }
    ]
};

export default LoginRoutes;
