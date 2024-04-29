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
    title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    // caption: <FormattedMessage id="pages-caption" />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'collapse',
            // url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            children: [
                {
                    id: 'dashboard',
                    title: <FormattedMessage id="dashboard" />,
                    type: 'item',
                    url: '/dashboard',
                    breadcrumbs: false
                },
                {
                    id: 'reports',
                    title: <FormattedMessage id="reports" />,
                    type: 'item',
                    url: '/reports',
                    breadcrumbs: false
                },
                {
                    id: 'targets',
                    title: <FormattedMessage id="targets" />,
                    type: 'item',
                    url: '/targets',
                    breadcrumbs: false
                },
                {
                    id: 'bde-management',
                    title: <FormattedMessage id="bde-management" />,
                    type: 'item',
                    url: '/bde-management',
                    breadcrumbs: false
                }
            ]
        },
        // {
        //     id: 'targets',
        //     title: <FormattedMessage id="targets" />,
        //     type: 'item',
        //     url: '/targets',
        //     icon: icons.IconTargetArrow,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'bde-management',
        //     title: <FormattedMessage id="bde-management" />,
        //     type: 'item',
        //     url: '/bde-management',
        //     icon: icons.IconDeviceAnalytics,
        //     breadcrumbs: false
        // },
        {
            id: 'leads',
            title: <FormattedMessage id="leads" />,
            type: 'item',
            url: '/leads',
            icon: icons.IconBook2,
            breadcrumbs: false
        },
        {
            id: 'meetings',
            title: <FormattedMessage id="meetings" />,
            type: 'item',
            url: '/meetings',
            icon: icons.IconPhonePlus,
            breadcrumbs: false
        },
        {
            id: 'rfp-request',
            title: <FormattedMessage id="rfp-request" />,
            type: 'item',
            url: '/rfp-request',
            icon: icons.IconFileRss,
            breadcrumbs: false
        },
        {
            id: 'proposal',
            title: <FormattedMessage id="proposal" />,
            type: 'item',
            url: '/proposal',
            icon: icons.IconFilePlus,
            breadcrumbs: false
        },
        {
            id: 'dsr-report',
            title: <FormattedMessage id="dsr-report" />,
            type: 'item',
            url: '/dsr-report',
            icon: icons.IconReportAnalytics,
            breadcrumbs: false
        }
    ]
};

export default ClusterLeadDashboard;
