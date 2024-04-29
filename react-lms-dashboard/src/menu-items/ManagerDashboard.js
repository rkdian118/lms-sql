// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconUsers } from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconUsers
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const ManagerDashboard = {
    id: 'Dashboard',
    title: <FormattedMessage id="Dashboard" />,
    icon: icons.IconDashboard,
    // caption: <FormattedMessage id="pages-caption" />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'bd-executive',
            title: <FormattedMessage id="bd-executive" />,
            type: 'item',
            url: '/bd-targets',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export default ManagerDashboard;
