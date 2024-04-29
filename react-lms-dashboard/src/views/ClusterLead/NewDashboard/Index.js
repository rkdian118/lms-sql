import { useEffect, useState } from 'react';
import { Button, Grid, Typography, TextField, Autocomplete, Avatar, Zoom } from '@mui/material';
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
import {
    CallStatusGetApi,
    LeadFollowUpsGetApi,
    LeadStatusGetApi,
    ProjectionStatusGetApi,
    RfpStatusGetApi
} from 'store/slices/masterAction';
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
const Dashboard = (props) => {
    const {
        ClusterGetAllBdeDropdownApi,
        ClusterGetAllDashboardDataApi,
        ClusterGetAllFollowUpsDataApi,
        ClusterGetAllCallsDataApi,
        ClusterGetAllRfpDataApi,
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
        ClusterGetAllFollowUpsDataApi(startDate, endDate, bdeData, 1, 10);
        ClusterGetAllCallsDataApi(startDate, endDate, bdeData, 1, 10);
        ClusterGetAllRfpDataApi(startDate, endDate, bdeData, 1, 10);
        setLoading(false);
    }, [startDate, endDate, bdeData]);

    useEffect(() => {
        ClusterGetAllBdeDropdownApi();
        dispatch(LeadFollowUpsGetApi());
        dispatch(ProjectionStatusGetApi());
        dispatch(LeadStatusGetApi());
        dispatch(CallStatusGetApi());
        dispatch(RfpStatusGetApi());
    }, []);

    // const LeadStatusDataConvert = (data) => {
    //     const filteredData = data?.leadData?.filter((item) => item.status_type === 'lead_status');
    //     const allAsignCount = filteredData.reduce((total, item) => total + item.count, 0);

    //     // Add the "Assigned Leads" object to the filtered data
    //     filteredData.push({
    //         status_type: 'lead_status',
    //         status_name: 'Assigned Leads',
    //         _id: '', // You can generate a unique ID
    //         count: allAsignCount
    //     });

    //     filteredData.sort((a, b) => a.status_name.localeCompare(b.status_name));

    //     return filteredData;
    // };

    // Usage
    //   const getDashboardData = /* your data source */;
    // console.log('Filtered Data:', leadStatus);

    const onOk = async (selectedDate) => {
        // This function is called when the "OK" button is clicked.
        // console.log(' (OK):', selectedDate);
        dispatch(ClearAllFollowUpsData());
        dispatch(ClearAllCallsData());
        dispatch(ClearAllRFPData());
        // dispatch(ClearDateRangeFilterSetup());
        // dispatch(DateRangeFilterSetup({ start: selectedDate[0], end: selectedDate[1] }));
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        // await ClusterGetAllDashboardDataApi(start, end, bdeData);
        // await ClusterLeadDashboardGraphApi(start, end, bdeData);
        await ClusterGetAllFollowUpsDataApi(start, end, bdeData);
        await ClusterGetAllCallsDataApi(start, end, bdeData);
        await ClusterGetAllRfpDataApi(start, end, bdeData);
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            dispatch(ClearAllFollowUpsData());
            dispatch(ClearAllCallsData());
            dispatch(ClearAllRFPData());
            // dispatch(ClearDateRangeFilterSetup());
            // dispatch(DateRangeFilterSetup({ start: selectedDate[0], end: selectedDate[1] }));
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            // console.log(' (Change):', selectedDate);
            // await ClusterGetAllDashboardDataApi(start, end, bdeData);
            // await ClusterLeadDashboardGraphApi(start, end, bdeData);
            await ClusterGetAllFollowUpsDataApi(start, end, bdeData);
            await ClusterGetAllCallsDataApi(start, end, bdeData);
            await ClusterGetAllRfpDataApi(start, end, bdeData);
        }
    };

    // const disabledDate = (date) => {
    //     const currentDate = new Date();
    //     return date > currentDate;
    // };

    const onBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);

        dispatch(ClearAllFollowUpsData());
        dispatch(ClearAllCallsData());
        dispatch(ClearAllRFPData());
        // ClusterGetAllDashboardDataApi(startDate, endDate, selectValue);
        // ClusterLeadDashboardGraphApi(startDate, endDate, selectValue);
        ClusterGetAllFollowUpsDataApi(startDate, endDate, selectValue);
        ClusterGetAllCallsDataApi(startDate, endDate, selectValue);
        ClusterGetAllRfpDataApi(startDate, endDate, selectValue);
    };

    return (
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
                                    minWidth: '250px',
                                    '& .MuiTextField-root': {
                                        borderRadius: '5px' // Set your desired borderRadius here
                                    }
                                    // borderRadius: '5px'
                                }}
                            />
                        )}
                    />
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
                        // disabledDate={disabledDate}
                        style={{
                            borderRadius: '10px !important',
                            width: '100%'
                        }}
                        placement="bottomEnd"
                        // hoverRange={(date) => [subDays(date, 1), addDays(date, 1)]}
                    />
                </Stack>
            }
        >
            {/* <TabComponent startDate={startDate} endDate={endDate} /> */}
            <NewTabComponent startDate={startDate} endDate={endDate} bdeData={bdeData} />
        </MainCard>
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
})(Dashboard);
