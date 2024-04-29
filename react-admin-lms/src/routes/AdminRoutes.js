import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/Admin/Dashboard/Index')));
const AdminComponent = Loadable(lazy(() => import('views/Admin/AdminCrud/Index')));
const BranchComponent = Loadable(lazy(() => import('views/Admin/Branch/Index')));
const ClusterComponent = Loadable(lazy(() => import('views/Admin/ClusterHead/Index')));
const GeneralComponent = Loadable(lazy(() => import('views/Admin/GeneralManagement/Index')));

// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/admin-management',
            element: <AdminComponent />
        },
        {
            path: '/branch-management',
            element: <BranchComponent />
        },
        {
            path: '/cluster-management',
            element: <ClusterComponent />
        },
        {
            path: '/general-management',
            element: <GeneralComponent />
        }
    ]
};

export default AdminRoutes;
