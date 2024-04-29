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
import { ClearCallActivityData, GetAllProposalApi, GetAllLeadDropDownApi, ClearProposalListData } from 'store/slices/businessAction';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ProposalTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import {
    CallModeGetApi,
    MasterRfpStatusGetApi,
    ProposalTypeGetApi,
    // MasterStatusFollowupsGetApi,
    RfpStatusGetApi,
    RfpTypeGetApi
} from 'store/slices/masterAction';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import MuiTooltip from '@mui/material/Tooltip';
import { shouldForwardProp } from '@mui/system';
// import AddCallsModels from './AddCallsModels';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import AddProposalModels from './AddProposalModels';
import EditProposalModels from './EditProposalModels';
import ViewProposalModels from './ViewProposalModels';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import { DateRangeFilter } from 'Helper/Validation';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import ViewRfpDocsModel from './ViewRfpDocsModel';
// import EditRfpModels from './EditRfpModels';
// import EditCallsModels from './EditCallsModels';

function Row({ row, key, currentPage, pageLength, search, proposalTypeData, startDate, endDate }) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [opeViewModel, setOpenViewModel] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);

    const handleViewModel = (data) => {
        setId(data._id);
        setOpenEditModel(false);
        setOpenViewModel(true);
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenViewModel(false);
    };

    const handleCloseModel = () => {
        setOpenViewModel(false);
        setOpenEditModel(false);
        setId('');
        dispatch(GetAllProposalApi(newCurrentPage, pageLength, search, proposalTypeData, startDate, endDate));
    };

    const handleUpdateActivityModel = (data) => {
        setOpenSidebar(true);
        setId(data._id);
    };

    const handleActivityCloseModel = () => {
        setOpenSidebar(false);
        setId('');
        dispatch(ClearCallActivityData());
        dispatch(GetAllProposalApi(newCurrentPage, pageLength, search, proposalTypeData, startDate, endDate));
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
                    {row?.proposal[0]?.proposal_type_data?.status_name ? (
                        <Chip
                            label={row?.proposal[0]?.proposal_type_data?.status_name}
                            variant="outlined"
                            color="secondary"
                            sx={{
                                color: row?.proposal[0]?.proposal_type_data?.status_color,
                                borderColor: row?.proposal[0]?.proposal_type_data?.status_color
                            }}
                        />
                    ) : (
                        <Chip label="No Found" variant="outlined" color="secondary" />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {row?.project_name}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {moment(row?.updatedAt).format('DD-MMM-YYYY hh:mm a')}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {moment(row?.createdAt).format('DD-MMM-YYYY hh:mm a')}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3, py: 0 }}>
                    <MuiTooltip title="View" arrow>
                        <Visibility onClick={() => handleViewModel(row)} sx={{ cursor: 'pointer', color: '#3e7dc3' }} />
                    </MuiTooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <SubCard
                                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                        title="Proposal Information"
                                        content={false}
                                        secondary={
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <MuiTooltip title="View" arrow>
                                                    <div>
                                                        <Visibility
                                                            onClick={() => handleViewModel(row)}
                                                            sx={{ cursor: 'pointer', color: '#3e7dc3' }}
                                                        />
                                                    </div>
                                                </MuiTooltip>
                                                <MuiTooltip title="Update" arrow>
                                                    <div>
                                                        <EditIcon
                                                            onClick={() => handleEditModel(row)}
                                                            sx={{ cursor: 'pointer', color: '#3e7dc3' }}
                                                        />
                                                    </div>
                                                </MuiTooltip>
                                            </Stack>
                                        }
                                    >
                                        <Table size="small" aria-label="purchases">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Number</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client WhatsApp</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{row?.leadData?.client_name ? row?.leadData?.client_name : '-'}</TableCell>
                                                    <TableCell>{row?.leadData?.client_email ? row?.leadData?.client_email : '-'}</TableCell>
                                                    <TableCell>
                                                        {row?.leadData?.client_number ? row?.leadData?.client_number : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.leadData?.client_whatsapp_num ? row?.leadData?.client_whatsapp_num : '-'}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Proposal Type</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Project Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Project Amount</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Timeline Days</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>
                                                        <Link onClick={() => handleViewModel(row)} style={{ cursor: 'pointer' }}>
                                                            {row?.proposal[0]?.proposal_type_data?.status_name}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>{row?.project_name !== '' ? row?.project_name : '-'}</TableCell>
                                                    <TableCell>{row?.project_amount !== '' ? row?.project_amount : '-'}</TableCell>
                                                    <TableCell>{row?.timeline_days !== '' ? row?.timeline_days : '-'}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Proposal Submitted</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Man Hour Cost</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Upfront Amount</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Assigned Date</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{row?.proposal_submitted !== '' ? row?.proposal_submitted : '-'}</TableCell>
                                                    <TableCell>{row?.man_hour !== '' ? row?.man_hour : '-'}</TableCell>
                                                    <TableCell>{row?.upfront_amount !== '' ? row?.upfront_amount : '-'}</TableCell>
                                                    <TableCell>{moment(row?.createdAt).format('DD-MMM-YYYY')}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>
                                                        Comment Remark
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={4}>
                                                        {row?.proposal[0]?.comment_remark ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={100}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.proposal[0]?.comment_remark}
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
            {id && openEditModel && <EditProposalModels open={openEditModel} rowData={row} close={() => handleCloseModel()} />}
            {id && opeViewModel && <ViewProposalModels open={opeViewModel} rowData={row} close={() => handleCloseModel()} />}
            {/* {id && opeViewModel && <ViewRfpDocsModel open={opeViewModel} rowData={row} close={() => handleCloseModel()} />} */}
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
    const { getProposalList, getProposalLoading } = useSelector((state) => state.businessAction);
    const { proposalTypeList } = useSelector((state) => state.masterAction);
    const [proposalTypeData, setProposalTypeData] = React.useState('');
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
        dispatch(GetAllProposalApi(currentPage + 1, pageLength, search, proposalTypeData, startDate, endDate));
    }, [pageLength, startDate, endDate]);

    useEffect(() => {
        dispatch(CallModeGetApi());
        dispatch(MasterRfpStatusGetApi());
        dispatch(GetAllLeadDropDownApi());
        dispatch(RfpTypeGetApi());
        dispatch(RfpStatusGetApi());
        dispatch(ProposalTypeGetApi());
    }, []);

    const onOk = async (selectedDate) => {
        dispatch(ClearProposalListData());
        // This function is called when the "OK" button is clicked.
        // console.log(' (OK):', selectedDate);
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        await dispatch(GetAllProposalApi(currentPage + 1, pageLength, search, proposalTypeData, start, end));
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        dispatch(ClearProposalListData());
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            await dispatch(GetAllProposalApi(currentPage + 1, pageLength, search, proposalTypeData, start, end));
        }
    };

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(GetAllProposalApi(currentPage + 1, pageLength, search, proposalTypeData, startDate, endDate));
    };
    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(ClearProposalListData());
            dispatch(GetAllProposalApi(currentPage + 1, pageLength, e.target.value, proposalTypeData, startDate, endDate));
        }
        if (e.target.value.length === 0) {
            dispatch(ClearProposalListData());
            dispatch(GetAllProposalApi(currentPage + 1, pageLength, '', proposalTypeData, startDate, endDate));
        }
        setSearch(e.target.value);
        // dispatch(GetAllProposalApi(currentPage + 1, pageLength, ''));
    };

    const onSearchReset = () => {
        dispatch(ClearProposalListData());
        setSearch('');
        dispatch(GetAllProposalApi(currentPage + 1, pageLength, '', proposalTypeData, startDate, endDate));
    };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(GetAllProposalApi(newPage + 1, pageLength, search, proposalTypeData, startDate, endDate));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(GetAllProposalApi(currentPage + 1, event.target.value, search, proposalTypeData, startDate, endDate));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    const onProposalStatusChange = (e, newValue) => {
        dispatch(ClearProposalListData());
        const selectValue = newValue ? newValue._id : '';
        setProposalTypeData(selectValue);
        dispatch(GetAllProposalApi(currentPage + 1, pageLength, search, selectValue, startDate, endDate));
    };
    return (
        <MainCard
            content={false}
            title={
                <Stack direction="row">
                    <IconFilePlus sx={{ mr: 2 }} /> &nbsp; Proposal
                </Stack>
            }
            sx={{ border: '0px solid', padding: '5px' }}
            secondary={
                <>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {/* <CSVExport data={newRow} filename="basic-table.csv" header={header} /> */}
                        {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}

                        {/* <Button
                            variant="contained"
                            sx={{
                                border: '1px solid #3e7dc3',
                                color: '#3e7dc3',
                                borderRadius: '5px',
                                background: '#e0f4ff',
                                p: '6px 25px',
                                '&:hover': {
                                    background: '#3e7dc3',
                                    color: '#e0f4ff'
                                }
                            }}
                            onClick={() => setOpenModel(true)}
                        >
                            Add Proposal <AddCircleRoundedIcon sx={{ ml: 1 }} />
                        </Button> */}
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
                                Add Proposal <AddCircleRoundedIcon sx={{ ml: 1 }} />
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
                {/* <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={proposalTypeList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={proposalTypeList.find((option) => option._id === proposalTypeData) || null}
                        onChange={onProposalStatusChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Proposal Type"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                                size="small"
                                style={{
                                    minWidth: '200px'
                                }}
                            />
                        )}
                    />
                </Grid> */}
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
                        placement="bottomEnd"
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
                            <TableCell sx={{ py: 2 }} align="left">
                                Client Name
                            </TableCell>
                            {/* <TableCell sx={{ py: 0 }}>RFP Type</TableCell> */}
                            <TableCell sx={{ py: 2 }} align="left">
                                Proposal Type
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Project Name
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Last Updated
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Assigned Date
                            </TableCell>
                            {/* <TableCell sx={{ pr: 3 }} align="center">
                                Activity
                            </TableCell> */}
                            <TableCell sx={{ pr: 3 }} align="left">
                                Activity
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getProposalLoading && getProposalList.docs.length > 0 ? (
                            getProposalList.docs.map((row, i) => (
                                <Row
                                    row={row}
                                    key={i}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                    search={search}
                                    proposalTypeData={proposalTypeData}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            ))
                        ) : (
                            <>
                                {getProposalLoading === true ? (
                                    <ProposalTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={8}>
                                            No Proposal Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {/* {getProposalList.docs.map((row) => (
                            <Row key={row.client_name} row={row} />
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={getProposalList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {openPopupModel && <AddProposalModels open={openPopupModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default Index;
