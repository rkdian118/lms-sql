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
    Autocomplete
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
import { AddBranchApi } from 'store/slices/adminAction';
import { handleKeyBlock } from 'Helper/Validation';
import { countries } from 'Helper/CountriesData';
// import SuccessModel from './SuccessModel';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

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

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const AddBranchModels = (props) => {
    const theme = useTheme();
    const { open, close, AddBranchApi } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [successOpen, setSuccessOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loginLoading, setLoginLoading] = React.useState(true);

    const initialValues = {
        branch_name: '',
        country: null,
        state: '',
        city: '',
        address: '',
        pincode: ''
    };

    const validationSchema = Yup.object({
        branch_name: Yup.string()
            .required('Branch Name Field is Required')
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only alphabets are allowed with single space between words')
            .min(4, 'Branch Name must be at least 4 characters')
            .max(16, 'Branch Name must be at most 16 characters'),
        country: Yup.mixed().required('Country Field is Required'),
        state: Yup.string()
            .required('State Field is Required')
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only alphabets are allowed with single space between words')
            .min(4, 'State must be at least 4 characters')
            .max(16, 'State must be at most 16 characters'),
        city: Yup.string()
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only alphabets are allowed with single space between words')
            .required('City Field is Required')
            .min(4, 'City must be at least 4 characters')
            .max(16, 'City must be at most 16 characters'),
        address: Yup.string()
            .required('Address Field is Required')
            .min(4, 'Address must be at least 4 characters')
            .max(150, 'Address must be at most 150 characters'),
        pincode: Yup.string()
            .required('Pincode Field is Required')
            .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
            .min(6, 'Pincode must be exactly 6 digits')
            .max(6, 'Pincode must be exactly 6 digits')
    });

    // const onSubmit = (values) => {
    //     setSuccessOpen(true);
    // };
    const onSubmit = (values, { setSubmitting }) => {
        setLoginLoading(true);
        const newData = {
            branch_name: values.branch_name,
            country: values?.country?.label,
            state: values.state,
            city: values.city,
            address: values.address,
            pincode: values.pincode
        };

        setLoader(true);
        AddBranchApi(newData)
            .then((res) => {
                setLoginLoading(false);
                if (res.succeeded === true) {
                    close();
                    setLoader(false);
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
                setSubmitting(false);
            });
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleClose = () => {
        // dispatch(openPopupModel({ openItemKey: '', modalState: false }));
        close();
    };

    const handleCountryChange = (event, newValue) => {
        formik.setFieldValue('country', newValue); // Set the value of the 'country' field in Formik
    };

    // console.log('🚀 formik:', formik.values);
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
                        maxWidth: '700px',
                        padding: '0px'
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{ background: '#e0f4ff' }}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em', color: '#468ccc' }} align="center">
                        Add Branch
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        // background: '16px',
                        scrollbarWidth: 'thin' /* For Firefox */,
                        scrollbarColor: '#ff0000 #f1f1f1'
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
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Branch Name<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            // ref={fileRef}
                                            fullWidth
                                            placeholder="Enter Branch Name"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="branch_name"
                                            value={formik.values.branch_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.branch_name && Boolean(formik.errors.branch_name)}
                                            helperText={formik.touched.branch_name && formik.errors.branch_name}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Country<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        {/* <TextField
                                            // ref={fileRef}
                                            fullWidth
                                            placeholder="Enter Client Name"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="country"
                                            value={formik.values.country}
                                            onChange={formik.handleChange}
                                            error={formik.touched.country && Boolean(formik.errors.country)}
                                            helperText={formik.touched.country && formik.errors.country}
                                            onBlur={formik.handleBlur}
                                        /> */}
                                        <Autocomplete
                                            id="country-select-demo"
                                            options={countries}
                                            autoHighlight
                                            getOptionLabel={(option) => option.label}
                                            renderOption={(props, option) => (
                                                <li {...props} style={{ fontSize: 15 }}>
                                                    <span style={{ marginRight: 10, fontSize: 18 }}>{countryToFlag(option.code)}</span>
                                                    {option.label} (+{option.phone})
                                                </li>
                                            )}
                                            value={formik.values.country} // Set the value of Autocomplete from Formik
                                            onChange={handleCountryChange} // Handle changes and update Formik field value
                                            onBlur={formik.handleBlur}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Choose a country"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off' // disable autocomplete and autofill
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.country && Boolean(formik.errors.country)}
                                                    helperText={formik.touched.country && formik.errors.country}
                                                />
                                            )}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        />
                                    </Grid>{' '}
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            State<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            // ref={fileRef}
                                            fullWidth
                                            placeholder="Enter State Name"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="state"
                                            value={formik.values.state}
                                            onChange={formik.handleChange}
                                            error={formik.touched.state && Boolean(formik.errors.state)}
                                            helperText={formik.touched.state && formik.errors.state}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            City<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            // ref={fileRef}
                                            fullWidth
                                            placeholder="Enter City Name"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="city"
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            error={formik.touched.city && Boolean(formik.errors.city)}
                                            helperText={formik.touched.city && formik.errors.city}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>{' '}
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Pincode<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            // ref={fileRef}
                                            fullWidth
                                            placeholder="Enter Pincode"
                                            type="number"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            onKeyDown={handleKeyBlock}
                                            name="pincode"
                                            value={formik.values.pincode}
                                            onChange={formik.handleChange}
                                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                                            helperText={formik.touched.pincode && formik.errors.pincode}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Address<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            // ref={fileRef}
                                            fullWidth
                                            placeholder="Enter Address"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            multiline
                                            rows={3}
                                            name="address"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address && Boolean(formik.errors.address)}
                                            helperText={formik.touched.address && formik.errors.address}
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
                                        sx={{
                                            pl: 2,
                                            background: '#3e7dc3',
                                            borderRadius: '10px',
                                            width: '20%',
                                            height: '35px',
                                            '&:hover': { color: '#000', backgroundColor: '#c6d9ff' }
                                        }}
                                    >
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
                        </Formik>
                    </DialogContent>
                </PerfectScrollbar>
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { AddBranchApi })(AddBranchModels);
