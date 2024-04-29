/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Chip,
    FormControlLabel,
    Grid,
    Pagination,
    Switch,
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
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { openPopupModel } from 'store/slices/menu';
import { dispatch } from 'store';
import { connect, useSelector } from 'react-redux';
// import AddTeamLeadModels from './Models/AddTeamLeadModels';
// import TeamLeadDetails from './Models/TeamLeadDetails';
import Avatar1 from 'assets/images/users/avatar-1.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import AddClusterModels from './AddClusterModels';
import { BDGetTargetApi, BdStatusChangeApi, GetBdeDropdownSelectedApi } from 'store/slices/clusterAction';
import { BASE_URL } from 'config';
import { BDETableTargetLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import UserImage from 'assets/images/users/img-user.png';
import { openSnackbar } from 'store/slices/snackbar';
import { format } from 'date-fns';
import { months } from 'Helper/Validation';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MuiTooltip from '@mui/material/Tooltip';
import UpdateTargetModels from './UpdateTargetModels';
import CompleteTargetModels from './CompleteTargetModels';
import { useTheme, styled } from '@mui/material/styles';
import { BDTargetsTableLoader } from 'ui-component/cards/Skeleton/BranchLoader';
import { Stack } from '@mui/system';
import { IconUsers } from '@tabler/icons';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover
    // },
    // hide last border
    '&:last-of-type td, &:last-of-type th': {
        border: 0
    }
}));

const BdTargetList = ({ BdStatusChangeApi }) => {
    const { bdTargetList, bdTargetLoading, getBdeDropdownSelectedList } = useSelector((state) => state.clusterAction);

    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [id, setId] = useState('');
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [completedTarget, setCompletedTarget] = useState('');
    const [confirmBusiness, setConfirmBusiness] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [openCompletedTargetModel, setOpenCompletedTargetModel] = useState(false);
    const [totalTarget, setTotalTarget] = useState('');
    const [bdId, setBdId] = useState('');
    const [bdeData, setBdeData] = useState('');
    const [selectedYear, setSelectedYear] = useState('' || new Date());
    const FormatYear = moment(selectedYear).format('YYYY');

    useEffect(() => {
        dispatch(BDGetTargetApi(currentPage + 1, pageLength, selectedMonth, FormatYear, bdeData));
    }, [pageLength]);

    useEffect(() => {
        dispatch(GetBdeDropdownSelectedApi([]));
    }, []);

    const handleChangePage = (event, newPage) => {
        // console.log('🚀 newPage:', newPage);
        setCurrentPage(newPage);
        dispatch(BDGetTargetApi(newPage + 1, pageLength, selectedMonth, FormatYear, bdeData));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(BDGetTargetApi(currentPage + 1, event.target.value, selectedMonth, FormatYear, bdeData));
        setPageLength(parseInt(event?.target.value));
        // setCurrentPage(newPage);
    };

    const handleCompletedTargetUpdateModel = (data) => {
        setId(data?._id);
        setBdId(data?.bd?._id);
        setCompletedTarget(data?.completed_target);
        setConfirmBusiness(data?.confirm_business);
        setOpenCompletedTargetModel(true);
        setOpenEditModel(false);
    };

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        dispatch(BDGetTargetApi(currentPage + 1, pageLength, selectedMonth, FormatYear, bdeData));
    };
    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenCompletedTargetModel(false);
        setTotalTarget(data?.targets);
        // dispatch(BDGetTargetApi(currentPage + 1, pageLength));
    };

    const onDeleteStatus = (data) => {
        setOpenDeleteModel(true);
        setDeleteData(data);
    };

    const handleMonthChange = (event, newValue) => {
        const months = newValue ? newValue.label : '';
        setSelectedMonth(newValue ? newValue.label : '');
        dispatch(BDGetTargetApi(currentPage + 1, pageLength, months, FormatYear, bdeData));
    };

    const handleDatePickerChange = (newValue) => {
        // Set the formik value
        setSelectedYear(newValue);
        const FormatYear = moment(newValue).format('YYYY');
        // dispatch(GetTargetGraphApi(FormatYear));
        dispatch(BDGetTargetApi(currentPage + 1, pageLength, selectedMonth, FormatYear, bdeData));
        // console.log('🚀 newValue:', FormatYear);
    };

    const onBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        setBdeData(selectValue);
        dispatch(BDGetTargetApi(currentPage + 1, pageLength, selectedMonth, FormatYear, selectValue));
    };

    let { page } = bdTargetList;
    page -= 1;

    return (
        <>
            <MainCard
                content={false}
                title={
                    <Stack direction="row">
                        <TrackChangesIcon sx={{ mr: 2 }} /> &nbsp; BDE Target Based On Month
                    </Stack>
                }
                sx={{ border: '0px solid', padding: '5px' }}
                secondary={
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Autocomplete
                            options={getBdeDropdownSelectedList}
                            getOptionLabel={(option) => (option ? option.name : '')}
                            value={getBdeDropdownSelectedList.find((option) => option._id === bdeData) || null}
                            onChange={onBdeChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select BDE"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off' // disable autocomplete and autofill
                                    }}
                                    // size="small"
                                    style={{
                                        minWidth: '200px'
                                    }}
                                />
                            )}
                        />
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
                                        minWidth: '200px'
                                    }}
                                />
                            )}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                renderInput={(props) => (
                                    <TextField
                                        fullWidth
                                        {...props}
                                        inputProps={{
                                            ...props.inputProps,
                                            autoComplete: 'off'
                                        }}
                                        onKeyDown={(e) => e.preventDefault()}
                                    />
                                )}
                                value={selectedYear}
                                // onChange={(newValue) => {
                                //     formik.setFieldValue('selectedYear', newValue);
                                // }}
                                onChange={handleDatePickerChange}
                                maxDate={new Date()}
                                minDate={new Date('2021-01-01')}
                            />
                        </LocalizationProvider>
                    </Stack>
                }
            >
                {/* table */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    No
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Name
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Targets
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Prev. Month
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Total
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Completed
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Confirm Business
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Remaining
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Month
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Year
                                </TableCell>
                                <TableCell sx={{ pr: 3, py: 2 }} align="left">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!bdTargetLoading && bdTargetList?.docs?.length > 0 ? (
                                bdTargetList?.docs?.map((row, i) => (
                                    <>
                                        <TableRow hover key={i} unmountOnExit>
                                            <TableCell sx={{ py: 1 }}>{page * pageLength + (i + 1)}</TableCell>
                                            <TableCell sx={{ py: 1 }}>
                                                <Grid container spacing={2} alignItems="left">
                                                    <Grid item>
                                                        <Avatar alt={row?.bd?.name} src={`${BASE_URL}${row?.bd?.profile_pic}`} />
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography
                                                            align="left"
                                                            component="div"
                                                            variant="subtitle1"
                                                            sx={{ color: '#000000' }}
                                                        >
                                                            {row?.bd?.name}
                                                        </Typography>
                                                        <Typography
                                                            align="left"
                                                            component="div"
                                                            variant="subtitle2"
                                                            sx={{ color: '#000000' }}
                                                        >
                                                            {row?.bd?.emp_id} ({row?.bd?.designation})
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell sx={{ py: 1 }}>{row?.targets}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row?.prev_month_target}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row?.total_target}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row?.completed_target}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row?.confirm_business ? row?.confirm_business : 0}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row?.remaining_target}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row?.target_month}</TableCell>
                                            <TableCell sx={{ py: 1 }}>{row?.target_year}</TableCell>

                                            <TableCell align="left" sx={{ py: 1 }}>
                                                <MuiTooltip title="Update Total Target" arrow>
                                                    <EditIcon
                                                        onClick={() => handleEditModel(row)}
                                                        sx={{
                                                            mr: 1,
                                                            color: '#00c853',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                color: '#b5dbff'
                                                            }
                                                        }}
                                                    />
                                                </MuiTooltip>
                                                <MuiTooltip title="Update Completed Target" arrow>
                                                    <TrackChangesIcon
                                                        color="secondary"
                                                        onClick={() => handleCompletedTargetUpdateModel(row)}
                                                        sx={{
                                                            // color: 'red',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                color: '#b5dbff'
                                                            }
                                                        }}
                                                    />
                                                </MuiTooltip>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))
                            ) : (
                                <>
                                    {bdTargetLoading === true ? (
                                        <BDTargetsTableLoader rows={10} />
                                    ) : (
                                        <TableRow>
                                            <TableCell sx={{ pr: 3 }} align="center" colSpan={10}>
                                                No BDE Target Found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    component="div"
                    // rows={rows}
                    count={bdTargetList.totalDocs}
                    rowsPerPage={pageLength}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
            {id && openEditModel && (
                <UpdateTargetModels targetId={id} totalTarget={totalTarget} open={openEditModel} close={() => handleCloseModel()} />
            )}
            {id && openCompletedTargetModel && (
                <CompleteTargetModels
                    targetId={id}
                    bdId={bdId}
                    completedTarget={completedTarget}
                    confirmBusiness={confirmBusiness}
                    open={openCompletedTargetModel}
                    close={() => handleCloseModel()}
                />
            )}
        </>
    );
};

export default connect(null, { BdStatusChangeApi })(BdTargetList);
