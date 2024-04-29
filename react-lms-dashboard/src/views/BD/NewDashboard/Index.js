/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { connect } from 'react-redux';
import { DateRangePicker } from 'rsuite';
import { DateRangeFilter } from 'Helper/Validation';
import PropTypes from 'prop-types';
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
// import { format } from 'date-fns';
import {
    CallStatusGetApi,
    LeadFollowUpsGetApi,
    LeadStatusGetApi,
    ProjectionStatusGetApi,
    RfpStatusGetApi
} from 'store/slices/masterAction';
import NewTabComponent from './Components/NewTabComponent';
import { IconBook2 } from '@tabler/icons';

// ==============================|| DEFAULT DASHBOARD ||============================== //
const Dashboard = ({ GetAllFollowUpsDataApi, GetAllCallsDataApi, GetAllRfpDataApi }) => {
    const [date, setDate] = useState(['', '']);
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
        GetAllFollowUpsDataApi(startDate, endDate, 1, 10);
        GetAllCallsDataApi(startDate, endDate, 1, 10);
        GetAllRfpDataApi(startDate, endDate, 1, 10);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(LeadFollowUpsGetApi());
        dispatch(LeadStatusGetApi());
        dispatch(ProjectionStatusGetApi());
        dispatch(CallStatusGetApi());
        dispatch(RfpStatusGetApi());
    }, []);

    const onOk = async (selectedDate) => {
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        dispatch(ClearAllFollowUpsData());
        dispatch(ClearAllCallsData());
        dispatch(ClearAllRFPData());
        await GetAllFollowUpsDataApi(start, end);
        await GetAllCallsDataApi(start, end);
        await GetAllRfpDataApi(start, end);
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            dispatch(ClearAllFollowUpsData());
            dispatch(ClearAllCallsData());
            dispatch(ClearAllRFPData());
            await GetAllFollowUpsDataApi(start, end);
            await GetAllCallsDataApi(start, end);
            await GetAllRfpDataApi(start, end);
        }
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
                        placement="bottomEnd"
                    />
                </Stack>
            }
        >
            <NewTabComponent startDate={startDate} endDate={endDate} />
        </MainCard>
    );
};
Dashboard.propTypes = {
    GetAllFollowUpsDataApi: PropTypes.object,
    GetAllCallsDataApi: PropTypes.object,
    GetAllRfpDataApi: PropTypes.object
};

export default connect(null, {
    GetDashboardGraphApi,
    GetAllDashboardDataApi,
    GetAllFollowUpsDataApi,
    GetAllCallsDataApi,
    GetAllRfpDataApi
})(Dashboard);
