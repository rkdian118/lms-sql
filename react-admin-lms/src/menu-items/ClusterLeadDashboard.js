// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDashboard,
    IconBook2,
    IconDeviceAnalytics,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconReportAnalytics,
    IconTargetArrow
} from '@tabler/icons';

const icons = {
    IconDashboard,
    IconBook2,
    IconDeviceAnalytics,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconReportAnalytics,
    IconTargetArrow
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const ClusterLeadDashboard = {
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
            id: 'BDE Management',
            title: <FormattedMessage id="BDE Management" />,
            type: 'item',
            url: '/bde-list',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'Targets',
            title: <FormattedMessage id="Targets" />,
            type: 'item',
            url: '/all-target',
            icon: icons.IconTargetArrow,
            breadcrumbs: false
        },
        {
            id: 'Leads',
            title: <FormattedMessage id="Leads" />,
            type: 'item',
            url: '/leads',
            icon: icons.IconBook2,
            breadcrumbs: false
        },
        {
            id: 'Meetings',
            title: <FormattedMessage id="Meetings" />,
            type: 'item',
            url: '/meetings',
            icon: icons.IconPhonePlus,
            breadcrumbs: false
        },
        {
            id: 'RFP-Request',
            title: <FormattedMessage id="RFP-Request" />,
            type: 'item',
            url: '/rfp-request',
            icon: icons.IconFileRss,
            breadcrumbs: false
        },
        {
            id: 'Proposal',
            title: <FormattedMessage id="Proposal" />,
            type: 'item',
            url: '/proposal',
            icon: icons.IconFilePlus,
            breadcrumbs: false
        },
        {
            id: 'DSR-Report',
            title: <FormattedMessage id="DSR-Report" />,
            type: 'item',
            url: '/dsr-report',
            icon: icons.IconReportAnalytics,
            breadcrumbs: false
        }
    ]
};

export default ClusterLeadDashboard;
