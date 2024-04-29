import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import ErrorBoundary from './ErrorBoundary';

// dashboard routing
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
// const DashboardDefault = Loadable(lazy(() => import('views/BD/Dashboard/Index')));
const DashboardDefault = Loadable(lazy(() => import('views/BD/NewDashboard/Index')));
const DashboardReport = Loadable(lazy(() => import('views/BD/NewDashboard/IndexReport')));
const LeadsData = Loadable(lazy(() => import('views/BD/Leads/Index')));
const DsrReport = Loadable(lazy(() => import('views/BD/DsrReport/Index')));
const MeetingCall = Loadable(lazy(() => import('views/BD/Meetings/Index')));
const RFPRequest = Loadable(lazy(() => import('views/BD/RFP/Index')));
const Proposal = Loadable(lazy(() => import('views/BD/Proposal/Index')));
const TargetSession = Loadable(lazy(() => import('views/BD/Targets/Index')));
// ==============================|| MAIN ROUTING ||============================== //

const BusinessRoutes = {
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
            element: <DashboardDefault />,
            errorElement: <ErrorBoundary />
        },
        {
            path: '/reports',
            element: <DashboardReport />
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

export default BusinessRoutes;
