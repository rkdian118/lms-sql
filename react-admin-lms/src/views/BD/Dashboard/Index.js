import { useEffect, useState } from 'react';
import { Button, Grid, Typography, TextField, Avatar, Zoom } from '@mui/material';
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
    GetAllCallsDataApi,
    GetAllDashboardDataApi,
    GetAllFollowUpsDataApi,
    GetAllRfpDataApi,
    ClearAllFollowUpsData,
    ClearAllCallsData,
    ClearAllRFPData,
    GetDashboardGraphApi
} from 'store/slices/businessAction';
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
import NewTabComponent from './Components/NewTabComponent';
import { IconBook2 } from '@tabler/icons';
import RoundIconCard from 'ui-component/cards/RoundIconCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = (props) => {
    const theme = useTheme();
    const {
        GetAllDashboardDataApi,
        GetDashboardGraphApi,
        GetAllFollowUpsDataApi,
        GetAllCallsDataApi,
        GetAllRfpDataApi,
        LeadFollowUpsGetApi
    } = props;
    // const { openItemKey, modalState } = useSelector((state) => state.menu);
    const { getDashboardData, getDashboardLoading } = useSelector((state) => state.businessAction);
    const [isLoading, setLoading] = useState(true);
    const [collapse, setCollapse] = useState(false);
    const [date, setDate] = useState(['', '']);
    const [leadStatus, setLeadStatus] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth > 1280);
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
        dispatch(ClearAllFollowUpsData());
        dispatch(ClearAllCallsData());
        dispatch(ClearAllRFPData());
        GetAllDashboardDataApi(startDate, endDate);
        GetDashboardGraphApi(startDate, endDate);
        GetAllFollowUpsDataApi(startDate, endDate, 1, 10);
        GetAllCallsDataApi(startDate, endDate, 1, 10);
        GetAllRfpDataApi(startDate, endDate, 1, 10);
        setLoading(false);
    }, [startDate, endDate]);

    useEffect(() => {
        window.addEventListener(
            'resize',
            () => {
                const ismobile = window.innerWidth > 1280;
                if (ismobile !== isMobile) setIsMobile(ismobile);
            },
            false
        );
    }, [isMobile]);

    useEffect(() => {
        LeadFollowUpsGetApi();
    }, []);

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
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        dispatch(ClearAllFollowUpsData());
        dispatch(ClearAllCallsData());
        dispatch(ClearAllRFPData());
        await GetAllDashboardDataApi(start, end);
        await GetDashboardGraphApi(start, end);
        await GetAllFollowUpsDataApi(start, end);
        await GetAllCallsDataApi(start, end);
        await GetAllRfpDataApi(start, end);
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            dispatch(ClearAllFollowUpsData());
            dispatch(ClearAllCallsData());
            dispatch(ClearAllRFPData());
            // console.log(' (Change):', selectedDate);
            await GetAllDashboardDataApi(start, end);
            await GetDashboardGraphApi(start, end);
            await GetAllFollowUpsDataApi(start, end);
            await GetAllCallsDataApi(start, end);
            await GetAllRfpDataApi(start, end);
        }
    };

    const disabledDate = (date) => {
        const currentDate = new Date();
        return date > currentDate;
    };

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
                            secondary={getDashboardData?.totalCalls ? getDashboardData?.totalCalls : 0}
                            content=""
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <RevenueCard */}
                        <RoundIconCard
                            primary="RFP Count"
                            secondary={getDashboardData?.totalRFPs ? getDashboardData?.totalRFPs : 0}
                            content=""
                            iconPrimary={ReceiptLongOutlinedIcon}
                            color="success.dark"
                            bgcolor="success.light"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <RevenueCard */}
                        <RoundIconCard
                            primary="Proposal Count"
                            content=""
                            secondary={`${getDashboardData?.totalProposals ? getDashboardData?.totalProposals : 0}`}
                            iconPrimary={TaskOutlinedIcon}
                            color="warning.dark"
                            bgcolor="warning.light"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <RevenueCard */}
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
            content: <ReportSection startDate={startDate} endDate={endDate} leadStatusCount={LeadStatusDataConvert(getDashboardData)} />
        }
    ];
    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12} md={12} lg={collapse ? 12 : 6}>
                            <MainCard
                                content={false}
                                sx={{ border: '0px solid', padding: '10px' }}
                                title={
                                    <Stack direction="row">
                                        <IconBook2 sx={{ mr: 2 }} /> &nbsp; Today Task
                                    </Stack>
                                }
                                secondary={
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {isMobile ? (
                                            <MuiTooltip
                                                title={collapse ? 'Collapse Left' : 'Collapse Right'}
                                                arrow
                                                disableFocusListener
                                                disableTouchListener
                                                placement="left-start"
                                                TransitionComponent={Zoom}
                                            >
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        ...theme.typography.commonAvatar,
                                                        ...theme.typography.mediumAvatar,
                                                        transition: 'all .2s ease-in-out',
                                                        border: '2px solid',
                                                        bgcolor: theme.palette.background.default,
                                                        boxShadow: '2',

                                                        backgroundColor:
                                                            theme.palette.mode === 'dark'
                                                                ? theme.palette.dark.main
                                                                : theme.palette.primary.light,
                                                        '&[aria-controls="menu-list-grow"],&:hover': {
                                                            boxShadow: '7',
                                                            background: `${theme.palette.primary.main}!important`,
                                                            color: theme.palette.primary.light
                                                        }
                                                    }}
                                                    color="inherit"
                                                    onClick={() => setCollapse(!collapse)}
                                                >
                                                    {collapse ? (
                                                        <ArrowCircleLeftOutlinedIcon stroke={1.5} size="20px" />
                                                    ) : (
                                                        <ArrowCircleRightOutlinedIcon stroke={1.5} size="20px" />
                                                    )}
                                                </Avatar>
                                            </MuiTooltip>
                                        ) : (
                                            ''
                                        )}
                                    </Stack>
                                }
                            >
                                {/* <TabComponent startDate={startDate} endDate={endDate} /> */}
                                <NewTabComponent startDate={startDate} endDate={endDate} />
                            </MainCard>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={collapse ? 12 : 6} sx={{ padding: '24px 0 16px 24px' }}>
                            <MainCard content={false} sx={{ border: '0px solid' }}>
                                {/* <SubCard title="Square Accordion"> */}
                                <Grid container p={1} spacing={gridSpacing}>
                                    <Grid item md={6}>
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
                                            placement="bottomStart"
                                            // disabledDate={disabledDate}
                                            // hoverRange={(date) => [subDays(date, 1), addDays(date, 1)]}
                                        />
                                    </Grid>
                                </Grid>
                                {!collapse ? (
                                    <Accordion data={defaultExpandData} square toggle defaultExpandedId="basic1" />
                                ) : (
                                    <Accordion data={defaultExpandData} square toggle defaultExpandedId="basic1" />
                                )}
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default connect(null, {
    LeadFollowUpsGetApi,
    GetDashboardGraphApi,
    GetAllDashboardDataApi,
    GetAllFollowUpsDataApi,
    GetAllCallsDataApi,
    GetAllRfpDataApi
})(Dashboard);
