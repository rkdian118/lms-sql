import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
// material-ui
import {
    IconButton,
    Typography,
    Slide,
    Dialog,
    DialogContent,
    DialogTitle,
    CircularProgress,
    FormControl,
    FormHelperText,
    TextField,
    Grid,
    Button,
    Box,
    Alert,
    DialogActions,
    InputLabel,
    OutlinedInput,
    Divider,
    Select,
    MenuItem,
    Autocomplete,
    CardActions,
    CardContent,
    Tab,
    Tabs,
    Card,
    useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
// import { excelDataImport } from './../../../store/slices/restroCatAction';
import { useDispatch, dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { styled, useTheme } from '@mui/material/styles';
import { openPopupModel } from 'store/slices/menu';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { countries } from 'Helper/CountriesData';
import { GetLeadActivityDetailsApi, AddCommentLeadActivityApi, GetFollowUpsDetailApi } from 'store/slices/businessAction';

// project imports
// import UserProfile from './UserProfile';
// import Billing from './Billing';
// import Payment from './Payment';
// import ChangePassword from './ChangePassword';
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import { ActivityTabLoader } from 'ui-component/cards/Skeleton/ActivityTabLoader';
import EditIcon from '@mui/icons-material/Edit';
import MuiTooltip from '@mui/material/Tooltip';
import moment from 'moment';
import UpdateActivityModel from './UpdateActivityModel';
import { IconAccessPoint, IconShare } from '@tabler/icons';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HoverDataCard from 'ui-component/cards/HoverDataCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import UpdateFollowUpsCall from './UpdateFollowUpsCall';
import { FollowUpsCallsLoader } from 'ui-component/cards/Skeleton/MuiTableLoader';
import { DateRangePicker } from 'rsuite';
import { DateRangeFilter } from 'Helper/Validation';
// tabs
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .css-adfesr-MuiModal-root-MuiDialog-root': {
        maxWidth: '100%' // Change this value to your desired max width
    },
    '& .MuDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = ({ children, onClose, ...other }) => (
    <DialogTitle sx={{ m: 0, py: 1, px: 2, display: 'flex' }} {...other}>
        {children}
        {onClose ? (
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    color: (theme) => theme.palette.grey[500]
                }}
            >
                <CloseIcon />
            </IconButton>
        ) : null}
    </DialogTitle>
);

BootstrapDialogTitle.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const FollowUpCalls = (props) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
    const { getFollowUpsCallsDetails, getFollowUpsCallsDetailsLoading } = useSelector((state) => state.businessAction);
    const blockSX = {
        p: 2.5,
        border: '1px solid ',
        // borderLeft: '1px solid ',
        // borderBottom: '1px solid ',
        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
        // borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        // borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };
    const { open, close, AddCommentLeadActivityApi, rowData, leadId } = props;
    const newmenu = useSelector((state) => state.businessAction);
    const { getLeadActivityData, getLeadActivityLoading } = newmenu;

    const { borderRadius } = useConfig();
    const [value, setValue] = React.useState(0);
    const [updateActivityModel, setUpdateActivityModel] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const [activityId, setActivityId] = useState('');
    const [date, setDate] = useState(['', '']);
    const [activityType, setActivityType] = useState('');

    useEffect(() => {
        if (getLeadActivityData?.length > 0) {
            setCommentData(getLeadActivityData[0]);
            setActivityId(getLeadActivityData[0]?._id);
            setActivityType(getLeadActivityData[0]?.type);
        }
    }, [getLeadActivityData]);

    // console.log('🚀getLeadActivityData:', getLeadActivityData);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClose = () => {
        close();
    };
    const handleUpdateActivityStatus = () => {
        setUpdateActivityModel(false);
        dispatch(GetFollowUpsDetailApi(leadId));
    };
    const initialValues = {
        new_Comment: ''
    };
    const validationSchema = Yup.object({
        new_Comment: Yup.string().required('Comment Field is Required')
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const newData = {
            type: activityType,
            lead_activity_id: activityId,
            comment: values.new_Comment
        };

        AddCommentLeadActivityApi(newData)
            .then((res) => {
                if (res.succeeded === true) {
                    dispatch(GetLeadActivityDetailsApi(leadId));
                    resetForm();
                    // close();
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
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    });
    const onOk = async (selectedDate) => {
        // This function is called when the "OK" button is clicked.
        // console.log(' (OK):', selectedDate);
        const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
        const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
        // await dispatch(GetAllLeadApi(currentPage + 1, pageLength, search, leadStatus, start, end, phoneNumberFilter));
        await dispatch(GetFollowUpsDetailApi(leadId, start, end));
        setDate(selectedDate);
    };

    const onChange = async (selectedDate) => {
        // This function is called when the date range selection changes.
        setDate(selectedDate);
        if (selectedDate.length > 0) {
            const start = selectedDate ? moment(selectedDate[0]).format('YYYY-MM-DD') : '';
            const end = selectedDate ? moment(selectedDate[1]).format('YYYY-MM-DD') : '';
            await dispatch(GetFollowUpsDetailApi(leadId, start, end));
            // await dispatch(GetAllLeadApi(currentPage + 1, pageLength, search, leadStatus, start, end, phoneNumberFilter));
        }
    };

    // console.log('🚀value:', getFollowUpsCallsDetails?.positiveCalls?.length);
    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                TransitionComponent={Transition}
                maxWidth="xl"
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '750px', height: '650px' } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Follow-Ups Calls Details
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#b2b3b3 #f1f1f1',
                        maxWidth: '100%'
                    }}
                >
                    <DialogContent dividers sx={{ px: 0 }}>
                        <Grid container spacing={1}>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                lg={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    my: 1
                                }}
                            >
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
                                    // disabledDate={disabledDate}
                                    style={{
                                        borderRadius: '10px !important'
                                    }}
                                    container={() => document.body}
                                    // hoverRange={(date) => [subDays(date, 1), addDays(date, 1)]}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: '0px' } }}>
                                {/* <MainCard title="Account Settings" content={false}> */}
                                <Grid container alignItems="center" spacing={0}>
                                    <Grid item xs={12} sm={3} sx={blockSX} />
                                    <Grid item xs={12} sm={6} sx={blockSX}>
                                        <HoverDataCard
                                            title="Total Paid Users"
                                            // iconPrimary={ArrowDownwardIcon}
                                            primary={
                                                getFollowUpsCallsDetails?.totalCalls?.length > 0 && getFollowUpsCallsDetails?.totalCalls
                                                    ? getFollowUpsCallsDetails?.totalCalls[0]?.count
                                                    : 0
                                            }
                                            secondary="Total Follow Up Calls"
                                            color={theme.palette.error.main}
                                            type={1}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} sx={blockSX} />
                                    <Grid item xs={12} sm={4} sx={blockSX}>
                                        <HoverDataCard
                                            title="Total Paid Users"
                                            // iconPrimary={ArrowUpwardIcon}
                                            primary={
                                                getFollowUpsCallsDetails?.positiveCalls?.length > 0 &&
                                                getFollowUpsCallsDetails?.positiveCalls
                                                    ? getFollowUpsCallsDetails?.positiveCalls[0]?.count
                                                    : 0
                                            }
                                            secondary="Picked"
                                            color={theme.palette.success.main}
                                            clickable={() => {
                                                setUpdateActivityModel(true);
                                                setValue(1);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} sx={blockSX}>
                                        <HoverDataCard
                                            title="Total Paid Users"
                                            // iconPrimary={ArrowUpwardIcon}
                                            primary={
                                                getFollowUpsCallsDetails?.negativeCalls?.length > 0 &&
                                                getFollowUpsCallsDetails?.negativeCalls
                                                    ? getFollowUpsCallsDetails?.negativeCalls[0]?.count
                                                    : 0
                                            }
                                            secondary="Not Picked"
                                            color={theme.palette.success.main}
                                            clickable={() => {
                                                setUpdateActivityModel(true);
                                                setValue(2);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} sx={blockSX}>
                                        <HoverDataCard
                                            title="Total Paid Users"
                                            // iconPrimary={ArrowDownwardIcon}
                                            primary={
                                                getFollowUpsCallsDetails?.declinedCalls?.length > 0 &&
                                                getFollowUpsCallsDetails?.declinedCalls
                                                    ? getFollowUpsCallsDetails?.declinedCalls[0]?.count
                                                    : 0
                                            }
                                            secondary="Declined"
                                            color={theme.palette.error.main}
                                            clickable={() => {
                                                setUpdateActivityModel(true);
                                                setValue(3);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <CardContent
                                    sx={{
                                        borderLeft: '1px solid',
                                        borderColor:
                                            theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200]
                                        // height: '100%'
                                    }}
                                >
                                    {!getFollowUpsCallsDetailsLoading && getFollowUpsCallsDetails?.data.length > 0 ? (
                                        getFollowUpsCallsDetails?.data?.map((use) => (
                                            <>
                                                <Card
                                                    sx={{
                                                        display: 'inline-block',
                                                        bgcolor: theme.palette.mode === 'dark' ? 'grey.600' : theme.palette.primary.light
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 2, pb: '16px !important', width: 'fit-content', ml: 'auto' }}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12}>
                                                                <Typography
                                                                    variant="body2"
                                                                    color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                >
                                                                    {use?.comment && use?.comment !== ''
                                                                        ? use?.comment
                                                                        : 'No Comment Found'}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignContent: 'center'
                                                                }}
                                                            >
                                                                <Typography
                                                                    align="left"
                                                                    variant="subtitle2"
                                                                    color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                                >
                                                                    {use?.response === 1 && 'Picked'}
                                                                    {use?.response === 2 && 'Not Picked'}
                                                                    {use?.response === 3 && 'Declined'}
                                                                </Typography>
                                                                <Typography
                                                                    align="right"
                                                                    variant="subtitle2"
                                                                    color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                >
                                                                    {moment(use?.createdAt).format('DD-MMM-YYYY hh:mm a')}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                                <br />
                                            </>
                                        ))
                                    ) : (
                                        <>
                                            {getFollowUpsCallsDetailsLoading === true ? (
                                                <FollowUpsCallsLoader />
                                            ) : (
                                                <Typography
                                                    variant="body2"
                                                    align="center"
                                                    color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                >
                                                    No Comment Found
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                    {/* <PersonOutlineTwoToneIcon sx={{ width: '15px' }} /> {use?.comment_by_name} */}
                                </CardContent>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </PerfectScrollbar>
                {updateActivityModel && (
                    <UpdateFollowUpsCall
                        leadId={leadId}
                        typesOfKey={value}
                        open={updateActivityModel}
                        close={() => handleUpdateActivityStatus()}
                    />
                )}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { AddCommentLeadActivityApi, GetLeadActivityDetailsApi })(FollowUpCalls);
