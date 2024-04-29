/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import {
    Grid,
    Box,
    Chip,
    Tab,
    Tabs,
    Typography,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Button,
    TextField,
    InputLabel,
    FormHelperText,
    CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
// project imports
import { useTheme, styled } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';
// assets
import MuiTypography from '@mui/material/Typography';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PanoramaTwoToneIcon from '@mui/icons-material/PanoramaTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import TotalLineChartCard from 'ui-component/cards/TotalLineChartCard';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import useConfig from 'hooks/useConfig';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import TabComponent from './TabComponent';
import EarningCard from './Chart/EarningCard';
import chartData from './Chart-Data/Index';
import MarketShareAreaChartCard from './Chart/MarketShareAreaChartCard';
import TotalIncomeDarkCard from './Chart/TotalIncomeDarkCard';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { ErrorMessage, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { DateRangePicker } from 'rsuite';
import { format } from 'date-fns';
import { DateRangeFilter } from 'Helper/Validation';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import SourceLoader from 'ui-component/cards/Skeleton/SourceLoader';
import AllTargetCard from './Chart/AllTargetCard';
import SideIconCard from 'ui-component/cards/SideIconCard';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FitbitIcon from '@mui/icons-material/Fitbit';
import BarChart from './Chart/BarChart';
import NewLeadChart from './Chart/NewLeadChart';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    // backgroundColor: theme.palette.primary.light,
    display: 'flex',
    backgroundColor: '#e3edff',
    color: theme.palette.primary.light,
    margin: '10px',
    overflow: 'hidden',
    position: 'relative'
}));

const ReportSection = ({ leadStatusCount, startDate, endDate, bdeData }) => {
    const theme = useTheme();
    const { getDashboardData, getDashboardLoading } = useSelector((state) => state.clusterLeadAction);
    const [isLoading, setLoading] = useState(true);
    const leadSource = getDashboardData?.leadData?.filter((item) => item.status_type === 'lead_source');
    // const [leadSource, setLeadSource] = useState([] || filteredData);
    // console.log('🚀  leadSource:', leadSource);
    // console.log('🚀 startDate:', startDate === '' ? new Date(getDashboardData?.bdTargets?.month_start_date) : startDate);

    const startOfDate = startDate === '' ? new Date(getDashboardData?.bdTargets?.month_start_date) : new Date(startDate);
    const endOfDate = endDate !== '' ? new Date(endDate) : new Date();

    useEffect(() => {
        setLoading(false);
    }, []);

    const LeadStatusDataConvert = (data) => {
        const filteredData = getDashboardData?.leadData?.filter((item) => item.status_type === 'lead_source');
        filteredData.sort((a, b) => a.status_name.localeCompare(b.status_name));

        return filteredData;
    };

    /* Date Format */
    // let start_date;
    // let end_date;
    // if (date == null) {
    //     start_date = '';
    //     end_date = '';
    // } else {
    //     start_date = date ? format(new Date(date[0]), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
    //     end_date = date ? format(new Date(date[1]), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
    // }

    useEffect(() => {
        setLoading(false);
    }, []);

    // console.log('🚀 report startDate:', startOfDate);

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    {/* <TotalLineChartCard
                        chartData={chartData.TotalLineCardChart1}
                        value="June"
                        title="45%"
                        percentage="45%"
                        bgColor="#5bb4ff"
                    /> */}
                    <AllTargetCard isLoading={getDashboardLoading} getDashboardData={getDashboardData} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <EarningCard isLoading={getDashboardLoading} getDashboardData={getDashboardData} />
                </Grid>
            </Grid>
            <Grid container spacing={0} py={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {/* <BarChart isLoading={isLoading} /> */}
                    <MarketShareAreaChartCard isLoading={isLoading} />
                    {/* <NewLeadChart isLoading={isLoading} /> */}
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
                        bdeData={bdeData}
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
                        color="#2ca58d"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
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
                        color="#c77e23"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
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
                        color="#D49A89"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
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
                        color="#C499F3"
                        // color="#526D82"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
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
                        color="#711A75"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
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
                        color={theme.palette.success.main}
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
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
                        color={theme.palette.primary.dark}
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
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
                        color={theme.palette.error.main}
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
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
                        color="#526D82"
                        isLoading={getDashboardLoading}
                        startOfDate={startOfDate}
                        endOfDate={endOfDate}
                        bdeData={bdeData}
                        // secondarySub="Leads"
                        // onClick={() => dispatch(LeadStatusRedirection(leadStatusCount[1]?.status_name))}
                    />
                </Grid>
            </Grid>
            {/* {getDashboardLoading ? (
                <SourceLoader />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box
                        sx={{
                            width: '5%',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '10px',
                            backgroundColor: '#cbddff'
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                ' &.MuiGrid-root': { pt: '10px' }
                            }}
                        >
                            <Grid container alignItems="center">
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" sx={{ transform: 'rotate(-90deg)', textAlign: 'center' }}>
                                        Source
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ p: 2, width: '95%' }}>
                        <Grid item md={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center">
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="body2">{leadSource[0]?.status_name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" align="right">
                                                {leadSource[0]?.count}%
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LinearProgress variant="determinate" value={leadSource[0]?.count} color="primary" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center">
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="body2">{leadSource[1]?.status_name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" align="right">
                                                {leadSource[1]?.count}%
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LinearProgress variant="determinate" value={leadSource[1]?.count} color="secondary" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center">
                                        <Grid item sm zeroMinWidth>
                                            <Typography variant="body2">{leadSource[2]?.status_name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" align="right">
                                                {leadSource[2]?.count}%
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LinearProgress variant="determinate" value={leadSource[2]?.count} color="primary" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )} */}
        </>
    );
};

export default ReportSection;
