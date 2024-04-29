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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
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
import AddLeadsModels from './AddLeadsModels';
import {
    ClearLeadActivityData,
    GetAllLeadApi,
    GetLeadActivityDetailsApi,
    AddLeadResponseApi,
    GetFollowUpsDetailApi,
    ClearFollowUpCallData
} from 'store/slices/businessAction';
import { dispatch } from 'store';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import { LeadsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
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
import EditLeadsModels from './EditLeadsModels';
// import ReactReadMoreReadLess from 'react-read-more-read-less';
import { shouldForwardProp } from '@mui/system';
import LeadActivityStatus from './LeadActivityStatus';
import { Visibility } from '@mui/icons-material';
import UpdateLeadStatus from './UpdateLeadStatus';
import { getLeadStatusColor } from 'Helper/StatusColor';
import { CSVExport } from './TableExports';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { openSnackbar } from 'store/slices/snackbar';
import { LeadStatusRedirectionClose } from 'store/slices/commonAction';
import CallIcon from '@mui/icons-material/Call';
import FollowUpCalls from './FollowUpCalls';

// table data
function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 }
        ]
    };
}

function Row({ row, key, currentPage, pageLength, search, leadStatus }) {
    const successSX = { color: 'success.dark', cursor: 'pointer' };
    const errorSX = { color: 'error.main', cursor: 'pointer' };
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);
    const [openFollowUp, setOpenFollowUp] = React.useState(false);
    const [leadStatusId, setLeadStatus] = React.useState('');

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
        dispatch(GetAllLeadApi(newCurrentPage, pageLength, search, leadStatus));
        dispatch(ClearFollowUpCallData());
    };

    const handleUpdateActivityModel = (data) => {
        setOpenSidebar(true);
        setOpenStatus(false);
        setId(data._id);
        dispatch(GetLeadActivityDetailsApi(data._id));
    };

    const handleFollowUpModel = (data) => {
        setOpenFollowUp(true);
        setOpenEditModel(false);
        setOpenStatus(false);
        setOpenSidebar(false);
        setId(data._id);
        dispatch(GetFollowUpsDetailApi(data._id));
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
        dispatch(GetAllLeadApi(newCurrentPage, pageLength, search, leadStatus));
    };
    // console.log('🚀 openSidebar:', openSidebar);

    const onSubmitResponse = (resType, id) => {
        const newData = {
            lead_id: id,
            response: resType
        };
        console.log('object', newData);

        dispatch(AddLeadResponseApi(newData)).then((res) => {
            if (res.succeeded === true) {
                dispatch(GetAllLeadApi(newCurrentPage, pageLength, '', leadStatus));
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
                dispatch(GetAllLeadApi(newCurrentPage, pageLength, '', leadStatus));
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
        // );
        // .catch((err) => {
        //     setSubmitting(false);
        // });
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
                    {row?.client_name}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.leadTypeData?.status_name}
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
                <TableCell align="left" sx={{ pr: 3 }}>
                    {moment(row?.createdAt).format('DD-MMM-YYYY')}
                </TableCell>
                <TableCell align="left" sx={{ pr: 1, py: 0 }}>
                    <Stack direction="row" alignItems="center">
                        <ArrowDropUpIcon sx={successSX} onClick={() => onSubmitResponse(1, row._id)} />
                        <MuiTooltip title="Positive Response" arrow placement="right">
                            <Typography sx={successSX} onClick={() => onSubmitResponse(1, row._id)}>
                                {row?.leadResponseData[0] && row?.leadResponseData[0]?.positiveResponses[0] > 0
                                    ? row?.leadResponseData[0]?.positiveResponses[0]
                                    : 0}
                            </Typography>
                        </MuiTooltip>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <ArrowDropDownIcon sx={errorSX} onClick={() => onSubmitResponse(2, row._id)} />
                        <MuiTooltip title="Negative Response" arrow placement="right">
                            <Typography sx={errorSX} onClick={() => onSubmitResponse(2, row._id)}>
                                {row?.leadResponseData[0] && row?.leadResponseData[0]?.negativeResponses[0] > 0
                                    ? row?.leadResponseData[0]?.negativeResponses[0]
                                    : 0}
                            </Typography>
                        </MuiTooltip>
                    </Stack>
                </TableCell>
                <TableCell align="center" sx={{ py: 0 }}>
                    <MuiTooltip title="Follow-Ups Calls" arrow>
                        {/* <div> */}
                        <CallIcon
                            onClick={() => handleFollowUpModel(row)}
                            sx={{
                                color: '#4d97f3',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#b5dbff'
                                }
                            }}
                        />
                        {/* </div> */}
                    </MuiTooltip>
                </TableCell>
                <TableCell align="center" sx={{ py: 0 }}>
                    <MuiTooltip title="View Activity" arrow>
                        {/* <div> */}
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
                        {/* </div> */}
                    </MuiTooltip>
                </TableCell>
                {/* <TableCell align="center" sx={{ pr: 3, py: 0 }}>
                   
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
                                        title="Lead Information"
                                        content={false}
                                        secondary={
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                {/* <CSVExport
                                                    data={row.history?.map((historyRow) => historyRow)}
                                                    filename="collapse-table.csv"
                                                    // header={header}
                                                /> */}
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
                                                    <TableCell>{row?.client_email ? row?.client_email : '-'}</TableCell>
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
                                                    {/* <TableCell>{row?.add_notes !== '' ? row?.add_notes : '-'}</TableCell> */}
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
            {id && openEditModel && <EditLeadsModels open={openEditModel} rowData={row} close={() => handleCloseModel()} />}
            {id && openFollowUp && <FollowUpCalls leadId={id} open={openFollowUp} close={() => handleCloseModel()} />}
            {openSidebar && <LeadActivityStatus open={openSidebar} leadId={id} close={() => handleActivityCloseModel()} />}
            {id && openStatus && (
                <UpdateLeadStatus leadStatusId={leadStatusId} open={openStatus} leadId={id} close={() => handleActivityCloseModel()} />
            )}
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
    const { getLeadsList, getLeadsLoading } = useSelector((state) => state.businessAction);
    const { leadStatusList } = useSelector((state) => state.masterAction);
    const { dashboardleadTypeId } = useSelector((state) => state.commonAction);
    const [leadStatus, setLeadStatus] = useState('' || dashboardleadTypeId);
    // const [leadStatus, setLeadStatus] = useState('');
    // const newRow = [];
    // rows.forEach((element) => {
    //     newRow.push({
    //         ...element,
    //         history: null
    //     });
    // });
    const header = [
        { label: 'Dessert (100g serving)', key: '_id' },
        { label: 'Calories (g)', key: 'lead_req_type_id' },
        { label: 'Carbs (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 5 },
        { label: 'Protein (g)', key: 6 },
        { label: 'Dessert (100g serving)', key: 'lead_req_type_id' },
        { label: 'Calories (g)', key: 'lead_req_type_id' },
        { label: 'Carbs (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Dessert (100g serving)', key: 'lead_req_type_id' },
        { label: 'Calories (g)', key: 'lead_req_type_id' },
        { label: 'Carbs (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Dessert (100g serving)', key: 'lead_req_type_id' },
        { label: 'Calories (g)', key: 'lead_req_type_id' },
        { label: 'Carbs (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' },
        { label: 'Dessert (100g serving)', key: 'lead_req_type_id' },
        { label: 'Calories (g)', key: 'lead_req_type_id' },
        { label: 'Carbs (g)', key: 'lead_req_type_id' },
        { label: 'Protein (g)', key: 'lead_req_type_id' }
    ];

    useEffect(() => {
        dispatch(GetAllLeadApi(1, pageLength, '', leadStatus));
    }, [pageLength]);

    useEffect(() => {
        dispatch(LeadSourceGetApi());
        dispatch(LeadTypeGetApi());
        dispatch(LeadStatusGetApi());
        dispatch(RequirementTypeGetApi());
        dispatch(PreDefineNotesGetApi());
        dispatch(LeadFollowUpsGetApi());
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(GetAllLeadApi(currentPage + 1, pageLength, search, leadStatus));
    };

    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(GetAllLeadApi(currentPage + 1, pageLength, e.target.value, leadStatus));
        }
        if (e.target.value.length === 0) {
            dispatch(GetAllLeadApi(currentPage + 1, pageLength, '', leadStatus));
        }
        setSearch(e.target.value);
        // dispatch(GetAllLeadApi(currentPage + 1, pageLength, '', leadStatus));
    };

    const onSearchReset = () => {
        setSearch('');
        dispatch(GetAllLeadApi(currentPage + 1, pageLength, '', leadStatus));
    };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(GetAllLeadApi(newPage + 1, pageLength, '', leadStatus));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(GetAllLeadApi(currentPage + 1, event.target.value, '', leadStatus));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };
    // console.log('🚀currentPage:', currentPage);
    const onLeadStatusChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setLeadStatus(selectValue);
        dispatch(LeadStatusRedirectionClose({ dashboardleadType: '', dashboardleadTypeId: '' }));
        dispatch(GetAllLeadApi(currentPage + 1, pageLength, '', selectValue));
    };

    const onExcelFileName = () => {
        const FileName = `Leads ${moment(new Date()).format('DD-MMM-YYYY hh-mm a')}.csv`;
        return FileName;
    };
    const ddata = [
        {
            lead_source_id: 'Hello',
            client_name: 'John Snow',
            leadStatusData: {
                _id: '6538cd02b3d43e499b738c01',
                status_name: 'Active'
            }
        }
    ];
    return (
        <MainCard
            content={false}
            title={
                <Stack direction="row">
                    <IconBook2 sx={{ mr: 2 }} /> &nbsp; Leads Management
                </Stack>
            }
            sx={{ border: '0px solid', padding: '5px' }}
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* <CSVExport data={ddata} filename={onExcelFileName()} /> */}
                    {/* <CSVExport data={getLeadsList?.docs} type={1} filename={onExcelFileName()} header={header} />
                    <CSVExport data={getLeadsList?.docs} type={2} filename={onExcelFileName()} header={header} /> */}
                    {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}
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
                                    minWidth: '250px'
                                }}
                            />
                        )}
                    />
                    <Button
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
                    </Button>
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
                                Country
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Assigned Date
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Response
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="center">
                                Follow-Ups Calls
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="center">
                                Activity
                            </TableCell>
                            {/* <TableCell sx={{ pr: 3 }} align="center">
                                Action
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getLeadsLoading && getLeadsList?.docs?.length > 0 ? (
                            getLeadsList?.docs?.map((row, i) => (
                                <Row
                                    row={row}
                                    key={i}
                                    leadStatus={leadStatus}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                    search={search}
                                />
                            ))
                        ) : (
                            <>
                                {getLeadsLoading === true ? (
                                    <LeadsTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
                                            No Leads Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {/* {getLeadsList.docs.map((row) => (
                            <Row key={row.client_name} row={row} />
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100, 150, 250, 500]}
                component="div"
                // rows={rows}
                count={getLeadsList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {openPopupModel && <AddLeadsModels open={openPopupModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default connect(null, { AddLeadResponseApi })(Index);
