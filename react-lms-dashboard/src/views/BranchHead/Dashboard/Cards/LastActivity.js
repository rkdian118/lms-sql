import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Badge, Button, CardActions, CardContent, Divider, Grid, Typography, Switch, Rating } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import Avatar1 from 'assets/images/users/avatar-1.png';
import Avatar2 from 'assets/images/users/avatar-2.png';
import Avatar3 from 'assets/images/users/avatar-3.png';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { useState } from 'react';
import Transitions from 'ui-component/extended/Transitions';
import { useSelector } from 'react-redux';
import { BASE_URL } from 'config';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import MuiTooltip from '@mui/material/Tooltip';
import { PerformerLoader } from 'ui-component/cards/Skeleton/BranchLoader';
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
import PerfectScrollbar from 'react-perfect-scrollbar';
// ===========================|| DATA WIDGET - USER ACTIVITY CARD ||=========================== //

const FeedsCard = ({ title, count = 0, iconPrimary, messages, bgColor = '' }) => (
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
                            <Avatar sx={{ backgroundColor: bgColor, color: 'rgb(255, 255, 255)' }}>{iconPrimary}</Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Grid container spacing={1}>
                            <Grid item xs zeroMinWidth sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography align="left" variant="body2" sx={{ fontWeight: 600 }}>
                                    {title}
                                </Typography>
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

// const rowData = {
//     lead_positive_response: 0,
//     lead_negative_response: 0,
//     upwork_bids: 0,
//     linkedin_response: 0,
//     upwork_positive_response: 0,
//     lead_assigned: 0,
//     follow_ups: 0,
//     meeting_scheduled: 0,
//     meeting_done: 0,
//     proposal_submitted: 0,
//     estimation_submitted: 0,
//     understanding_queries_submitted: 0,
//     feature_list_shared: 0,
//     phone_call_done: 0,
//     proposal_amount: 0,
//     linkedin_messages: 5000,
//     date: '2024-01-18T00:00:00.000Z'
// };

const LastActivity = ({ title }) => {
    const theme = useTheme();

    const iconSX = {
        fontSize: '0.875rem',
        marginRight: 0.2,
        verticalAlign: 'sub'
    };
    const { getDashboardDsrData, getDashboardDsrLoading } = useSelector((state) => state.clusterAction);
    // console.log('🚀 getDashboardDsrData:', getDashboardDsrData);
    const rowData = getDashboardDsrData;
    const [type, setType] = React.useState('slide');
    const [position, setPosition] = React.useState('');
    const [direction, setDirection] = React.useState('right');
    const [animate, setAnimate] = React.useState(true);
    const [timeValue, setTimeValue] = useState(false);

    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
        setAnimate(!animate);
    };

    return (
        <MainCard title={title} content={false} sx={{ height: '580px', boxShadow: '4', '&:hover': { boxShadow: '12' } }}>
            {/* //'785px' previous height */}
            <PerfectScrollbar
                component="div"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#b2b3b3 #f1f1f1'
                }}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={6} md={12} xl={12}>
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
                    </Grid>
                </Grid>
            </PerfectScrollbar>
        </MainCard>
    );
};

LastActivity.propTypes = {
    title: PropTypes.string
};

export default LastActivity;
