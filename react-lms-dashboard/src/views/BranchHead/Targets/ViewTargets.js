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
    Checkbox,
    tableCellClasses
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
import { ClusterGetAllBdeDropdownApi } from 'store/slices/clusterLeadAction';
import {
    BHFilterTargetsApi,
    ClusterLeadDropDownApi,
    GetAllBdeDropdownApi,
    GetClusterLeadSelectedDropDownApi,
    GetBdeDropdownSelectedApi
} from 'store/slices/clusterAction';
import MuiTypography from '@mui/material/Typography';
import { BASE_URL } from 'config';
import UpdateBdTargets from './UpdateTargetModels';
import UpdateCompleteTarget from './CompleteTargetModels';
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
import { GetTargetCardLoader, ViewBranchTargetLoader } from 'ui-component/cards/Skeleton/BranchLoader';
import AnimateButton from 'ui-component/extended/AnimateButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: '50%'
        // backgroundColor: theme.palette.common.black,
        // color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: '10px'
        // fontSize: 14
    }
}));

const StyledTableCellName = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: '50%',
        fontSize: '1rem',
        fontWeight: 900
    }
}));

const ViewTargets = ({ BHFilterTargetsApi }) => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [openPopupModel, setOpenModel] = useState(false);
    const [search, setSearch] = useState('');
    const { getBdeDropdownSelectedList, getClDropdownSelectedList, getFilterTargetDetails, getFilterTargetDetailsLoading } = useSelector(
        (state) => state.clusterAction
    );
    const [selectedMonth, setSelectedMonth] = useState('');
    const { leadStatusList } = useSelector((state) => state.masterAction);
    const [selectedBDE, setSelectedBDE] = useState([]);
    const [collapse, setCollapse] = useState(false);
    const mode = theme.palette.mode;
    // console.log('🚀 getFilterTargetDetails:', getFilterTargetDetails);
    // const { detailCards } = useSelector((state) => state.user);

    useEffect(() => {
        // dispatch(GetAllBdeDropdownApi());
        dispatch(GetClusterLeadSelectedDropDownApi());
        dispatch(GetBdeDropdownSelectedApi([]));
    }, []);

    const initialValues = {
        selectedMonth: [],
        selectedBDE: [],
        selectedCL: [],
        selectedYear: null || new Date(),
        isClusterTarg: false,
        isBranchTarg: false,
        isBdeTarg: true
    };

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            isCLTarget: values.isClusterTarg,
            isBHTarget: values.isBranchTarg,
            selectedMonth: values.selectedMonth,
            selectedCLs: values.selectedCL,
            selectedBDE: values.selectedBDE,
            selectedYear: values.selectedYear !== null ? moment(values?.selectedYear).format('YYYY') : ''
            // current_date_of_month: values.selectedYear
        };
        BHFilterTargetsApi(newData)
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
            isCLTarget: false,
            isBHTarget: false,
            selectedBDE: formik.values.selectedBDE,
            selectedCLs: formik.values.selectedCL,
            selectedMonth: formik.values.selectedMonth,
            selectedYear: formik.values.selectedYear !== null ? moment(formik.values.selectedYear).format('YYYY') : moment().format('YYYY')
            // current_date_of_month: values.selectedYear
        };
        // dispatch();
        BHFilterTargetsApi(newData);
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
    //     dispatch(BHFilterTargetsApi(currentPage + 1, pageLength, selectValues));
    // };

    const handleBDEChange = (event, newValue) => {
        const selectedBDE = newValue ? newValue.map((option) => option._id) : [];
        formik.setFieldValue('selectedBDE', selectedBDE);
        formik.setFieldValue('isClusterTarg', false);
    };

    const handleCLChange = (event, newValue) => {
        const selectedBDE = newValue ? newValue.map((option) => option._id) : [];
        formik.setFieldValue('selectedCL', selectedBDE);
        dispatch(GetBdeDropdownSelectedApi(selectedBDE));
        // formik.setFieldValue('isClusterTarg', false);
    };

    // console.log('🚀formik', formik.values);

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
                    <Grid item xs={2} sx={{ pb: 2, alignItems: 'left' }}>
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
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formik.values.isBdeTarg}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('isBdeTarg', e.target.checked);
                                                        formik.setFieldValue('isClusterTarg', false);
                                                        formik.setFieldValue('isBranchTarg', false);
                                                        formik.setFieldValue('selectedBDE', []);
                                                        formik.setFieldValue('selectedCL', []);
                                                    }}
                                                />
                                            }
                                            label="BDE Target"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formik.values.isClusterTarg}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('isClusterTarg', e.target.checked);
                                                        formik.setFieldValue('selectedBDE', []);
                                                        formik.setFieldValue('isBranchTarg', false);
                                                        formik.setFieldValue('isBdeTarg', false);
                                                    }}
                                                />
                                            }
                                            label="CL Target"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formik.values.isBranchTarg}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('isBranchTarg', e.target.checked);
                                                        formik.setFieldValue('isClusterTarg', false);
                                                        formik.setFieldValue('isBdeTarg', false);
                                                        formik.setFieldValue('selectedBDE', []);
                                                        formik.setFieldValue('selectedCL', []);
                                                    }}
                                                />
                                            }
                                            label="BH Target"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Autocomplete
                                            multiple
                                            fullWidth
                                            options={getClDropdownSelectedList}
                                            getOptionLabel={(option) => option.name}
                                            value={getClDropdownSelectedList?.filter((option) =>
                                                formik.values.selectedCL.includes(option._id)
                                            )}
                                            onChange={handleCLChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Cluster Lead"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off'
                                                    }}
                                                />
                                            )}
                                            disabled={formik.values.isBranchTarg}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Autocomplete
                                            multiple
                                            fullWidth
                                            disabled={formik.values.isClusterTarg || formik.values.isBranchTarg}
                                            options={getBdeDropdownSelectedList}
                                            getOptionLabel={(option) => option.name}
                                            value={getBdeDropdownSelectedList?.filter((option) =>
                                                formik.values.selectedBDE.includes(option._id)
                                            )}
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
                                            // sx={{
                                            //     '& .MuiAutocomplete-tag-root': {
                                            //         background:
                                            //             mode === 'dark' ? theme.palette.text.primary + 20 : theme.palette.secondary.light,
                                            //         borderRadius: 4,
                                            //         color: theme.palette.text.dark,
                                            //         '.MuiChip-deleteIcon': {
                                            //             color:
                                            //                 mode === 'dark' ? theme.palette.text.primary + 80 : theme.palette.secondary[200]
                                            //         }
                                            //     }
                                            // }}
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
                                                minDate={new Date('2020-01-01')}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                width: '100%'
                                            }}
                                        >
                                            <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    sx={{
                                                        px: 5,
                                                        width: '100%',
                                                        boxShadow: theme.customShadows.primary,
                                                        ':hover': {
                                                            boxShadow: 'none'
                                                        }
                                                    }}
                                                >
                                                    Go Filter
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </MainCard>
                    </Grid>
                ) : (
                    ''
                )}
                <Grid item xs={9} md={collapse ? 12 : 10} sx={{ alignItems: 'left', pb: 2 }}>
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
                                </MuiTooltip>
                                &nbsp; View Targets
                            </Stack>
                        }
                        sx={{ border: '0px solid', padding: '5px 15px 15px 15px' }}
                    >
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            {!getFilterTargetDetailsLoading && getFilterTargetDetails?.length > 0 ? (
                                getFilterTargetDetails?.map((list, i) => {
                                    const totalTargets = list?.targData?.reduce((acc, row) => acc + row?.targets || 0, 0);
                                    const completedTargets = list?.targData?.reduce((acc, row) => acc + row?.completed_target || 0, 0);
                                    const remainingTargets = list?.targData?.reduce((acc, row) => acc + row?.remaining_target || 0, 0);
                                    return (
                                        <Grid key={i} item xs={6} md={collapse ? 6 : 6} sx={{ mb: 0, alignItems: 'left' }}>
                                            <Card
                                                sx={{
                                                    p: 2,
                                                    background:
                                                        theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                                    border:
                                                        theme.palette.mode === 'dark'
                                                            ? '1px solid transparent'
                                                            : `1px solid${theme.palette.grey[100]}`,
                                                    borderColor: theme.palette.grey[400],
                                                    boxShadow: '4',
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.main,
                                                        boxShadow: '18'
                                                    }
                                                }}
                                            >
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>Monthly Sales</StyledTableCell>
                                                                <StyledTableCellName colSpan={5} align="center">
                                                                    {list?.name}
                                                                </StyledTableCellName>
                                                            </TableRow>
                                                            <TableRow>
                                                                <StyledTableCell>Month</StyledTableCell>
                                                                <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                    Target
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                    Total
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                    Upfront
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                    Confirm Business
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                    Gap
                                                                </StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {list?.targData?.map((row, i) => (
                                                                <TableRow key={i}>
                                                                    <StyledTableCell component="th" scope="row">
                                                                        {row?.target_month}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                        {row?.targets}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                        {row?.total_target}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                        {row?.completed_target}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                        {row?.confirm_business ? row?.confirm_business : 0}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center" sx={{ px: 0, py: 1 }}>
                                                                        {row?.remaining_target}
                                                                    </StyledTableCell>
                                                                </TableRow>
                                                            ))}
                                                            <TableRow>
                                                                <StyledTableCell sx={{ fontWeight: 500 }} component="th" scope="row">
                                                                    Total
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">{totalTargets}</StyledTableCell>
                                                                <StyledTableCell align="center">--</StyledTableCell>
                                                                <StyledTableCell align="center">--</StyledTableCell>
                                                                <StyledTableCell align="center">{completedTargets}</StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    {totalTargets - completedTargets}
                                                                </StyledTableCell>
                                                                {/* <StyledTableCell align="center">{remainingTargets}</StyledTableCell> */}
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
                                        <Grid item xs={6} md={12} sx={{ mb: 0, alignItems: 'left' }}>
                                            <Card
                                                sx={{
                                                    p: 2,
                                                    background:
                                                        theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                                    border:
                                                        theme.palette.mode === 'dark'
                                                            ? '1px solid transparent'
                                                            : `1px solid${theme.palette.grey[100]}`,
                                                    borderColor: theme.palette.grey[400],
                                                    boxShadow: '4',
                                                    '&:hover': {
                                                        borderColor: theme.palette.primary.main,
                                                        boxShadow: '18'
                                                    }
                                                }}
                                            >
                                                <TableContainer>
                                                    <Table>
                                                        <ViewBranchTargetLoader rows={1} />
                                                    </Table>
                                                </TableContainer>
                                            </Card>
                                        </Grid>
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
                                                {/* <Typography sx={{ pr: 3 }} align="center" colSpan={10}>
                                                    Targets Not Found
                                                </Typography> */}
                                                <Typography sx={{ pr: 3 }} align="center" colSpan={10}>
                                                    FOCUS
                                                </Typography>
                                                <Typography sx={{ pr: 3 }} align="center" colSpan={10}>
                                                    If you chase two rabbits, both will escape
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    )}
                                </>
                            )}
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default connect(null, { BHFilterTargetsApi })(ViewTargets);
