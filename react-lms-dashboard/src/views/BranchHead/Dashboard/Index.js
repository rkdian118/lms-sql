import { useEffect, useState } from 'react';
import { Button, Grid, Card, Typography, TextField, Autocomplete } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import UnderConstruction from 'views/pages/maintenance/UnderConstruction';
import LeadReport from './Components/LeadReport';
import ClosureReport from './Components/ClosureReport';
import ProposalReport from './Components/ProposalReport';
import CallsReport from './Components/CallsReport';
import MonthCommit from './Components/MonthCommit';
import HoverDataCard from 'ui-component/cards/HoverDataCard';
import { useTheme } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StaticDataCard from './Cards/StaticDataCard';
import DatasetLinkedOutlinedIcon from '@mui/icons-material/DatasetLinkedOutlined';
import RevenueCard from 'ui-component/cards/RevenueCard';
import SalesCard from './Cards/SalesCard';
import PieChart from './Chart/PieChart';
import BarChart from './Chart/BarChart';
import ActiveSalesCard from './Cards/ActiveSalesCard';
import TopPerformer from './Cards/TopPerformer';
import { DateRangeFilter, months } from 'Helper/Validation';
import { format } from 'date-fns';
import { dispatch } from 'store';
import {
    GetClusterLeadSelectedDropDownApi,
    GetDashboardDsrApi,
    GetInfoApi,
    GetBdeDropdownSelectedApi,
    GetTargetGraphApi,
    GetTopAndLessPerformerApi
} from 'store/slices/clusterAction';
import { useSelector } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import moment from 'moment';
import { DateRangePicker } from 'rsuite';
import LessPerformer from './Cards/LessPerformer';
import FadeInWhenVisible from './Animation/Animation';
import MixedChart from './Chart/MixedChart';
import LastActivity from './Cards/LastActivity';
import LeadStatusCard from './Cards/LeadStatusCard';
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
import RedialBarChart from './Chart/RedialBarChart';
import AnalyticsChartCard from 'ui-component/cards/AnalyticsChartCard';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
// ==============================|| DEFAULT DASHBOARD ||============================== //
// ==============================|| WIDGET - PERCENTAGE CHART ||============================== //

const chartData = {
    height: 224,
    type: 'bar',
    options: {
        chart: {
            id: 'percentage-chart',
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '55%',
                distributed: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 0
        },
        xaxis: {
            categories: ['Desktop', 'Mobile', 'Tablet', 'Laptop']
        }
    },
    series: [
        {
            name: 'Requests',
            data: [66.6, 29.7, 32.8, 50]
        }
    ]
};

const Dashboard = () => {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [clusterLeadData, setClusterLeadData] = useState('');
    const [bdeData, setBdeData] = useState('');
    const [date, setDate] = useState(['', '']);
    const { getTargetGraphData, getClDropdownSelectedList, getBdeDropdownSelectedList, getLeadInfoData, getLeadInfoLoading } = useSelector(
        (state) => state.clusterAction
    );
    // console.log('🚀 getLeadInfoData:', getLeadInfoData);
    let startDate;
    let endDate;
    if (date == null) {
        startDate = '';
        endDate = '';
    } else {
        // console.log('hi', date);
        startDate = date.length > 0 && date[0] !== '' ? moment(date[0]).format('YYYY-MM-DD') : '';
        endDate = date.length > 0 && date[0] !== '' ? moment(date[1]).format('YYYY-MM-DD') : '';
    }

    // const currentMonthTarget = { month_start_date: '2024-01-10T05:15:08.000Z' };
    const startOfDate = startDate === '' ? new Date(getTargetGraphData?.currentMonthTarget?.month_start_date) : new Date(startDate);
    const endOfDate = endDate !== '' ? new Date(endDate) : new Date();

    useEffect(() => {
        dispatch(GetInfoApi(startDate, endDate, clusterLeadData, bdeData));
        dispatch(GetTopAndLessPerformerApi(startDate, endDate));
        dispatch(GetDashboardDsrApi(startDate, endDate));
    }, [dispatch, startDate, endDate, clusterLeadData, bdeData]);

    useEffect(() => {
        setLoading(false);
        dispatch(GetTargetGraphApi('2023'));
        dispatch(GetClusterLeadSelectedDropDownApi());
        dispatch(GetBdeDropdownSelectedApi([]));
    }, [dispatch]);

    const LeadStatusDataConvert = (data) => {
        const filteredData = data?.leadData?.filter((item) => item.status_type === 'lead_status');
        const allAsignCount = filteredData?.reduce((total, item) => total + item.count, 0);

        // Add the "Assigned Leads" object to the filtered data
        filteredData?.push({
            status_type: 'lead_status',
            status_name: 'Assigned Leads',
            _id: '', // You can generate a unique ID
            count: allAsignCount
        });

        filteredData?.sort((a, b) => a.status_name.localeCompare(b.status_name));
        return filteredData;
    };

    const leadStatusCount = LeadStatusDataConvert(getLeadInfoData);
    // console.log('🚀 leadStatusCount:', leadStatusCount);

    const onOk = async (selectedDate) => {
        // console.log(' (OK):', selectedDate);
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        // await ClusterGetAllDashboardDataApi(start, end, bdeData);
        dispatch(GetInfoApi(start, end, clusterLeadData, bdeData));
        dispatch(GetTopAndLessPerformerApi(start, end));
        dispatch(GetDashboardDsrApi(start, end));
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            // console.log(' (Change):', selectedDate);
            // await ClusterGetAllDashboardDataApi(start, end, bdeData);
            dispatch(GetInfoApi(start, end, clusterLeadData, bdeData));
            dispatch(GetTopAndLessPerformerApi(start, end));
            dispatch(GetDashboardDsrApi(start, end));
        }
    };

    const handleMonthChange = (event, newValue) => {
        setSelectedMonth(newValue ? newValue.label : '');
    };

    const initialValues = {
        selectedYear: null || new Date('2023')
    };

    const formik = useFormik({
        initialValues
    });

    const handleDatePickerChange = (newValue) => {
        // Set the formik value
        formik.setFieldValue('selectedYear', newValue);
        const FormatYear = moment(newValue).format('YYYY');
        dispatch(GetTargetGraphApi(FormatYear));
        // console.log('🚀 newValue:', FormatYear);
    };

    const onClusterLeadChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setClusterLeadData(selectValue);
        const selectedBDE = newValue ? [newValue._id] : [];
        dispatch(GetBdeDropdownSelectedApi(selectedBDE));
        dispatch(GetInfoApi(startDate, endDate, selectValue, ''));
        setBdeData('');
    };
    const onBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);
        dispatch(GetInfoApi(startDate, endDate, clusterLeadData, selectValue));
    };
    return (
        <FadeInWhenVisible>
            <Grid container spacing={2}>
                {/* <Grid item xs={12} md={12}>
                <UnderConstruction />
            </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={8}>
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12} md={12}>
                            <Card sx={{ position: 'relative', color: '#fff', p: '5px', boxShadow: '4' }}>
                                <Grid container spacing={2}>
                                    {/* <Grid item xs={3} md={3}>
                            <Autocomplete
                                id="month-select"
                                fullWidth
                                options={months}
                                getOptionLabel={(option) => option.label}
                                value={{ label: selectedMonth }}
                                onChange={handleMonthChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Month"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'off' // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Grid> */}
                                    <Grid item xs={12} sm={12} md={4}>
                                        {/* <Autocomplete
                                        options={getClDropdownSelectedList}
                                        getOptionLabel={(option) => (option ? option.name : '')}
                                        value={getClDropdownSelectedList.find((option) => option._id === clusterLeadData) || null}
                                        onChange={onClusterLeadChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select Cluster Lead"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'off' // disable autocomplete and autofill
                                                }}
                                                sx={{
                                                    '& .MuiTextField-root': {
                                                        borderRadius: '5px' // Set your desired borderRadius here
                                                    }
                                                }}
                                            />
                                        )}
                                    /> */}
                                        <Autocomplete
                                            options={getClDropdownSelectedList}
                                            getOptionLabel={(option) => (option ? option.name : '')}
                                            value={getClDropdownSelectedList.find((option) => option._id === clusterLeadData) || null}
                                            onChange={onClusterLeadChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Cluster Lead"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off' // disable autocomplete and autofill
                                                    }}
                                                    //  size="medium"
                                                    size="small"
                                                    // style={{
                                                    //     minWidth: '200px'
                                                    // }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Autocomplete
                                            options={getBdeDropdownSelectedList}
                                            getOptionLabel={(option) => (option ? option.name : '')}
                                            value={getBdeDropdownSelectedList.find((option) => option._id === bdeData) || null}
                                            onChange={onBdeChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select BDE"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off' // disable autocomplete and autofill
                                                    }}
                                                    size="small"
                                                    // style={{
                                                    //     minWidth: '200px'
                                                    // }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <DateRangePicker
                                            showOneCalendar
                                            size="lg"
                                            placeholder="Please Select Date-Range"
                                            className="w-100 input d-inline"
                                            character=" -To- "
                                            block
                                            value={date}
                                            cleanable
                                            onOk={onOk}
                                            onChange={onChange}
                                            format="dd-MMM-yyyy"
                                            onKeyDown={(e) => e.preventDefault()}
                                            ranges={DateRangeFilter}
                                            // disabledDate={disabledDate}
                                            style={{
                                                borderRadius: '10px !important'
                                            }}
                                            placement="bottomEnd"
                                            // hoverRange={(date) => [subDays(date, 1), addDays(date, 1)]}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} xl={12}>
                            <Grid container spacing={2}>
                                {/* Assigned Leads */}
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                        clusterLeadData={clusterLeadData}
                                        bdeData={bdeData}
                                        iconPrimary={BarChartOutlinedIcon}
                                        primary={leadStatusCount[1]?.count}
                                        secondary={leadStatusCount[1]?.status_name}
                                        id=""
                                        color={theme.palette.secondary.main}
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid>
                                {/* Active Leads */}
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                        clusterLeadData={clusterLeadData}
                                        bdeData={bdeData}
                                        iconPrimary={FitbitIcon}
                                        primary={leadStatusCount[0]?.count}
                                        secondary={leadStatusCount[0]?.status_name}
                                        id={leadStatusCount[0]?._id}
                                        color="#2ca58d"
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid>
                                {/* In discussion Leads */}
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                        clusterLeadData={clusterLeadData}
                                        bdeData={bdeData}
                                        iconPrimary={AcUnitOutlinedIcon}
                                        primary={leadStatusCount[6]?.count}
                                        secondary={leadStatusCount[6]?.status_name}
                                        id={leadStatusCount[6]?._id}
                                        color="#c77e23"
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid>
                                {/* Proposal Submitted Leads */}
                                {/* <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                    clusterLeadData={clusterLeadData}
                                    bdeData={bdeData}
                                        iconPrimary={DescriptionIcon}
                                        primary={leadStatusCount[9]?.count}
                                        secondary={leadStatusCount[9]?.status_name}
                                        id={leadStatusCount[9]?._id}
                                        color="#D49A89"
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid> */}
                                {/* Negotiation Leads */}
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                        clusterLeadData={clusterLeadData}
                                        bdeData={bdeData}
                                        iconPrimary={SwapVertIcon}
                                        primary={leadStatusCount[8]?.count}
                                        secondary={leadStatusCount[8]?.status_name}
                                        id={leadStatusCount[8]?._id}
                                        color="#C499F3"
                                        // color="#526D82"
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid>
                                {/* Hot prospect Leads */}
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                        clusterLeadData={clusterLeadData}
                                        bdeData={bdeData}
                                        iconPrimary={WhatshotOutlinedIcon}
                                        primary={leadStatusCount[5]?.count}
                                        secondary={leadStatusCount[5]?.status_name}
                                        id={leadStatusCount[5]?._id}
                                        color="#711A75"
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid>
                                {/* Closer/Awarded Leads */}
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                        clusterLeadData={clusterLeadData}
                                        bdeData={bdeData}
                                        iconPrimary={EmojiEventsOutlinedIcon}
                                        primary={leadStatusCount[2]?.count}
                                        secondary={leadStatusCount[2]?.status_name}
                                        id={leadStatusCount[2]?._id}
                                        color={theme.palette.success.main}
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid>
                                {/* Hold Leads */}
                                {/* <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                    clusterLeadData={clusterLeadData}
                                    bdeData={bdeData}
                                        iconPrimary={StopCircleOutlinedIcon}
                                        primary={leadStatusCount[4]?.count}
                                        secondary={leadStatusCount[4]?.status_name}
                                        id={leadStatusCount[4]?._id}
                                        color={theme.palette.primary.dark}
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid> */}
                                {/* Dead Leads */}
                                {/* <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                    clusterLeadData={clusterLeadData}
                                    bdeData={bdeData}
                                        iconPrimary={BlockOutlinedIcon}
                                        primary={leadStatusCount[3]?.count}
                                        secondary={leadStatusCount[3]?.status_name}
                                        id={leadStatusCount[3]?._id}
                                        color={theme.palette.error.main}
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid> */}
                                {/* Transfer Leads */}
                                {/* <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <LeadStatusCard
                                    clusterLeadData={clusterLeadData}
                                    bdeData={bdeData}
                                        iconPrimary={MoveDownOutlinedIcon}
                                        primary={leadStatusCount[7]?.count}
                                        secondary={leadStatusCount[7]?.status_name}
                                        id={leadStatusCount[7]?._id}
                                        color="#526D82"
                                        isLoading={getLeadInfoLoading}
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                    />
                                </Grid> */}
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <MainCard sx={{ boxShadow: '4', '&:hover': { boxShadow: '12' } }}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} sm={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="h4">Assigned Target For This Year</Typography>
                                            </Grid>
                                            <Grid item>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        views={['year']}
                                                        renderInput={(props) => (
                                                            <TextField
                                                                fullWidth
                                                                {...props}
                                                                inputProps={{
                                                                    ...props.inputProps,
                                                                    autoComplete: 'off'
                                                                }}
                                                                onKeyDown={(e) => e.preventDefault()}
                                                            />
                                                        )}
                                                        value={formik.values.selectedYear}
                                                        // onChange={(newValue) => {
                                                        //     formik.setFieldValue('selectedYear', newValue);
                                                        // }}
                                                        onChange={handleDatePickerChange}
                                                        maxDate={new Date()}
                                                        minDate={new Date('2021-01-01')}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} sx={{ '&.MuiGrid-root': { pt: 0 } }}>
                                        {/* <BarChart /> */}
                                        <MixedChart />
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} xl={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <StaticDataCard
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                        type={1}
                                        title="Internal Leads"
                                        iconPrimary={DatasetLinkedOutlinedIcon}
                                        primary={getLeadInfoData?.internal_leads}
                                        secondary="10% From Last 6 Months"
                                        color={theme.palette.primary.main}
                                        bgcolor="primary.light"
                                        isLoading={getLeadInfoLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <StaticDataCard
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                        type={1}
                                        title="External Leads"
                                        iconPrimary={DatasetLinkedOutlinedIcon}
                                        primary={getLeadInfoData?.external_leads}
                                        secondary="10% From Last 6 Months"
                                        color={theme.palette.success.main}
                                        bgcolor="success.light"
                                        isLoading={getLeadInfoLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <StaticDataCard
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                        title="Calls"
                                        type={2}
                                        iconPrimary={DatasetLinkedOutlinedIcon}
                                        primary={getLeadInfoData?.calls_done}
                                        secondary="10% From Last 6 Months"
                                        color={theme.palette.secondary.main}
                                        bgcolor="secondary.light"
                                        isLoading={getLeadInfoLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <StaticDataCard
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                        title="Initial Calls"
                                        type={2}
                                        iconPrimary={DatasetLinkedOutlinedIcon}
                                        primary={getLeadInfoData?.initial_calls}
                                        secondary="10% From Last 6 Months"
                                        color={theme.palette.error.main}
                                        bgcolor="error.light"
                                        isLoading={getLeadInfoLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <StaticDataCard
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                        title="Proposal"
                                        type={3}
                                        iconPrimary={DatasetLinkedOutlinedIcon}
                                        primary={getLeadInfoData?.proposals}
                                        secondary="10% From Last 6 Months"
                                        color={theme.palette.warning.dark}
                                        bgcolor="warning.light"
                                        isLoading={getLeadInfoLoading}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} xl={4}>
                                    <StaticDataCard
                                        startOfDate={startOfDate}
                                        endOfDate={endOfDate}
                                        title="Proposal Value"
                                        type={3}
                                        iconPrimary={DatasetLinkedOutlinedIcon}
                                        primary={getLeadInfoData?.proposal_amount}
                                        secondary="10% From Last 6 Months"
                                        color={theme.palette.grey900}
                                        bgcolor="grey.100"
                                        isLoading={getLeadInfoLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* <Grid item xs={12} sm={12} md={6} xl={6}>
                            <LessPerformer title="Bottom Performer" />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} xl={4}>
                            <StaticDataCard
                                startOfDate={startOfDate}
                                endOfDate={endOfDate}
                                title="In Discussion"
                                type={1}
                                iconPrimary={DatasetLinkedOutlinedIcon}
                                primary={getLeadInfoData?.discussion_leads}
                                secondary="10% From Last 6 Months"
                                color={theme.palette.orange.main}
                                bgcolor="orange.light"
                                isLoading={getLeadInfoLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <StaticDataCard
                                startOfDate={startOfDate}
                                endOfDate={endOfDate}
                                type={1}
                                title="Invoice"
                                iconPrimary={DatasetLinkedOutlinedIcon}
                                primary={getLeadInfoData?.calls_done}
                                secondary="10% From Last 6 Months"
                                color={theme.palette.primary200}
                                bgcolor="secondary.200"
                                isLoading={getLeadInfoLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <StaticDataCard
                                startOfDate={startOfDate}
                                endOfDate={endOfDate}
                                type={1}
                                title="Advance Record"
                                iconPrimary={DatasetLinkedOutlinedIcon}
                                primary={getLeadInfoData?.calls_done}
                                secondary="10% From Last 6 Months"
                                color={theme.palette.secondary200}
                                bgcolor="secondary.light"
                                isLoading={getLeadInfoLoading}
                            />
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* <PieChart /> */}
                            <RedialBarChart />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} xl={12}>
                            <TopPerformer title="Top Performer" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} xl={12}>
                            <LastActivity
                                title="Last Day Activity"
                                iconPrimary={DatasetLinkedOutlinedIcon}
                                primary={getLeadInfoData?.proposal_amount}
                                secondary="10% From Last 6 Months"
                                color={theme.palette.grey900}
                                bgcolor="grey.100"
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={12}>
                            <ActiveSalesCard />
                        </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
        </FadeInWhenVisible>
    );
};

export default Dashboard;
