// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconTargetArrow,
    IconUsers,
    IconBrandAsana,
    IconBook2,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconReportAnalytics
} from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics,
    IconTargetArrow,
    IconUsers,
    IconBrandAsana,
    IconBook2,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconReportAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const ClusterDashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
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
            id: 'targets',
            title: <FormattedMessage id="targets" />,
            type: 'collapse',
            icon: icons.IconTargetArrow,
            breadcrumbs: false,
            children: [
                {
                    id: 'view-target',
                    title: <FormattedMessage id="view-target" />,
                    type: 'item',
                    url: '/view-target',
                    breadcrumbs: false
                },
                {
                    id: 'assigned-target',
                    title: <FormattedMessage id="assigned-target" />,
                    type: 'item',
                    url: '/assigned-target',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'team-member',
            title: <FormattedMessage id="team-member" />,
            // type: 'item',
            type: 'collapse',
            // url: '/leads',
            icon: icons.IconUsers,
            breadcrumbs: false,
            children: [
                {
                    id: 'cluster-lead',
                    title: <FormattedMessage id="cluster-lead" />,
                    type: 'item',
                    url: '/cluster-lead',
                    breadcrumbs: false
                },
                {
                    id: 'bd-executive',
                    title: <FormattedMessage id="bd-executive" />,
                    type: 'item',
                    url: '/bd-executive',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'leads',
            title: <FormattedMessage id="leads" />,
            // type: 'item',
            type: 'collapse',
            // url: '/leads',
            icon: icons.IconBook2,
            breadcrumbs: false,
            children: [
                {
                    id: 'leads',
                    title: <FormattedMessage id="leads" />,
                    type: 'item',
                    url: '/leads',
                    breadcrumbs: false
                },
                {
                    id: 'duplicate-leads',
                    title: <FormattedMessage id="duplicate-leads" />,
                    type: 'item',
                    url: '/duplicate-leads',
                    breadcrumbs: false
                },
                {
                    id: 'transfered-leads',
                    title: <FormattedMessage id="transfered-leads" />,
                    type: 'item',
                    url: '/transfered-leads',
                    breadcrumbs: false
                }
            ]
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
            type: 'collapse',
            // url: '/dsr-report',
            icon: icons.IconReportAnalytics,
            breadcrumbs: false,
            children: [
                {
                    id: 'bde-dsr',
                    title: <FormattedMessage id="bde-dsr" />,
                    type: 'item',
                    url: '/bde-dsr',
                    breadcrumbs: false
                },
                {
                    id: 'cl-dsr',
                    title: <FormattedMessage id="cl-dsr" />,
                    type: 'item',
                    url: '/cl-dsr',
                    breadcrumbs: false
                },
                {
                    id: 'bh-dsr',
                    title: <FormattedMessage id="bh-dsr" />,
                    type: 'item',
                    url: '/bh-dsr',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default ClusterDashboard;
