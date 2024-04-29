import { memo, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuCard from './MenuCard';
import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';
import Chip from 'ui-component/extended/Chip';

import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import { ProfileLoader } from 'ui-component/cards/Skeleton/TableLoader';
import { Link } from 'react-router-dom';
import Avatar from 'ui-component/extended/Avatar';
import { BASE_URL } from 'config';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = () => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { adminRole, adminDetails, loading } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const { layout, drawerType } = useConfig();

    const logo = useMemo(
        () => (
            <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                <LogoSection />
            </Box>
        ),
        []
    );

    const drawerContent = (
        <>
            <MenuList />
            {/* {layout === LAYOUT_CONST.VERTICAL_LAYOUT && drawerOpen && <MenuCard />} */}
            {/* {layout === LAYOUT_CONST.VERTICAL_LAYOUT && drawerOpen && (
                <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
                    <Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={ }} />
                </Stack>
            )} */}
        </>
    );

    const drawerSX = {
        paddingLeft: drawerOpen ? '16px' : 0,
        paddingRight: drawerOpen ? '16px' : 0,
        marginTop: drawerOpen ? 0 : '20px'
    };

    const drawer = useMemo(
        () => (
            <>
                {matchDownMd ? (
                    <Box sx={drawerSX}>{drawerContent}</Box>
                ) : (
                    <PerfectScrollbar
                        component="div"
                        style={{
                            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                            ...drawerSX
                        }}
                    >
                        {drawerOpen ? (
                            <>
                                {loading ? (
                                    <ProfileLoader />
                                ) : (
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{ display: 'flex', justifyContent: 'center', margin: '18px 0px 0px 0px' }}
                                    >
                                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            {/* <Link to="/dashboard"> */}
                                            <Avatar
                                                alt="pic"
                                                size="lg"
                                                src={BASE_URL + adminDetails?.profile_pic}
                                                sx={{
                                                    width: 150,
                                                    height: 150,
                                                    margin: '0 auto',
                                                    border: '2px solid',
                                                    borderColor: theme.palette.primary.main
                                                }}
                                                // sx={{ width: '120px', height: '120px', border: '3px solid #007DC3' }}
                                            />
                                            {/* </Link> */}
                                        </Grid>
                                        {/* <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography
                                                variant="h4"
                                                component="div"
                                                sx={{ color: '#007DC3', fontSize: '20px', fontWeight: 600 }}
                                            >
                                                {adminDetails?.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography variant="h4" sx={{ color: '#007DC3', fontSize: '20px', fontWeight: 400 }}>
                                                {adminDetails?.designation}
                                            </Typography>
                                        </Grid> */}
                                        {/* {adminRole === 'Business' ? (
                                            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                                    <Typography
                                                        variant="h4"
                                                        align="center"
                                                        // p="10px"
                                                        color="#b276a8"
                                                        sx={{
                                                            borderRadius: '10px',
                                                            color: '#3a5895',
                                                            fontSize: '20px',
                                                            padding: '10px 10px 5px 10px'
                                                            // background: '#f9e2de'
                                                        }}
                                                    >
                                                        Quick Access
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        ) : (
                                            ''
                                        )} */}
                                    </Grid>
                                )}
                                {/* {adminRole === 'Business' ? (
                                    <Typography
                                        variant="h4"
                                        align="center"
                                        // p="10px"
                                        color="#b276a8"
                                        sx={{
                                            borderRadius: '10px',
                                            color: '#3a5895',
                                            fontSize: '20px',
                                            padding: '10px 10px 5px 10px'
                                            // background: '#f9e2de'
                                        }}
                                    >
                                        Quick Access
                                    </Typography>
                                ) : (
                                    ''
                                )} */}
                            </>
                        ) : (
                            ''
                        )}
                        {drawerContent}
                    </PerfectScrollbar>
                )}
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchUpMd, drawerOpen, drawerType, adminDetails, loading]
    );

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            {matchDownMd || (drawerType === LAYOUT_CONST.MINI_DRAWER && drawerOpen) ? (
                <Drawer
                    variant={matchUpMd ? 'persistent' : 'temporary'}
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => dispatch(openDrawer(!drawerOpen))}
                    sx={{
                        '& .MuiDrawer-paper': {
                            mt: matchDownMd ? 0 : 11,
                            zIndex: 1099,
                            width: drawerWidth,
                            background: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            borderRight: 'none'
                        }
                    }}
                    ModalProps={{ keepMounted: true }}
                    color="inherit"
                >
                    {matchDownMd && logo}
                    {drawer}
                </Drawer>
            ) : (
                <MiniDrawerStyled variant="permanent" open={drawerOpen}>
                    {logo}
                    {drawer}
                </MiniDrawerStyled>
            )}
        </Box>
    );
};

export default memo(Sidebar);
