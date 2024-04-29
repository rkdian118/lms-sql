import { memo, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';

// project imports
// import menuItem from 'menu-items';
import NavGroup from './NavGroup';
import useConfig from 'hooks/useConfig';
import { useSelector } from 'react-redux';
import AdminDashboard from 'menu-items/AdminDashboard';
import BranchHeadDashboard from 'menu-items/BranchHeadDashboard';
import ManagerDashboard from 'menu-items/ManagerDashboard';
import BusinessDashboard from 'menu-items/BusinessDashboard';
import ClusterLeadDashboard from 'menu-items/ClusterLeadDashboard';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const theme = useTheme();
    const { layout } = useConfig();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const auth = useSelector((state) => state.admin);
    const { adminRole, isAuthenticated, loading } = auth;

    // console.log('🚀adminRole:menu', adminRole);

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
                case 'ClusterLead':
                    return [ClusterLeadDashboard];
                case 'Business':
                    return [BusinessDashboard];
                default:
                    return [];
            }
        })()
    };
    // console.log('🚀 menuItem:', menuItem);
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            // return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default memo(MenuList);
