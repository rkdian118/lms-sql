import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
const DashboardDefault = Loadable(lazy(() => import('views/Admin/NewDashboard/Index')));
// const DashboardDefault = Loadable(lazy(() => import('views/Admin/Dashboard/Index')));
const AdminComponent = Loadable(lazy(() => import('views/Admin/AdminCrud/Index')));
const BranchComponent = Loadable(lazy(() => import('views/Admin/Branch/Index')));
const TargetComponent = Loadable(lazy(() => import('views/Admin/BranchTarget/Index')));
const ViewTargets = Loadable(lazy(() => import('views/Admin/BranchTarget/ViewTargets')));
const ClusterComponent = Loadable(lazy(() => import('views/Admin/ClusterHead/Index')));
const CountryLeadComponent = Loadable(lazy(() => import('views/Admin/CountryLead/Index')));
const MasterComponent = Loadable(lazy(() => import('views/Admin/MasterStatus/Index')));
const LeadsData = Loadable(lazy(() => import('views/Admin/Leads/Index')));
// const LeadsData = Loadable(lazy(() => import('views/Admin/LeadList/index')));
const MeetingCall = Loadable(lazy(() => import('views/Admin/Meetings/Index')));
const RFPRequest = Loadable(lazy(() => import('views/Admin/RFP/Index')));
const Proposal = Loadable(lazy(() => import('views/Admin/Proposal/Index')));
const BranchHeadDSR = Loadable(lazy(() => import('views/Admin/DsrReport/BranchHead/BranchHeadDSR')));
const ClusterDSR = Loadable(lazy(() => import('views/Admin/DsrReport/ClusterLead/ClusterDSR')));
const BdeDSR = Loadable(lazy(() => import('views/Admin/DsrReport/BDE/BdeDSR')));
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
            path: '/account-setting',
            element: <AccountProfile />
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/admin-management',
            element: <AdminComponent />
        },
        {
            path: '/branches',
            element: <BranchComponent />
        },
        {
            path: '/branch-target',
            element: <TargetComponent />
        },
        {
            path: '/view-target',
            element: <ViewTargets />
        },
        {
            path: '/cluster-head',
            element: <ClusterComponent />
        },
        {
            path: '/country-lead',
            element: <CountryLeadComponent />
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
            path: '/bh-dsr',
            element: <BranchHeadDSR />
        },
        {
            path: '/cl-dsr',
            element: <ClusterDSR />
        },
        {
            path: '/bde-dsr',
            element: <BdeDSR />
        },
        {
            path: '/master-status',
            element: <MasterComponent />
        }
    ]
};

export default AdminRoutes;
