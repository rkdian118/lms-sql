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

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: '#9c60dc',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    height: '160px',
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
            top: -105,
            right: -140
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
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 200,
                                                color: 'white'
                                                // paddingTop: '30px'
                                            }}
                                        >
                                            Total Target $5,00,000
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 700,
                                                color: 'white',
                                                paddingTop: '20px'
                                            }}
                                        >
                                            Total Earning
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Grid xs={12} md={6} sx={{ display: 'flex', alignItems: 'flex-end', pr: 2, pt: '10px' }} item>
                                        <Typography sx={{ fontSize: '3.125rem' }}>$</Typography>
                                        <Typography sx={{ fontSize: '2.525rem' }}>
                                            {/* <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}> */}
                                            3,00,000
                                        </Typography>
                                    </Grid>{' '}
                                    {/* <Grid xs={12} md={6} item align="right">
                                        <Typography sx={{ fontSize: '14px', mt: 2.5, mb: 0.75 }}>Total Target</Typography>
                                        <Typography sx={{ fontSize: '14px', mt: 1.5 }}>$2000</Typography>
                                    </Grid> */}
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
