import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
import moment from 'moment';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: '#9c60dc',
    color: '#fff',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    height: '180px',
    boxShadow: '4',
    ':hover': {
        boxShadow: '20'
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '80px',
        height: '80px',
        background: '#b077f8',
        borderRadius: '50%',
        top: '-30px',
        right: 0,
        [theme.breakpoints.down('sm')]: {
            top: '-30px',
            right: 0
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '80px',
        height: '80px',
        background: '#b681f6',
        borderRadius: '50%',
        top: '5px',
        right: '-30px',
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: '5px',
            right: '-30px'
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, getDashboardData }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleReDirectClick = () => {
        navigate('/targets');
    };
    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false} onClick={() => handleReDirectClick()}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid item sx={{ '&.MuiGrid-root': { p: 0 }, display: 'flex', pr: 2, pt: '10px' }}>
                                    <Typography variant="h1" color="inherit" sx={{ fontWeight: '500' }}>
                                        $
                                    </Typography>
                                    <Typography variant="h1" color="inherit" sx={{ fontWeight: '500' }}>
                                        {getDashboardData?.bdTargets?.completed_target ? getDashboardData?.bdTargets?.completed_target : 0}
                                    </Typography>
                                </Grid>
                                <Grid item container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h4" color="inherit">
                                            {/* Total Earning */}
                                            Achieved Target
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container mt={2}>
                                    {/* <Grid xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-end', pr: 2, pt: '10px' }} item>
                                        <Typography sx={{ fontSize: '3.125rem' }}>$</Typography>
                                        <Typography sx={{ fontSize: '2.525rem' }}>500</Typography>
                                    </Grid> */}
                                    <Grid xs={6} sm={6} md={6} item align="left">
                                        <Typography sx={{ fontSize: '14px', mt: 2.5, mb: 0.75 }}>&nbsp;</Typography>
                                        <Typography sx={{ fontSize: '14px', mt: 1.5 }}>
                                            {getDashboardData?.bdTargets ? (
                                                <>
                                                    {getDashboardData?.bdTargets?.target_month} {getDashboardData?.bdTargets?.target_year}
                                                </>
                                            ) : (
                                                <>{moment(new Date()).format('MMMM YYYY')}</>
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={6} sm={6} md={6} item align="right">
                                        <Typography sx={{ fontSize: '14px', mt: 2.5, mb: 0.75 }}>Remaining Target</Typography>
                                        <Typography sx={{ fontSize: '14px', mt: 1.5 }}>
                                            $
                                            {getDashboardData?.bdTargets?.remaining_target
                                                ? getDashboardData?.bdTargets?.remaining_target
                                                : 0}
                                        </Typography>
                                    </Grid>
                                    {/* <Grid item></Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
