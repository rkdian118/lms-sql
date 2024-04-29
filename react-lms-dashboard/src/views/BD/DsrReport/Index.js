/* eslint-disable radix */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Chip,
    Collapse,
    IconButton,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    tableCellClasses
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    IconDashboard,
    IconSearch,
    IconAdjustmentsHorizontal,
    IconReportAnalytics,
    IconDeviceAnalytics,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconX
} from '@tabler/icons';
// import AddLeadsModels from './AddLeadsModels';
// import EditLeadsModels from './EditLeadsModels';
// import LeadActivityStatus from './LeadActivityStatus';
// import UpdateLeadStatus from './UpdateLeadStatus';
// import { CSVExport } from './TableExports';
import {
    ClearDsrDetails,
    ClearDsrListData,
    ClearLeadActivityData,
    GetAllDSRApi,
    GetDSRDetaiilApi,
    GetLeadActivityDetailsApi
} from 'store/slices/businessAction';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { DSRTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import {
    LeadSourceGetApi,
    LeadTypeGetApi,
    LeadFollowUpsGetApi,
    PreDefineNotesGetApi,
    RequirementTypeGetApi,
    LeadStatusGetApi
} from 'store/slices/masterAction';
import EditIcon from '@mui/icons-material/Edit';
import MuiTooltip from '@mui/material/Tooltip';
// import ReactReadMoreReadLess from 'react-read-more-read-less';
import { shouldForwardProp } from '@mui/system';
import { Visibility } from '@mui/icons-material';
import { getLeadStatusColor } from 'Helper/StatusColor';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import DSRViewModel from './DSRViewModel';
import { DateRangePicker } from 'rsuite';
import { DateRangeFilter } from 'Helper/Validation';

// table data
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // [`&.${tableCellClasses.head}`]: {
    //     backgroundColor: '#c6d9ff',
    //     color: '#000'
    // },
    // [`&.${tableCellClasses.body}`]: {
    //     fontSize: 14
    // }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover
    // },
    // hide last border
    '&:last-of-type td, &:last-of-type th': {
        border: 0
    }
}));
function Row({ row, key, currentPage, pageLength, search, startDate, endDate }) {
    // console.log('🚀 row:', row);
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [openStatus, setOpenDsrStatus] = React.useState(false);

    const handleViewDSRModel = (data) => {
        setId(data._id);
        setOpenDsrStatus(true);
        dispatch(GetDSRDetaiilApi(data._id));
    };

    const handleCloseModel = () => {
        setId('');
        dispatch(GetAllDSRApi(newCurrentPage, pageLength, startDate, endDate));
    };

    const handleCloseDSRModel = () => {
        setId('');
        setOpenDsrStatus(false);
        dispatch(ClearDsrDetails());
        dispatch(GetAllDSRApi(newCurrentPage, pageLength, startDate, endDate));
    };

    // console.log('🚀 openSidebar:', openSidebar);

    return (
        <>
            <TableRow hover key={key} unmountOnExit>
                <TableCell component="th" scope="row" sx={{ py: 1 }}>
                    {moment(row?.createdAt).format('DD-MMMM-YYYY')}
                </TableCell>
                <TableCell align="left" sx={{ py: 1 }}>
                    <MuiTooltip title="View Report" arrow>
                        <Visibility
                            onClick={() => handleViewDSRModel(row)}
                            sx={{
                                color: '#4d97f3',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#b5dbff'
                                }
                            }}
                        />
                    </MuiTooltip>
                </TableCell>
            </TableRow>
            {openStatus && <DSRViewModel dsrId={id} open={openStatus} rowData={row} close={() => handleCloseDSRModel()} />}
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 290,
    marginLeft: 16,
    // paddingLeft: 16,
    // paddingRight: 16,
    height: '45px',
    padding: '27px 16px',
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    // background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    // color: '#ea7b26',
    background: 'transparent',
    color: '#3e7dc3',
    '&:hover': {
        color: 'black'
        // background: '#3e7dc3',
    }
}));

const Index = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [openPopupModel, setOpenModel] = useState(false);
    const [search, setSearch] = useState('');
    const newmenu = useSelector((state) => state.businessAction);
    const { getDSRList, getDSRLoading } = newmenu;
    const { leadStatusList } = useSelector((state) => state.masterAction);
    const { dashboardleadTypeId } = useSelector((state) => state.commonAction);
    // const [leadStatus, setLeadStatus] = useState('' || dashboardleadTypeId);

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
        dispatch(GetAllDSRApi(1, pageLength, startDate, endDate));
    }, [pageLength, startDate, endDate]);

    // useEffect(() => {
    //     dispatch(LeadSourceGetApi());
    //     dispatch(LeadTypeGetApi());
    //     dispatch(LeadStatusGetApi());
    //     dispatch(RequirementTypeGetApi());
    //     dispatch(PreDefineNotesGetApi());
    //     dispatch(LeadFollowUpsGetApi());
    // }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(GetAllDSRApi(currentPage + 1, pageLength, startDate, endDate));
    };

    const handleChangePage = (event, newPage) => {
        dispatch(ClearDsrListData());
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(GetAllDSRApi(newPage + 1, pageLength, '', startDate, endDate));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(ClearDsrListData());
        dispatch(GetAllDSRApi(currentPage + 1, event.target.value, '', startDate, endDate));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    const onChange = async (selectedDate) => {
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            dispatch(ClearDsrListData());
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            dispatch(GetAllDSRApi(currentPage + 1, pageLength, start, end));
            // console.log(' (Change):', selectedDate);
        }
    };

    const onOk = async (selectedDate) => {
        dispatch(ClearDsrListData());
        // This function is called when the "OK" button is clicked.
        // console.log(' (OK):', selectedDate);
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        dispatch(GetAllDSRApi(currentPage + 1, pageLength, start, end));
        setDate(selectedDate);
    };

    const disabledDate = (date) => {
        const currentDate = new Date();
        return date > currentDate;
    };

    return (
        <MainCard
            content={false}
            title={
                <Stack direction="row">
                    <IconReportAnalytics sx={{ mr: 2 }} /> &nbsp; DSR Report
                </Stack>
            }
            sx={{ border: '0px solid', padding: '5px' }}
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
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
                        disabledDate={disabledDate}
                        style={{
                            borderRadius: '10px !important'
                        }}
                        placement="bottomEnd"
                        // hoverRange={(date) => [subDays(date, 1), addDays(date, 1)]}
                    />
                </Stack>
            }
        >
            {/* table */}
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <StyledTableCell sx={{ pl: 3, py: 2 }} /> */}
                            {/* <StyledTableCell sx={{ py: 2 }} align="left">
                                Lead Type
                            </StyledTableCell> */}
                            <StyledTableCell sx={{ pr: 3, py: 2 }} align="left">
                                Date
                            </StyledTableCell>
                            <StyledTableCell sx={{ pr: 3, py: 2 }} align="left">
                                View
                            </StyledTableCell>

                            {/* <StyledTableCell sx={{ pr: 3 }} align="center">
                                Action
                            </StyledTableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* <TableRow>
                            <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
                                No DSR Found
                            </TableCell>
                        </TableRow> */}
                        {/* {getDSRList?.docs?.map((row, i) => (
                            <Row row={row} key={i} leadStatus={leadStatus} currentPage={currentPage} pageLength={pageLength} />
                        ))} */}
                        {!getDSRLoading && getDSRList?.docs?.length > 0 ? (
                            getDSRList?.docs?.map((row, i) => (
                                <Row
                                    row={row}
                                    key={i}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            ))
                        ) : (
                            <>
                                {getDSRLoading === true ? (
                                    <DSRTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
                                            No DSR Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {/* {getDSRList.docs.map((row) => (
                            <Row key={row.client_name} row={row} />
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={getDSRList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {openPopupModel && <DSRViewModel open={openPopupModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default Index;
