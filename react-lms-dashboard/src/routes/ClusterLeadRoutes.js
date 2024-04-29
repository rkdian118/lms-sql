import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
const ManagerDashboard = Loadable(lazy(() => import('views/ClusterLead/NewDashboard/Index')));
const DashboardReport = Loadable(lazy(() => import('views/ClusterLead/NewDashboard/IndexReport')));
const BdTargets = Loadable(lazy(() => import('views/ClusterLead/BdeList/Index')));
const LeadsData = Loadable(lazy(() => import('views/ClusterLead/Leads/Index')));
const MeetingCall = Loadable(lazy(() => import('views/ClusterLead/Meetings/Index')));
const RFPRequest = Loadable(lazy(() => import('views/ClusterLead/RFP/Index')));
const Proposal = Loadable(lazy(() => import('views/ClusterLead/Proposal/Index')));
const DsrReport = Loadable(lazy(() => import('views/ClusterLead/DsrReport/Index')));
const TargetSession = Loadable(lazy(() => import('views/ClusterLead/Targets/Index')));
// const TargetSession = Loadable(lazy(() => import('views/ClusterLead/Targets/BdTargetList')));
// ==============================|| MAIN ROUTING ||============================== //

const ClusterLeadRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/account-setting',
            element: <AccountProfile />
        },
        {
            path: '/dashboard',
            element: <ManagerDashboard />
        },
        {
            path: '/reports',
            element: <DashboardReport />
        },
        {
            path: '/bde-management',
            element: <BdTargets />
        },
        {
            path: '/targets',
            element: <TargetSession />
        },
        {
            path: '/leads',
            element: <LeadsData />
        },
        {
            path: '/meetings',
            element: <MeetingCall />
        },
        {
            path: '/rfp-request',
            element: <RFPRequest />
        },
        {
            path: '/proposal',
            element: <Proposal />
        },
        {
            path: '/dsr-report',
            element: <DsrReport />
        }
    ]
};

export default ClusterLeadRoutes;
