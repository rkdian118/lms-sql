import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 1 routing
// const AuthLogin1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login1'
            // element: <AuthLogin1 />
        }
    ]
};

export default AuthenticationRoutes;
