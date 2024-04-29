// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconTargetArrow, IconUsers, IconBrandAsana, IconBook2 } from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconTargetArrow,
    IconUsers,
    IconBrandAsana,
    IconBook2
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const ClusterDashboard = {
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
        // {
        //     id: 'team-Lead',
        //     title: <FormattedMessage id="team-Lead" />,
        //     type: 'item',
        //     url: '/team-lead',
        //     icon: icons.IconBrandAsana,
        //     breadcrumbs: false
        // },
        {
            id: 'Cluster Lead',
            title: <FormattedMessage id="Cluster Lead" />,
            type: 'item',
            url: '/cluster-lead',
            icon: icons.IconBrandAsana,
            breadcrumbs: false
        },
        {
            id: 'BD Executive',
            title: <FormattedMessage id="BD Executive" />,
            type: 'item',
            url: '/bd-executive',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'Leads',
            title: <FormattedMessage id="Leads" />,
            type: 'item',
            url: '/leads',
            icon: icons.IconBook2,
            breadcrumbs: false
        }
        // {
        //     id: 'assigned-target',
        //     title: <FormattedMessage id="target-assign" />,
        //     type: 'item',
        //     url: '/assigned-target',
        //     icon: icons.IconTargetArrow,
        //     breadcrumbs: false
        // }
    ]
};

export default ClusterDashboard;
