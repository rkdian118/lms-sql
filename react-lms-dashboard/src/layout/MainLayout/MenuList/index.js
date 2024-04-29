// import { memo, useEffect } from 'react';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Typography, useMediaQuery } from '@mui/material';

// // project imports
import menuItem from 'menu-items';
// import NavGroup from './NavGroup';
// import useConfig from 'hooks/useConfig';
// import { useSelector } from 'react-redux';
import AdminDashboard from 'menu-items/AdminDashboard';
import BranchHeadDashboard from 'menu-items/BranchHeadDashboard';
import ManagerDashboard from 'menu-items/ManagerDashboard';
import BusinessDashboard from 'menu-items/BusinessDashboard';
import ClusterLeadDashboard from 'menu-items/ClusterLeadDashboard';

// // ==============================|| SIDEBAR MENU LIST ||============================== //

// const MenuList = () => {
//     const theme = useTheme();
//     const { layout } = useConfig();
//     const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

//     const auth = useSelector((state) => state.admin);
//     const { adminRole, isAuthenticated, loading } = auth;

//     // console.log('🚀adminRole:menu', adminRole);

//     // const getMenu = Menu();
//     const menuItem = {
//         items: (() => {
//             switch (adminRole) {
//                 case 'Admin':
//                     return [AdminDashboard]; // Assuming 'AdminDashboard' is an array
//                 case 'Cluster':
//                     return [BranchHeadDashboard];
//                 case 'Manager':
//                     return [ManagerDashboard];
//                 case 'ClusterLead':
//                     return [ClusterLeadDashboard];
//                 case 'Business':
//                     return [BusinessDashboard];
//                 default:
//                     return [];
//             }
//         })()
//     };
//     // console.log('🚀 menuItem:', menuItem);
//     const navItems = menuItem.items.map((item) => {
//         switch (item.type) {
//             case 'group':
//                 return <NavGroup key={item.id} item={item} />;
//             // return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
//             default:
//                 return (
//                     <Typography key={item.id} variant="h6" color="error" align="center">
//                         Menu Items Error
//                     </Typography>
//                 );
//         }
//     });

//     return <>{navItems}</>;
// };

// export default memo(MenuList);

import { memo, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, List, Typography, useMediaQuery } from '@mui/material';

// project imports
import NavItem from './NavItem';
// import menuItem from 'menu-items';
import NavGroup from './NavGroup';

import useConfig from 'hooks/useConfig';
// import { Menu } from 'menu-items/widget';

import LAYOUT_CONST from 'constant';
import { HORIZONTAL_MAX_ITEM } from 'config';
import { useSelector } from 'store';
import CountryLeadDashboard from 'menu-items/CountryLeadDashboard';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const theme = useTheme();
    const { layout } = useConfig();
    const { drawerOpen } = useSelector((state) => state.menu);
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const auth = useSelector((state) => state.admin);
    const { adminRole, isAuthenticated, loading } = auth;
    // const getMenu = Menu();
    const menuItem = {
        items: (() => {
            switch (adminRole) {
                case 'Admin':
                    return [AdminDashboard]; // Assuming 'AdminDashboard' is an array
                case 'Cluster':
                    return [BranchHeadDashboard];
                case 'Manager':
                    return [ManagerDashboard];
                case 'CountryLead':
                    return [CountryLeadDashboard];
                case 'ClusterLead':
                    return [ClusterLeadDashboard];
                case 'Business':
                    return [BusinessDashboard];
                default:
                    return [];
            }
        })()
    };
    const handlerMenuItem = () => {
        const isFound = menuItem.items.some((element) => {
            if (element.id === 'widget') {
                return true;
            }
            return false;
        });

        // if (getMenu?.id !== undefined && !isFound) {
        //     menuItem.items.splice(1, 0, getMenu);
        // }
    };

    // useEffect(() => {
    //     handlerMenuItem();
    //     // eslint-disable-next-line
    // }, []);

    // last menu-item to show in horizontal menu bar
    const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

    let lastItemIndex = menuItem.items.length - 1;
    let remItems = [];
    let lastItemId;

    if (lastItem && lastItem < menuItem.items.length) {
        lastItemId = menuItem.items[lastItem - 1].id;
        lastItemIndex = lastItem - 1;
        remItems = menuItem.items.slice(lastItem - 1, menuItem.items.length).map((item) => ({
            title: item.title,
            elements: item.children,
            icon: item.icon,
            ...(item.url && {
                url: item.url
            })
        }));
    }

    const navItems = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
        switch (item.type) {
            case 'group':
                if (item.url && item.id !== lastItemId) {
                    return (
                        <List key={item.id}>
                            <NavItem item={item} level={1} isParents />
                            {layout !== LAYOUT_CONST.HORIZONTAL_LAYOUT && <Divider sx={{ py: 0.5 }} />}
                        </List>
                    );
                }
                return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
        <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box>
    ) : (
        <>{navItems}</>
    );
};

export default memo(MenuList);
