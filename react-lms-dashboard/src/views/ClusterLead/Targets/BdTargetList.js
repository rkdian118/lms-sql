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
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import { GetClBDETargetTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
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
import { BdTargetGetListApi } from 'store/slices/clusterLeadAction';
import MuiTypography from '@mui/material/Typography';
import { BASE_URL } from 'config';
import UpdateBdTargets from './UpdateBdTargets';
import UpdateCompleteTarget from './UpdateCompleteTarget';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { months } from 'Helper/Validation';
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

function Row({ row, key, currentPage, pageLength, selectedMonth }) {
    const theme = useTheme();
    const newCurrentPage = currentPage + 1;
    const [id, setId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openEditModel, setOpenEditModel] = React.useState(false);
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [openStatus, setOpenStatus] = React.useState(false);
    const [totalTarget, setTotalTarget] = useState('');
    const [openModel, setOpenModel] = useState(false);
    const [bdId, setBdId] = useState('');
    const [completeTarget, setCompleteTarget] = useState('');

    const handleEditModel = (data) => {
        setId(data?._id);
        setTotalTarget(data?.total_target);
        setOpenEditModel(true);
        setOpenModel(false);
    };

    const handleCompleteTargetModel = (data) => {
        setId(data._id);
        setBdId(data?.bd?._id);
        setCompleteTarget(data.completed_target);
        setOpenModel(true);
        setOpenEditModel(false);
    };

    const handleCloseModel = () => {
        setId('');
        BdTargetGetListApi(currentPage + 1, pageLength, selectedMonth);
    };
    // console.log('🚀 openSidebar:', openSidebar);

    return (
        <>
            <TableRow hover key={key}>
                <TableCell sx={{ pl: 3, py: 1.5 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {/* <TableCell component="th" scope="row" sx={{ py: 1.5 }}>
                    <Avatar alt="Preview" src={`${BASE_URL}${row?.bd?.profile_pic}`} />
                </TableCell> */}
                <TableCell align="left" sx={{ py: 1.5 }}>
                    {row?.bd?.name}
                </TableCell>
                <TableCell align="left" sx={{ py: 1.5 }}>
                    {row?.target_month}
                </TableCell>
                <TableCell align="left" sx={{ py: 1.5 }}>
                    {row?.target_year}
                </TableCell>
                <TableCell align="left" sx={{ py: 1.5 }}>
                    {row?.targets}
                </TableCell>
                <TableCell align="center" sx={{ py: 1.5 }}>
                    {row?.completed_target}
                </TableCell>
                <TableCell align="center" sx={{ py: 1.5 }}>
                    {row?.targets - row?.completed_target}
                </TableCell>
                <TableCell align="center" sx={{ py: 1.5 }}>
                    {row?.total_target}
                </TableCell>
                {/* <TableCell align="left" sx={{ py: 1.5 }}>
                    <MuiTooltip title="Update" arrow>
                        <div>
                            <EditIcon onClick={() => handleEditModel(row)} sx={{ cursor: 'pointer', color: '#3e7dc3' }} />
                        </div>
                    </MuiTooltip>
                </TableCell> */}
                {/* <TableCell align="left" sx={{ py: 1.5 }}>
                    <MuiTooltip title="Update Target" arrow>
                        <EditIcon
                            onClick={() => handleEditModel(row)}
                            sx={{
                                color: '#4d97f3',
                                cursor: 'pointer',
                                mr: 1,
                                '&:hover': {
                                    color: '#b5dbff'
                                }
                            }}
                        />
                    </MuiTooltip>
                    <MuiTooltip title="Complete Target" arrow>
                        <TrackChangesIcon
                            onClick={() => handleCompleteTargetModel(row)}
                            sx={{
                                color: '#4d97f3',
                                cursor: 'pointer',
                                ml: 1,
                                '&:hover': {
                                    color: '#b5dbff'
                                }
                            }}
                        />
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
                                        title="Target Details"
                                        content={false}
                                    >
                                        <Table size="small" aria-label="purchases">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Target</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Previous Target</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Total Target</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Achieved Target</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Remaining Target</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>{row?.targets ? row?.targets : '-'}</TableCell>
                                                    <TableCell>{row?.prev_month_target ? row?.prev_month_target : '-'}</TableCell>
                                                    <TableCell>{row?.total_target ? row?.total_target : '-'}</TableCell>
                                                    <TableCell>{row?.completed_target ? row?.completed_target : '-'}</TableCell>
                                                    <TableCell>{row?.remaining_target ? row?.remaining_target : '-'}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Target Month</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Target Year</TableCell>
                                                    {/* <TableCell style={{ fontWeight: 'bold' }}>Total Target</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Achieved Target</TableCell>
                                                    <TableCell style={{ fontWeight: 'bold' }}>Remaining Target</TableCell> */}
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>{row?.target_month ? row?.target_month : '-'}</TableCell>
                                                    <TableCell>{row?.target_year ? row?.target_year : '-'}</TableCell>
                                                    {/* <TableCell>{row?.total_target ? row?.total_target : '-'}</TableCell>
                                                    <TableCell>{row?.completed_target ? row?.completed_target : '-'}</TableCell>
                                                    <TableCell>{row?.remaining_target ? row?.remaining_target : '-'}</TableCell> */}
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
            {id && openEditModel && (
                <UpdateBdTargets totalTarget={totalTarget} targetId={id} open={openEditModel} close={() => handleCloseModel()} />
            )}
            {id && openModel && (
                <UpdateCompleteTarget
                    completeTarget={completeTarget}
                    bdId={bdId}
                    targetId={id}
                    open={openModel}
                    close={() => handleCloseModel()}
                />
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
    const { bdTargetList, bdTargetLoading } = useSelector((state) => state.clusterLeadAction);
    const [selectedMonth, setSelectedMonth] = useState('');
    const { leadStatusList } = useSelector((state) => state.masterAction);
    // const newRow = [];
    // rows.forEach((element) => {
    //     newRow.push({
    //         ...element,
    //         history: null
    //     });
    // });

    useEffect(() => {
        dispatch(BdTargetGetListApi(1, pageLength, selectedMonth));
    }, [pageLength, selectedMonth]);

    // useEffect(() => {
    //     dispatch(LeadSourceGetApi());
    //     dispatch(LeadTypeGetApi());
    //     dispatch(LeadStatusGetApi());
    //     dispatch(RequirementTypeGetApi());
    //     dispatch(PreDefineNotesGetApi());
    //     dispatch(LeadFollowUpsGetApi());
    // }, []);

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(BdTargetGetListApi(newPage + 1, pageLength, selectedMonth));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(BdTargetGetListApi(currentPage + 1, event.target.value, selectedMonth));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    // console.log('🚀currentPage:', currentPage);
    // const onLeadChange = (e, newValue) => {
    //     const selectValue = newValue ? newValue._id : '';
    //     setLeadStatus(selectValue);
    //     dispatch(BdTargetGetListApi(currentPage + 1, pageLength, '', selectValue));
    // };

    const onExcelFileName = () => {
        const FileName = `Leads ${moment(new Date()).format('DD-MMM-YYYY hh-mm a')}.csv`;
        return FileName;
    };

    const handleMonthChange = (event, newValue) => {
        const months = newValue ? newValue.label : '';
        setSelectedMonth(newValue ? newValue.label : '');
        BdTargetGetListApi(1, pageLength, months);
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
                    <IconBook2 sx={{ mr: 2 }} /> &nbsp; BDE Targets
                </Stack>
            }
            sx={{ border: '0px solid', padding: '5px' }}
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* <CSVExport data={ddata} filename={onExcelFileName()} /> */}
                    {/* <CSVExport data={bdTargetList?.docs} type={1} filename={onExcelFileName()} header={header} />
                    <CSVExport data={bdTargetList?.docs} type={2} filename={onExcelFileName()} header={header} /> */}
                    {/* <SecondaryAction link="https://next.material-ui.com/components/tables/" /> */}
                    <Autocomplete
                        id="month-select"
                        fullWidth
                        options={months}
                        getOptionLabel={(option) => option.label}
                        value={{ label: selectedMonth }}
                        onChange={handleMonthChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Month"
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
                </Stack>
            }
        >
            {/* table */}
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3, py: 2 }} />
                            {/* <TableCell sx={{ py: 2 }} align="left">
                                Profile Pic
                            </TableCell> */}
                            <TableCell sx={{ py: 2 }}>Name</TableCell>
                            {/* <TableCell sx={{ py: 2 }} align="left">
                                Previous Targets
                            </TableCell> */}
                            <TableCell sx={{ py: 2 }} align="left">
                                Month
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Year
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="left">
                                Target
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="center">
                                Achieved Target
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="center">
                                Remaining Target
                            </TableCell>
                            <TableCell sx={{ py: 2 }} align="center">
                                Total Assigned Target
                            </TableCell>

                            {/* <TableCell sx={{ pr: 3 }} align="left">
                                Action
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!bdTargetLoading && bdTargetList?.docs?.length > 0 ? (
                            bdTargetList?.docs?.map((row, i) => (
                                <Row row={row} selectedMonth={selectedMonth} key={i} currentPage={currentPage} pageLength={pageLength} />
                            ))
                        ) : (
                            <>
                                {bdTargetLoading === true ? (
                                    <GetClBDETargetTableLoader rows={10} />
                                ) : (
                                    <TableRow>
                                        <TableCell sx={{ pr: 3 }} align="center" colSpan={8}>
                                            No Targets Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                        {/* {bdTargetList.docs.map((row) => (
                            <Row key={row.client_name} row={row} />
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                // rows={rows}
                count={bdTargetList.totalDocs}
                rowsPerPage={pageLength}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* {openPopupModel && <AddLeadsModels open={openPopupModel} close={() => handleCloseModel()} />} */}
        </MainCard>
    );
};

export default connect(null, { BdTargetGetListApi })(Index);
