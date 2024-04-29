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
    Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorMessage, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
// import { excelDataImport } from './../../../store/slices/restroCatAction';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { styled, useTheme } from '@mui/material/styles';
import { openPopupModel } from 'store/slices/menu';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { countries } from 'Helper/CountriesData';
import { ClusterRescheduledFollowUpsApi } from 'store/slices/clusterLeadAction';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import SuccessModel from './SuccessModel';
// import DuplicateLeadModel from './DuplicateLeadModel';

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
    <DialogTitle sx={{ m: 0, py: 1, px: 2 }} {...other}>
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

const RescheduledFollowUps = (props) => {
    const theme = useTheme();
    const { open, close, ClusterRescheduledFollowUpsApi, followUpsId, activityId } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { leadFollowUpList } = useSelector((state) => state.masterAction);
    const { getLeadActivityData, getLeadActivityLoading } = useSelector((state) => state.businessAction);
    // console.log('🚀getLeadActivityData:', getLeadActivityData[0]?.activityData?._id);
    const [valueBasic, setValueBasic] = React.useState(new Date());

    const initialValues = {
        follow_ups: '' || followUpsId,
        selectedDate: valueBasic || new Date(),
        new_Comment: ''
    };

    const validationSchema = Yup.object({
        // follow_ups: Yup.string().required('Follow-Ups Field is Required'),
        new_Comment: Yup.string().required('Reason is Required'),
        selectedDate: Yup.date().required('Date is required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            lead_activity_id: activityId,
            followup_date: values.selectedDate,
            comment: values.new_Comment
        };
        // console.log('🚀  newData:');

        ClusterRescheduledFollowUpsApi(newData)
            .then((res) => {
                if (res.succeeded === true) {
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

    const handleClose = () => {
        close();
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                TransitionComponent={Transition}
                maxWidth="l"
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '600px', top: '-100px' } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Follow-Ups Rescheduled
                    </Typography>
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
                        <Formik onSubmit={onSubmit}>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Date<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                renderInput={(props) => (
                                                    <TextField
                                                        fullWidth
                                                        {...props}
                                                        helperText={<ErrorMessage name="selectedDate" />}
                                                        value={format(formik.values.selectedDate, 'dd-yy-MM', {
                                                            locale: AdapterDateFns.dateLocale
                                                        })}
                                                        onChange={(e) => {
                                                            // Use Formik's setFieldValue to update the value
                                                            formik.setFieldValue('selectedDate', e.target.value);
                                                        }}
                                                        onKeyDown={(e) => e.preventDefault()}
                                                        error={formik.touched.selectedDate && Boolean(formik.errors.selectedDate)}
                                                    />
                                                )}
                                                value={formik.values.selectedDate}
                                                onChange={(newValue) => {
                                                    // formik.values.selectedDate = newValue;
                                                    formik.setFieldValue('selectedDate', newValue);
                                                }}
                                                minDate={new Date()}
                                            />
                                        </LocalizationProvider>
                                        {formik.touched.selectedDate && formik.errors.selectedDate && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {formik.errors.selectedDate}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    {/* <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Follow-Ups<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            disabled
                                            name="follow_ups"
                                            value={formik.values.follow_ups ? formik.values.follow_ups : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.follow_ups && Boolean(formik.errors.follow_ups)}
                                            helperText={formik.touched.follow_ups && formik.errors.follow_ups}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Follow-Ups Status</MenuItem>
                                            {leadFollowUpList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.follow_ups && formik.errors.follow_ups && (
                                            <FormHelperText error>{formik.errors.follow_ups}</FormHelperText>
                                        )}
                                    </Grid> */}
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Valid Reason<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Valid Reason"
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
                                            error={formik.touched.new_Comment && Boolean(formik.errors.new_Comment)}
                                            helperText={formik.touched.new_Comment && formik.errors.new_Comment}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                </Grid>

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
                                </Box>
                            </form>
                        </Formik>
                    </DialogContent>
                </PerfectScrollbar>
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
                {/* {successOpen && <DuplicateLeadModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { ClusterRescheduledFollowUpsApi })(RescheduledFollowUps);
