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
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsTwoTone';
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

const FeedsCard = ({ title, count, iconPrimary, messages }) => (
    <CardContent sx={{ padding: '16px 24px' }}>
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    {/* <Grid item>
                        <Box sx={{ position: 'relative' }}>
                            <Avatar sx={{ backgroundColor: 'red', color: 'rgb(255, 255, 255)' }}>{iconPrimary}</Avatar>
                        </Box>
                    </Grid> */}
                    <Grid item xs zeroMinWidth>
                        <Grid container spacing={1}>
                            <Grid item xs zeroMinWidth sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography align="left" variant="body2">
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
                            <Grid item sx={{ width: '25%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Chip label={count} variant="outlined" chipcolor="primary" />
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

const ClusterDsrViewModel = ({ open, close, dsrId, rowData }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    // const { getDSRDetails, getDSRDetailsLoading } = useSelector((state) => state.clusterLeadAction);
    const [openEditable, setOpenEditable] = useState(false);
    const [linkedInMessages, setLinkedInMessages] = useState('' || rowData?.linkedin_messages);
    const compareDate = moment().format('DD-MM-YYY') === moment(rowData?.createdAt).format('DD-MM-YYY');
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
        // dispatch(UpdateDSRApi(newData)).then((res) => {
        //     if (res.succeeded === true) {
        //         setOpenEditable(false);
        //         dispatch(GetDSRDetaiilApi(dsrId));
        //         dispatch(
        //             openSnackbar({
        //                 open: true,
        //                 message: res.ResponseMessage,
        //                 variant: 'alert',
        //                 alert: {
        //                     color: 'success'
        //                 },
        //                 transition: 'Fade',
        //                 anchorOrigin: { vertical: 'top', horizontal: 'right' }
        //             })
        //         );
        //     } else {
        //         dispatch(
        //             openSnackbar({
        //                 open: true,
        //                 message: res.ResponseMessage,
        //                 variant: 'alert',
        //                 alert: {
        //                     color: 'error'
        //                 },
        //                 transition: 'Fade',
        //                 anchorOrigin: { vertical: 'top', horizontal: 'right' }
        //             })
        //         );
        //     }
        // });
    };
    return (
        <div>
            <BootstrapDialog
                open={open}
                TransitionComponent={Transition}
                maxWidth="xl"
                // keepMounted
                fullWidth
                sx={{ '& .MuiDialog-paper': { p: 0, width: '100%', maxWidth: '850px' } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        View DSR
                        {/* {getDSRDetailsLoading ? '' : <>({rowData?.bd_id?.name})</>} */}
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar component="div" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ff0000 #f1f1f1', maxWidth: '100%' }}>
                    <DialogContent dividers>
                        <Grid container spacing={gridSpacing}>
                            {/* <Grid item xs={12}>
                                    <Typography
                                        sx={{ borderRight: '0px solid #5bb4fe', paddingLeft: '20px', fontWeight: 500 }}
                                        align="left"
                                        variant="h3"
                                    >
                                        BDE Name: {rowData?.bd_id?.name}
                                    </Typography>
                                </Grid> */}
                            {/* <Grid item xs={6}>
                                    <Typography
                                        sx={{ borderRight: '0px solid #5bb4fe', paddingLeft: '20px', fontWeight: 500 }}
                                        align="left"
                                        variant="h3"
                                    >
                                        BDE Email: {rowData?.bd_id?.email}
                                    </Typography>
                                </Grid> */}

                            <Grid item xs={6} sx={{ borderRight: '0px solid #5bb4fe', '&.MuiGrid-root': { pt: '10px' } }}>
                                <MainCard content={false}>
                                    <FeedsCard
                                        title="Number Of Leads Assigned"
                                        count={rowData?.lead_assigned}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Positive Response"
                                        count={rowData?.lead_positive_response}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Negative Response"
                                        count={rowData?.lead_negative_response}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Follow-Ups"
                                        count={rowData?.follow_ups}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Bids (Upwork)"
                                        count={rowData?.upwork_bids}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Upwork Response"
                                        count={rowData?.upwork_positive_response}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of LinkedIn Response"
                                        count={rowData?.linkedin_response}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of LinkedIn Messages"
                                        count={rowData?.linkedin_messages}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />

                                    {/* <CardContent sx={{ padding: '16px 24px' }}>
                                            <Grid container spacing={gridSpacing}>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                                        <Grid item xs zeroMinWidth>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs zeroMinWidth sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Typography align="left" variant="body2">
                                                                        Number Of LinkedIn Messages
                                                                    </Typography>
                                                                    <Typography align="left" variant="body2" sx={{ ml: 2 }}>
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
                                                                                linkedInMessages || rowData?.linkedin_messages
                                                                            }
                                                                            inputProps={{ maxLength: 4 }}
                                                                            onChange={(e) => setLinkedInMessages(e ? e.target.value : '')}
                                                                        />
                                                                    ) : (
                                                                        <Chip
                                                                            label={rowData?.linkedin_messages}
                                                                            variant="outlined"
                                                                            chipcolor="primary"
                                                                        />
                                                                    )}
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent> */}
                                </MainCard>
                            </Grid>
                            <Grid item xs={6} sx={{ borderLeft: '0px solid #5bb4fe', '&.MuiGrid-root': { pt: '10px' } }}>
                                <MainCard content={false}>
                                    <FeedsCard
                                        title="Number Of Meeting Secheduled"
                                        count={rowData?.meeting_scheduled}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Meeting Done"
                                        count={rowData?.meeting_done}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Follow-Ups Calls Done"
                                        count={rowData?.phone_call_done}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Propsal Submitted"
                                        count={rowData?.proposal_submitted}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Proposal Submitted Amount"
                                        count={rowData?.proposal_amount ? rowData?.proposal_amount : 0}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Estimation Submitted"
                                        count={rowData?.estimation_submitted}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Understand and Queries Submitted"
                                        count={rowData?.understanding_queries_submitted}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />
                                    <FeedsCard
                                        title="Number Of Features List Shared"
                                        count={rowData?.feature_list_shared}
                                        iconPrimary={<NotificationsNoneOutlinedIcon />}
                                        messages={2}
                                        dsrId={rowData?._id}
                                    />

                                    {openEditable ? (
                                        <CardContent sx={{ padding: '18px 24px' }}>
                                            <Grid container spacing={gridSpacing}>
                                                <Grid item xs={12}>
                                                    <Button
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
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    ) : (
                                        ''
                                    )}
                                </MainCard>
                            </Grid>
                        </Grid>
                        {/* {!getDSRDetailsLoading ? (
                        ) : (
                            <DSRDetailsLoader rows={8} />
                        )} */}
                    </DialogContent>
                </PerfectScrollbar>
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
                {/* {successOpen && <DuplicateLeadModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default ClusterDsrViewModel;