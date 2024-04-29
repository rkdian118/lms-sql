import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import OtpInput from 'react18-input-otp';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { VerificationSecretApi, AdminDetailApi } from 'store/slices/adminAuth';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from 'store/slices/snackbar';
import { Box } from '@mui/system';

const AuthCodeVerification = ({ VerificationSecretApi, AdminDetailApi }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginLoading, setLoginLoading] = React.useState(true);
    const [loader, setLoader] = React.useState(false);
    const auth = useSelector((state) => state.admin);
    const { adminToken } = auth;

    const initialValues = {
        secret_key: ''
    };

    const validationSchema = Yup.object({
        secret_key: Yup.string().required('Security code is required').length(4, 'Security code must be 4 characters')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const newObj = {
            secret_key: values.secret_key
        };
        let UpdateToken;
        if (adminToken === null) {
            // console.log('token gya:');
            UpdateToken = localStorage.getItem('adminToken');
        }
        setLoader(true);
        VerificationSecretApi(newObj, adminToken || UpdateToken).then((res) => {
            setLoginLoading(false);
            if (res.succeeded === true) {
                setLoader(false);
                setSubmitting(false);
                localStorage.setItem('adminToken', res.ResponseData.token);
                localStorage.setItem('adminRole', res.ResponseData.role_type);
                navigate('/dashboard');
                setTimeout(() => {
                    AdminDetailApi(res.ResponseData.token, res.ResponseData.role_type);
                }, 3000);
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
                if (res.ResponseCode === 403) {
                    navigate('/login');
                }
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
        });
        // Implement the logic to validate the verification code on the server-side.
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <form onSubmit={formik.handleSubmit}>
                    <OtpInput
                        value={formik.values.secret_key}
                        onChange={(otpNumber) => formik.setFieldValue('secret_key', otpNumber)}
                        numInputs={4}
                        isInputNum
                        // cursorPosition={0}
                        // tabIndex={0}
                        // firstInputTabIndex={0}
                        // otherInputTabIndex="-1"
                        shouldAutoFocus
                        // isSuccessed
                        // isInputSecure
                        containerStyle={{ justifyContent: 'space-between' }}
                        inputStyle={{
                            width: '100%',
                            margin: '8px',
                            padding: '10px',
                            border: `1px solid ${formik.errors.secret_key ? 'red' : borderColor}`, // Apply red border color when there's an error
                            borderRadius: 4,
                            ':hover': {
                                borderColor: theme.palette.primary.main
                            }
                        }}
                        placeholder="0000"
                        focusStyle={{
                            outline: 'none',
                            border: `2px solid ${theme.palette.primary.main}`
                        }}
                    />
                    {formik.touched.secret_key && formik.errors.secret_key && (
                        <Typography variant="body2" color="error">
                            {formik.errors.secret_key}
                        </Typography>
                    )}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button disabled={formik.isSubmitting} sx={{ padding: '5px 50px' }} size="md" type="submit" variant="contained">
                            {formik.isSubmitting ? ( // Show loader when form is submitting
                                <>
                                    <CircularProgress color="inherit" size={20} />
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

export default connect(null, {
    VerificationSecretApi,
    AdminDetailApi
})(AuthCodeVerification);
