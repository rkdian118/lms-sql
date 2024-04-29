// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';

// project imports
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import LocalizationSection from './LocalizationSection';
import MegaMenuSection from './MegaMenuSection';
import NotificationSection from './NotificationSection';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';

// assets
import { IconMenu2 } from '@tabler/icons';
import EditProfile from './ProfileSection/EditSection';
import TeamMemberList from './TeamMemberList/TeamMemberList';
import Bookmark from './Bookmark/Bookmark';
import { HeaderLoader } from 'ui-component/cards/Skeleton/TableLoader';
import FullScreen from './FullScreenSection/FullScreen';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const auth = useSelector((state) => state.admin);
    const { adminRole, adminDetails, loading } = auth;

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();

    const CheckRole = () => {
        let data;
        if (adminRole === 'Admin') {
            data = 'Admin';
        } else if (adminRole === 'Cluster') {
            data = 'Branch Head';
        } else if (adminRole === 'Manager') {
            data = 'Team Lead';
        } else if (adminRole === 'ClusterLead') {
            data = 'Cluster Lead';
        } else {
            data = 'BDE';
        }
        return data;
    };

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>

                <>
                    {layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                marginLeft: '20px',
                                overflow: 'hidden',
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                                }
                            }}
                            onClick={() => dispatch(openDrawer(!drawerOpen))}
                            color="inherit"
                        >
                            <IconMenu2 stroke={1.5} size="20px" />
                        </Avatar>
                    ) : null}
                </>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {loading ? (
                <HeaderLoader />
            ) : (
                <Box sx={{ width: '100%', px: 3 }}>
                    <Typography variant="h4" component="h4" sx={{ pl: '10px', fontSize: '1.5rem', color: '#468ccc' }} align="center">
                        {/* ({CheckRole()}) Welcome On Board - {adminDetails?.name} */}
                        Welcome - {adminDetails?.name}
                        {/* ({CheckRole()}) */}
                    </Typography>
                </Box>
            )}
            {/* mega-menu */}

            {/* live customization & localization */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box> */}

            {/* notification & profile */}
            {/* <ProfileSection /> */}

            {/* <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
                <MegaMenuSection />
            </Box> */}
            {/* {adminRole === 'Business' ? (
                <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
                    <TeamMemberList />
                </Box>
            ) : (
                ''
            )} */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
                <Bookmark />
            </Box> */}

            {/* {adminRole !== 'Business' ? (
                <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
                    <NotificationSection />
                </Box>
            ) : (
                ''
            )} */}
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <FullScreen />
            </Box>
            <ProfileSection />
            {/* <EditProfile /> */}

            {/* mobile header */}
            {/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box> */}
        </>
    );
};

export default Header;
