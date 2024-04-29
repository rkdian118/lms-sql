import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { connect, useDispatch } from 'react-redux';
import { openPopupModel } from 'store/slices/menu';
import { ChangePasswordApi } from 'store/slices/adminAuth';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { openSnackbar } from 'store/slices/snackbar';

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - SLIDE ANIMATION ||=============================== //
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

const ChangePassword = ({ open, ChangePasswordApi }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showOldPassword, setOldShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // const [openPopupModel, setOpenModel] = useState(open);

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        oldPassword: Yup.string().required('Old Password is required'),
        newPassword: Yup.string()
            .min(4, 'New Password must be at least 4 characters')
            .max(16, 'New Password must be at most 16 characters')
            .required('New Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const newObj = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword
        };
        ChangePasswordApi(newObj)
            .then((res) => {
                if (res.succeeded === true) {
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

    const handleClickShowPassword = (type) => {
        if (type === 1) {
            setOldShowPassword(!showOldPassword);
        } else if (type === 2) {
            setShowNewPassword(!showNewPassword);
        } else {
            setShowPassword(!showPassword);
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        // setOpenModel(false);
        dispatch(openPopupModel({ openItemKey: '', modalState: false }));
    };

    return (
        <>
            <BootstrapDialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={close}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: '#f9e0fa',
                        width: '100%',
                        maxWidth: '500px'
                    },
                    '& .MuiDialog-container': {
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{ background: '#f9e0fa' }}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em', color: '#b276a8' }} align="center">
                        Change Password
                    </Typography>
                </BootstrapDialogTitle>
                <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 0 } }}>
                    <Formik>
                        <form noValidate onSubmit={formik.handleSubmit}>
                            <FormControl fullWidth sx={{ mb: 2, px: 6 }}>
                                <Typography variant="h5" sx={{ width: '180px' }}>
                                    Old Password<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    placeholder="Enter Old Password"
                                    type={showOldPassword ? 'text' : 'password'}
                                    name="oldPassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.oldPassword}
                                    inputProps={{ maxLength: 16 }}
                                    error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                    onBlur={formik.handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword(1)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px '
                                    }}
                                />
                                {formik.touched.oldPassword && formik.errors.oldPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {formik.errors.oldPassword}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2, px: 6 }}>
                                <Typography variant="h5" sx={{ width: '180px' }}>
                                    New Password<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    placeholder="Enter New Password"
                                    type={showNewPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword}
                                    inputProps={{ maxLength: 16 }}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                    onBlur={formik.handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword(2)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px '
                                    }}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {formik.errors.newPassword}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2, px: 6 }}>
                                <Typography variant="h5" sx={{ width: '180px' }}>
                                    Confirm Password<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <OutlinedInput
                                    fullWidth
                                    placeholder="Enter Confirm Password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                    inputProps={{ maxLength: 16 }}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    onBlur={formik.handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => handleClickShowPassword(3)}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px '
                                    }}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {formik.errors.confirmPassword}
                                    </FormHelperText>
                                )}
                            </FormControl>

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
                                    disabled={formik.isSubmitting}
                                    sx={{
                                        pl: 2,
                                        background: '#98528d',
                                        fontSize: '18px !important',
                                        // mr: 2,
                                        width: '20%',
                                        height: '35px',
                                        '&:hover': { background: '#f9e0fa', color: '#b276a8' }
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
                            </Box>
                        </form>
                    </Formik>
                </Grid>
            </BootstrapDialog>
        </>
    );
};

export default connect(null, { ChangePasswordApi })(ChangePassword);
