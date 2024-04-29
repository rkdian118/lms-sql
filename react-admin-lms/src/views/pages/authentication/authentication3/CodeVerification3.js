import { Link, Navigate, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthCodeVerification from '../auth-forms/AuthCodeVerification';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// assets

// ===========================|| AUTH3 - CODE VERIFICATION ||=========================== //

const CodeVerification = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const auth = useSelector((state) => state.admin);
    const { adminToken, loading } = auth;
    const initialTimer = 1 * 60; // 2 minutes in seconds
    const [timer, setTimer] = useState(initialTimer);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/login'); // Replace '/other-page' with the actual path to the other page
            localStorage.removeItem('adminToken');
            // console.log('🚀khatam tata bye');
        }, 1 * 60 * 1000); // 2 minutes in milliseconds

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        // console.log('🚀 adminRole:', timer);
        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);

    // if (adminToken === null && loading === false) {
    //     return <Navigate replace to="/login" />;
    // }
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="theme-logo">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Enter Secret Code
                                                    </Typography>
                                                    <Typography variant="h6" fontSize="14px">
                                                        Please enter secret code provided to you
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row" justifyContent="flex-end" alignItems="baseline">
                                            {/* <Typography>Time Remaining: </Typography> */}
                                            <Typography
                                                variant="h4"
                                                sx={{ minWidth: 85, mr: '10px', textDecoration: 'none', textAlign: 'right' }}
                                                color="error"
                                            >
                                                Time Remaining: {formatTime(timer)}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthCodeVerification />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default CodeVerification;
