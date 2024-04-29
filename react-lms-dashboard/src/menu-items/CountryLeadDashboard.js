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
    IconChartInfographic,
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
    IconBuildingArch,
    IconBuildingCommunity,
    IconTower,
    IconHistory,
    IconChartInfographic,
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

const CountryLeadDashboard = {
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
        // {
        //     id: 'admin-management',
        //     title: <FormattedMessage id="admin-management" />,
        //     type: 'item',
        //     url: '/admin-management',
        //     icon: icons.IconBuildingArch,
        //     breadcrumbs: false
        // },
        {
            id: 'leads',
            title: <FormattedMessage id="leads" />,
            type: 'item',
            // type: 'collapse',
            url: '/leads',
            icon: icons.IconBook2,
            breadcrumbs: false,
            children: [
                {
                    id: 'leads',
                    title: <FormattedMessage id="leads" />,
                    type: 'item',
                    url: '/leads',
                    breadcrumbs: false
                }
                // {
                //     id: 'duplicate-leads',
                //     title: <FormattedMessage id="duplicate-leads" />,
                //     type: 'item',
                //     url: '/duplicate-leads',
                //     breadcrumbs: false
                // },
                // {
                //     id: 'transfered-leads',
                //     title: <FormattedMessage id="transfered-leads" />,
                //     type: 'item',
                //     url: '/transfered-leads',
                //     breadcrumbs: false
                // }
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
        }
        // {
        //     id: 'dsr-report',
        //     title: <FormattedMessage id="dsr-report" />,
        //     type: 'collapse',
        //     // url: '/dsr-report',
        //     icon: icons.IconReportAnalytics,
        //     breadcrumbs: false,
        //     children: [
        //         {
        //             id: 'bde-dsr',
        //             title: <FormattedMessage id="bde-dsr" />,
        //             type: 'item',
        //             url: '/bde-dsr',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'cl-dsr',
        //             title: <FormattedMessage id="cl-dsr" />,
        //             type: 'item',
        //             url: '/cl-dsr',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'bh-dsr',
        //             title: <FormattedMessage id="bh-dsr" />,
        //             type: 'item',
        //             url: '/bh-dsr',
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        // {
        //     id: 'reportManagement',
        //     title: <FormattedMessage id="Report Management" />,
        //     type: 'item',
        //     url: '#',
        //     icon: icons.IconChartInfographic,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'viewHistory',
        //     title: <FormattedMessage id="View History" />,
        //     type: 'item',
        //     url: '#',
        //     icon: icons.IconHistory,
        //     breadcrumbs: false
        // },
    ]
};

export default CountryLeadDashboard;
