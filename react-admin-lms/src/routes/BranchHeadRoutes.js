import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const BranchHeadDashboard = Loadable(lazy(() => import('views/BranchHead/Dashboard/Index')));
const TeamLead = Loadable(lazy(() => import('views/BranchHead/TeamLead/Index')));
const BD = Loadable(lazy(() => import('views/BranchHead/BD/Index')));
const ClusterLead = Loadable(lazy(() => import('views/BranchHead/ClusterLead/Index')));
const LeadsData = Loadable(lazy(() => import('views/BranchHead/Leads/Index')));
// const Targets = Loadable(lazy(() => import('views/Cluster/Targets/Index')));

// ==============================|| MAIN ROUTING ||============================== //

const ClusterRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard',
            element: <BranchHeadDashboard />
        },
        {
            path: '/team-lead',
            element: <TeamLead />
        },
        {
            path: '/cluster-lead',
            element: <ClusterLead />
        },
        {
            path: '/bd-executive',
            element: <BD />
        },
        {
            path: '/leads',
            element: <LeadsData />
        }
        // {
        //     path: '/assigned-target',
        //     element: <Targets />
        // }
    ]
};

export default ClusterRoutes;
