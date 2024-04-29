import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Button,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { openPopupModel } from 'store/slices/menu';
import { LogoutSession } from 'store/slices/adminAuth';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartTwoTone';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Chip from 'ui-component/extended/Chip';
import EditIcon from '@mui/icons-material/Edit';
import MuiTooltip from '@mui/material/Tooltip';
import { GetDSRDetaiilApi } from 'store/slices/clusterLeadAction';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import moment from 'moment';
import { DSRDetailsLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import { IconCircles, IconBrandUpwork, IconCalendarStats, IconMailForward, IconBrandCashapp, IconBrandZoom } from '@tabler/icons';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsTwoTone';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - SLIDE ANIMATION ||=============================== //
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = ({ children, onClose, ...other }) => (
    <DialogTitle sx={{ m: 0, py: 1, px: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <CloseIcon />
            </IconButton>
        ) : null}
    </DialogTitle>
);

BootstrapDialogTitle.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};

// ==============================|| DATA WIDGET - FEEDS CARD ||============================== //

const FeedsCard = ({ title, count, iconPrimary, messages, bgColor = '' }) => (
    <CardContent
        sx={{
            margin: '10px',
            padding: '10px 24px',
            borderRadius: '15px',
            boxShadow: '2',
            // '& .MuiCardContent-root:last-child': { padding: '10px 24px' }
            '&:last-of-type': { padding: '10px 24px' }
        }}
    >
        {/* <CardContent sx={{ margin: '10px', padding: '10px 24px', borderRadius: '15px', boxShadow: '2', '&:hover': { boxShadow: '10' } }}> */}
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar sx={{ backgroundColor: bgColor, color: 'rgb(255, 255, 255)' }}>{iconPrimary}</Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Grid container spacing={1}>
                            <Grid item xs zeroMinWidth sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography align="left" variant="body2" sx={{ fontWeight: 600 }}>
                                    {title}
                                </Typography>
                                {messages === 1 ? (
                                    <Typography align="left" variant="body2" sx={{ ml: 2 }}>
                                        <MuiTooltip title="Update" arrow>
                                            <div>
                                                <EditIcon sx={{ fontSize: '18px', cursor: 'pointer', color: '#3e7dc3' }} />
                                            </div>
                                        </MuiTooltip>
                                    </Typography>
                                ) : (
                                    ''
                                )}
                            </Grid>
                            <Grid item sx={{ width: '25%', display: 'flex', justifyContent: 'flex-end', zIndex: 1000 }}>
                                <Typography align="left" variant="body2" sx={{ fontWeight: 600 }}>
                                    {count}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </CardContent>
);

FeedsCard.propTypes = {
    title: PropTypes.string
};

const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative'
    // background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
    // border: theme.palette.mode === 'dark' ? '1px solid transparent' : `1px solid${theme.palette.grey[100]}`,
    // '&:after': {
    //     content: '""',
    //     position: 'absolute',
    //     width: 350,
    //     height: 350,
    //     background: `linear-gradient(45deg, #07afff6e -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    //     borderRadius: '50%',
    //     top: -160,
    //     right: -160
    //     //   top: -30,
    //     // right: -180
    // },
    // '&:before': {
    //     content: '""',
    //     position: 'absolute',
    //     width: 350,
    //     height: 350,
    //     background: `linear-gradient(222.9deg, #07afff6e -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    //     borderRadius: '50%',
    //     // top: -160,
    //     // right: -130
    //     bottom: -160,
    //     left: -160
    // }
}));

const ClusterDsrViewModel = ({ open, close, dsrId, rowData }) => {
    // console.log('🚀  rowData:', rowData);
    const theme = useTheme();

    const handleClose = () => {
        close();
    };

    return (
        <div>
            <BootstrapDialog
                open={open}
                TransitionComponent={Transition}
                maxWidth="xl"
                // keepMounted
                fullWidth
                sx={{ '& .MuiDialog-paper': { p: 0, width: '100%', maxWidth: '900px' } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" align="center" sx={{ pl: '10px', fontSize: '1em' }}>
                        {rowData?.clusterLeadData?.name} DSR
                        {/* {getDSRDetailsLoading ? '' : <>({rowData?.clusterLeadData?.name})</>} */}
                    </Typography>
                    <Typography variant="h6" component="h6" align="center" sx={{ pl: '10px', fontSize: '14px' }}>
                        {moment(rowData?.createdAt).format('DD MMMM YYYY')}
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar component="div" style={{ scrollbarWidth: 'thin', scrollbarColor: '#b2b3b3 #f1f1f1', maxWidth: '100%' }}>
                    <DialogContent dividers sx={{ '&.MuiDialogContent-root': { p: '0' } }}>
                        <CardWrapper>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={6} sx={{ borderRight: '0px solid #5bb4fe', '&.MuiGrid-root': { pt: '5px' } }}>
                                    <MainCard content={false} sx={{ background: 'transparent' }}>
                                        <FeedsCard
                                            title="Leads Assigned"
                                            count={rowData?.lead_assigned}
                                            iconPrimary={<NotificationsNoneOutlinedIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.secondary.main}
                                        />
                                        <FeedsCard
                                            title="Positive Response"
                                            count={rowData?.lead_positive_response}
                                            iconPrimary={<ThumbUpOffAltIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.primary.main}
                                        />
                                        <FeedsCard
                                            title="Negative Response"
                                            count={rowData?.lead_negative_response}
                                            iconPrimary={<ThumbDownOffAltIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.error.main}
                                        />
                                        <FeedsCard
                                            title="Follow-Ups"
                                            count={rowData?.follow_ups}
                                            iconPrimary={<IconMailForward />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.orange.main}
                                        />
                                        <FeedsCard
                                            title="Bids (Upwork)"
                                            count={rowData?.upwork_bids}
                                            iconPrimary={<IconBrandUpwork />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.dark.main}
                                        />
                                        <FeedsCard
                                            title="Upwork Response"
                                            count={rowData?.upwork_positive_response}
                                            iconPrimary={<IconBrandUpwork />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.success.main}
                                        />
                                        <FeedsCard
                                            title="LinkedIn Response"
                                            count={rowData?.linkedin_response}
                                            iconPrimary={<LinkedInIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.primary.main}
                                        />
                                        <FeedsCard
                                            title="LinkedIn Messages"
                                            count={rowData?.linkedin_messages}
                                            iconPrimary={<LinkedInIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.success.main}
                                        />
                                    </MainCard>
                                </Grid>
                                <Grid item xs={6} sx={{ borderLeft: '0px solid #5bb4fe', '&.MuiGrid-root': { pt: '5px' } }}>
                                    <MainCard content={false} sx={{ background: 'transparent' }}>
                                        <FeedsCard
                                            title="Meeting Scheduled "
                                            count={rowData?.meeting_scheduled}
                                            iconPrimary={<IconCalendarStats />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.primary.main}
                                        />
                                        <FeedsCard
                                            title="Meeting Done"
                                            count={rowData?.meeting_done}
                                            iconPrimary={<IconBrandZoom />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.success.main}
                                        />
                                        <FeedsCard
                                            title="Follow-Ups Calls Done"
                                            count={rowData?.phone_call_done}
                                            iconPrimary={<PermPhoneMsgIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.secondary.main}
                                        />
                                        <FeedsCard
                                            title="Proposal Submitted"
                                            count={rowData?.proposal_submitted}
                                            iconPrimary={<PictureAsPdfIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.primary.main}
                                        />
                                        <FeedsCard
                                            title="Proposal Submitted Amount"
                                            count={rowData?.proposal_amount ? rowData?.proposal_amount : 0}
                                            iconPrimary={<AccountBalanceWalletIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.primary.main}
                                        />
                                        <FeedsCard
                                            title="Estimation Submitted"
                                            count={rowData?.estimation_submitted}
                                            iconPrimary={<PictureAsPdfIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.orange.main}
                                        />
                                        <FeedsCard
                                            title="Understand and Queries"
                                            count={rowData?.understanding_queries_submitted}
                                            iconPrimary={<QueryStatsIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.warning.dark}
                                        />
                                        <FeedsCard
                                            title="Features List Shared"
                                            count={rowData?.feature_list_shared}
                                            iconPrimary={<HistoryEduIcon />}
                                            messages={2}
                                            dsrId={rowData?._id}
                                            bgColor={theme.palette.grey[600]}
                                        />
                                    </MainCard>
                                </Grid>
                            </Grid>
                        </CardWrapper>
                    </DialogContent>
                </PerfectScrollbar>
            </BootstrapDialog>
        </div>
    );
};

export default ClusterDsrViewModel;
