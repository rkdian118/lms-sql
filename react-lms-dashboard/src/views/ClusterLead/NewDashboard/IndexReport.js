import { useEffect, useState } from 'react';
import { Button, Grid, Typography, TextField, Autocomplete, Avatar, Zoom, Card } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/system';
import TabComponent from './Components/TabComponent';
import TeamMember from './Components/TeamMember';
import { connect, useSelector } from 'react-redux';
import ReportSection from './Components/ReportSection';
import ViewLead from './Components/Models/ViewLead';
import { MobileDateRangePicker } from '@mui/lab';
import { DateRangePicker } from 'rsuite';
import { DateRangeFilter } from 'Helper/Validation';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import moment from 'moment';
import {
    ClusterGetAllCallsDataApi,
    ClusterGetAllDashboardDataApi,
    ClusterGetAllFollowUpsDataApi,
    ClusterGetAllRfpDataApi,
    ClusterGetAllBdeDropdownApi,
    ClearAllFollowUpsData,
    ClearAllCallsData,
    ClearAllRFPData,
    ClusterLeadDashboardGraphApi
} from 'store/slices/clusterLeadAction';
import { dispatch } from 'store';
import { format } from 'date-fns';
import { LeadFollowUpsGetApi } from 'store/slices/masterAction';
import SubCard from 'ui-component/cards/SubCard';
import Accordion from 'ui-component/extended/Accordion';
import RevenueCard from 'ui-component/cards/RevenueCard';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import MuiTooltip from '@mui/material/Tooltip';
import RoundIconCard from 'ui-component/cards/RoundIconCard';
import { IconBook2 } from '@tabler/icons';
import NewTabComponent from './Components/NewTabComponent';
import { ClearDateRangeFilterSetup, DateRangeFilterSetup } from 'store/slices/commonAction';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const IndexReport = (props) => {
    const {
        ClusterGetAllBdeDropdownApi,
        ClusterGetAllDashboardDataApi,
        ClusterGetAllFollowUpsDataApi,
        ClusterGetAllCallsDataApi,
        ClusterGetAllRfpDataApi,
        LeadFollowUpsGetApi,
        ClusterLeadDashboardGraphApi
    } = props;
    const theme = useTheme();
    // const { openItemKey, modalState } = useSelector((state) => state.menu);
    const { getDashboardData, getBdeDropdownList } = useSelector((state) => state.clusterLeadAction);
    const [isLoading, setLoading] = useState(true);
    const [openNewModel, setOpenNewModel] = useState(false);
    const [date, setDate] = useState(['', '']);
    const [leadStatus, setLeadStatus] = useState([]);
    const [bdeData, setBdeData] = useState('');
    const [collapse, setCollapse] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth > 1280);
    // console.log('🚀 date:', date);
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

    useEffect(() => {
        LeadFollowUpsGetApi();
        ClusterGetAllBdeDropdownApi();
    }, []);

    // console.log('🚀index startDate:', startDate, endDate);
    useEffect(() => {
        ClusterGetAllDashboardDataApi(startDate, endDate, bdeData);
        ClusterLeadDashboardGraphApi(startDate, endDate, bdeData);
        setLoading(false);
    }, [startDate, endDate, bdeData]);

    const LeadStatusDataConvert = (data) => {
        const filteredData = data?.leadData?.filter((item) => item.status_type === 'lead_status');
        const allAsignCount = filteredData.reduce((total, item) => total + item.count, 0);

        // Add the "Assigned Leads" object to the filtered data
        filteredData.push({
            status_type: 'lead_status',
            status_name: 'Assigned Leads',
            _id: '', // You can generate a unique ID
            count: allAsignCount
        });

        filteredData.sort((a, b) => a.status_name.localeCompare(b.status_name));

        return filteredData;
    };

    // Usage
    //   const getDashboardData = /* your data source */;
    // console.log('Filtered Data:', leadStatus);

    const onOk = async (selectedDate) => {
        // This function is called when the "OK" button is clicked.
        // console.log(' (OK):', selectedDate);
        dispatch(ClearDateRangeFilterSetup());
        dispatch(DateRangeFilterSetup({ start: selectedDate[0], end: selectedDate[1] }));
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        await ClusterGetAllDashboardDataApi(start, end, bdeData);
        await ClusterLeadDashboardGraphApi(start, end, bdeData);
        await ClusterGetAllFollowUpsDataApi(start, end, bdeData);
        await ClusterGetAllCallsDataApi(start, end, bdeData);
        await ClusterGetAllRfpDataApi(start, end, bdeData);
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            dispatch(ClearDateRangeFilterSetup());
            dispatch(DateRangeFilterSetup({ start: selectedDate[0], end: selectedDate[1] }));
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            // console.log(' (Change):', selectedDate);
            await ClusterGetAllDashboardDataApi(start, end, bdeData);
            await ClusterLeadDashboardGraphApi(start, end, bdeData);
            await ClusterGetAllFollowUpsDataApi(start, end, bdeData);
            await ClusterGetAllCallsDataApi(start, end, bdeData);
            await ClusterGetAllRfpDataApi(start, end, bdeData);
        }
    };

    const disabledDate = (date) => {
        const currentDate = new Date();
        return date > currentDate;
    };

    const onBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);
        ClusterGetAllDashboardDataApi(startDate, endDate, selectValue);
        ClusterLeadDashboardGraphApi(startDate, endDate, selectValue);
    };

    // console.log('object', getDashboardData);
    const defaultExpandData = [
        {
            id: 'basic2',
            defaultExpand: false,
            title: 'Summary',
            content: (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <RoundIconCard
                            iconPrimary={PhoneForwardedIcon}
                            color="primary.main"
                            bgcolor="primary.light"
                            primary="Calls Count"
                            secondary={
                                getDashboardData?.totalCalls?.length > 0 && getDashboardData?.totalCalls[0]?.count
                                    ? getDashboardData?.totalCalls[0]?.count
                                    : 0
                            }
                            content=""
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <RoundIconCard
                            primary="RFP Count"
                            secondary={
                                getDashboardData?.totalRFPs?.length > 0 && getDashboardData?.totalRFPs[0]?.count
                                    ? getDashboardData?.totalRFPs[0]?.count
                                    : 0
                            }
                            content=""
                            iconPrimary={ReceiptLongOutlinedIcon}
                            color="success.dark"
                            bgcolor="success.light"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <RoundIconCard
                            primary="Proposal Count"
                            content=""
                            secondary={
                                getDashboardData?.totalProposals?.length > 0 && getDashboardData?.totalProposals[0]?.count
                                    ? getDashboardData?.totalProposals[0]?.count
                                    : 0
                            }
                            iconPrimary={TaskOutlinedIcon}
                            color="warning.dark"
                            bgcolor="warning.light"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <RoundIconCard
                            primary="Proposal Amount"
                            secondary={`$ ${getDashboardData?.totalProposalAmount ? getDashboardData?.totalProposalAmount : 0}`}
                            content=""
                            iconPrimary={GroupOutlinedIcon}
                            color="error.dark"
                            bgcolor="error.light"
                        />
                    </Grid>
                </Grid>
            )
        },
        {
            id: 'basic1',
            defaultExpand: true,
            title: 'Targets & Leads Details With Graph',
            content: (
                <ReportSection
                    bdeData={bdeData}
                    startDate={startDate}
                    endDate={endDate}
                    leadStatusCount={LeadStatusDataConvert(getDashboardData)}
                />
            )
        }
    ];

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card sx={{ position: 'relative', color: '#fff', p: '5px', mb: 2, boxShadow: '4' }}>
                        <Autocomplete
                            options={getBdeDropdownList}
                            getOptionLabel={(option) => (option ? option.name : '')}
                            value={getBdeDropdownList.find((option) => option._id === bdeData) || null}
                            onChange={onBdeChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select BDE"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off' // disable autocomplete and autofill
                                    }}
                                    // size="medium"
                                    size="small"
                                    sx={{
                                        // minWidth: '250px',
                                        '& .MuiTextField-root': {
                                            borderRadius: '5px' // Set your desired borderRadius here
                                        }
                                        // borderRadius: '5px'
                                    }}
                                />
                            )}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card sx={{ position: 'relative', color: '#fff', p: '5px', mb: 2, boxShadow: '4' }}>
                        <DateRangePicker
                            showOneCalendar
                            size="md"
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
                            style={{
                                borderRadius: '10px !important'
                            }}
                            placement="bottomEnd"
                        />
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <RoundIconCard
                        iconPrimary={PhoneForwardedIcon}
                        color="primary.main"
                        bgcolor="primary.light"
                        primary="Calls Count"
                        secondary={
                            getDashboardData?.totalCalls?.length > 0 && getDashboardData?.totalCalls[0]?.count
                                ? getDashboardData?.totalCalls[0]?.count
                                : 0
                        }
                        content=""
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <RoundIconCard
                        primary="RFP Count"
                        secondary={
                            getDashboardData?.totalRFPs?.length > 0 && getDashboardData?.totalRFPs[0]?.count
                                ? getDashboardData?.totalRFPs[0]?.count
                                : 0
                        }
                        content=""
                        iconPrimary={ReceiptLongOutlinedIcon}
                        color="success.dark"
                        bgcolor="success.light"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <RoundIconCard
                        primary="Proposal Count"
                        content=""
                        secondary={
                            getDashboardData?.totalProposals?.length > 0 && getDashboardData?.totalProposals[0]?.count
                                ? getDashboardData?.totalProposals[0]?.count
                                : 0
                        }
                        iconPrimary={TaskOutlinedIcon}
                        color="warning.dark"
                        bgcolor="warning.light"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <RoundIconCard
                        primary="Proposal Amount"
                        secondary={`$ ${getDashboardData?.totalProposalAmount ? getDashboardData?.totalProposalAmount : 0}`}
                        content=""
                        iconPrimary={GroupOutlinedIcon}
                        color="error.dark"
                        bgcolor="error.light"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ReportSection
                        bdeData={bdeData}
                        startDate={startDate}
                        endDate={endDate}
                        leadStatusCount={LeadStatusDataConvert(getDashboardData)}
                    />
                </Grid>
            </Grid>
            {/* <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={12} lg={collapse ? 12 : 6} sx={{ padding: '24px 0 16px 24px' }}>
                    <MainCard content={false} sx={{ border: '0px solid' }}>
                        {!collapse ? (
                            <Accordion data={defaultExpandData} square toggle defaultExpandedId="basic1" />
                        ) : (
                            <Accordion data={defaultExpandData} square toggle defaultExpandedId="basic1" />
                        )}
                    </MainCard>
                </Grid>
            </Grid> */}
        </>
    );
};

export default connect(null, {
    ClusterGetAllBdeDropdownApi,
    LeadFollowUpsGetApi,
    ClusterGetAllDashboardDataApi,
    ClusterGetAllFollowUpsDataApi,
    ClusterGetAllCallsDataApi,
    ClusterGetAllRfpDataApi,
    ClusterLeadDashboardGraphApi
})(IndexReport);
