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
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
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
    Typography
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// import { CSVExport } from './TableExports';
// import { header } from './TableBasic';
// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    IconDashboard,
    IconSearch,
    IconAdjustmentsHorizontal,
    IconBook2,
    IconDeviceAnalytics,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconX
} from '@tabler/icons';
// import AddLeadsModels from './AddLeadsModels';
import { ClearCallActivityData } from 'store/slices/businessAction';
import {
    ClusterLeadDropDownApi,
    GetAllCallsApi,
    GetAllLeadDropDownApi,
    GetCallActivityDetailsApi,
    GetSelectedClBdeDropdownApi
} from 'store/slices/clusterAction';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { BHCallsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import { CallModeGetApi, CallTypeGetApi, LeadFollowUpsGetApi, PreDefineNotesGetApi, CallStatusGetApi } from 'store/slices/masterAction';
import EditIcon from '@mui/icons-material/Edit';
import MuiTooltip from '@mui/material/Tooltip';
import { shouldForwardProp } from '@mui/system';
import AddCallsModels from './AddCallsModels';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import EditCallsModels from './EditCallsModels';
import CallsActivityStatus from './CallsActivityStatus';
import { Visibility } from '@mui/icons-material';
import { getCallStatusColor } from 'Helper/StatusColor';
import MuiTypography from '@mui/material/Typography';
import { DateRangePicker } from 'rsuite';
import { DateRangeFilter } from 'Helper/Validation';

function Row({
    row,
    key,
    currentPage,
    pageLength,
    search,
    leadId,
    callStatusId,
    bdeData,
    clusterLeadData,
    callTypeId,
    startDate,
    endDate
}) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
    };

    const handleCloseModel = () => {
        setOpenEditModel(false);
        setId('');
        dispatch(
            GetAllCallsApi(
                newCurrentPage,
                pageLength,
                search,
                leadId,
                callStatusId,
                bdeData,
                clusterLeadData,
                callTypeId,
                startDate,
                endDate
            )
        );
    };

    const handleUpdateActivityModel = (data) => {
        setOpenSidebar(true);
        setId(data._id);
        dispatch(GetCallActivityDetailsApi(data._id));
    };

    const handleActivityCloseModel = () => {
        setOpenSidebar(false);
        setId('');
        dispatch(ClearCallActivityData());
        dispatch(
            GetAllCallsApi(
                newCurrentPage,
                pageLength,
                search,
                leadId,
                callStatusId,
                bdeData,
                clusterLeadData,
                callTypeId,
                startDate,
                endDate
            )
        );
    };

    return (
        <>
            <TableRow hover key={key}>
                <TableCell sx={{ pl: 3, py: 0 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ py: 0 }}>
                    {row?.leadData?.client_name}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.callTypeData?.status_name}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.callModeData?.status_name}
                </TableCell>
                <TableCell align="left">
                    {/* {row?.callStatusData?.status_name} */}
                    {row?.callStatusData?.status_name ? (
                        <Chip
                            label={row?.callStatusData?.status_name}
                            variant="outlined"
                            sx={{
                                color: getCallStatusColor(row?.callStatusData?.status_name),
                                borderColor: getCallStatusColor(row?.callStatusData?.status_name),
                                cursor: 'pointer'
                            }}
                            onClick={() => handleUpdateActivityModel(row)}
                        />
                    ) : (
                        <Chip label="No Found" variant="outlined" color="secondary" onClick={() => handleUpdateActivityModel(row)} />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row.clusterLeadData.status === '1' ? (
                        <MuiTypography sx={{ color: '#2196f3' }}>{row?.clusterLeadData?.name}</MuiTypography>
                    ) : (
                        <MuiTypography sx={{ color: '#d84315' }}>{row?.clusterLeadData?.name}</MuiTypography>
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row.bdData.status === '1' ? (
                        <MuiTypography sx={{ color: '#2196f3' }}>{row?.bdData?.name}</MuiTypography>
                    ) : (
                        <MuiTypography sx={{ color: '#d84315' }}>{row?.bdData?.name}</MuiTypography>
                    )}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {/* {moment(row?.createdAt).format('DD-MMM-YYYY')} */}
                    {moment(row?.meeting_date_time).format('DD-MMM-YYYY HH:mm:ss')}
                </TableCell>
                {/* <TableCell align="center" sx={{ py: 0 }}>
                    <MuiTooltip title="View Activity" arrow>
                        <Visibility
                            onClick={() => handleUpdateActivityModel(row)}
                            sx={{
                                color: '#4d97f3',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#b5dbff'
                                }
                            }}
                        />
                    </MuiTooltip>
                </TableCell> */}
                {/* <TableCell align="center" sx={{ pr: 3, py: 0 }}>
                    <MuiTooltip title="Update Lead" arrow>
                        <Button
                            variant="contained"
                            sx={{
                                background: '#b5dbff',
                                color: '#000000',
                                padding: '5px 15px',
                                my: '15px',
                                ml: 1,
                                borderRadius: '8px',
                                '&:hover': {
                                    background: '#4d97f3',
                                    color: '#ffffff'
                                }
                            }}
                            onClick={() => handleEditModel(row)}
                        >
                            <EditIcon sx={{ mr: 1 }} /> Edit
                        </Button>
                    </MuiTooltip>
                </TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <SubCard
                                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                        title="Meeting Information"
                                        content={false}
                                        secondary={
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <MuiTooltip title="View Activity" arrow>
                                                    <Visibility
                                                        onClick={() => handleUpdateActivityModel(row)}
                                                        sx={{
                                                            color: '#4d97f3',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                color: '#b5dbff'
                                                            }
                                                        }}
                                                    />
                                                </MuiTooltip>
                                                <MuiTooltip title="Update" arrow>
                                                    <EditIcon
                                                        onClick={() => handleEditModel(row)}
                                                        sx={{ cursor: 'pointer', color: '#3e7dc3' }}
                                                    />
                                                </MuiTooltip>
                                            </Stack>
                                        }
                                    >
                                        <Table size="small" aria-label="purchases">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Meeting Status</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Meeting Date & Time</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Meeting Link</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Recording Link</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>{row?.callStatusData?.status_name}</TableCell>
                                                    <TableCell>{moment(row?.meeting_date_time).format('DD-MMM-YYYY HH:mm:ss')}</TableCell>
                                                    <TableCell>
                                                        {row?.meeting_link ? (
                                                            <a href={row?.meeting_link} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.recording_link ? (
                                                            <a href={row?.recording_link} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>PE Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Country</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{row?.leadData?.client_name ? row?.leadData?.client_name : '-'}</TableCell>
                                                    <TableCell>{row?.leadData?.client_email ? row?.leadData?.client_email : '-'}</TableCell>
                                                    <TableCell>{row?.pe_name ? row?.pe_name : '-'}</TableCell>
                                                    <TableCell style={{ width: '210px' }}>
                                                        {row?.leadData?.client_country ? row?.leadData?.client_country : '-'}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    {/* <TableCell style={{ fontWeight: 'bold', width: '210px' }}>Country</TableCell> */}
                                                    <TableCell colSpan={6} style={{ fontWeight: 'bold', width: '220px' }}>
                                                        Comment
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    {/* <TableCell style={{ width: '210px' }}>
                                                        {row?.leadData?.client_country ? row?.leadData?.client_country : '-'}
                                                    </TableCell> */}
                                                    <TableCell colSpan={6} style={{ width: '220px' }}>
                                                        {row?.comment_remark ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={50}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.comment_remark}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                {/* {row.history?.map((historyRow) => (
                                                    <TableRow hover key={historyRow.date}>
                                                        <TableCell component="th" scope="row">
                                                            {historyRow.date}
                                                        </TableCell>
                                                        <TableCell>{historyRow.customerId}</TableCell>
                                                        <TableCell align="right">{historyRow.amount}</TableCell>
                                                        <TableCell align="right">
                                                            {Math.round(historyRow.amount * row.price * 100) / 100}
                                                        </TableCell>
                                                    </TableRow>
                                                ))} */}
                                            </TableBody>
                                        </Table>
                                    </SubCard>
                                </TableContainer>
                            </Box>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
            {id && openEditModel && <EditCallsModels open={openEditModel} rowData={row} close={() => handleCloseModel()} />}
            {openSidebar && <CallsActivityStatus open={openSidebar} callById={id} close={() => handleActivityCloseModel()} />}
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: '100%',
    // marginLeft: 16,
    // paddingLeft: 16,
    // paddingRight: 16,
    // height: '45px',
    // padding: '27px 16px',
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },

    [theme.breakpoints.down('lg')]: {
        width: '100%'
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        // marginLeft: 4,
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
    const [leadId, setLeadId] = useState('');
    const [callStatusId, setCallStatusId] = useState('');
    const [callTypeId, setCallTypeId] = useState('');

    const { getCallsList, getCallsLoading, getLeadDropdown, getClDropdownList, getSelectedBDEDropdownList } = useSelector(
        (state) => state.clusterAction
    );
    const { callStatusList, callTypeList } = useSelector((state) => state.masterAction);
    const { startMonthDate, endMonthDate } = useSelector((state) => state.commonAction);

    const [bdeData, setBdeData] = useState('');
    const [clusterLeadData, setClusterLeadData] = useState('');
    // const [date, setDate] = useState(['', '']);
    const [date, setDate] = useState(['' || startMonthDate, '' || endMonthDate]);
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
        dispatch(GetAllCallsApi(1, pageLength, search, leadId, callStatusId, bdeData, clusterLeadData, callTypeId, startDate, endDate));
    }, [pageLength]);

    useEffect(() => {
        dispatch(ClusterLeadDropDownApi());
        dispatch(GetSelectedClBdeDropdownApi([]));
        dispatch(CallModeGetApi());
        dispatch(CallTypeGetApi());
        dispatch(CallStatusGetApi());
        dispatch(GetAllLeadDropDownApi());
        // dispatch(PreDefineNotesGetApi());
        // dispatch(LeadFollowUpsGetApi());
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(
            GetAllCallsApi(
                currentPage + 1,
                pageLength,
                search,
                leadId,
                callStatusId,
                bdeData,
                clusterLeadData,
                callTypeId,
                startDate,
                endDate
            )
        );
    };
    // const onSearchLead = (e) => {
    //     if (e.target.value.length > 2) {
    //         dispatch(GetAllCallsApi(currentPage + 1, pageLength, e.target.value, leadId));
    //     }
    //     if (e.target.value.length === 0) {
    //         dispatch(GetAllCallsApi(currentPage + 1, pageLength, '', leadId));
    //     }
    //     setSearch(e.target.value);
    //     // dispatch(GetAllCallsApi(currentPage + 1, pageLength, ''));
    // };

    const onLeadChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setLeadId(selectValue);
        dispatch(
            GetAllCallsApi(
                currentPage + 1,
                pageLength,
                search,
                selectValue,
                callStatusId,
                bdeData,
                clusterLeadData,
                callTypeId,
                startDate,
                endDate
            )
        );
    };

    const onCallStatusChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setCallStatusId(selectValue);
        dispatch(
            GetAllCallsApi(
                currentPage + 1,
                pageLength,
                search,
                leadId,
                selectValue,
                bdeData,
                clusterLeadData,
                callTypeId,
                startDate,
                endDate
            )
        );
    };

    const onCallTypeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setCallTypeId(selectValue);
        dispatch(
            GetAllCallsApi(
                currentPage + 1,
                pageLength,
                search,
                leadId,
                selectValue,
                bdeData,
                clusterLeadData,
                selectValue,
                startDate,
                endDate
            )
        );
    };
    // console.log('🚀leadId:', leadId);
    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(
            GetAllCallsApi(newPage + 1, pageLength, search, leadId, callStatusId, bdeData, clusterLeadData, callTypeId, startDate, endDate)
        );
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(
            GetAllCallsApi(
                currentPage + 1,
                event.target.value,
                search,
                leadId,
                callStatusId,
                bdeData,
                clusterLeadData,
                callTypeId,
                startDate,
                endDate
            )
        );
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(
                GetAllCallsApi(
                    currentPage + 1,
                    pageLength,
                    e.target.value,
                    leadId,
                    callStatusId,
                    bdeData,
                    clusterLeadData,
                    callTypeId,
                    startDate,
                    endDate
                )
            );
        }
        if (e.target.value.length === 0) {
            dispatch(
                GetAllCallsApi(
                    currentPage + 1,
                    pageLength,
                    '',
                    leadId,
                    callStatusId,
                    bdeData,
                    clusterLeadData,
                    callTypeId,
                    startDate,
                    endDate
                )
            );
        }
        setSearch(e.target.value);
        // dispatch(GetAllLeadApi(currentPage + 1, pageLength, '', leadStatus));
    };

    const onSearchReset = () => {
        setSearch('');
        dispatch(
            GetAllCallsApi(currentPage + 1, pageLength, '', leadId, callStatusId, bdeData, clusterLeadData, callTypeId, startDate, endDate)
        );
    };

    const onClusterLeadChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        const selectBdeValue = newValue ? [newValue._id] : [];
        setClusterLeadData(selectValue);
        setBdeData('');
        dispatch(GetSelectedClBdeDropdownApi(selectBdeValue));
        dispatch(
            GetAllCallsApi(currentPage + 1, pageLength, search, leadId, callStatusId, '', selectValue, callTypeId, startDate, endDate)
        );
    };

    const onBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);
        dispatch(
            GetAllCallsApi(
                currentPage + 1,
                pageLength,
                search,
                leadId,
                callStatusId,
                selectValue,
                clusterLeadData,
                callTypeId,
                startDate,
                endDate
            )
        );
    };

    const onOk = async (selectedDate) => {
        // This function is called when the "OK" button is clicked.
        // console.log(' (OK):', selectedDate);
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        dispatch(
            GetAllCallsApi(currentPage + 1, pageLength, search, leadId, callStatusId, bdeData, clusterLeadData, callTypeId, start, end)
        );
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            dispatch(
                GetAllCallsApi(currentPage + 1, pageLength, search, leadId, callStatusId, bdeData, clusterLeadData, callTypeId, start, end)
            );
        }
    };
    return (
        <MainCard
            content={false}
            title={
                <Stack direction="row">
                    <IconPhonePlus sx={{ mr: 2 }} /> &nbsp; Meetings Management
                </Stack>
            }
            sx={{ border: '0px solid', padding: '5px' }}
        >
            <Grid container spacing={1} mt={0.5}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={getClDropdownList}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        value={getClDropdownList.find((option) => option._id === clusterLeadData) || null}
                        onChange={onClusterLeadChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Cluster Lead"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off'
                                }}
                                style={{
                                    minWidth: '200px'
                                }}
                                size="small"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={getSelectedBDEDropdownList}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        value={getSelectedBDEDropdownList.find((option) => option._id === bdeData) || null}
                        onChange={onBdeChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select BDE"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                                style={{
                                    minWidth: '200px'
                                }}
                                size="small"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={callStatusList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={callStatusList.find((option) => option._id === callTypeId) || null}
                        onChange={onCallStatusChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Meeting Status"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                                style={{
                                    minWidth: '200px'
                                }}
                                size="small"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={callTypeList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={callTypeList.find((option) => option._id === callStatusId) || null}
                        onChange={onCallTypeChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Meeting Type"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                                style={{
                                    minWidth: '200px'
                                }}
                                size="small"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={getLeadDropdown}
                        getOptionLabel={(option) => (option ? option.client_name : '')}
                        renderOption={(props, option) => (
                            <li {...props} style={{ fontSize: 13 }}>
                                <span style={{ marginRight: 2, fontWeight: 600 }}>{option.client_name} </span>(
                                {option.client_email ? option.client_email : option.requirement_type})
                            </li>
                        )}
                        value={getLeadDropdown.find((option) => option._id === leadId) || null}
                        onChange={onLeadChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Lead"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                                style={{
                                    minWidth: '200px'
                                }}
                                size="small"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <OutlineInputStyle
                        id="input-search-header"
                        value={search}
                        placeholder="Search"
                        startAdornment={
                            <InputAdornment position="start" sx={{ color: '#3e7dc3', background: '#e0f4ff' }}>
                                <IconSearch stroke={2} size="1.5rem" color="#3e7dc3" />
                            </InputAdornment>
                        }
                        // sx={{ height: '45px', margin: '5px 0px' }}
                        endAdornment={
                            <InputAdornment position="end">
                                <HeaderAvatarStyle variant="rounded" onClick={() => onSearchReset()}>
                                    <IconX stroke={1.5} size="1.5rem" />
                                </HeaderAvatarStyle>
                            </InputAdornment>
                        }
                        aria-describedby="search-helper-text"
                        inputProps={{ 'aria-label': 'weight' }}
                        onChange={(e) => onSearchLead(e)}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
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
                            borderRadius: '10px !important',
                            width: '100%'
                        }}
                        // hoverRange={(date) => [subDays(date, 1), addDays(date, 1)]}
                    />
                </Grid>
            </Grid>
            {/* table */}
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3, py: 2 }} />
                            <TableCell sx={{ py: 2 }}>Client Name</TableCell>
                            <TableCell sx={{ py: 0 }} align="left">
                                Call Type
                            </TableCell>
                            <TableCell sx={{ py: 0 }} align="left">
                                Call Mode Type
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 0 }} align="left">
                                Status
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                CL Name
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                BDE Name
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 0 }} align="left">
                                Meeting Date & Time
                            </TableCell>
                            {/* <TableCell sx={{ pr: 3, py: 0 }} align="center">
                                Activity
                            </TableCell> */}
                            {/* <TableCell sx={{ py: 0, width: '170px' }} align="center">
                                Activity
                            </TableCell> */}
                            {/* <TableCell sx={{ pr: 3 }} align="center">
                                Action
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getCallsLoading && getCallsList.docs.length > 0 ? (
                            getCallsList.docs.map((row, i) => (
                                <Row
                                    row={row}
                                    leadId={leadId}
                                    callStatusId={callStatusId}
                                    key={i}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                    search={search}
                                    bdeData={bdeData}
                                    clusterLeadData={clusterLeadData}
                                    callTypeId={callTypeId}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            ))
                        ) : (
                            <>
                                {getCallsLoading === true ? (
                                    <BHCallsTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={8}>
                                            No Meetings Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {/* {getCallsList.docs.map((row) => (
                            <Row key={row.client_name} row={row} />
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={getCallsList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {openPopupModel && <AddCallsModels open={openPopupModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default Index;
