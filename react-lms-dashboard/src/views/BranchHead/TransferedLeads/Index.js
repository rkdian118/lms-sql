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
    Typography
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
    IconBook2,
    IconDeviceAnalytics,
    IconPhonePlus,
    IconFileRss,
    IconFilePlus,
    IconX
} from '@tabler/icons';
// import AddLeadsModels from './AddLeadsModels';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GetBranchDuplicateLeadsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
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
// import EditLeadsModels from './EditLeadsModels';
// import ReactReadMoreReadLess from 'react-read-more-read-less';
import { shouldForwardProp } from '@mui/system';
// import LeadActivityStatus from './LeadActivityStatus';
import { Visibility } from '@mui/icons-material';
// import UpdateLeadStatus from './UpdateLeadStatus';
import { getLeadStatusColor } from 'Helper/StatusColor';
// import { CSVExport } from './TableExports';
import { ClearLeadActivityData, ClearFollowUpCallData } from 'store/slices/clusterLeadAction';
import {
    GetAllTransferLeadListApi,
    GetAllBdeDropdownApi,
    GetFollowUpsDetailApi,
    GetLeadActivityDetailsApi,
    ClusterLeadDropDownApi,
    GetSelectedClBdeDropdownApi
} from 'store/slices/clusterAction';
import MuiTypography from '@mui/material/Typography';
import { LeadStatusRedirectionClose } from 'store/slices/commonAction';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import CallIcon from '@mui/icons-material/Call';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { openSnackbar } from 'store/slices/snackbar';
// import FollowUpsCalls from './FollowUpsCalls';
// table data

function Row({ row, key, currentPage, pageLength, search, leadStatus, bdeData, clusterLeadData }) {
    const successSX = { color: 'success.dark' };
    const errorSX = { color: 'error.main' };
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);
    const [leadStatusId, setLeadStatus] = React.useState('');
    const [openFollowUp, setOpenFollowUp] = React.useState(false);

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenStatus(false);
    };

    const handleCloseModel = () => {
        setOpenFollowUp(false);
        setOpenEditModel(false);
        setOpenStatus(false);
        setOpenSidebar(false);
        setId('');
        setLeadStatus('');
        dispatch(ClearFollowUpCallData());
        dispatch(GetAllTransferLeadListApi(newCurrentPage, pageLength, search, leadStatus, bdeData, clusterLeadData));
    };

    const handleUpdateActivityModel = (data) => {
        setOpenSidebar(true);
        setOpenStatus(false);
        setId(data._id);
        dispatch(GetLeadActivityDetailsApi(data._id));
    };

    const handleLeadStatusUpdateModel = (data) => {
        setOpenStatus(true);
        setOpenSidebar(false);
        setId(data._id);
        setLeadStatus(data?.leadStatusData?._id);
    };

    const handleActivityCloseModel = () => {
        setOpenSidebar(false);
        setId('');
        dispatch(ClearLeadActivityData());
        dispatch(GetAllTransferLeadListApi(newCurrentPage, pageLength, search, leadStatus, bdeData, clusterLeadData));
    };

    const handleFollowUpModel = (data) => {
        setOpenFollowUp(true);
        setOpenEditModel(false);
        setOpenStatus(false);
        setOpenSidebar(false);
        setId(data._id);
        dispatch(GetFollowUpsDetailApi(data._id));
    };
    // console.log('🚀 openSidebar:', openSidebar);

    return (
        <>
            <TableRow hover key={key}>
                <TableCell sx={{ pl: 3, py: 0 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ py: 0 }}>
                    {row?.client_name}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.leadTypeData?.status_name}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    <MuiTypography sx={{ color: '#2196f3' }}>{row?.bdData?.name ? row?.bdData?.name : '-'}</MuiTypography>
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    <MuiTypography sx={{ color: '#2196f3' }}>{row?.transferbdData?.name ? row?.transferbdData?.name : '-'}</MuiTypography>
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.client_country}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.leadStatusData?.status_name ? (
                        <Chip
                            label={row?.leadStatusData?.status_name}
                            variant="outlined"
                            // color="success"
                            onClick={() => handleLeadStatusUpdateModel(row)}
                            sx={{
                                cursor: 'pointer',
                                color: getLeadStatusColor(row?.leadStatusData?.status_name),
                                borderColor: getLeadStatusColor(row?.leadStatusData?.status_name)
                            }}
                        />
                    ) : (
                        <Chip
                            label="No Found"
                            variant="outlined"
                            color="secondary"
                            sx={{
                                cursor: 'pointer',
                                color: getLeadStatusColor(row?.leadStatusData?.status_name),
                                borderColor: getLeadStatusColor(row?.leadStatusData?.status_name)
                            }}
                            onClick={() => handleLeadStatusUpdateModel(row)}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ pr: 0 }}>
                    {moment(row?.createdAt).format('DD-MMM-YYYY')}
                </TableCell>
                <TableCell align="left" sx={{ pr: 0 }}>
                    {moment(row?.createdAt).format('DD-MMM-YYYY')}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <SubCard
                                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                        title="Duplicate Lead Information"
                                        content={false}
                                        // secondary={
                                        //     <Stack direction="row" spacing={2} alignItems="center">
                                        //         <MuiTooltip title="Update" arrow>
                                        //             <div>
                                        //                 <EditIcon
                                        //                     onClick={() => handleEditModel(row)}
                                        //                     sx={{ cursor: 'pointer', color: '#3e7dc3' }}
                                        //                 />
                                        //             </div>
                                        //         </MuiTooltip>
                                        //     </Stack>
                                        // }
                                    >
                                        <Table size="small" aria-label="purchases">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Requirement Type</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Lead Source </TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Lead Type</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client LinkedIn</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Company Name</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>
                                                        {row?.reqTypeData?.status_name ? row?.reqTypeData?.status_name : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.leadSourceData?.status_name ? row?.leadSourceData?.status_name : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.leadTypeData?.status_name ? row?.leadTypeData?.status_name : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.client_linkedin ? (
                                                            <a href={row?.client_linkedin} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{row?.company_name ? row?.company_name : '-'}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Number</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client WhatsApp</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Country</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{row?.client_name ? row?.client_name : '-'}</TableCell>
                                                    <TableCell>
                                                        {row?.client_email}
                                                        <CopyToClipboard
                                                            text={row?.client_email}
                                                            onCopy={() =>
                                                                dispatch(
                                                                    openSnackbar({
                                                                        open: true,
                                                                        message: 'Email Copied',
                                                                        variant: 'alert',
                                                                        alert: {
                                                                            color: 'success'
                                                                        },
                                                                        transition: 'Fade',
                                                                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                                                                    })
                                                                )
                                                            }
                                                        >
                                                            <ContentCopyTwoToneIcon
                                                                sx={{
                                                                    color: theme.palette.primary.main,
                                                                    ml: 1,
                                                                    mt: 0.5,
                                                                    fontSize: '1rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
                                                        </CopyToClipboard>
                                                    </TableCell>
                                                    <TableCell>{row?.client_number ? row?.client_number : '-'}</TableCell>
                                                    <TableCell>{row?.client_whatsapp_num ? row?.client_whatsapp_num : '-'}</TableCell>
                                                    <TableCell>{row?.client_country ? row?.client_country : '-'}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold', width: '320px' }}>Add Notes</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Upwork URL</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Bid URL</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Proposal Amount</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Budget</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ width: '320px' }}>
                                                        {row?.add_notes !== '' ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={20}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.add_notes}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.upwork_job_url ? (
                                                            <a href={row?.upwork_job_url} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                        {/* {row?.upwork_job_url ? row?.upwork_job_url : '-'} */}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.bid_url ? (
                                                            <a href={row?.bid_url} target="_blank" rel="noreferrer">
                                                                Click Here
                                                            </a>
                                                        ) : (
                                                            '-'
                                                        )}
                                                        {/* {row?.bid_url ? row?.bid_url : '-'} */}
                                                    </TableCell>
                                                    <TableCell>{row?.proposal_amount ? row?.proposal_amount : '-'}</TableCell>
                                                    <TableCell>{row?.client_budget ? row?.client_budget : '-'}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Skype Id</TableCell>
                                                    <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>
                                                        Address
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{row?.skype_id ? row?.skype_id : '-'}</TableCell>
                                                    <TableCell colSpan={4}>{row?.address ? row?.address : '-'}</TableCell>
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
            {/* {id && openFollowUp && <FollowUpsCalls leadId={id} open={openFollowUp} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditLeadsModels open={openEditModel} rowData={row} close={() => handleCloseModel()} />}
            {openSidebar && <LeadActivityStatus open={openSidebar} leadId={id} close={() => handleActivityCloseModel()} />}
            {id && openStatus && (
                <UpdateLeadStatus leadStatusId={leadStatusId} open={openStatus} leadId={id} close={() => handleActivityCloseModel()} />
            )} */}
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 200,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },

    [theme.breakpoints.down('lg')]: {
        width: 250
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
    // const { getSelectedBDEDropdownList } = useSelector((state) => state.clusterLeadAction);
    const { getTransferLeadList, getTransferLeadLoading, getClDropdownList, getSelectedBDEDropdownList } = useSelector(
        (state) => state.clusterAction
    );
    const { leadStatusList } = useSelector((state) => state.masterAction);
    const { dashboardleadTypeId } = useSelector((state) => state.commonAction);
    const [leadStatus, setLeadStatus] = useState('' || dashboardleadTypeId);
    const [bdeData, setBdeData] = useState('');
    const [clusterLeadData, setClusterLeadData] = useState('');

    useEffect(() => {
        dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, search, leadStatus, bdeData, clusterLeadData));
    }, [pageLength]);

    useEffect(() => {
        dispatch(ClusterLeadDropDownApi());
        dispatch(GetSelectedClBdeDropdownApi([]));
        dispatch(LeadSourceGetApi());
        dispatch(LeadTypeGetApi());
        dispatch(LeadStatusGetApi());
        dispatch(RequirementTypeGetApi());
        dispatch(PreDefineNotesGetApi());
        dispatch(LeadFollowUpsGetApi());
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, search, leadStatus, bdeData, clusterLeadData));
    };

    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, e.target.value, leadStatus, bdeData, clusterLeadData));
        }
        if (e.target.value.length === 0) {
            dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, '', leadStatus, bdeData, clusterLeadData));
        }
        setSearch(e.target.value);
        // dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, '', leadStatus, bdeData, clusterLeadData));
    };

    const onSearchReset = () => {
        setSearch('');
        // console.log('Clear');
        dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, '', leadStatus, bdeData, clusterLeadData));
    };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(GetAllTransferLeadListApi(newPage + 1, pageLength, '', leadStatus, bdeData, clusterLeadData));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(GetAllTransferLeadListApi(currentPage + 1, event.target.value, '', leadStatus, bdeData, clusterLeadData));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };
    // console.log('🚀currentPage:', currentPage);
    const onLeadStatusChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setLeadStatus(selectValue);
        dispatch(LeadStatusRedirectionClose({ dashboardleadType: '', dashboardleadTypeId: '' }));
        dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, '', selectValue, bdeData, clusterLeadData));
    };

    const onClusterLeadChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        const selectBdeValue = newValue ? [newValue._id] : [];
        setClusterLeadData(selectValue);
        setBdeData('');
        dispatch(GetSelectedClBdeDropdownApi(selectBdeValue));
        dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, search, leadStatus, '', selectValue));
    };

    const onBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);
        dispatch(GetAllTransferLeadListApi(currentPage + 1, pageLength, search, leadStatus, selectValue, clusterLeadData));
    };

    return (
        <MainCard
            content={false}
            title={
                <Stack direction="row">
                    <IconBook2 sx={{ mr: 2 }} /> &nbsp; Transfered Leads
                </Stack>
            }
            sx={{ border: '0px solid', padding: '5px' }}
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* <CSVExport data={ddata} filename={onExcelFileName()} /> */}
                    {/* <CSVExport data={getTransferLeadList?.docs} type={1} filename={onExcelFileName()} header={header} />
                    <CSVExport data={getTransferLeadList?.docs} type={2} filename={onExcelFileName()} header={header} /> */}
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
                    <Autocomplete
                        options={leadStatusList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={leadStatusList.find((option) => option._id === leadStatus) || null}
                        onChange={onLeadStatusChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Status"
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
                                <HeaderAvatarStyle variant="rounded">
                                    <IconX stroke={1.5} size="1.5rem" onClick={() => onSearchReset()} />
                                </HeaderAvatarStyle>
                            </InputAdornment>
                        }
                        aria-describedby="search-helper-text"
                        inputProps={{ 'aria-label': 'weight' }}
                        onChange={(e) => onSearchLead(e)}
                        size="small"
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
                        Add Leads <AddCircleRoundedIcon sx={{ ml: 1 }} />
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
                                Lead Type
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Transfered From
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Transfered To
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Country
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Transfer Date
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Assigned Date
                            </TableCell>
                            {/* <TableCell sx={{ py: 2 }} align="left">
                                Response
                            </TableCell> */}
                            {/* <TableCell sx={{ py: 2 }} align="center">
                                Follow-Ups Calls
                            </TableCell> */}
                            {/* <TableCell sx={{ py: 2 }} align="center">
                                Activity
                            </TableCell> */}
                            {/* <TableCell sx={{ pr: 3 }} align="center">
                                Action
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getTransferLeadLoading && getTransferLeadList?.docs?.length > 0 ? (
                            getTransferLeadList?.docs?.map((row, i) => (
                                <Row
                                    row={row}
                                    key={i}
                                    leadStatus={leadStatus}
                                    bdeData={bdeData}
                                    clusterLeadData={clusterLeadData}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                    search={search}
                                />
                            ))
                        ) : (
                            <>
                                {getTransferLeadLoading === true ? (
                                    <GetBranchDuplicateLeadsTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={11}>
                                            No Leads Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {/* {getTransferLeadList.docs.map((row) => (
                            <Row key={row.client_name} row={row} />
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={getTransferLeadList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* {openPopupModel && <AddLeadsModels open={openPopupModel} close={() => handleCloseModel()} />} */}
        </MainCard>
    );
};

export default Index;
