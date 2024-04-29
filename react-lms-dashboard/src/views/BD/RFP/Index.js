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
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
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
import {
    ClearCallActivityData,
    GetAllRfpRequestApi,
    GetAllLeadDropDownApi,
    GetRfpActivityDetailsApi,
    ClearRFPActivityData,
    UpdateProposalValueRFP,
    ClearRFPListData
} from 'store/slices/businessAction';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { RfpTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import {
    CallModeGetApi,
    MasterRfpStatusGetApi,
    // MasterStatusFollowupsGetApi,
    RfpStatusGetApi,
    RfpTypeGetApi
} from 'store/slices/masterAction';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import MuiTooltip from '@mui/material/Tooltip';
import { shouldForwardProp } from '@mui/system';
// import AddCallsModels from './AddCallsModels';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import AddRfpModels from './AddRfpModels';
import ViewRfpDocsModel from './ViewRfpDocsModel';
import EditRfpModels from './EditRfpModels';
import RfpMainStatus from './RfpMainStatus';
import { getRFPStatusColor } from 'Helper/StatusColor';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import { DateRangeFilter } from 'Helper/Validation';
import { openSnackbar } from 'store/slices/snackbar';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import EditCallsModels from './EditCallsModels';

function Row({ row, key, currentPage, pageLength, search, rfpStatusId, startDate, endDate }) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [opeViewModel, setOpenViewModel] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);
    const [rfpStatus, setRfpStatusId] = React.useState(false);
    const [openEditable, setOpenEditable] = useState(false);
    const [proposalValue, setProposalValue] = useState('');

    const handleViewModel = (data) => {
        setId(data._id);
        setOpenEditModel(false);
        setOpenViewModel(true);
        dispatch(GetRfpActivityDetailsApi(data?.rfps[0]?._id));
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenViewModel(false);
        setOpenStatus(false);
    };

    const handleCloseModel = () => {
        setOpenViewModel(false);
        setOpenEditModel(false);
        setOpenStatus(false);
        setId('');
        dispatch(GetAllRfpRequestApi(newCurrentPage, pageLength, search, rfpStatusId, startDate, endDate));
        dispatch(ClearRFPActivityData());
    };

    const handleRfpStatusUpdateModel = (data) => {
        setOpenStatus(true);
        setId(data._id);
        setRfpStatusId(data?.leadRfpStatusData?._id);
    };

    const onOpenField = (data) => {
        setOpenEditable(!openEditable);
        setId(data._id);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const newData = {
            rfp_id: id,
            proposal_value: proposalValue
        };
        dispatch(UpdateProposalValueRFP(newData)).then((res) => {
            dispatch(GetAllRfpRequestApi(newCurrentPage, pageLength, search, rfpStatusId, startDate, endDate));
            if (res.succeeded === true) {
                setOpenEditable(false);
                // dispatch(GetDSRDetaiilApi(dsrId));
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            }
        });
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
                    {row?.rfps[0]?.rfp_type_data}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.leadRfpStatusData?.status_name ? (
                        <Chip
                            label={row?.leadRfpStatusData?.status_name}
                            variant="outlined"
                            onClick={() => handleRfpStatusUpdateModel(row)}
                            sx={{
                                cursor: 'pointer',
                                color: row?.leadRfpStatusData?.status_color,
                                borderColor: row?.leadRfpStatusData?.status_color
                            }}
                        />
                    ) : (
                        <Chip
                            label="No Found"
                            variant="outlined"
                            color="secondary"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleRfpStatusUpdateModel(row)}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {moment(row?.updatedAt).format('DD-MMM-YYYY HH:mm')}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {moment(row?.createdAt).format('DD-MMM-YYYY HH:mm')}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    <MuiTooltip title="View Activity" arrow>
                        <Visibility
                            onClick={() => handleViewModel(row)}
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
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <SubCard
                                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                        title="RFP Request Information"
                                        content={false}
                                        secondary={
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <MuiTooltip title="View Activity" arrow>
                                                    <Visibility
                                                        onClick={() => handleViewModel(row)}
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
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>PE Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>PE Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>RFP Status</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>RFP Activity</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{row?.leadData?.client_name ? row?.leadData?.client_name : '-'}</TableCell>
                                                    <TableCell>{row?.leadData?.client_email ? row?.leadData?.client_email : '-'}</TableCell>
                                                    <TableCell>{row?.rfps[0]?.pe_name ? row?.rfps[0]?.pe_name : '-'}</TableCell>
                                                    <TableCell>{row?.rfps[0]?.pe_email ? row?.rfps[0]?.pe_email : '-'}</TableCell>
                                                    <TableCell>{row?.leadRfpStatusData?.status_name}</TableCell>
                                                    <TableCell>
                                                        <Link onClick={() => handleViewModel(row)} style={{ cursor: 'pointer' }}>
                                                            {row?.rfps[0]?.activity_data}
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ width: '280px', fontWeight: 'bold' }}>
                                                        Proposal Value
                                                        <MuiTooltip title="Update" arrow>
                                                            <EditIcon
                                                                onClick={() => onOpenField(row)}
                                                                sx={{
                                                                    fontSize: '18px',
                                                                    cursor: 'pointer',
                                                                    color: '#3e7dc3',
                                                                    ml: 1
                                                                }}
                                                            />
                                                        </MuiTooltip>
                                                    </TableCell>
                                                    <TableCell style={{ fontWeight: 'bold', width: '320px' }}>Minutes Of Meeting</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold', width: '320px' }}>Comment Remarks</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Last Update</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                        {openEditable ? (
                                                            <>
                                                                <TextField
                                                                    type="text"
                                                                    size="small"
                                                                    placeholder="Enter Value"
                                                                    defaultValue={proposalValue || row?.proposal_value}
                                                                    inputProps={{ maxLength: 4 }}
                                                                    onChange={(e) => setProposalValue(e ? e.target.value : '')}
                                                                    sx={{ width: '50%' }}
                                                                />
                                                                <CheckIcon
                                                                    onClick={(e) => onSubmit(e)}
                                                                    color="success"
                                                                    sx={{
                                                                        fontSize: '28px',
                                                                        cursor: 'pointer'
                                                                        // color: '#3e7dc3'
                                                                    }}
                                                                />
                                                                <CloseIcon
                                                                    color="error"
                                                                    onClick={() => setOpenEditable(false)}
                                                                    sx={{
                                                                        fontSize: '28px',
                                                                        cursor: 'pointer',
                                                                        color: 'red'
                                                                    }}
                                                                />
                                                            </>
                                                        ) : (
                                                            <>{row?.proposal_value}</>
                                                        )}
                                                    </TableCell>
                                                    <TableCell sx={{ width: '320px' }}>
                                                        {row?.rfps[0]?.minutes_of_meeting && row?.rfps[0]?.minutes_of_meeting !== '' ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={20}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.rfps[0]?.minutes_of_meeting}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell sx={{ width: '320px' }}>
                                                        {row?.rfps[0]?.remarks && row?.rfps[0]?.remarks !== '' ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={20}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.rfps[0]?.remarks}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.rfps[0]?.updatedAt
                                                            ? moment(row?.rfps[0]?.updatedAt).format('DD-MMM-YYYY')
                                                            : '-'}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </SubCard>
                                </TableContainer>
                            </Box>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
            {id && opeViewModel && <ViewRfpDocsModel open={opeViewModel} rowData={row} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditRfpModels open={openEditModel} rowData={row} close={() => handleCloseModel()} />}
            {id && openStatus && <RfpMainStatus rfpStatus={rfpStatus} open={openStatus} rfpId={id} close={() => handleCloseModel()} />}
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
    height: '38px',
    // padding: '27px 16px',
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: '100%'
    },
    [theme.breakpoints.down('md')]: {
        // width: '100%',
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
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [openPopupModel, setOpenModel] = useState(false);
    const [search, setSearch] = useState('');
    const { getRfpList, getRfpLoading } = useSelector((state) => state.businessAction);
    const { rfpStatusList } = useSelector((state) => state.masterAction);
    const [rfpStatusId, setRfpStatusId] = useState('');
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
        dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, search, rfpStatusId, startDate, endDate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageLength, startDate, endDate]);

    useEffect(() => {
        dispatch(CallModeGetApi());
        dispatch(MasterRfpStatusGetApi());
        dispatch(GetAllLeadDropDownApi());
        dispatch(RfpTypeGetApi());
        dispatch(RfpStatusGetApi());
    }, []);

    const onOk = async (selectedDate) => {
        dispatch(ClearRFPListData());
        // This function is called when the "OK" button is clicked.
        // console.log(' (OK):', selectedDate);
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        await dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, search, rfpStatusId, start, end));
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        dispatch(ClearRFPListData());
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            await dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, search, rfpStatusId, start, end));
        }
    };

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, search, rfpStatusId, startDate, endDate));
    };

    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(ClearRFPListData());
            dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, e.target.value, rfpStatusId, startDate, endDate));
        }
        if (e.target.value.length === 0) {
            dispatch(ClearRFPListData());
            dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, '', rfpStatusId, startDate, endDate));
        }
        setSearch(e.target.value);
        // dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, ''));
    };

    const onSearchReset = () => {
        dispatch(ClearRFPListData());
        setSearch('');
        dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, '', rfpStatusId, startDate, endDate));
    };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(GetAllRfpRequestApi(newPage + 1, pageLength, search, rfpStatusId, startDate, endDate));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(GetAllRfpRequestApi(currentPage + 1, event.target.value, search, rfpStatusId, startDate, endDate));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    const onRfpStatusChange = (e, newValue) => {
        dispatch(ClearRFPListData());
        const selectValue = newValue ? newValue._id : '';
        setRfpStatusId(selectValue);
        dispatch(GetAllRfpRequestApi(currentPage + 1, pageLength, search, selectValue, startDate, endDate));
    };
    return (
        <MainCard
            content={false}
            title={
                <Stack direction="row">
                    <IconFileRss sx={{ mr: 2 }} /> &nbsp; Request For Proposal
                </Stack>
            }
            sx={{ border: '0px solid', padding: '5px' }}
            secondary={
                <>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {/* <CSVExport data={newRow} filename="basic-table.csv" header={header} /> */}
                        {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}

                        <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setOpenModel(true)}
                                sx={{
                                    px: 3,
                                    mb: 1,
                                    width: '100%',
                                    boxShadow: theme.customShadows.secondary,
                                    ':hover': {
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                Add RFP <AddCircleRoundedIcon sx={{ ml: 1 }} />
                            </Button>
                        </AnimateButton>
                    </Stack>
                </>
            }
        >
            <Grid container spacing={1} mt={0.5}>
                {/* <Grid item xs={3} /> */}
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
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={rfpStatusList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={rfpStatusList.find((option) => option._id === rfpStatusId) || null}
                        onChange={onRfpStatusChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Status"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                                size="small"
                                style={{
                                    minWidth: '250px'
                                }}
                            />
                        )}
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
                        placement="bottomEnd"
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
                            <TableCell sx={{ py: 2 }} align="left">
                                Client Name
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>Type</TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Last Updated
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Assigned Date
                            </TableCell>
                            {/* <TableCell sx={{ pr: 3 }} align="left">
                                Activity
                            </TableCell> */}
                            <TableCell sx={{ pr: 3 }} align="left">
                                Activity
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getRfpLoading && getRfpList.docs.length > 0 ? (
                            getRfpList.docs.map((row, i) => (
                                <Row
                                    row={row}
                                    key={i}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                    search={search}
                                    rfpStatusId={rfpStatusId}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            ))
                        ) : (
                            <>
                                {getRfpLoading === true ? (
                                    <RfpTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={8}>
                                            No RFP Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {/* {getRfpList.docs.map((row) => (
                            <Row key={row.client_name} row={row} />
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={getRfpList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {openPopupModel && <AddRfpModels open={openPopupModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default Index;
