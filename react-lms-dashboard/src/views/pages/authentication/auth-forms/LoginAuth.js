import React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

import { Navigate, useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { AdminLoginApi } from '../../../../store/slices/adminAuth';
// import { setAlert, deleteAlert, deleteAllAlert } from '../../../../store/slices/alertAction';
// import Alert from 'ui-component/Alert/Alert';
// material-ui
import { useTheme } from '@mui/material/styles';
// third party
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { DEV_TOOLS, DASHBOARD_PATH } from 'config';
// ============================|| REACT-NODE - LOGIN ||============================ //

const LoginAuth = ({ AdminLoginApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { isAuthenticated, loading } = useSelector((state) => state.admin);
    const [loader, setLoader] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [loginLoading, setLoginLoading] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showLoginError, setShowLoginError] = React.useState('');

    // const auth = useSelector((state) => state.auth);
    // const { isAuthenticated, loading } = auth;

    // const initialValues = {
    //     username: '',
    //     password: ''
    // };
    const initialValues = {
        username: DEV_TOOLS ? 'username1' : '',
        password: DEV_TOOLS ? 'Username@123' : ''
    };

    const onSubmit = (values, { setSubmitting }) => {
        setLoginLoading(true);
        const newData = {
            username: values.username.toLowerCase(),
            password: values.password
        };
        setLoader(true);
        AdminLoginApi(newData)
            .then((res) => {
                // console.log('🚀 res:', res);
                setLoginLoading(false);
                if (res?.succeeded === true) {
                    setLoader(false);
                    setSubmitting(false);
                    navigate('/login/verification');
                    localStorage.setItem('adminToken', res.ResponseData.token);
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
                    setLoader(false);
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
                console.log('err', err);
            });
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username field is required'),
        password: Yup.string().required('Password field is required')
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    if (isAuthenticated === true && loading === false) {
        return <Navigate replace to={DASHBOARD_PATH} />;
    }
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Username</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    {/* <Alert /> */}
                </Grid>
            </Grid>

            <Formik>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.username && formik.errors.username)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="text"
                            name="username"
                            label="Email Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.username}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
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
                        {formik.touched.password && formik.errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <AnimateButton>
                            <Button
                                // disableElevation
                                // fullWidth
                                disabled={formik.isSubmitting}
                                size="md"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ padding: '5px 50px' }}
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <CircularProgress color="inherit" size={20} />
                                    </>
                                ) : (
                                    'Log In'
                                )}
                            </Button>
                        </AnimateButton>
                        {/* {loader === true ? (
                            <>
                                <CircularProgress color="inherit" variant="indeterminate" sx={{ ml: 2 }} />
                            </>
                        ) : (
                            ''
                        )} */}
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default connect(null, {
    AdminLoginApi
    // setAlert,
    // deleteAlert,
    // deleteAllAlert
})(LoginAuth);
