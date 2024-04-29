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
import TransferLeadModel from './TransferLeadModel';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GetCoutryLeadsTableLoader } from 'ui-component/cards/Skeleton/CountryLeadLoader';
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
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import UpdateLeadStatus from './UpdateLeadStatus';
import { getLeadStatusColor } from 'Helper/StatusColor';
import { CSVExport } from './TableExports';
// import { ClearLeadActivityData, ClearFollowUpCallData } from 'store/slices/countryLeadAction';
import {
    GetAllLeadListApi,
    GetAllBdeDropdownApi,
    GetFollowUpsDetailApi,
    GetLeadActivityDetailsApi,
    ClusterLeadDropDownApi,
    GetSelectedClBdeDropdownApi,
    GetAllLeadDropDownApi,
    ClearLeadActivityData,
    ClearFollowUpCallData,
    ClearBranchLeadsData
} from 'store/slices/countryLeadAction';
import MuiTypography from '@mui/material/Typography';
import { LeadStatusRedirectionClose } from 'store/slices/commonAction';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactReadMoreReadLess from 'react-read-more-read-less';
import CallIcon from '@mui/icons-material/Call';
import FollowUpsCalls from './FollowUpsCalls';
import { DateRangePicker } from 'rsuite';
import { DateRangeFilter } from 'Helper/Validation';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SingleLeadTransfer from './SingleLeadTransfer';
import { countries } from 'Helper/CountriesData';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { openSnackbar } from 'store/slices/snackbar';
import UpdateProjection from './UpdateProjection';
// table data

function Row({
    row,
    key,
    currentPage,
    pageLength,
    search,
    leadStatus,
    bdeData,
    clusterLeadData,
    startDate,
    endDate,
    requirementTypeData,
    leadSourceData,
    leadType,
    countryValue,
    phoneNumberFilter
}) {
    const successSX = { color: 'success.dark' };
    const errorSX = { color: 'error.main' };
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [openTransfer, setOpenTransfer] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);
    const [leadStatusId, setLeadStatus] = React.useState('');
    const [openFollowUp, setOpenFollowUp] = React.useState(false);
    const [openProjectStatus, setOpenProjectStatus] = React.useState(false);
    const [projectStatusId, setProjectStatusId] = React.useState('');

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
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const handleUpdateActivityModel = (data, type) => {
        if (type === 1) {
            setOpenSidebar(true);
            setOpenTransfer(false);
        } else {
            setOpenTransfer(true);
            setOpenSidebar(false);
        }
        setOpenStatus(false);
        setId(data._id);
        dispatch(GetLeadActivityDetailsApi(data._id));
    };

    const handleLeadStatusUpdateModel = (data, type) => {
        setLeadStatus(data?.leadStatusData?._id);
        setProjectStatusId(data?.projectionStatusData?._id);
        setOpenSidebar(false);
        setId(data._id);

        if (type === 2) {
            const updateValue = data?.leadStatusData?.status_name === 'Prospect';
            setOpenProjectStatus(updateValue);
            setOpenStatus(false);
        } else {
            setOpenProjectStatus(false);
            setOpenStatus(true);
        }
    };

    const handleActivityCloseModel = () => {
        setOpenSidebar(false);
        setOpenTransfer(false);
        setId('');
        dispatch(ClearLeadActivityData());
        dispatch(GetAllBdeDropdownApi());
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
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
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.client_country}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.leadStatusData?.status_name ? (
                        <Chip
                            label={row?.leadStatusData?.status_name}
                            variant="outlined"
                            color="success"
                            onClick={() => handleLeadStatusUpdateModel(row, 1)}
                            sx={{
                                cursor: 'pointer',
                                color: row?.leadStatusData?.status_color,
                                borderColor: row?.leadStatusData?.status_color
                            }}
                        />
                    ) : (
                        <Chip
                            label="No Found"
                            variant="outlined"
                            color="secondary"
                            sx={{
                                cursor: 'pointer',
                                color: row?.leadStatusData?.status_color,
                                borderColor: row?.leadStatusData?.status_color
                            }}
                            onClick={() => handleLeadStatusUpdateModel(row, 1)}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.projectionStatusData?.status_name ? (
                        <Chip
                            label={row?.projectionStatusData?.status_name}
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleLeadStatusUpdateModel(row, 2)}
                            sx={{
                                cursor: row?.leadStatusData?.status_name === 'Prospect' ? 'pointer !important' : 'not-allowed !important',
                                color: row?.projectionStatusData?.status_color,
                                borderColor: row?.projectionStatusData?.status_color
                            }}
                        />
                    ) : (
                        <Chip
                            label="No Found"
                            variant="outlined"
                            color="secondary"
                            sx={{
                                cursor: row?.leadStatusData?.status_name === 'Prospect' ? 'pointer' : 'not-allowed'
                            }}
                            onClick={() => handleLeadStatusUpdateModel(row, 2)}
                        />
                    )}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {/* <Chip
                        label={row?.resp?.status_name ? row?.resp?.status_name : 'No Found'}
                        variant="outlined"
                        size="small"
                        color="success"
                        sx={{
                            borderColor: '#00e676',
                            fontSize: '0.875rem'
                        }}
                    />
                    <br /> */}
                    {moment(row?.createdAt).format('DD-MMM-YYYY')}
                </TableCell>
                <TableCell align="left" sx={{ pr: 1, py: 0 }}>
                    <Stack direction="row" alignItems="center">
                        <ArrowDropUpIcon sx={successSX} />
                        <MuiTooltip title="Positive Response" arrow placement="right">
                            <Typography sx={successSX}>
                                {row?.leadResponseData?.length > 0 ? (
                                    <>
                                        {row?.leadResponseData[0] && row?.leadResponseData[0]?.positiveResponses[0] > 0
                                            ? row?.leadResponseData[0]?.positiveResponses[0]
                                            : 0}
                                    </>
                                ) : (
                                    0
                                )}
                            </Typography>
                        </MuiTooltip>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <ArrowDropDownIcon sx={errorSX} />
                        <MuiTooltip title="Negative Response" arrow placement="right">
                            <Typography sx={errorSX}>
                                {row?.leadResponseData?.length > 0 ? (
                                    <>
                                        {row?.leadResponseData[0] && row?.leadResponseData[0]?.negativeResponses[0] > 0
                                            ? row?.leadResponseData[0]?.negativeResponses[0]
                                            : 0}
                                    </>
                                ) : (
                                    0
                                )}
                            </Typography>
                        </MuiTooltip>
                    </Stack>
                </TableCell>
                {/* <TableCell align="center" sx={{ py: 0 }}>
                    <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                        <MuiTooltip title="Transfer Lead" arrow>
                            <SwitchLeftIcon color="secondary" onClick={() => handleUpdateActivityModel(row, 2)} />
                        </MuiTooltip>
                    </AnimateButton>
                </TableCell> */}
                <TableCell align="center" sx={{ py: 0 }}>
                    <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                        <MuiTooltip title="View Activity" arrow>
                            <Visibility color="primary" onClick={() => handleUpdateActivityModel(row, 1)} />
                        </MuiTooltip>
                    </AnimateButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
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
                                                    <TableCell style={{ fontWeight: 'bold' }}>Assigned Date</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Skype Id</TableCell>
                                                    <TableCell colSpan={3} style={{ fontWeight: 'bold' }}>
                                                        Address
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{moment(row?.createdAt).format('DD-MMM-YYYY')}</TableCell>
                                                    <TableCell>{row?.skype_id ? row?.skype_id : '-'}</TableCell>
                                                    <TableCell colSpan={3}>{row?.address ? row?.address : '-'}</TableCell>
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
            {id && openFollowUp && <FollowUpsCalls leadId={id} open={openFollowUp} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditLeadsModels open={openEditModel} rowData={row} close={() => handleCloseModel()} />}
            {openSidebar && <LeadActivityStatus open={openSidebar} leadId={id} close={() => handleActivityCloseModel()} />}
            {openTransfer && <SingleLeadTransfer open={openTransfer} rowData={row} close={() => handleActivityCloseModel()} />}
            {id && openStatus && (
                <UpdateLeadStatus
                    projectStatusId={projectStatusId}
                    leadStatusId={leadStatusId}
                    open={openStatus}
                    leadId={id}
                    close={() => handleActivityCloseModel()}
                />
            )}
            {id && openProjectStatus && (
                <UpdateProjection
                    projectStatusId={projectStatusId}
                    open={openProjectStatus}
                    leadId={id}
                    close={() => handleActivityCloseModel()}
                />
            )}
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object,
    key: PropTypes.number
};

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: '100%',
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

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const Index = () => {
    const theme = useTheme();
    const { getBranchLeadList, getBranchLeadLoading, getClDropdownList, getSelectedBDEDropdownList } = useSelector(
        (state) => state.countryLeadAction
    );

    const { requirementTypeList, leadSourceList, leadTypeList, leadStatusList } = useSelector((state) => state.masterAction);
    const { dashboardleadTypeId, startMonthDate, endMonthDate, selectedBDEData, selectedClusterLeadData } = useSelector(
        (state) => state.commonAction
    );

    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [openPopupModel, setOpenModel] = useState(false);
    const [search, setSearch] = useState('');
    const [leadStatus, setLeadStatus] = useState('' || dashboardleadTypeId);
    const [date, setDate] = useState(['' || startMonthDate, '' || endMonthDate]);
    const [bdeData, setBdeData] = useState('' || selectedBDEData);
    const [clusterLeadData, setClusterLeadData] = useState('' || selectedClusterLeadData);
    const [phoneNumberFilter, setPhoneNumberFilter] = useState('');
    const [requirementTypeData, setRequirementTypeData] = useState('');
    const [leadSourceData, setLeadSourceData] = useState('');
    const [leadType, setLeadType] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const countryValue = selectedCountry !== null || selectedCountry?.label ? selectedCountry?.label : '';
    const [phoneNumberData, setPhoneNumberData] = useState([
        { _id: 0, name: 'Without Phone Number' },
        { _id: 1, name: 'With Phone Number' }
    ]);

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
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    }, [pageLength, startDate, endDate]);

    useEffect(() => {
        // dispatch(ClusterLeadDropDownApi());
        // dispatch(GetSelectedClBdeDropdownApi([]));
        dispatch(LeadSourceGetApi());
        dispatch(LeadTypeGetApi());
        dispatch(LeadStatusGetApi());
        dispatch(RequirementTypeGetApi());
        dispatch(PreDefineNotesGetApi());
        dispatch(LeadFollowUpsGetApi());
        dispatch(GetAllLeadDropDownApi());
        // dispatch(GetAllBdeDropdownApi());
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(ClearBranchLeadsData());
            dispatch(
                GetAllLeadListApi(
                    currentPage + 1,
                    pageLength,
                    e.target.value,
                    leadStatus,
                    clusterLeadData,
                    bdeData,
                    startDate,
                    endDate,
                    requirementTypeData,
                    leadSourceData,
                    leadType,
                    countryValue,
                    phoneNumberFilter
                )
            );
        }
        if (e.target.value.length === 0) {
            dispatch(ClearBranchLeadsData());
            dispatch(
                GetAllLeadListApi(
                    currentPage + 1,
                    pageLength,
                    '',
                    leadStatus,
                    clusterLeadData,
                    bdeData,
                    startDate,
                    endDate,
                    requirementTypeData,
                    leadSourceData,
                    leadType,
                    countryValue,
                    phoneNumberFilter
                )
            );
        }
        setSearch(e.target.value);
    };

    const onSearchReset = () => {
        setSearch('');
        dispatch(ClearBranchLeadsData());
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const handleChangePage = (event, newPage) => {
        dispatch(ClearBranchLeadsData());
        setCurrentPage(newPage);
        dispatch(
            GetAllLeadListApi(
                newPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(ClearBranchLeadsData());
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                event?.target.value,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    const onOk = async (selectedDate) => {
        // This function is called when the "OK" button is clicked.
        // console.log(' (OK):', selectedDate);
        dispatch(ClearBranchLeadsData());
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                start,
                end,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        // This function is called when the date range selection changes.
        dispatch(ClearBranchLeadsData());
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            dispatch(
                GetAllLeadListApi(
                    currentPage + 1,
                    pageLength,
                    search,
                    leadStatus,
                    clusterLeadData,
                    bdeData,
                    start,
                    end,
                    requirementTypeData,
                    leadSourceData,
                    leadType,
                    countryValue,
                    phoneNumberFilter
                )
            );
        }
    };

    const onLeadStatusChange = (e, newValue) => {
        dispatch(ClearBranchLeadsData());
        const selectValue = newValue ? newValue._id : '';
        setLeadStatus(selectValue);
        // dispatch(LeadStatusRedirectionClose({ dashboardleadType: '', dashboardleadTypeId: '' }));
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                selectValue,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const onRequirementTypeChange = (e, newValue) => {
        dispatch(ClearBranchLeadsData());
        const selectValue = newValue ? newValue._id : '';
        setRequirementTypeData(selectValue);
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                selectValue,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const onLeadSourceChange = (e, newValue) => {
        dispatch(ClearBranchLeadsData());
        const selectValue = newValue ? newValue._id : '';
        setLeadSourceData(selectValue);
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                selectValue,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const onLeadTypeChange = (e, newValue) => {
        dispatch(ClearBranchLeadsData());
        const selectValue = newValue ? newValue._id : '';
        setLeadType(selectValue);
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                selectValue,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const handleCountryChange = (e, newValue) => {
        dispatch(ClearBranchLeadsData());
        setSelectedCountry(newValue);
        const selectValue = newValue ? newValue.label : '';
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                selectValue,
                phoneNumberFilter
            )
        );
    };

    const onPhoneNumberChange = (e, newValue) => {
        dispatch(ClearBranchLeadsData());
        const selectValue = newValue ? newValue._id : '';
        setPhoneNumberFilter(selectValue);
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                bdeData,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                selectValue
            )
        );
    };

    const onClusterLeadChange = (e, newValue) => {
        dispatch(ClearBranchLeadsData());
        const selectValue = newValue ? newValue._id : '';
        const selectBdeValue = newValue ? [newValue._id] : [];
        setClusterLeadData(selectValue);
        setBdeData('');
        dispatch(GetSelectedClBdeDropdownApi(selectBdeValue));
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                selectValue,
                '',
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

    const onBdeChange = (e, newValue) => {
        dispatch(ClearBranchLeadsData());
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);
        dispatch(
            GetAllLeadListApi(
                currentPage + 1,
                pageLength,
                search,
                leadStatus,
                clusterLeadData,
                selectValue,
                startDate,
                endDate,
                requirementTypeData,
                leadSourceData,
                leadType,
                countryValue,
                phoneNumberFilter
            )
        );
    };

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
                            <SwitchLeftIcon sx={{ mr: 1 }} /> Transfer Leads
                        </Button>
                    </AnimateButton>
                </Stack>
            }
        >
            <Grid container spacing={1} mt={0.5}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={requirementTypeList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={requirementTypeList.find((option) => option._id === requirementTypeData) || null}
                        onChange={onRequirementTypeChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Requirement Type"
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
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={leadSourceList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={leadSourceList.find((option) => option._id === leadSourceData) || null}
                        onChange={onLeadSourceChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Lead Source"
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
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={leadTypeList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={leadTypeList.find((option) => option._id === leadType) || null}
                        onChange={onLeadTypeChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Lead Type"
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
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        size="small"
                        id="country-select-demo"
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        renderOption={(props, option) => (
                            <li {...props} style={{ fontSize: 15 }}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    style={{ paddingRight: '5px' }}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt="flag-pic"
                                />
                                <span style={{ marginRight: 10, fontSize: 18 }}>{countryToFlag(option.code)}</span>
                                {option.label} ({option.code}) +{option.phone}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Country"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={3}>
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
                                size="small"
                                style={{
                                    minWidth: '200px'
                                }}
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
                                    autoComplete: 'off'
                                }}
                                size="small"
                                style={{
                                    minWidth: '200px'
                                }}
                            />
                        )}
                    />
                </Grid> */}
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={leadStatusList}
                        getOptionLabel={(option) => (option ? option.status_name : '')}
                        value={leadStatusList.find((option) => option._id === leadStatus) || null}
                        onChange={onLeadStatusChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Lead Status"
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
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Autocomplete
                        options={phoneNumberData}
                        getOptionLabel={(option) => (option ? option.name : '')}
                        value={phoneNumberData.find((option) => option._id === phoneNumberFilter) || null}
                        onChange={onPhoneNumberChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Phone Options"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                                // size="medium"
                                size="small"
                                style={{
                                    minWidth: '250px'
                                }}
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
                        style={{
                            borderRadius: '10px !important',
                            width: '100%'
                        }}
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
                            <TableCell sx={{ py: 2 }} align="left">
                                Lead Type
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                CL Name
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                BDE Name
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Country
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Projection Status
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Assigned Date
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Response
                            </TableCell>
                            {/* <TableCell sx={{ py: 2 }} align="center">
                                Transfer
                            </TableCell> */}
                            <TableCell sx={{ py: 2 }} align="center">
                                Activity
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getBranchLeadLoading && getBranchLeadList?.docs?.length > 0 ? (
                            getBranchLeadList?.docs?.map((row, i) => (
                                <Row
                                    row={row}
                                    key={i}
                                    leadStatus={leadStatus}
                                    bdeData={bdeData}
                                    clusterLeadData={clusterLeadData}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                    search={search}
                                    startDate={startDate}
                                    endDate={endDate}
                                    requirementTypeData={requirementTypeData}
                                    leadSourceData={leadSourceData}
                                    leadType={leadType}
                                    countryValue={countryValue}
                                    phoneNumberFilter={phoneNumberFilter}
                                />
                            ))
                        ) : (
                            <>
                                {getBranchLeadLoading === true ? (
                                    <GetCoutryLeadsTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={11}>
                                            No Leads Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={getBranchLeadList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {openPopupModel && <TransferLeadModel open={openPopupModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default Index;
