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
    Card
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
// import { ClusterGetCallActivityDetailsApi } from 'store/slices/businessAction';
import { ClusterGetCallActivityDetailsApi, ClusterAddCommentCallActivityApi } from 'store/slices/clusterLeadAction';
import MuiTooltip from '@mui/material/Tooltip';
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

import moment from 'moment';
import UpdateCallActivityModels from './UpdateCallActivityModels';
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

const CallsActivityStatus = (props) => {
    const theme = useTheme();
    const { open, close, ClusterAddCommentCallActivityApi, rowData, callById } = props;
    const newmenu = useSelector((state) => state.clusterLeadAction);
    const { getCallActivityData, getCallActivityLoading } = newmenu;

    const { borderRadius } = useConfig();
    const [value, setValue] = React.useState(0);
    const [updateActivityModel, setUpdateActivityModel] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const [activityId, setActivityId] = useState('');

    useEffect(() => {
        if (getCallActivityData?.length > 0) {
            setCommentData(getCallActivityData[0]);
            setActivityId(getCallActivityData[0]?._id);
        }
    }, [getCallActivityData]);

    // console.log('call activityData:', getCallActivityData);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClose = () => {
        close();
    };
    const handleUpdateActivityStatus = () => {
        setUpdateActivityModel(false);
        dispatch(ClusterGetCallActivityDetailsApi(callById));
    };
    const initialValues = {
        new_Comment: ''
    };
    const validationSchema = Yup.object({
        new_Comment: Yup.string().required('Comment Field is Required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            call_activity_id: activityId,
            comment: values.new_Comment
        };

        ClusterAddCommentCallActivityApi(newData)
            .then((res) => {
                if (res.succeeded === true) {
                    // dispatch(ClusterGetCallActivityDetailsApi(callById));
                    close();
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
    // console.log('🚀value:', commentData);
    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                TransitionComponent={Transition}
                maxWidth="xl"
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '1000px' } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Call Activity Status
                    </Typography>
                    {/* <Typography
                        variant="h6"
                        component="h6"
                        sx={{ pl: '10px', fontSize: '1em', cursor: 'pointer' }}
                        onClick={() => setUpdateActivityModel(true)}
                    >
                        <EditIcon color="primary" />
                    </Typography> */}
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        // background: '16px',
                        scrollbarWidth: 'thin' /* For Firefox */,
                        scrollbarColor: '#b2b3b3 #f1f1f1',
                        maxWidth: '100%'
                    }}
                >
                    <DialogContent dividers sx={{ px: 0 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: '0px' } }}>
                                {/* <MainCard title="Account Settings" content={false}> */}
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} lg={4} sx={{ height: '500px', overflow: 'auto' }}>
                                        <PerfectScrollbar
                                            component="div"
                                            style={{
                                                // background: '16px',
                                                scrollbarWidth: 'thin' /* For Firefox */,
                                                scrollbarColor: '#b2b3b3 #f1f1f1',
                                                maxWidth: '100%'
                                            }}
                                        >
                                            <CardContent sx={{ py: 2, pr: 0 }}>
                                                <Tabs
                                                    value={value}
                                                    onChange={handleChange}
                                                    orientation="vertical"
                                                    variant="scrollable"
                                                    sx={{
                                                        '& .MuiTabs-flexContainer': {
                                                            borderBottom: 'none'
                                                        },
                                                        '& button': {
                                                            color:
                                                                theme.palette.mode === 'dark'
                                                                    ? theme.palette.grey[600]
                                                                    : theme.palette.grey[600],
                                                            minHeight: 'auto',
                                                            minWidth: '100%',
                                                            py: 1.5,
                                                            pl: 2,
                                                            display: 'flex',
                                                            flexDirection: 'row',
                                                            alignItems: 'flex-start',
                                                            textAlign: 'left',
                                                            justifyContent: 'flex-start',
                                                            borderRadius: `${borderRadius}px`
                                                        },
                                                        '& button.Mui-selected': {
                                                            color: theme.palette.primary.main,
                                                            background:
                                                                theme.palette.mode === 'dark'
                                                                    ? theme.palette.dark.main
                                                                    : theme.palette.grey[50]
                                                        },
                                                        '& button > svg': {
                                                            marginBottom: '0px !important',
                                                            marginRight: 1.25,
                                                            marginTop: 1.25,
                                                            height: 20,
                                                            width: 20
                                                        },
                                                        '& button > div > span': {
                                                            display: 'block'
                                                        },
                                                        '& > div > span': {
                                                            display: 'none'
                                                        }
                                                    }}
                                                >
                                                    {!getCallActivityLoading && getCallActivityData?.length > 0 ? (
                                                        getCallActivityData?.map((tab, index) => {
                                                            console.log('🚀tab:', tab);
                                                            return (
                                                                <Tab
                                                                    key={index}
                                                                    label={
                                                                        <Grid container direction="column">
                                                                            <Typography variant="subtitle1" color="inherit">
                                                                                {tab?.activityData?.status_name}
                                                                            </Typography>
                                                                            <Typography
                                                                                component="div"
                                                                                variant="caption"
                                                                                sx={{ textTransform: 'capitalize' }}
                                                                            >
                                                                                {moment(tab?.updatedAt).format('DD MMM YYYY hh:mm a')}
                                                                            </Typography>
                                                                        </Grid>
                                                                    }
                                                                    {...a11yProps(index)}
                                                                    onLoad={() => setCommentData(tab)}
                                                                    onClick={() => {
                                                                        setCommentData(tab);
                                                                        setActivityId(tab._id);
                                                                    }}
                                                                />
                                                            );
                                                        })
                                                    ) : (
                                                        <>
                                                            {getCallActivityLoading === true ? (
                                                                <ActivityTabLoader rows={5} tabRows={10} />
                                                            ) : (
                                                                <Tab
                                                                    label={
                                                                        <Grid container direction="column">
                                                                            <Typography variant="subtitle1" color="inherit">
                                                                                No Activity Found
                                                                            </Typography>
                                                                        </Grid>
                                                                    }
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </Tabs>
                                            </CardContent>
                                        </PerfectScrollbar>
                                    </Grid>
                                    <Grid item xs={12} lg={8} sx={{ '&.MuiGrid-root': { pl: '0px' } }}>
                                        <CardContent
                                            sx={{
                                                borderLeft: '1px solid',
                                                borderColor:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.background.default
                                                        : theme.palette.grey[200],
                                                height: '100%'
                                            }}
                                        >
                                            <TabPanel value={value} index={value}>
                                                <Grid container spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            alignContent: 'center'
                                                        }}
                                                    >
                                                        <MuiTooltip title="Update Call Status" arrow>
                                                            <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={() => setUpdateActivityModel(true)}
                                                                    sx={{
                                                                        px: 3,
                                                                        mb: 1,
                                                                        width: '100%',
                                                                        boxShadow: theme.customShadows.primary,
                                                                        ':hover': {
                                                                            boxShadow: 'none'
                                                                        }
                                                                    }}
                                                                >
                                                                    <EditIcon sx={{ mr: 1, cursor: 'pointer' }} />
                                                                    Update Call Status
                                                                </Button>
                                                            </AnimateButton>
                                                        </MuiTooltip>
                                                    </Grid>
                                                </Grid>
                                                {commentData?.comments?.map((tabcontent, i) => (
                                                    <>
                                                        <Card
                                                            sx={{
                                                                display: 'inline-block',
                                                                bgcolor:
                                                                    theme.palette.mode === 'dark' ? 'grey.600' : theme.palette.primary.light
                                                            }}
                                                        >
                                                            <CardContent
                                                                sx={{ p: 2, pb: '16px !important', width: 'fit-content', ml: 'auto' }}
                                                            >
                                                                <Grid container spacing={1}>
                                                                    <Grid item xs={12}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                        >
                                                                            {tabcontent?.comment !== ''
                                                                                ? tabcontent?.comment
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
                                                                            <PersonOutlineTwoToneIcon sx={{ width: '15px' }} />
                                                                            {tabcontent?.comment_by_name}
                                                                        </Typography>
                                                                        <Typography
                                                                            align="right"
                                                                            variant="subtitle2"
                                                                            color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                        >
                                                                            {moment(tabcontent?.createdAt).format('DD MMM YYYY hh:mm a')}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Card>
                                                        <br />
                                                    </>
                                                ))}
                                                {commentData.length !== 0 ? (
                                                    <Formik onSubmit={onSubmit}>
                                                        <form noValidate onSubmit={formik.handleSubmit}>
                                                            <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Grid item xs={12} lg={10}>
                                                                    <TextField
                                                                        fullWidth
                                                                        placeholder="Enter Comment"
                                                                        type="text"
                                                                        style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'flex-start',
                                                                            marginBottom: '5px ',
                                                                            marginTop: '5px '
                                                                        }}
                                                                        name="new_Comment"
                                                                        value={formik.values.new_Comment}
                                                                        onChange={formik.handleChange}
                                                                        error={
                                                                            formik.touched.new_Comment && Boolean(formik.errors.new_Comment)
                                                                        }
                                                                        helperText={formik.touched.new_Comment && formik.errors.new_Comment}
                                                                        onBlur={formik.handleBlur}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} lg={2}>
                                                                    <AnimateButton scale={{ hover: 1.1, tap: 0.9 }}>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            type="submit"
                                                                            disabled={formik.isSubmitting}
                                                                            sx={{
                                                                                px: 5,
                                                                                width: '100%',
                                                                                boxShadow: theme.customShadows.primary,
                                                                                ':hover': {
                                                                                    boxShadow: 'none'
                                                                                }
                                                                            }}
                                                                        >
                                                                            {formik.isSubmitting ? (
                                                                                <>
                                                                                    <CircularProgress color="inherit" size={20} />
                                                                                </>
                                                                            ) : (
                                                                                'Submit'
                                                                            )}
                                                                        </Button>
                                                                    </AnimateButton>
                                                                </Grid>
                                                            </Grid>
                                                        </form>
                                                    </Formik>
                                                ) : (
                                                    ''
                                                )}
                                            </TabPanel>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </PerfectScrollbar>
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
                {updateActivityModel && (
                    <UpdateCallActivityModels
                        activityId={activityId}
                        open={updateActivityModel}
                        close={() => handleUpdateActivityStatus()}
                    />
                )}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { ClusterAddCommentCallActivityApi })(CallsActivityStatus);
