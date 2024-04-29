// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    AlertTitle,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';
import { Formik, useFormik } from 'formik';
import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { connect, useSelector } from 'react-redux';
import { ChangePasswordApi } from 'store/slices/adminAuth';
import * as Yup from 'yup';
// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //

const ChangePassword = ({ ChangePasswordApi }) => {
    const theme = useTheme();
    const { adminRole } = useSelector((state) => state.admin);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
        // passID:id,
    };
    const validationSchema = Yup.object({
        oldPassword: Yup.string()
            .required('Password Field is Required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .min(8, 'Password must be at least 8 characters'),
        newPassword: Yup.string()
            .required('Password Field is Required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Password Field is Required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .min(8, 'Password must be at least 8 characters')
    });

    const validate = (values) => {
        // eslint-disable-next-line prefer-const
        let errors = {};

        if (!values.oldPassword) {
            errors.oldPassword = 'Old Password is Required';
        }
        if (!values.newPassword) {
            errors.newPassword = 'New Password is Required';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is Required';
        }

        if (values.newPassword !== values.confirmPassword) {
            errors.newPassword = 'New Password Not Match';
            errors.confirmPassword = 'Confirm Password Not Match';
        }

        return errors;
    };

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const newData = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            role_type: adminRole
            // id: admin._id
        };

        ChangePasswordApi(newData)
            .then((res) => {
                if (res.succeeded === true) {
                    setSubmitting(false);
                    resetForm();
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
            .catch((err) => {
                setSubmitting(false);
            });
    };

    const formik = useFormik({
        initialValues,
        validate,
        validationSchema,
        onSubmit
    });
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Alert severity="warning" variant="outlined" sx={{ borderColor: 'warning.dark' }}>
                    <AlertTitle>Alert!</AlertTitle>
                    {/* Your Password will expire in every 3 months. So change it periodically. */}
                    Once a password is shared, you have no control over who uses it, where they use it, how they use it, or who they share
                    it with,
                    <strong> Do not share your password</strong>
                </Alert>
            </Grid>
            <Grid item xs={12}>
                <SubCard title="Change Password">
                    <Formik>
                        <form noValidate onSubmit={formik.handleSubmit}>
                            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password-login">Old Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type={showOldPassword ? 'text' : 'password'}
                                            name="oldPassword"
                                            label="Old Password"
                                            onChange={formik.handleChange}
                                            value={formik.values.oldPassword}
                                            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                            onBlur={formik.handleBlur}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {formik.touched.oldPassword && formik.errors.oldPassword && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {formik.errors.oldPassword}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password-login">New Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type={showNewPassword ? 'text' : 'password'}
                                            name="newPassword"
                                            label="New Password"
                                            onChange={formik.handleChange}
                                            value={formik.values.newPassword}
                                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                            onBlur={formik.handleBlur}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {formik.touched.newPassword && formik.errors.newPassword && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {formik.errors.newPassword}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password-login">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            onChange={formik.handleChange}
                                            value={formik.values.confirmPassword}
                                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                            onBlur={formik.handleBlur}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {formik.errors.confirmPassword}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid spacing={2} container justifyContent="flex-end" sx={{ mt: 3 }}>
                                <Grid item>
                                    <AnimateButton>
                                        <Button size="smaill" type="submit" variant="contained" disabled={formik.isSubmitting}>
                                            {formik.isSubmitting ? (
                                                <>
                                                    Change Password <CircularProgress color="inherit" size={20} />
                                                </>
                                            ) : (
                                                'Change Password'
                                            )}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                                {/* <Grid item>
                                    <Button sx={{ color: theme.palette.error.main }}>Clear</Button>
                                </Grid> */}
                            </Grid>
                        </form>
                    </Formik>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default connect(null, { ChangePasswordApi })(ChangePassword);
