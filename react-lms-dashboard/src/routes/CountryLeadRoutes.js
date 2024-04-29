import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
const DashboardDefault = Loadable(lazy(() => import('views/CountryLead/Dashboard/Index')));
const LeadsData = Loadable(lazy(() => import('views/CountryLead/Leads/Index')));
// const DashboardDefault = Loadable(lazy(() => import('views/CountryLead/Dashboard/Index')));
const MeetingCall = Loadable(lazy(() => import('views/CountryLead/Meetings/Index')));
const RFPRequest = Loadable(lazy(() => import('views/CountryLead/RFP/Index')));
const Proposal = Loadable(lazy(() => import('views/CountryLead/Proposal/Index')));
// ==============================|| MAIN ROUTING ||============================== //

const CountryLeadRoutes = {
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
            element: <DashboardDefault />
        },
        {
            path: '/leads',
            element: <LeadsData />
        },
        // {
        //     path: '/duplicate-leads',
        //     element: <DuplicateLeads />
        // },
        // {
        //     path: '/transfered-leads',
        //     element: <TransferedLeads />
        // },
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
        }
        // {
        //     path: '/bh-dsr',
        //     element: <BranchHeadDSR />
        // },
        // {
        //     path: '/cl-dsr',
        //     element: <ClusterDSR />
        // },
        // {
        //     path: '/bde-dsr',
        //     element: <BdeDSR />
        // }
    ]
};

export default CountryLeadRoutes;
