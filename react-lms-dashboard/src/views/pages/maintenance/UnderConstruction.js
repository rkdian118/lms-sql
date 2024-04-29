import { Link } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useTimer } from 'react-timer-hook';
// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import image from 'assets/images/maintenance/img-build.svg';
import imageBackground from 'assets/images/maintenance/img-bg-grid.svg';
import imageDarkBackground from 'assets/images/maintenance/img-bg-grid-dark.svg';
import imageParts from 'assets/images/maintenance/img-bg-parts.svg';

// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative'
});

const PageContentWrapper = styled('div')({
    maxWidth: 350,
    margin: '0 auto',
    textAlign: 'center'
});

const ConstructionCard = styled(Card)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const CardMediaBuild = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '5s bounce ease-in-out infinite'
});

const CardMediaParts = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '10s blink ease-in-out infinite'
});
const TimerWrapper = styled('div')({
    maxWidth: 450,
    margin: '0 auto'
});

const TimeBlock = styled('div')(({ theme }) => ({
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.main,
    borderRadius: '12px',
    padding: '24px 0',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '3rem'
}));
// ========================|| UNDER CONSTRUCTION PAGE ||======================== //

const UnderConstruction = () => {
    const theme = useTheme();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 3600 * 24 * 3 - 3600 * 15.5);

    const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp: time });
    return (
        <ConstructionCard>
            <CardContent>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CardMediaWrapper>
                            <CardMedia
                                component="img"
                                image={theme.palette.mode === 'dark' ? imageDarkBackground : imageBackground}
                                title="Slider 3 image"
                            />
                            <CardMediaParts src={imageParts} title="Slider 1 image" />
                            <CardMediaBuild src={image} title="Slider 2 image" />
                        </CardMediaWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <PageContentWrapper>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" component="div">
                                        {/* Under Construction */}
                                        Coming Soon
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        {/* This site is on under construction!! Please check after some time */}
                                        Something new is on it&apos;s way
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        {/* <Button variant="contained" size="large" component={Link} to={DASHBOARD_PATH}>
                                            <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                                        </Button> */}
                                        <TimerWrapper>
                                            <Grid container spacing={gridSpacing}>
                                                <Grid item xs={3}>
                                                    <TimeBlock>{days}</TimeBlock>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TimeBlock>{hours}</TimeBlock>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TimeBlock>{minutes}</TimeBlock>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TimeBlock>{seconds}</TimeBlock>
                                                </Grid>
                                            </Grid>
                                        </TimerWrapper>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </PageContentWrapper>
                    </Grid>
                </Grid>
            </CardContent>
        </ConstructionCard>
    );
};

export default UnderConstruction;
