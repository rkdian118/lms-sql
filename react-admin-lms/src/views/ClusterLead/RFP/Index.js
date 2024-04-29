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
import { ClearCallActivityData, ClearRFPActivityData } from 'store/slices/businessAction';
import {
    ClusterGetAllRfpRequestApi,
    ClusterGetRfpActivityDetailsApi,
    ClusterGetAllLeadDropDownApi,
    ClusterGetAllBdeDropdownApi
} from 'store/slices/clusterLeadAction';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GetClRfpTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import {
    CallModeGetApi,
    MasterRfpStatusGetApi,
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
import AddRfpModels from './AddRfpModels';
import ViewRfpDocsModel from './ViewRfpDocsModel';
import EditRfpModels from './EditRfpModels';
import RfpMainStatus from './RfpMainStatus';
import { getRFPStatusColor } from 'Helper/StatusColor';
import MuiTypography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
// import EditCallsModels from './EditCallsModels';

function Row({ row, key, currentPage, pageLength, search, bdeData }) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [opeViewModel, setOpenViewModel] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);

    const handleViewModel = (data) => {
        setId(data._id);
        setOpenEditModel(false);
        setOpenViewModel(true);
        dispatch(ClusterGetRfpActivityDetailsApi(data?.rfps[0]?._id));
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
        dispatch(ClusterGetAllRfpRequestApi(newCurrentPage, pageLength, search, bdeData));
        dispatch(ClearRFPActivityData());
    };

    const handleRfpStatusUpdateModel = (data) => {
        setOpenStatus(true);
        setId(data._id);
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
                    {row?.rfps[0]?.rfp_type_data}
                </TableCell>
                {/* <TableCell align="left" sx={{ py: 0 }}>
                    {row?.rfps[0]?.activity_data}
                </TableCell> */}
                <TableCell align="left" sx={{ py: 0 }}>
                    {/* {row?.leadRfpStatusData?.status_name} */}
                    {row?.leadRfpStatusData?.status_name ? (
                        <Chip
                            label={row?.leadRfpStatusData?.status_name}
                            variant="outlined"
                            onClick={() => handleRfpStatusUpdateModel(row)}
                            sx={{
                                cursor: 'pointer',
                                color: getRFPStatusColor(row?.leadRfpStatusData?.status_name),
                                borderColor: getRFPStatusColor(row?.leadRfpStatusData?.status_name)
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
                <TableCell align="left" sx={{ py: 0 }}>
                    {row.bdData.status === '1' ? (
                        <MuiTypography sx={{ color: '#2196f3' }}>{row?.bdData?.name}</MuiTypography>
                    ) : (
                        <MuiTypography sx={{ color: '#d84315' }}>{row?.bdData?.name}</MuiTypography>
                    )}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {moment(row?.updatedAt).format('DD-MMM-YYYY HH:mm')}
                </TableCell>
                <TableCell align="left" sx={{ pr: 3 }}>
                    {moment(row?.createdAt).format('DD-MMM-YYYY HH:mm')}
                </TableCell>
                {/* <TableCell align="left" sx={{ pr: 3, py: 0 }}>
                    <MuiTooltip title="Edit" arrow>
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
                    <MuiTooltip title="View RFP" arrow>
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
                            onClick={() => handleViewModel(row)}
                        >
                            <Visibility sx={{ mr: 1 }} /> RFP
                        </Button>
                    </MuiTooltip>
                </TableCell> */}
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
                                                {/* <CSVExport
                                                    data={row.history?.map((historyRow) => historyRow)}
                                                    filename="collapse-table.csv"
                                                    // header={header}
                                                /> */}
                                                <MuiTooltip title="View" arrow>
                                                    <div>
                                                        <Visibility
                                                            onClick={() => handleViewModel(row)}
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
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client Email</TableCell>
                                                    {/* <TableCell style={{ fontWeight: 'bold' }}>Client Number</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Client WhatsApp</TableCell> */}
                                                    <TableCell style={{ fontWeight: 'bold' }}>PE Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>PE Email</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>RFP Status</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>RFP Activity</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{row?.leadData?.client_name ? row?.leadData?.client_name : '-'}</TableCell>
                                                    <TableCell>{row?.leadData?.client_email ? row?.leadData?.client_email : '-'}</TableCell>
                                                    {/* <TableCell>
                                                        {row?.leadData?.client_number ? row?.leadData?.client_number : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row?.leadData?.client_whatsapp_num ? row?.leadData?.client_whatsapp_num : '-'}
                                                    </TableCell> */}
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
                                                    <TableCell style={{ fontWeight: 'bold' }}>Propsal Value</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold', width: '320px' }}>Minutes Of Meeting</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold', width: '320px' }}>Comment Remarks</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Last Update</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>{row?.proposal_value}</TableCell>
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

                                                {/* <TableRow>
                                                    <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>
                                                        Minutes Of Meeting
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={4}>
                                                        {row?.rfp?.minutes_of_meeting ? (
                                                            <ReactReadMoreReadLess
                                                                charLimit={100}
                                                                readMoreText="Read more ▼"
                                                                readLessText="Read less ▲"
                                                            >
                                                                {row?.rfp?.minutes_of_meeting}
                                                            </ReactReadMoreReadLess>
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>
                                                </TableRow> */}
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
            {id && opeViewModel && <ViewRfpDocsModel open={opeViewModel} rowData={row} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditRfpModels open={openEditModel} rowData={row} close={() => handleCloseModel()} />}
            {id && openStatus && <RfpMainStatus open={openStatus} rfpId={id} close={() => handleCloseModel()} />}
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
    const newmenu = useSelector((state) => state.clusterLeadAction);
    const { getRfpList, getRfpLoading, getBdeDropdownList } = newmenu;
    const [bdeData, setBdeData] = useState('');
    // const newRow = [];
    // rows.forEach((element) => {
    //     newRow.push({
    //         ...element,
    //         history: null
    //     });
    // });

    useEffect(() => {
        dispatch(ClusterGetAllRfpRequestApi(1, pageLength, ''));
    }, [pageLength]);

    useEffect(() => {
        dispatch(ClusterGetAllBdeDropdownApi());
        dispatch(CallModeGetApi());
        dispatch(MasterRfpStatusGetApi());
        dispatch(ClusterGetAllLeadDropDownApi());
        dispatch(RfpTypeGetApi());
        dispatch(RfpStatusGetApi());
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(ClusterGetAllRfpRequestApi(currentPage + 1, pageLength, search, bdeData));
    };
    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(ClusterGetAllRfpRequestApi(currentPage + 1, pageLength, e.target.value, bdeData));
        }
        if (e.target.value.length === 0) {
            dispatch(ClusterGetAllRfpRequestApi(currentPage + 1, pageLength, '', bdeData));
        }
        setSearch(e.target.value);
        // dispatch(ClusterGetAllRfpRequestApi(currentPage + 1, pageLength, ''));
    };

    const onSearchReset = () => {
        setSearch('');
        dispatch(ClusterGetAllRfpRequestApi(currentPage + 1, pageLength, '', bdeData));
    };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(ClusterGetAllRfpRequestApi(newPage + 1, pageLength, search, bdeData));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(ClusterGetAllRfpRequestApi(currentPage + 1, event.target.value, search, bdeData));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };
    const onBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);
        dispatch(ClusterGetAllRfpRequestApi(currentPage + 1, pageLength, search, selectValue));
    };
    return (
        <MainCard
            content={false}
            title={
                <Stack direction="row">
                    <IconFileRss sx={{ mr: 2 }} /> &nbsp; RFP Request
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
                    <OutlineInputStyle
                        id="input-search-header"
                        value={search}
                        placeholder="Search"
                        startAdornment={
                            <InputAdornment position="start" sx={{ color: '#3e7dc3', background: '#e0f4ff' }}>
                                <IconSearch stroke={2} size="1.5rem" color="#3e7dc3" />
                            </InputAdornment>
                        }
                        sx={{ height: '45px', margin: '5px 0px' }}
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
                        Add RFP <AddCircleRoundedIcon sx={{ ml: 1 }} />
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
                            <TableCell sx={{ py: 2 }} align="left">
                                Client Name
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>RFP Type</TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                RFP Activity Status
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                BD Name
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Last Updated
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                Assigned Date
                            </TableCell>
                            {/* <TableCell sx={{ pr: 3 }} align="left">
                                Action
                            </TableCell> */}
                            {/* <TableCell sx={{ pr: 3 }} align="left">
                                Action
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getRfpLoading && getRfpList.docs.length > 0 ? (
                            getRfpList.docs.map((row, i) => (
                                <Row
                                    row={row}
                                    bdeData={bdeData}
                                    key={i}
                                    search={search}
                                    currentPage={currentPage}
                                    pageLength={pageLength}
                                />
                            ))
                        ) : (
                            <>
                                {getRfpLoading === true ? (
                                    <GetClRfpTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
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
