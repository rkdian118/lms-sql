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
    Skeleton,
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
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Chip from 'ui-component/extended/Chip';
import EditIcon from '@mui/icons-material/Edit';
import MuiTooltip from '@mui/material/Tooltip';
import { GetDSRDetaiilApi, UpdateDSRApi } from 'store/slices/businessAction';
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
import CallIcon from '@mui/icons-material/Call';
import SellIcon from '@mui/icons-material/Sell';
import PaymentIcon from '@mui/icons-material/Payment';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import AnimateButton from 'ui-component/extended/AnimateButton';
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

const DSRViewModel = ({ open, close, dsrId }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { getDSRDetails, getDSRDetailsLoading } = useSelector((state) => state.businessAction);
    // console.log('🚀 getDSRDetails:', getDSRDetails);
    const [openEditable, setOpenEditable] = useState(false);
    const [linkedInMessages, setLinkedInMessages] = useState('' || getDSRDetails?.linkedin_messages);
    const compareDate = moment().format('DD-MM-YYY') === moment(getDSRDetails?.createdAt).format('DD-MM-YYY');
    // const compareDate = moment().startOf('day') === moment().endOf('day')

    const onOpenField = () => {
        setOpenEditable(!openEditable);
    };

    const handleClose = () => {
        close();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            dsr_id: dsrId,
            linkedin_messages: Number(linkedInMessages)
        };
        dispatch(UpdateDSRApi(newData)).then((res) => {
            if (res.succeeded === true) {
                setOpenEditable(false);
                dispatch(GetDSRDetaiilApi(dsrId));
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            }
        });
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
                        View DSR
                        {/* {getDSRDetailsLoading ? '' : <>({rowData?.bd_id?.name})</>} */}
                    </Typography>
                    <Typography
                        variant="h6"
                        component="h6"
                        align="center"
                        sx={{ pl: '10px', fontSize: '14px', display: 'flex', justifyContent: 'center' }}
                    >
                        {getDSRDetailsLoading ? (
                            <Skeleton variant="rectangular" height={20} width={150} sx={{ my: 0, align: 'center' }} />
                        ) : (
                            <>{moment(getDSRDetails?.createdAt).format('DD MMMM YYYY')}</>
                        )}
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar component="div" style={{ scrollbarWidth: 'thin', scrollbarColor: '#b2b3b3 #f1f1f1', maxWidth: '100%' }}>
                    <DialogContent dividers sx={{ '&.MuiDialogContent-root': { p: '0' } }}>
                        <CardWrapper>
                            {!getDSRDetailsLoading ? (
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={6} sx={{ borderRight: '0px solid #5bb4fe', '&.MuiGrid-root': { pt: '5px' } }}>
                                        <MainCard content={false} sx={{ background: 'transparent' }}>
                                            <FeedsCard
                                                title="Leads Assigned"
                                                count={getDSRDetails?.lead_assigned}
                                                iconPrimary={<NotificationsNoneOutlinedIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.secondary.main}
                                            />
                                            <FeedsCard
                                                title="Positive Response"
                                                count={getDSRDetails?.lead_positive_response}
                                                iconPrimary={<ThumbUpOffAltIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.primary.main}
                                            />
                                            <FeedsCard
                                                title="Negative Response"
                                                count={getDSRDetails?.lead_negative_response}
                                                iconPrimary={<ThumbDownOffAltIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.error.main}
                                            />
                                            <FeedsCard
                                                title="Follow-Ups"
                                                count={getDSRDetails?.follow_ups}
                                                iconPrimary={<IconMailForward />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.orange.main}
                                            />
                                            <FeedsCard
                                                title="Bids (Upwork)"
                                                count={getDSRDetails?.upwork_bids}
                                                iconPrimary={<IconBrandUpwork />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.dark.main}
                                            />
                                            <FeedsCard
                                                title="Upwork Response"
                                                count={getDSRDetails?.upwork_positive_response}
                                                iconPrimary={<IconBrandUpwork />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.success.main}
                                            />
                                            <FeedsCard
                                                title="LinkedIn Response"
                                                count={getDSRDetails?.linkedin_response}
                                                iconPrimary={<LinkedInIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.primary.main}
                                            />

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
                                                <Grid container spacing={gridSpacing}>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                                            <Grid item>
                                                                <Box sx={{ position: 'relative' }}>
                                                                    <Avatar
                                                                        sx={{
                                                                            backgroundColor: theme.palette.success.main,
                                                                            color: 'rgb(255, 255, 255)'
                                                                        }}
                                                                    >
                                                                        <LinkedInIcon />
                                                                    </Avatar>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs zeroMinWidth>
                                                                <Grid container spacing={1}>
                                                                    <Grid
                                                                        item
                                                                        xs
                                                                        zeroMinWidth
                                                                        sx={{ display: 'flex', alignItems: 'center' }}
                                                                    >
                                                                        <Typography align="left" variant="body2" sx={{ fontWeight: 600 }}>
                                                                            Number Of LinkedIn Messages
                                                                        </Typography>
                                                                        <Typography
                                                                            align="left"
                                                                            variant="body2"
                                                                            sx={{ ml: 2, zIndex: 1000 }}
                                                                        >
                                                                            {compareDate === true ? (
                                                                                <MuiTooltip title="Update" arrow>
                                                                                    <div>
                                                                                        <EditIcon
                                                                                            onClick={() => onOpenField()}
                                                                                            sx={{
                                                                                                fontSize: '18px',
                                                                                                cursor: 'pointer',
                                                                                                color: '#3e7dc3'
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </MuiTooltip>
                                                                            ) : (
                                                                                ''
                                                                            )}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        sx={{ width: '25%', display: 'flex', justifyContent: 'flex-end' }}
                                                                    >
                                                                        {openEditable ? (
                                                                            <TextField
                                                                                type="text"
                                                                                size="small"
                                                                                defaultValue={
                                                                                    linkedInMessages || getDSRDetails?.linkedin_messages
                                                                                }
                                                                                inputProps={{ maxLength: 4 }}
                                                                                onChange={(e) =>
                                                                                    setLinkedInMessages(e ? e.target.value : '')
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <Typography
                                                                                align="left"
                                                                                variant="body2"
                                                                                sx={{
                                                                                    fontWeight: 600,
                                                                                    display: 'flex',
                                                                                    alignItems: 'center'
                                                                                }}
                                                                            >
                                                                                {getDSRDetails?.linkedin_messages}
                                                                            </Typography>
                                                                        )}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            {openEditable ? (
                                                <CardContent sx={{ padding: '18px 24px' }}>
                                                    <Grid container spacing={gridSpacing}>
                                                        <Grid item xs={12}>
                                                            {/* <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}> */}
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={(e) => onSubmit(e)}
                                                                sx={{
                                                                    px: 3,
                                                                    mb: 1,
                                                                    width: '40%',
                                                                    boxShadow: theme.customShadows.secondary,
                                                                    ':hover': {
                                                                        boxShadow: 'none'
                                                                    }
                                                                }}
                                                            >
                                                                Submit
                                                                {/* <AddCircleRoundedIcon sx={{ ml: 1 }} /> */}
                                                            </Button>
                                                            {/* </AnimateButton> */}
                                                            {/* <Button
                                                                size="small"
                                                                // type="submit"
                                                                variant="contained"
                                                                color="secondary"
                                                                // disabled={formik.isSubmitting}
                                                                sx={{
                                                                    height: '35px',
                                                                    background: '#3a5895',
                                                                    '&:hover': { color: '#000', background: '#c6d9ff' }
                                                                }}
                                                                onClick={(e) => onSubmit(e)}
                                                            >
                                                                Submit
                                                            </Button> */}
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            ) : (
                                                ''
                                            )}
                                        </MainCard>
                                    </Grid>
                                    <Grid item xs={6} sx={{ borderLeft: '0px solid #5bb4fe', '&.MuiGrid-root': { pt: '5px' } }}>
                                        <MainCard content={false} sx={{ background: 'transparent' }}>
                                            <FeedsCard
                                                title="Meeting Scheduled "
                                                count={getDSRDetails?.meeting_scheduled}
                                                iconPrimary={<IconCalendarStats />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.primary.main}
                                            />
                                            <FeedsCard
                                                title="Meeting Done"
                                                count={getDSRDetails?.meeting_done}
                                                iconPrimary={<IconBrandZoom />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.success.main}
                                            />
                                            <FeedsCard
                                                title="Follow-Ups Calls Done"
                                                count={getDSRDetails?.phone_call_done}
                                                iconPrimary={<PermPhoneMsgIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.secondary.main}
                                            />
                                            <FeedsCard
                                                title="Proposal Submitted"
                                                count={getDSRDetails?.proposal_submitted}
                                                iconPrimary={<PictureAsPdfIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.primary.main}
                                            />
                                            <FeedsCard
                                                title="Proposal Submitted Amount"
                                                count={getDSRDetails?.proposal_amount ? getDSRDetails?.proposal_amount : 0}
                                                iconPrimary={<AccountBalanceWalletIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.primary.main}
                                            />
                                            <FeedsCard
                                                title="Estimation Submitted"
                                                count={getDSRDetails?.estimation_submitted}
                                                iconPrimary={<PictureAsPdfIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.orange.main}
                                            />
                                            <FeedsCard
                                                title="Understand and Queries"
                                                count={getDSRDetails?.understanding_queries_submitted}
                                                iconPrimary={<QueryStatsIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.warning.dark}
                                            />
                                            <FeedsCard
                                                title="Features List Shared"
                                                count={getDSRDetails?.feature_list_shared}
                                                iconPrimary={<HistoryEduIcon />}
                                                messages={2}
                                                dsrId={getDSRDetails?._id}
                                                bgColor={theme.palette.grey[600]}
                                            />
                                        </MainCard>
                                    </Grid>
                                </Grid>
                            ) : (
                                <DSRDetailsLoader rows={8} />
                            )}
                        </CardWrapper>
                    </DialogContent>
                </PerfectScrollbar>
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
                {/* {successOpen && <DuplicateLeadModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default DSRViewModel;
