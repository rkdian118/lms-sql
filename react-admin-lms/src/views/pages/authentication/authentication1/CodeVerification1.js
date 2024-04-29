import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthCodeVerification from '../auth-forms/AuthCodeVerification';
import BackgroundPattern1 from 'ui-component/cards/BackgroundPattern1';
import AuthSlider from 'ui-component/cards/AuthSlider';

// assets
import AuthBlueCard from 'assets/images/auth/auth-signup-blue-card.svg';
import AuthWhiteCard from 'assets/images/auth/auth-signup-white-card.svg';
import { useEffect, useState } from 'react';

// styles
const BlueWrapper = styled('span')(({ theme }) => ({
    '&:after': {
        content: '""',
        position: 'absolute',
        top: '45%',
        left: '35%',
        width: 260,
        backgroundSize: 380,
        height: 290,
        backgroundImage: `url(${AuthWhiteCard})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: '15s wings ease-in-out infinite',
        [theme.breakpoints.down('xl')]: {
            left: '25%',
            top: '50%'
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        top: '12%',
        left: '25%',
        width: 360,
        height: 350,
        backgroundSize: 460,
        backgroundImage: `url(${AuthBlueCard})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: '15s wings ease-in-out infinite',
        animationDelay: '1s',
        [theme.breakpoints.down('xl')]: {
            top: '10%',
            left: '15%'
        }
    }
}));

// carousel items
const items = [
    {
        title: 'Lead Management System',
        description: 'Making your management easy by saving time'
    },
    {
        title: 'Manage Your Leads Here',
        description: 'Organize your lead capture, lead management, sales management & analytics in one platform'
    },
    {
        title: 'Track Your Performance',
        description: 'progress in terms of their personal growth and development'
    }
];

// ===========================|| AUTH1 - CODE VERIFICATION ||=========================== //

const CodeVerification = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
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
    return (
        <AuthWrapper1>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item container justifyContent="center" md={6} lg={7} sx={{ my: 3 }}>
                    <AuthCardWrapper>
                        {/* <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems={matchDownSM ? 'center' : 'inherit'}
                                    justifyContent={matchDownSM ? 'center' : 'space-between'}
                                >
                                    <Grid item>
                                        <Stack
                                            justifyContent={matchDownSM ? 'center' : 'flex-start'}
                                            textAlign={matchDownSM ? 'center' : 'inherit'}
                                        >
                                            <Typography
                                                color={theme.palette.secondary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                Verification Code
                                            </Typography>
                                            <Typography color="textPrimary" gutterBottom variant="h4">
                                                We send you on mail.
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item sx={{ mb: { xs: 3, sm: 0 } }}>
                                        <Link to="#" aria-label="theme-logo">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" justifyContent={matchDownSM ? 'center' : 'flex-start'}>
                                    <Typography variant="caption" fontSize="0.875rem" textAlign={matchDownSM ? 'center' : 'inherit'}>
                                        We’ve send you code on jone.****@company.com
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <AuthCodeVerification />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container direction="column" alignItems="flex-end" xs={12}>
                                    <Typography
                                        component={Link}
                                        to="#"
                                        variant="subtitle1"
                                        sx={{ textDecoration: 'none' }}
                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                    >
                                        Did not receive the email? Check your spam filter, or
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation fullWidth size="large" type="submit" variant="outlined" color="secondary">
                                        Resend Code
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid> */}
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
                        </Grid>{' '}
                    </AuthCardWrapper>
                </Grid>
                <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
                    <BackgroundPattern1>
                        <Grid item container alignItems="flex-end" justifyContent="center" spacing={3}>
                            <Grid item xs={12}>
                                <span />
                                <BlueWrapper />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container justifyContent="center" sx={{ pb: 8 }}>
                                    <Grid item xs={10} lg={8} sx={{ '& .slick-list': { pb: 2 } }}>
                                        <AuthSlider items={items} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </BackgroundPattern1>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default CodeVerification;
