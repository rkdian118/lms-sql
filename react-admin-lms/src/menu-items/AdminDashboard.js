// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconBuildingArch,
    IconBuildingCommunity,
    IconTower,
    IconHistory,
    IconChartInfographic
} from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconBuildingArch,
    IconBuildingCommunity,
    IconTower,
    IconHistory,
    IconChartInfographic
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const AdminDashboard = {
    id: 'dashboard',
    // title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'Dashboard',
            title: <FormattedMessage id="Dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'adminManagement',
            title: <FormattedMessage id="Admin Management" />,
            type: 'item',
            url: '/admin-management',
            icon: icons.IconBuildingArch,
            breadcrumbs: false
        },
        {
            id: 'branchManagement',
            title: <FormattedMessage id="Branch Management" />,
            type: 'item',
            url: '/branch-management',
            icon: icons.IconBuildingCommunity,
            breadcrumbs: false
        },
        {
            id: 'clusterHeadManagement',
            title: <FormattedMessage id="Cluster Management" />,
            type: 'item',
            url: '/cluster-management',
            icon: icons.IconTower,
            breadcrumbs: false
        },
        {
            id: 'reportManagement',
            title: <FormattedMessage id="Report Management" />,
            type: 'item',
            url: '#',
            icon: icons.IconChartInfographic,
            breadcrumbs: false
        },
        {
            id: 'viewHistory',
            title: <FormattedMessage id="View History" />,
            type: 'item',
            url: '#',
            icon: icons.IconHistory,
            breadcrumbs: false
        },
        {
            id: 'generalManagement',
            title: <FormattedMessage id="General Management" />,
            type: 'item',
            url: '/general-management',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
            // children: [
            //     {
            //         id: 'posts',
            //         title: <FormattedMessage id="social-profile" />,
            //         type: 'item',
            //         url: '#'
            //     },
            //     {
            //         id: 'posts',
            //         title: <FormattedMessage id="social-profile" />,
            //         type: 'item',
            //         url: '#'
            //     },
            //     {
            //         id: 'posts',
            //         title: <FormattedMessage id="social-profile" />,
            //         type: 'item',
            //         url: '#'
            //     },
            //     {
            //         id: 'posts',
            //         title: <FormattedMessage id="social-profile" />,
            //         type: 'item',
            //         url: '#'
            //     }
            // ]
        }
    ]
};

export default AdminDashboard;
