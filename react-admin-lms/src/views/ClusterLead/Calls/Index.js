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
    ClusterGetAllCallsApi,
    ClusterGetCallActivityDetailsApi,
    ClusterGetAllLeadDropDownApi,
    ClusterGetAllBdeDropdownApi
} from 'store/slices/clusterLeadAction';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GetClCallsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
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

function Row({ row, key, currentPage, pageLength, leadId, bdeData }) {
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
        dispatch(ClusterGetAllCallsApi(newCurrentPage, pageLength, '', leadId, bdeData));
    };

    const handleUpdateActivityModel = (data) => {
        setOpenSidebar(true);
        setId(data._id);
        dispatch(ClusterGetCallActivityDetailsApi(data._id));
    };

    const handleActivityCloseModel = () => {
        setOpenSidebar(false);
        setId('');
        dispatch(ClearCallActivityData());
        dispatch(ClusterGetAllCallsApi(newCurrentPage, pageLength, '', leadId, bdeData));
    };

    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={key}>
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
                <TableCell align="left">
                    {row.bdData.status === '1' ? (
                        <MuiTypography sx={{ color: '#2196f3' }}>{row?.bdData?.name}</MuiTypography>
                    ) : (
                        <MuiTypography sx={{ color: '#d84315' }}>{row?.bdData?.name}</MuiTypography>
                    )}
                </TableCell>
                {/* <TableCell align="left" sx={{ pr: 3 }}>
                    {moment(row?.createdAt).format('DD-MMM-YYYY')}
                </TableCell> */}
                <TableCell align="left" sx={{ pr: 3 }}>
                    {/* {moment(row?.createdAt).format('DD-MMM-YYYY')} */}
                    {moment(row?.meeting_date_time).format('DD-MMM-YYYY HH:mm:ss')}
                </TableCell>
                {/* <TableCell align="left" sx={{ py: 0 }}>
                    <MuiTooltip title="View Activity" arrow>
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
                            onClick={() => handleUpdateActivityModel(row)}
                        >
                            <Visibility sx={{ mr: 1 }} /> Activity
                        </Button>
                    </MuiTooltip>
                </TableCell> */}
                {/* <TableCell align="left" sx={{ pr: 3, py: 0 }}>
                    <MuiTooltip title="Edit Lead" arrow>
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
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
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
                                                <MuiTooltip title="View" arrow>
                                                    <div>
                                                        <Visibility
                                                            onClick={() => handleUpdateActivityModel(row)}
                                                            sx={{ cursor: 'pointer', color: '#3e7dc3' }}
                                                        />
                                                    </div>
                                                </MuiTooltip>
                                                <MuiTooltip title="Edit" arrow>
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
    width: 290,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
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
    const [leadId, setLeadId] = useState('');
    const [bdeData, setBdeData] = useState('');
    const newmenu = useSelector((state) => state.clusterLeadAction);
    const { getCallsList, getCallsLoading, getLeadDropdown, getBdeDropdownList } = newmenu;
    // const {  } = useSelector((state) => state.businessAction);
    // const newRow = [];
    // rows.forEach((element) => {
    //     newRow.push({
    //         ...element,
    //         history: null
    //     });
    // });

    useEffect(() => {
        dispatch(ClusterGetAllCallsApi(1, pageLength, '', leadId));
    }, [pageLength]);

    useEffect(() => {
        dispatch(ClusterGetAllBdeDropdownApi());
        dispatch(CallModeGetApi());
        dispatch(CallTypeGetApi());
        dispatch(CallStatusGetApi());
        dispatch(ClusterGetAllLeadDropDownApi());
        // dispatch(PreDefineNotesGetApi());
        // dispatch(LeadFollowUpsGetApi());
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(ClusterGetAllCallsApi(currentPage + 1, pageLength, search, leadId, bdeData));
    };
    // const onSearchLead = (e) => {
    //     if (e.target.value.length > 2) {
    //         dispatch(ClusterGetAllCallsApi(currentPage + 1, pageLength, e.target.value, leadId, bdeData));
    //     }
    //     if (e.target.value.length === 0) {
    //         dispatch(ClusterGetAllCallsApi(currentPage + 1, pageLength, '', leadId, bdeData));
    //     }
    //     setSearch(e.target.value);
    //     // dispatch(ClusterGetAllCallsApi(currentPage + 1, pageLength, ''));
    // };

    const onLeadStatusChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setLeadId(selectValue);
        dispatch(ClusterGetAllCallsApi(currentPage + 1, pageLength, '', selectValue));
    };
    const onBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);
        dispatch(ClusterGetAllCallsApi(currentPage + 1, pageLength, search, leadId, selectValue));
    };
    // console.log('🚀leadId:', leadId, bdeData);
    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(ClusterGetAllCallsApi(newPage + 1, pageLength, '', leadId, bdeData));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(ClusterGetAllCallsApi(currentPage + 1, event.target.value, '', leadId, bdeData));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
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
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* <CSVExport data={newRow} filename="basic-table.csv" header={header} /> */}
                    {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}

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
                                // size="small"
                                style={{
                                    minWidth: '250px'
                                }}
                            />
                        )}
                    />
                    <Autocomplete
                        options={getLeadDropdown}
                        getOptionLabel={(option) => (option ? option.client_name : '')}
                        value={getLeadDropdown.find((option) => option._id === leadId) || null}
                        onChange={onLeadStatusChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Lead"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                                style={{
                                    minWidth: '250px'
                                }}
                            />
                        )}
                    />

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
                        Add Meetings <AddCircleRoundedIcon sx={{ ml: 1 }} />
                    </Button> */}
                </Stack>
            }
        >
            {/* table */}
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3, py: 2 }} />
                            <TableCell sx={{ py: 2 }}>Client Name</TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Call Type
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Call Mode Type
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                BDE Name
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Meeting Date & Time
                            </TableCell>
                            {/* <TableCell sx={{ py: 0, width: '170px' }} align="left">
                                Activity
                            </TableCell> */}
                            {/* <TableCell sx={{ pr: 3 }} align="left">
                                Action
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getCallsLoading && getCallsList.docs.length > 0 ? (
                            getCallsList.docs.map((row, i) => (
                                <Row
                                    row={row}
                                    bdeData={bdeData}
                                    leadId={leadId}
                                    key={i}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                />
                            ))
                        ) : (
                            <>
                                {getCallsLoading === true ? (
                                    <GetClCallsTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
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
