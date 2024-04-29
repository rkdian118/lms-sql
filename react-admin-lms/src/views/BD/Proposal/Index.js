/* eslint-disable radix */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
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
import { ClearCallActivityData, GetAllProposalApi, GetAllLeadDropDownApi } from 'store/slices/businessAction';
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
// import ViewRfpDocsModel from './ViewRfpDocsModel';
// import EditRfpModels from './EditRfpModels';
// import EditCallsModels from './EditCallsModels';

function Row({ row, key, currentPage, pageLength }) {
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
        dispatch(GetAllProposalApi(newCurrentPage, pageLength));
    };

    const handleUpdateActivityModel = (data) => {
        setOpenSidebar(true);
        setId(data._id);
    };

    const handleActivityCloseModel = () => {
        setOpenSidebar(false);
        setId('');
        dispatch(ClearCallActivityData());
        dispatch(GetAllProposalApi(newCurrentPage, pageLength));
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
                    {row?.proposal[0]?.proposal_type_data?.status_name}
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
                {/* <TableCell align="center" sx={{ pr: 3, py: 0 }}>
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
                    <MuiTooltip title="View Proposal" arrow>
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
                            <Visibility sx={{ mr: 1 }} /> Proposal
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
    const { getProposalList, getProposalLoading } = newmenu;
    // const newRow = [];
    // rows.forEach((element) => {
    //     newRow.push({
    //         ...element,
    //         history: null
    //     });
    // });

    useEffect(() => {
        dispatch(GetAllProposalApi(1, pageLength, ''));
    }, [pageLength]);

    useEffect(() => {
        dispatch(CallModeGetApi());
        dispatch(MasterRfpStatusGetApi());
        dispatch(GetAllLeadDropDownApi());
        dispatch(RfpTypeGetApi());
        dispatch(RfpStatusGetApi());
        dispatch(ProposalTypeGetApi());
    }, []);

    const handleCloseModel = () => {
        setOpenModel(false);
        dispatch(GetAllProposalApi(currentPage + 1, pageLength, search));
    };
    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(GetAllProposalApi(currentPage + 1, pageLength, e.target.value));
        }
        if (e.target.value.length === 0) {
            dispatch(GetAllProposalApi(currentPage + 1, pageLength, ''));
        }
        setSearch(e.target.value);
        // dispatch(GetAllProposalApi(currentPage + 1, pageLength, ''));
    };

    const onSearchReset = () => {
        setSearch('');
        dispatch(GetAllProposalApi(currentPage + 1, pageLength, ''));
    };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(GetAllProposalApi(newPage + 1, pageLength, ''));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(GetAllProposalApi(currentPage + 1, event.target.value, ''));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
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
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* <CSVExport data={newRow} filename="basic-table.csv" header={header} /> */}
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
                        Add Proposal <AddCircleRoundedIcon sx={{ ml: 1 }} />
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
                            {/* <TableCell sx={{ pr: 3 }} align="center">
                                Action
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getProposalLoading && getProposalList.docs.length > 0 ? (
                            getProposalList.docs.map((row, i) => (
                                <Row row={row} key={i} currentPage={currentPage} pageLength={pageLength} />
                            ))
                        ) : (
                            <>
                                {getProposalLoading === true ? (
                                    <ProposalTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
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
