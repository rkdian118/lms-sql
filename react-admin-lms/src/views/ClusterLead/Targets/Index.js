/* eslint-disable radix */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    CircularProgress,
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
    Typography,
    Menu,
    Zoom,
    Avatar,
    FormControlLabel,
    Checkbox
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
    IconX,
    IconFilter
} from '@tabler/icons';
// import AddLeadsModels from './AddLeadsModels';
import { ClearLeadActivityData, GetLeadActivityDetailsApi } from 'store/slices/businessAction';
import { dispatch } from 'store';
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import { GetClBDETargetTableLoader, GetClusterLeadsTableLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
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
import { ClFilterTargetsApi, ClusterGetAllBdeDropdownApi } from 'store/slices/clusterLeadAction';
import MuiTypography from '@mui/material/Typography';
import { BASE_URL } from 'config';
import UpdateBdTargets from './UpdateBdTargets';
import UpdateCompleteTarget from './UpdateCompleteTarget';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { months } from 'Helper/Validation';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { gridSpacing } from 'store/constant';
import UserDetailsCard from 'ui-component/cards/UserDetailsCard';
// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import Avatars from 'ui-component/extended/Avatar';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { openSnackbar } from 'store/slices/snackbar';

const Index = ({ ClFilterTargetsApi }) => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [openPopupModel, setOpenModel] = useState(false);
    const [search, setSearch] = useState('');
    const { getFilterTargetDetails, getBdeDropdownList, getFilterTargetDetailsLoading } = useSelector((state) => state.clusterLeadAction);
    const [selectedMonth, setSelectedMonth] = useState('');
    const { leadStatusList } = useSelector((state) => state.masterAction);
    const [selectedBDE, setSelectedBDE] = useState([]);
    const [collapse, setCollapse] = useState(false);

    // console.log('🚀 getFilterTargetDetails:', getFilterTargetDetails);
    // const { detailCards } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(ClusterGetAllBdeDropdownApi());
    }, []);

    const initialValues = {
        selectedMonth: [],
        selectedBDE: [],
        selectedYear: null || new Date(),
        isClusterTarg: false
    };

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            isClusterTarg: values.isClusterTarg,
            selectedMonth: values.selectedMonth,
            selectedBDE: values.selectedBDE,
            selectedYear: values.selectedYear !== null ? moment(values?.selectedYear).format('YYYY') : new Date()
            // current_date_of_month: values.selectedYear
        };
        ClFilterTargetsApi(newData)
            .then((res) => {
                if (res.succeeded === true) {
                    // close();
                    // setLoader(false);
                    setSubmitting(false);
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
                    // setLoader(false);
                    setSubmitting(false);
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
            })
            .catch(() => {
                setSubmitting(false);
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    useEffect(() => {
        const newData = {
            isClusterTarg: false,
            selectedMonth: formik.selectedMonth,
            selectedBDE: formik.selectedBDE,
            selectedYear: formik.selectedYear !== null ? formik.selectedYear : ''
            // current_date_of_month: values.selectedYear
        };
        // dispatch();
        ClFilterTargetsApi(newData);
    }, []);

    const handleMonthChange = (event, newValues) => {
        // Check if "All Months" is selected
        const allMonthsSelected = newValues.some((month) => month.label === 'All Months');

        // Set the selected months accordingly
        const selectedMonths = allMonthsSelected ? months.slice(1) : newValues.map((month) => month.label);

        // Set the selected months in the formik values
        formik.setFieldValue('selectedMonth', selectedMonths);
    };
    // const handleYearChange = (event, newValue) => {
    //     const selectValues = newValue ? newValue?.label : '';
    //     formik.setFieldValue('selectedMonth', newValue?.label || '');
    //     dispatch(ClFilterTargetsApi(currentPage + 1, pageLength, selectValues));
    // };

    const handleBDEChange = (event, newValue) => {
        const selectedBDE = newValue ? newValue.map((option) => option._id) : [];
        formik.setFieldValue('selectedBDE', selectedBDE);
        formik.setFieldValue('isClusterTarg', false);
    };

    console.log('🚀formik', getBdeDropdownList);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Jan', 3500, 0.0, -3500),
        createData('Fab', 7000, 0.0, -7000),
        createData('Marc', 10500, 0.0, -10500)
        // createData('Cupcake', 305, 3.7, 67, 4.3),
        // createData('Gingerbread', 356, 16.0, 49, 3.9)
    ];

    return (
        <>
            <Grid container spacing={2} sx={{ '&.MuiGrid-root': { pt: 0 } }}>
                {!collapse ? (
                    <Grid item xs={3} sx={{ mb: 0, alignItems: 'left' }}>
                        <MainCard
                            content={false}
                            title={
                                <Stack direction="row">
                                    <IconFilter sx={{ mr: 2 }} /> &nbsp; Filters
                                </Stack>
                            }
                            sx={{ border: '0px solid', padding: '10px', height: '100vh' }}
                        >
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={gridSpacing} sx={{ mt: 1 }}>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Autocomplete
                                            multiple
                                            fullWidth
                                            options={getBdeDropdownList}
                                            getOptionLabel={(option) => option.name}
                                            value={getBdeDropdownList?.filter((option) => formik.values.selectedBDE.includes(option._id))}
                                            onChange={handleBDEChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select BDE"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off'
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Autocomplete
                                            id="month-select"
                                            fullWidth
                                            multiple
                                            options={months}
                                            getOptionLabel={(option) => option.label}
                                            value={months.filter((option) => formik.values.selectedMonth.includes(option.label))}
                                            onChange={handleMonthChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Month"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off'
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
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
                                                value={formik.values.selectedYear}
                                                onChange={(newValue) => {
                                                    formik.setFieldValue('selectedYear', newValue);
                                                }}
                                                maxDate={new Date()}
                                                minDate={new Date('2000-01-01')}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formik.values.isClusterTarg}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('isClusterTarg', e.target.checked);
                                                        formik.setFieldValue('selectedBDE', []);
                                                    }}
                                                />
                                            }
                                            label="Self Target"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                width: '100%'
                                            }}
                                        >
                                            <Button
                                                size="small"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                // disabled={formik.isSubmitting}
                                                sx={{
                                                    pl: 2,
                                                    borderRadius: '10px',
                                                    width: '50%',
                                                    color: '#468ccc',
                                                    background: '#e0f4ff',
                                                    height: '35px',
                                                    boxShadow: '4',
                                                    '&:hover': { background: '#468ccc', color: '#e0f4ff', boxShadow: '16' }
                                                }}
                                            >
                                                {/* {formik.isSubmitting ? ( // Show loader when form is submitting
                                                    <>
                                                        <CircularProgress color="inherit" size={20} />
                                                    </>
                                                ) : (
                                                    'Go Filter'
                                                )} */}
                                                Go Filter
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </MainCard>
                    </Grid>
                ) : (
                    ''
                )}
                <Grid item xs={9} md={collapse ? 12 : 9} sx={{ mb: 0, alignItems: 'left' }}>
                    <MainCard
                        content={false}
                        title={
                            <Stack direction="row">
                                <MuiTooltip
                                    title={collapse ? 'Collapse Right' : 'Collapse Left'}
                                    arrow
                                    // enterDelay={500}
                                    // leaveDelay={200}
                                    disableFocusListener
                                    disableTouchListener
                                    placement="left-start"
                                    TransitionComponent={Zoom}
                                >
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.mediumAvatar,
                                            transition: 'all .2s ease-in-out',
                                            border: '2px solid',
                                            bgcolor: theme.palette.background.default,
                                            boxShadow: '2',
                                            backgroundColor:
                                                theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                                            '&[aria-controls="menu-list-grow"],&:hover': {
                                                boxShadow: '7',
                                                background: `${theme.palette.primary.main}!important`,
                                                color: theme.palette.primary.light
                                            }
                                        }}
                                        color="inherit"
                                        onClick={() => setCollapse(!collapse)}
                                    >
                                        {collapse ? (
                                            <ArrowCircleRightOutlinedIcon stroke={1.5} size="20px" />
                                        ) : (
                                            <ArrowCircleLeftOutlinedIcon stroke={1.5} size="20px" />
                                        )}
                                    </Avatar>
                                </MuiTooltip>{' '}
                                &nbsp; BDE Targets
                            </Stack>
                        }
                        sx={{ border: '0px solid', padding: '5px' }}
                    >
                        {/* {usersResult} */}
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            {!getFilterTargetDetailsLoading && getFilterTargetDetails?.length > 0 ? (
                                getFilterTargetDetails?.map((list, i) => {
                                    const totalTargets = list?.targData?.reduce((acc, row) => acc + row?.targets || 0, 0);
                                    const completedTargets = list?.targData?.reduce((acc, row) => acc + row?.completed_target || 0, 0);
                                    const remainingTargets = list?.targData?.reduce((acc, row) => acc + row?.remaining_target || 0, 0);
                                    return (
                                        <Grid key={i} item xs={6} md={collapse ? 4 : 6} sx={{ mb: 0, alignItems: 'left' }}>
                                            <Card
                                                sx={{
                                                    p: 2,
                                                    background:
                                                        theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                                    border:
                                                        theme.palette.mode === 'dark'
                                                            ? '1px solid transparent'
                                                            : `1px solid${theme.palette.grey[100]}`,
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.main
                                                    }
                                                }}
                                            >
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell sx={{ pl: 0 }}>Monthly Sales Projection</TableCell>
                                                                <TableCell colSpan={3} align="center">
                                                                    {/* Mohammed Danish */}
                                                                    {list?.name}
                                                                </TableCell>
                                                                {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                        <TableCell align="right" sx={{ pr: 3 }}>
                                                            Protein&nbsp;(g)
                                                        </TableCell> */}
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell sx={{ p: 0 }}>Month</TableCell>
                                                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                    Target
                                                                </TableCell>
                                                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                    Confirm Business
                                                                </TableCell>
                                                                <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                    Gap
                                                                </TableCell>
                                                                {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                        <TableCell align="right" sx={{ pr: 3 }}>
                                                            Protein&nbsp;(g)
                                                        </TableCell> */}
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {list?.targData?.map((row, i) => (
                                                                <TableRow hover key={i}>
                                                                    <TableCell sx={{ p: 0 }} component="th" scope="row">
                                                                        {row?.target_month}
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                        {row?.total_target}
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                        {row?.completed_target}
                                                                    </TableCell>
                                                                    <TableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                        {row?.remaining_target}
                                                                    </TableCell>
                                                                    {/* <TableCell align="right">{row.carbs}</TableCell>
                                                            <TableCell align="right">{row.protein}</TableCell>
                                                            <TableCell align="right">{row.protein}</TableCell>
                                                            <TableCell align="right">{row.protein}</TableCell>
                                                            <TableCell sx={{ pr: 3 }} align="right">
                                                                {row.protein}
                                                            </TableCell> */}
                                                                </TableRow>
                                                            ))}
                                                            <TableRow hover>
                                                                <TableCell sx={{ pl: 0, fontWeight: 500 }} component="th" scope="row">
                                                                    Total
                                                                </TableCell>
                                                                <TableCell align="center">{totalTargets}</TableCell>
                                                                <TableCell align="center">{completedTargets}</TableCell>
                                                                <TableCell align="center">{remainingTargets}</TableCell>
                                                                {/* <TableCell align="right">{row.carbs}</TableCell>
                                                            <TableCell align="right">{row.protein}</TableCell>
                                                            <TableCell align="right">{row.protein}</TableCell>
                                                            <TableCell align="right">{row.protein}</TableCell>
                                                            <TableCell sx={{ pr: 3 }} align="right">
                                                                {row.protein}
                                                            </TableCell> */}
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Card>
                                        </Grid>
                                    );
                                })
                            ) : (
                                <>
                                    {getFilterTargetDetailsLoading === true ? (
                                        <TableContainer>
                                            <Table>
                                                <GetClusterLeadsTableLoader rows={5} />
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <Grid item xs={12} md={12} sx={{ mb: 0, alignItems: 'left' }}>
                                            <Card
                                                sx={{
                                                    p: 2,
                                                    background:
                                                        theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                                    border:
                                                        theme.palette.mode === 'dark'
                                                            ? '1px solid transparent'
                                                            : `1px solid${theme.palette.grey[100]}`,
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.main
                                                    }
                                                }}
                                            >
                                                <Typography sx={{ pr: 3 }} align="center" colSpan={10}>
                                                    Targets Not Found
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                </>
                            )}
                        </Grid>

                        {/* {!bdTargetLoading && bdTargetList?.docs?.length > 0 ? (
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
                        )} */}
                        {/* <TablePagination
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            component="div"
                            count={bdTargetList.totalDocs}
                            rowsPerPage={pageLength}
                            page={currentPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                        {/* {openPopupModel && <AddLeadsModels open={openPopupModel} close={() => handleCloseModel()} />} */}
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default connect(null, { ClFilterTargetsApi })(Index);
