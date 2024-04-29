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
    TextField,
    Grid,
    Button,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTheme } from '@mui/system';
import { UpdateMasterStatusApi } from 'store/slices/masterAction';

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

const EditPreDefine = (props) => {
    const theme = useTheme();
    const { open, close, UpdateMasterStatusApi, id, getName } = props;
    const dispatch = useDispatch();

    const initialValues = {
        common_name: getName
    };

    const validationSchema = Yup.object({
        common_name: Yup.string()
            .required('Note Field is Required')
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only alphabets are allowed with single space between words')
            .min(3, 'Note must be at least 3 characters')
            .max(30, 'Note must be at most 30 characters')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            master_status_id: id,
            status_name: values.common_name
        };

        UpdateMasterStatusApi(newData).then((res) => {
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
        });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleClose = () => {
        close();
    };

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
                        maxWidth: '600px',
                        padding: '0px',
                        top: '-100px'
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{ background: '#f9e1b4' }}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }} align="center">
                        Update Pre Define Notes
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
                    <DialogContent
                        dividers
                        sx={{
                            px: 0
                        }}
                    >
                        <Formik>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={12} sx={{ my: '15px', alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Note<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            // ref={fileRef}
                                            fullWidth
                                            placeholder="Enter Note"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="common_name"
                                            value={formik.values.common_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.common_name && Boolean(formik.errors.common_name)}
                                            helperText={formik.touched.common_name && formik.errors.common_name}
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
                                    <Button
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={formik.isSubmitting}
                                        // sx={{
                                        //     pl: 2,
                                        //     background: '#3e7dc3',
                                        //     borderRadius: '10px',
                                        //     width: '20%',
                                        //     height: '35px',
                                        //     '&:hover': { color: '#000', backgroundColor: '#c6d9ff' }
                                        // }}
                                        sx={{
                                            width: '20%',
                                            height: '35px',
                                            color: '#000',
                                            borderRadius: '5px',
                                            background: '#fcf0dc',
                                            p: '6px 25px',
                                            '&:hover': {
                                                // pl: '40px',
                                                background: '#f2be56',
                                                color: '#000000'
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
                                </Box>
                            </form>
                        </Formik>
                    </DialogContent>
                </PerfectScrollbar>
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { UpdateMasterStatusApi })(EditPreDefine);
