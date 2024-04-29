import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const ManagerDashboard = Loadable(lazy(() => import('views/Manager/Dashboard/Index')));
const BdTargets = Loadable(lazy(() => import('views/Manager/BdTargets/Index')));
// ==============================|| MAIN ROUTING ||============================== //

const ManagerRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard',
            element: <ManagerDashboard />
        },
        {
            path: '/bd-targets',
            element: <BdTargets />
        }
    ]
};

export default ManagerRoutes;
