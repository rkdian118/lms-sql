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
    MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorMessage, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { styled, useTheme } from '@mui/material/styles';
import { openPopupModel } from 'store/slices/menu';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { UpdateCallsApi } from 'store/slices/countryLeadAction';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AnimateButton from 'ui-component/extended/AnimateButton';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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

const EditCallsModels = (props) => {
    const { open, close, UpdateCallsApi, rowData } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { callTypeList, callModeList, callStatusList, requirementTypeList, preDefineNotesList } = useSelector(
        (state) => state.masterAction
    );
    const { getLeadDropdown } = useSelector((state) => state.countryLeadAction);
    const [loader, setLoader] = useState(false);

    const initialValues = {
        lead_id: '' || rowData?.leadData?._id,
        call_status_id: '' || rowData?.callStatusData?._id,
        recording_link: '' || rowData?.recording_link,
        call_type: '' || rowData?.callTypeData?._id,
        call_mode_type: '' || rowData?.callModeData?._id,
        meeting_link: '' || rowData?.meeting_link,
        pe_name: '' || rowData?.pe_name,
        meeting_date_time: rowData?.meeting_date_time,
        comment_remark: '' || rowData?.comment_remark
    };

    const validationSchema = Yup.object({
        lead_id: Yup.string().required('Lead Field is Required'),
        call_type: Yup.string().required('Call Type Field is Required'),
        call_status_id: Yup.string().required('Call Status Field is Required'),
        pe_name: Yup.string().required('PE Name Field is Required'),
        call_mode_type: Yup.string().required('Call Mode Type Field is Required'),
        meeting_link: Yup.string().required('Meeting Link Field is Required'),
        meeting_date_time: Yup.string().required('Meeting Date & Time Field is Required'),
        comment_remark: Yup.string().required('Comment Field is Required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            call_id: rowData?._id,
            lead_id: values.lead_id,
            call_status_id: values.call_status_id,
            call_type_id: values.call_type,
            call_mode_id: values.call_mode_type,
            recording_link: values.recording_link,
            meeting_link: values.meeting_link,
            pe_name: values.pe_name,
            meeting_date_time: values.meeting_date_time,
            comment_remark: values.comment_remark
        };

        UpdateCallsApi(newData)
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
        // dispatch(openPopupModel({ openItemKey: '', modalState: false }));
        close();
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    });

    // console.log('🚀valueBasic:', formik.values);
    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                maxWidth="xl" // Set the desired max width here (e.g., "xs", "sm", "md", "lg", "xl")
                fullWidth // Ensures that the dialog takes up the full width available
                sx={{
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '600px'
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Update Meeting
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        // background: '16px',
                        scrollbarWidth: 'thin' /* For Firefox */,
                        scrollbarColor: '#b2b3b3 #f1f1f1'
                    }}
                >
                    <DialogContent dividers sx={{ px: 0 }}>
                        <Formik>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                {/* <Box
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
                                        sx={{
                                            px: 4,
                                            background: '#c6d9ff',
                                            cursor: 'auto',
                                            '&:hover': {
                                                background: '#c6d9ff'
                                            }
                                        }}
                                    >
                                        <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1.5em', color: '#43609c' }}>
                                            Update Meeting
                                        </Typography>
                                    </Button>
                                </Box>
                                <Divider sx={{ borderStyle: 'dashed', borderColor: '#000000', marginTop: '-20px', marginBottom: '40px' }} /> */}
                                <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Lead<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            name="lead_id"
                                            value={formik.values.lead_id ? formik.values.lead_id : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.lead_id && Boolean(formik.errors.lead_id)}
                                            helperText={formik.touched.lead_id && formik.errors.lead_id}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            disabled
                                        >
                                            <MenuItem value="">Select Lead</MenuItem>
                                            {getLeadDropdown?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {`${list?.client_name} (${list?.client_country})`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.lead_id && formik.errors.lead_id && (
                                            <FormHelperText style={{ marginLeft: '15px' }} error>
                                                {formik.errors.lead_id}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Call Status<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            name="call_status_id"
                                            value={formik.values.call_status_id ? formik.values.call_status_id : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.call_status_id && Boolean(formik.errors.call_status_id)}
                                            helperText={formik.touched.call_status_id && formik.errors.call_status_id}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Call Status</MenuItem>
                                            {callStatusList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.call_status_id && formik.errors.call_status_id && (
                                            <FormHelperText style={{ marginLeft: '15px' }} error>
                                                {formik.errors.call_status_id}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Call Type<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            name="call_type"
                                            value={formik.values.call_type ? formik.values.call_type : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.call_type && Boolean(formik.errors.call_type)}
                                            helperText={formik.touched.call_type && formik.errors.call_type}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            disabled
                                        >
                                            <MenuItem value="">Select Call Type</MenuItem>
                                            {callTypeList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.call_type && formik.errors.call_type && (
                                            <FormHelperText style={{ marginLeft: '15px' }} error>
                                                {formik.errors.call_type}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Call Mode Type<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            name="call_mode_type"
                                            value={formik.values.call_mode_type ? formik.values.call_mode_type : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.call_mode_type && Boolean(formik.errors.call_mode_type)}
                                            helperText={formik.touched.call_mode_type && formik.errors.call_mode_type}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Call Mode Type</MenuItem>
                                            {callModeList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.call_mode_type && formik.errors.call_mode_type && (
                                            <FormHelperText style={{ marginLeft: '15px' }} error>
                                                {formik.errors.call_mode_type}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Meeting Link<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Meeting Link"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="meeting_link"
                                            value={formik.values.meeting_link}
                                            onChange={formik.handleChange}
                                            error={formik.touched.meeting_link && Boolean(formik.errors.meeting_link)}
                                            helperText={formik.touched.meeting_link && formik.errors.meeting_link}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Recording Link
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Recording Link"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="recording_link"
                                            value={formik.values.recording_link}
                                            onChange={formik.handleChange}
                                            error={formik.touched.recording_link && Boolean(formik.errors.recording_link)}
                                            helperText={formik.touched.recording_link && formik.errors.recording_link}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Meeting Date & Time<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                renderInput={(props) => (
                                                    <TextField
                                                        fullWidth
                                                        {...props}
                                                        error={formik.touched.meeting_date_time && Boolean(formik.errors.meeting_date_time)}
                                                        helperText={formik.touched.meeting_date_time && formik.errors.meeting_date_time}
                                                        // helperText={<ErrorMessage name="meeting_date_time" />}
                                                        onKeyDown={(e) => e.preventDefault()}
                                                    />
                                                )}
                                                value={formik.values.meeting_date_time}
                                                onChange={(newValue) => {
                                                    formik.setFieldValue('meeting_date_time', newValue);
                                                }}
                                                minDate={new Date()}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            PE Name
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter PE Name"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="pe_name"
                                            value={formik.values.pe_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.pe_name && Boolean(formik.errors.pe_name)}
                                            helperText={formik.touched.pe_name && formik.errors.pe_name}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Comment<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Comment"
                                            multiline
                                            rows={3}
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="comment_remark"
                                            value={formik.values.comment_remark}
                                            onChange={formik.handleChange}
                                            error={formik.touched.comment_remark && Boolean(formik.errors.comment_remark)}
                                            helperText={formik.touched.comment_remark && formik.errors.comment_remark}
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
                                                'Update'
                                            )}
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </form>
                        </Formik>
                    </DialogContent>
                </PerfectScrollbar>
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { UpdateCallsApi })(EditCallsModels);
