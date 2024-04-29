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
    id: 'dashboard',
    // title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
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
