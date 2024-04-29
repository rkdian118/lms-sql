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
import { ClearLeadActivityData, GetLeadActivityDetailsApi } from 'store/slices/businessAction';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GetClBETableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
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
import { TeamBdeGetListApi } from 'store/slices/clusterLeadAction';
import MuiTypography from '@mui/material/Typography';
import { BASE_URL } from 'config';
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

function Row({ row, key, currentPage, pageLength, leadStatus }) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenStatus(false);
    };

    const handleCloseModel = () => {
        setOpenEditModel(false);
        setId('');
        dispatch(TeamBdeGetListApi(newCurrentPage, pageLength, '', leadStatus));
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
    };

    const handleActivityCloseModel = () => {
        setOpenSidebar(false);
        setId('');
        dispatch(ClearLeadActivityData());
        dispatch(TeamBdeGetListApi(newCurrentPage, pageLength, '', leadStatus));
    };
    // console.log('🚀 openSidebar:', openSidebar);

    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }} key={key}>
                <TableCell sx={{ pl: 3, py: 0 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ py: 0 }}>
                    <Avatar alt="Preview" src={`${BASE_URL}${row.profile_pic}`} />
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.name}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.mobile}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.emp_id}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.designation}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    {row?.email}
                </TableCell>
                <TableCell align="left" sx={{ py: 0 }}>
                    <Button
                        variant="contained"
                        sx={{
                            background: '#b5dbff',
                            color: '#000000',
                            padding: '5px 15px',
                            my: '15px',
                            ml: 1,
                            cursor: 'not-allowed',
                            borderRadius: '8px',
                            '&:hover': {
                                background: '#4d97f3',
                                color: '#ffffff'
                            }
                        }}
                        // onClick={() => handleUpdateActivityModel(row)}
                    >
                        {row?.status === '1' ? 'Active' : 'Deactive'}
                    </Button>
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
                                        title="BDE Details"
                                        content={false}
                                    >
                                        <Table size="small" aria-label="purchases">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Cluster Lead</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Team Lead</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Cluster Head</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Created At</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>{row?.name ? row?.name : '-'}</TableCell>
                                                    <TableCell>{row?.clusterLead?.name ? row?.clusterLead?.name : '-'}</TableCell>
                                                    <TableCell>{row?.manager?.name ? row?.manager?.name : '-'}</TableCell>
                                                    <TableCell>{row?.cluster?.name ? row?.cluster?.name : '-'}</TableCell>
                                                    <TableCell>{moment(row?.createdAt).format('DD-MMMM-YYYY')}</TableCell>
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
            {/* {id && openEditModel && <EditLeadsModels open={openEditModel} rowData={row} close={() => handleCloseModel()} />}
            {openSidebar && <LeadActivityStatus open={openSidebar} leadId={id} close={() => handleActivityCloseModel()} />}
            {id && openStatus && <UpdateLeadStatus open={openStatus} leadId={id} close={() => handleActivityCloseModel()} />} */}
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
    const newmenu = useSelector((state) => state.clusterLeadAction);
    const { getClusterBdeList, getClusterBdeLoading } = newmenu;
    const { leadStatusList } = useSelector((state) => state.masterAction);
    const [leadStatus, setLeadStatus] = useState('');
    // const newRow = [];
    // rows.forEach((element) => {
    //     newRow.push({
    //         ...element,
    //         history: null
    //     });
    // });

    useEffect(() => {
        dispatch(TeamBdeGetListApi(1, pageLength, '', leadStatus));
    }, [pageLength]);

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
        dispatch(TeamBdeGetListApi(currentPage + 1, pageLength, search, leadStatus));
    };

    const onSearchLead = (e) => {
        if (e.target.value.length > 2) {
            dispatch(TeamBdeGetListApi(currentPage + 1, pageLength, e.target.value, leadStatus));
        }
        if (e.target.value.length === 0) {
            dispatch(TeamBdeGetListApi(currentPage + 1, pageLength, '', leadStatus));
        }
        setSearch(e.target.value);
        // dispatch(TeamBdeGetListApi(currentPage + 1, pageLength, '', leadStatus));
    };

    const onSearchReset = () => {
        setSearch('');
        dispatch(TeamBdeGetListApi(currentPage + 1, pageLength, '', leadStatus));
    };

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(TeamBdeGetListApi(newPage + 1, pageLength, '', leadStatus));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(TeamBdeGetListApi(currentPage + 1, event.target.value, '', leadStatus));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };
    // console.log('🚀currentPage:', currentPage);
    const onLeadChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setLeadStatus(selectValue);
        dispatch(TeamBdeGetListApi(currentPage + 1, pageLength, '', selectValue));
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
                    <IconBook2 sx={{ mr: 2 }} /> &nbsp; BDE Management
                </Stack>
            }
            sx={{ border: '0px solid', padding: '5px' }}
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* <CSVExport data={ddata} filename={onExcelFileName()} /> */}
                    {/* <CSVExport data={getClusterBdeList?.docs} type={1} filename={onExcelFileName()} header={header} />
                    <CSVExport data={getClusterBdeList?.docs} type={2} filename={onExcelFileName()} header={header} /> */}
                    {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}
                    <OutlineInputStyle
                        id="input-search-header"
                        value={search}
                        placeholder="Search By Name"
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
                </Stack>
            }
        >
            {/* table */}
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3, py: 0 }} />
                            <TableCell sx={{ py: 0 }} align="left">
                                Profile Pic
                            </TableCell>
                            <TableCell sx={{ py: 0 }}>Name</TableCell>
                            <TableCell sx={{ py: 0 }} align="left">
                                Mobile No.
                            </TableCell>
                            <TableCell sx={{ py: 0 }} align="left">
                                EMP-Code
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 0 }} align="left">
                                Designation
                            </TableCell>
                            <TableCell sx={{ pr: 3, py: 0 }} align="left">
                                Email
                            </TableCell>
                            <TableCell sx={{ pr: 3 }} align="left">
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!getClusterBdeLoading && getClusterBdeList?.docs?.length > 0 ? (
                            getClusterBdeList?.docs?.map((row, i) => (
                                <Row row={row} key={i} leadStatus={leadStatus} currentPage={currentPage} pageLength={pageLength} />
                            ))
                        ) : (
                            <>
                                {getClusterBdeLoading === true ? (
                                    <GetClBETableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={7}>
                                            No Leads Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {/* {getClusterBdeList.docs.map((row) => (
                            <Row key={row.client_name} row={row} />
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={getClusterBdeList.totalDocs}
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
