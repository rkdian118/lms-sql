import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
// material-ui
import { styled } from '@mui/material/styles';
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
    InputAdornment,
    Select,
    MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
// import { excelDataImport } from './../../../store/slices/restroCatAction';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { openPopupModel } from 'store/slices/menu';
import { useTheme } from '@mui/system';
import PreviewImage from 'Helper/PreviewPic';
import { IMAGES_FILE_SUPPORTED_FORMATS, handleKeyBlock } from 'Helper/Validation';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UpdateCompleteTargetApi } from 'store/slices/clusterAction';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import SuccessModel from './SuccessModel';

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

const CompleteTargetModels = (props) => {
    const theme = useTheme();
    const { open, close, UpdateCompleteTargetApi, completedTarget, confirmBusiness, bdId, targetId } = props;
    const dispatch = useDispatch();

    const initialValues = {
        upfront_amount: '' || completedTarget,
        confirm_business: '' || confirmBusiness
    };

    const validationSchema = Yup.object({
        upfront_amount: Yup.string().required('Upfront is Required').max(6, 'Completed Target must be at most 6 characters'),
        confirm_business: Yup.string().required('Confirm Business is Required').max(6, 'Confirm Business must be at most 6 characters')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const formData = {
            target_id: targetId,
            upfront_amount: values.upfront_amount,
            confirm_business: values.confirm_business
        };

        UpdateCompleteTargetApi(formData)
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit
    });

    const handleClose = () => {
        close();
    };

    // console.log('🚀 formik:', formik.errors);
    return (
        <>
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
                        maxWidth: '500px',
                        padding: '0px',
                        top: '-100px'
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }} align="center">
                        Update Completed Target
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
                                <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Upfront<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Upfront"
                                            type="number"
                                            inputProps={{ maxLength: 6 }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px',
                                                marginTop: '5px'
                                            }}
                                            name="upfront_amount"
                                            onKeyDown={handleKeyBlock}
                                            value={formik.values.upfront_amount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.upfront_amount && Boolean(formik.errors.upfront_amount)}
                                            helperText={formik.touched.upfront_amount && formik.errors.upfront_amount}
                                            onBlur={formik.handleBlur}
                                        />
                                        <FormHelperText>Please enter this month over all amount in upfront</FormHelperText>
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Confirm Business<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Confirm Business"
                                            type="number"
                                            inputProps={{ maxLength: 6 }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px',
                                                marginTop: '5px'
                                            }}
                                            name="confirm_business"
                                            onKeyDown={handleKeyBlock}
                                            value={formik.values.confirm_business}
                                            onChange={formik.handleChange}
                                            error={formik.touched.confirm_business && Boolean(formik.errors.confirm_business)}
                                            helperText={formik.touched.confirm_business && formik.errors.confirm_business}
                                            onBlur={formik.handleBlur}
                                        />
                                        <FormHelperText>Please enter this month over all amount in confirm business</FormHelperText>
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
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
            </BootstrapDialog>
        </>
    );
};

export default connect(null, { UpdateCompleteTargetApi })(CompleteTargetModels);
