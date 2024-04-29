/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
// project imports
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';
// import MainCard from 'ui-component/cards/MainCard';
import { useSelector } from 'react-redux';
import EarningCard from './Chart/EarningCard';
import MarketShareAreaChartCard from './Chart/MarketShareAreaChartCard';
import PropTypes from 'prop-types';
// material-ui
import { Grid } from '@mui/material';
// assets
// import { Link } from 'react-router-dom';
// import MuiTypography from '@mui/material/Typography';
// import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
// import PanoramaTwoToneIcon from '@mui/icons-material/PanoramaTwoTone';
// import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
// import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
// import TotalLineChartCard from 'ui-component/cards/TotalLineChartCard';
// import ApexCharts from 'apexcharts';
// import Chart from 'react-apexcharts';
// import useConfig from 'hooks/useConfig';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import TabComponent from './TabComponent';
// import chartData from './Chart-Data/Index';
// import TotalIncomeDarkCard from './Chart/TotalIncomeDarkCard';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import moment from 'moment';
// import { ErrorMessage, Formik, useFormik } from 'formik';
// import * as Yup from 'yup';
// import { DateRangePicker } from 'rsuite';
// import { format } from 'date-fns';
// import { DateRangeFilter } from 'Helper/Validation';
// import subDays from 'date-fns/subDays';
// import addDays from 'date-fns/addDays';
// import SourceLoader from 'ui-component/cards/Skeleton/SourceLoader';
// import { dispatch } from 'store';
// import { LeadStatusRedirection } from 'store/slices/commonAction';
import AllTargetCard from './Chart/AllTargetCard';
import SideIconCard from 'ui-component/cards/SideIconCard';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FitbitIcon from '@mui/icons-material/Fitbit';
// import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentTwoTone';
// import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltTwoTone';
// import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayTwoTone';
// import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
// import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
// import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
// import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
// import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
// import BugReportTwoToneIcon from '@mui/icons-material/BugReportTwoTone';
// import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
// import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
// import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
// import BarChart from './Chart/BarChart';

// const CardWrapper = styled(MainCard)(({ theme }) => ({
//     // backgroundColor: theme.palette.primary.light,
//     display: 'flex',
//     backgroundColor: '#e3edff',
//     color: theme.palette.primary.light,
//     margin: '10px',
//     overflow: 'hidden',
//     position: 'relative'
// }));

const ReportSection = ({ leadStatusCount, startDate, endDate }) => {
    const theme = useTheme();
    const { getDashboardData, getDashboardLoading } = useSelector((state) => state.businessAction);
    const [isLoading, setLoading] = useState(true);
    // const leadSource = getDashboardData?.leadData?.filter((item) => item.status_type === 'lead_source');
    // const [leadSource, setLeadSource] = useState([] || filteredData);
    // console.log('🚀  leadSource:', leadSource);

    const startOfDate = startDate === '' ? new Date(getDashboardData?.bdTargets?.month_start_date) : new Date(startDate);
    const endOfDate = endDate !== '' ? new Date(endDate) : new Date();

    useEffect(() => {
        setLoading(false);
    }, []);

    // const LeadStatusDataConvert = (data) => {
    //     const filteredData = getDashboardData?.leadData?.filter((item) => item.status_type === 'lead_source');
    //     filteredData.sort((a, b) => a.status_name.localeCompare(b.status_name));

    //     return filteredData;
    // };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <AllTargetCard isLoading={getDashboardLoading} getDashboardData={getDashboardData} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <EarningCard isLoading={getDashboardLoading} getDashboardData={getDashboardData} />
                </Grid>
            </Grid>
            <Grid container spacing={0} py={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MarketShareAreaChartCard isLoading={isLoading} />
                    {/* <BarChart isLoading={isLoading} /> */}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {/* Assigned Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={BarChartOutlinedIcon}
                        primary={leadStatusCount[1]?.count}
                        secondary={leadStatusCount[1]?.status_name}
                        id=""
                        color={theme.palette.secondary.main}
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* Active Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={FitbitIcon}
                        primary={leadStatusCount[0]?.count}
                        secondary={leadStatusCount[0]?.status_name}
                        id={leadStatusCount[0]?._id}
                        // color="#2ca58d"
                        color={leadStatusCount[0]?.status_color}
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* In discussion Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={AcUnitOutlinedIcon}
                        primary={leadStatusCount[6]?.count}
                        secondary={leadStatusCount[6]?.status_name}
                        id={leadStatusCount[6]?._id}
                        color={leadStatusCount[6]?.status_color}
                        // color="#c77e23"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* Proposal Submitted Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={DescriptionIcon}
                        primary={leadStatusCount[9]?.count}
                        secondary={leadStatusCount[9]?.status_name}
                        id={leadStatusCount[9]?._id}
                        color={leadStatusCount[9]?.status_color}
                        // color="#D49A89"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* Negotiation Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={SwapVertIcon}
                        primary={leadStatusCount[8]?.count}
                        secondary={leadStatusCount[8]?.status_name}
                        id={leadStatusCount[8]?._id}
                        color={leadStatusCount[8]?.status_color}
                        // color="#C499F3"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* Hot prospect Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={WhatshotOutlinedIcon}
                        primary={leadStatusCount[5]?.count}
                        secondary={leadStatusCount[5]?.status_name}
                        id={leadStatusCount[5]?._id}
                        color={leadStatusCount[5]?.status_color}
                        // color="#711A75"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* Closer/Awarded Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={EmojiEventsOutlinedIcon}
                        primary={leadStatusCount[2]?.count}
                        secondary={leadStatusCount[2]?.status_name}
                        id={leadStatusCount[2]?._id}
                        color={leadStatusCount[2]?.status_color}
                        // color={theme.palette.success.main}
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* Hold Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={StopCircleOutlinedIcon}
                        primary={leadStatusCount[4]?.count}
                        secondary={leadStatusCount[4]?.status_name}
                        id={leadStatusCount[4]?._id}
                        color={leadStatusCount[4]?.status_color}
                        // color={theme.palette.primary.dark}
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* Dead Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={BlockOutlinedIcon}
                        primary={leadStatusCount[3]?.count}
                        secondary={leadStatusCount[3]?.status_name}
                        id={leadStatusCount[3]?._id}
                        color={leadStatusCount[3]?.status_color}
                        // color={theme.palette.error.main}
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
                {/* Transfer Leads */}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SideIconCard
                        iconPrimary={MoveDownOutlinedIcon}
                        primary={leadStatusCount[7]?.count}
                        secondary={leadStatusCount[7]?.status_name}
                        id={leadStatusCount[7]?._id}
                        color={leadStatusCount[7]?.status_color}
                        // color="#526D82"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
            </Grid>
        </>
    );
};

ReportSection.propTypes = {
    leadStatusCount: PropTypes.array,
    startDate: PropTypes.string,
    endDate: PropTypes.string
};
export default ReportSection;
