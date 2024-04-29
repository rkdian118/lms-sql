import { useEffect, useState } from 'react';
import { Button, Grid, Typography, TextField, Avatar, Zoom, Card } from '@mui/material';
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
const IndexReport = (props) => {
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
        startDate = date.length > 0 && date[0] !== '' ? moment(date[0]).format('YYYY-MM-DD') : '';
        endDate = date.length > 0 && date[0] !== '' ? moment(date[1]).format('YYYY-MM-DD') : '';
    }

    useEffect(() => {
        GetAllDashboardDataApi(startDate, endDate);
        GetDashboardGraphApi(startDate, endDate);
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

    const onOk = async (selectedDate) => {
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        await GetAllDashboardDataApi(start, end);
        await GetDashboardGraphApi(start, end);
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            await GetAllDashboardDataApi(start, end);
            await GetDashboardGraphApi(start, end);
        }
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Card sx={{ position: 'relative', color: '#fff', p: '5px', mb: 2, boxShadow: '4' }}>
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
                        secondary={getDashboardData?.totalCalls ? getDashboardData?.totalCalls : 0}
                        content=""
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
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
                <Grid item xs={12} sm={12} md={6} lg={3}>
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
                <Grid item xs={12} sm={12} md={6} lg={3}>
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
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ReportSection startDate={startDate} endDate={endDate} leadStatusCount={LeadStatusDataConvert(getDashboardData)} />
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
})(IndexReport);
