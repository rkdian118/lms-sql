import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const AccountProfile = Loadable(lazy(() => import('views/pages/authentication/AccountProfile/Index')));
const BranchHeadDashboard = Loadable(lazy(() => import('views/BranchHead/Dashboard/Index')));
const TeamLead = Loadable(lazy(() => import('views/BranchHead/TeamLead/Index')));
const BD = Loadable(lazy(() => import('views/BranchHead/BD/Index')));
const ClusterLead = Loadable(lazy(() => import('views/BranchHead/ClusterLead/Index')));
const LeadsData = Loadable(lazy(() => import('views/BranchHead/Leads/Index')));
const DuplicateLeads = Loadable(lazy(() => import('views/BranchHead/DuplicateLeads/Index')));
const TransferedLeads = Loadable(lazy(() => import('views/BranchHead/TransferedLeads/Index')));
// const Targets = Loadable(lazy(() => import('views/Cluster/Targets/Index')));
const ViewTargets = Loadable(lazy(() => import('views/BranchHead/Targets/ViewTargets')));
const BdTargetList = Loadable(lazy(() => import('views/BranchHead/Targets/BdTargetList')));
const MeetingCall = Loadable(lazy(() => import('views/BranchHead/Meetings/Index')));
const RFPRequest = Loadable(lazy(() => import('views/BranchHead/RFP/Index')));
const Proposal = Loadable(lazy(() => import('views/BranchHead/Proposal/Index')));
const BranchHeadDSR = Loadable(lazy(() => import('views/BranchHead/DsrReport/BranchHead/BranchHeadDSR')));
const ClusterDSR = Loadable(lazy(() => import('views/BranchHead/DsrReport/ClusterLead/ClusterDSR')));
const BdeDSR = Loadable(lazy(() => import('views/BranchHead/DsrReport/BDE/BdeDSR')));

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
            path: '/account-setting',
            element: <AccountProfile />
        },
        {
            path: '/dashboard',
            element: <BranchHeadDashboard />
        },
        // {
        //     path: '/team-lead',
        //     element: <TeamLead />
        // },
        {
            path: '/view-target',
            element: <ViewTargets />
        },
        {
            path: '/assigned-target',
            element: <BdTargetList />
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
        },
        {
            path: '/duplicate-leads',
            element: <DuplicateLeads />
        },
        {
            path: '/transfered-leads',
            element: <TransferedLeads />
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
        }
        // {
        //     path: '/assigned-target',
        //     element: <Targets />
        // }
    ]
};

export default ClusterRoutes;
