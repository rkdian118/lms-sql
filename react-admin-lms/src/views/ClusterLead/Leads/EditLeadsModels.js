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
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
// import { excelDataImport } from './../../../store/slices/restroCatAction';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { styled, useTheme } from '@mui/material/styles';
import { openPopupModel } from 'store/slices/menu';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { countries } from 'Helper/CountriesData';
import { ClusterUpdateLeadApi } from 'store/slices/clusterLeadAction';
// import SuccessModel from './SuccessModel';
// import DuplicateLeadModel from './DuplicateLeadModel';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

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

const EditLeadsModels = (props) => {
    const theme = useTheme();
    const { open, close, ClusterUpdateLeadApi, rowData } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { leadSourceList, leadTypeList, requirementTypeList, preDefineNotesList } = useSelector((state) => state.masterAction);

    // console.log('🚀 rowData:', rowData);
    const [typeData, setTypeData] = useState(0);
    const [successOpen, setSuccessOpen] = useState(false);

    const initialValues = {
        requirement_type: '' || rowData?.reqTypeData?._id,
        lead_type: '' || rowData?.leadTypeData?._id,
        lead_source: '' || rowData?.leadSourceData?._id,
        client_name: '' || rowData?.client_name,
        company_name: '' || rowData?.company_name,
        skype_id: '' || rowData?.skype_id,
        predefine_note: '' || rowData?.preDefNotesData?._id,
        country: null || countries.find((country) => country.label === rowData?.client_country),
        contact_number: '' || rowData?.client_number,
        whatsapp_number: '' || rowData?.client_whatsapp_num,
        email: '' || rowData?.client_email,
        linkedin_url: '' || rowData?.client_linkedin,
        address: '' || rowData?.address,
        upwork_url: '' || rowData?.upwork_job_url,
        bid_url: '' || rowData?.bid_url,
        proposal_amount: '' || rowData?.proposal_amount,
        client_budget: '' || rowData?.client_budget,
        add_notes: '' || rowData?.add_notes
    };

    const getValidationSchema = () => {
        let schema = Yup.object({
            requirement_type: Yup.string().required('Requirement Type Field is Required'),
            lead_type: Yup.string().required('Lead Type Field is Required'),
            lead_source: Yup.string().required('Lead Source is Required'),
            // predefine_note: Yup.string().required('Add Note is Required'), // Custom error message for required
            client_name: Yup.string().required('Client Name is Required'),
            country: Yup.mixed().required('Country Field is Required') // Custom error message for required
            // contact_number: Yup.string().required('Contact Number is Required'), // Custom error message for required
            // whatsapp_number: Yup.string().required('WhatsApp Number is Required'), // Custom error message for required
            // address: Yup.string().required('Address Number is Required') // Custom error message for required
        });

        if (typeData === 1) {
            schema = schema.shape({
                email: Yup.string().email('Invalid email address').required('Email is Required')
            });
        } else if (typeData === 2) {
            schema = schema.shape({
                linkedin_url: Yup.string().url('Invalid URL format').required('LinkedIn URL is Required')
            });
        } else if (typeData === 3) {
            schema = schema.shape({
                upwork_url: Yup.string().url('Invalid URL format').required('Upwork Job URL is Required'),
                bid_url: Yup.string().url('Invalid URL format').required('Bid URL is Required'),
                proposal_amount: Yup.number().required('Proposal Amount is Required'),
                client_budget: Yup.number().required('Client Budget is Required')
            });
        }

        return schema;
    };

    const validationSchema = getValidationSchema();
    // const validationSchema = Yup.object({
    //     requirement_type: Yup.string().required('Requirement Type Field is Required'),
    //     lead_type: Yup.string().required('Lead Type Field is Required'),
    //     lead_source: Yup.string().required('Lead Source is Required'),
    //     client_name: Yup.string().required('Client Name is Required'),
    //     predefine_note: Yup.string().required('Add Note is Required'), // Custom error message for required
    //     country: Yup.string().required('Country is Required'), // Custom error message for required
    //     contact_number: Yup.string().required('Contact Number is Required'), // Custom error message for required
    //     whatsapp_number: Yup.string().required('WhatsApp Number is Required'), // Custom error message for required
    //     email: Yup.string().email('Invalid email address').required('Email is Required'), // Validate email format
    //     linkedin_url: Yup.string().url('Invalid URL format').required('LinkedIn URL is Required') // Validate URL format
    // });

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            lead_id: rowData._id,
            lead_req_type_id: values.requirement_type,
            lead_type_id: values.lead_type,
            lead_source_id: values.lead_source,
            pre_defined_note_id: values.predefine_note,
            client_name: values.client_name,
            company_name: values.company_name,
            client_number: values.contact_number,
            client_whatsapp_num: values.whatsapp_number,
            client_email: values.email,
            client_country: values?.country?.label,
            client_linkedin: values.linkedin_url,
            address: values.address,
            upwork_job_url: values.upwork_url,
            bid_url: values.bid_url,
            proposal_amount: values.proposal_amount,
            client_budget: values.client_budget,
            add_notes: values.add_notes
        };
        // console.log('🚀  newData:', newData);

        ClusterUpdateLeadApi(newData)
            .then((res) => {
                // console.log('🚀  res:', res);
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

    const handleCountryChange = (event, newValue) => {
        formik.setFieldValue('country', newValue); // Set the value of the 'country' field in Formik
    };
    // console.log('🚀formik:', formik.values);

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
                        Edit Lead
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        // background: '16px',
                        scrollbarWidth: 'thin' /* For Firefox */,
                        scrollbarColor: '#ff0000 #f1f1f1',
                        maxWidth: '100%'
                    }}
                >
                    <DialogContent dividers sx={{ px: 0 }}>
                        <Formik onSubmit={onSubmit}>
                            <form noValidate onSubmit={formik.handleSubmit}>
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
                                            Lead Information
                                        </Typography>
                                    </Button>
                                </Box>
                                <Divider sx={{ borderStyle: 'dashed', borderColor: '#000000', marginTop: '-20px', marginBottom: '40px' }} />
                                <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Requirement Type<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            name="requirement_type"
                                            value={formik.values.requirement_type ? formik.values.requirement_type : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.requirement_type && Boolean(formik.errors.requirement_type)}
                                            helperText={formik.touched.requirement_type && formik.errors.requirement_type}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Requirement Type</MenuItem>
                                            {requirementTypeList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.requirement_type && formik.errors.requirement_type && (
                                            <FormHelperText error>{formik.errors.requirement_type}</FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Lead Source<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            // disabled
                                            name="lead_source"
                                            value={formik.values.lead_source ? formik.values.lead_source : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.lead_source && Boolean(formik.errors.lead_source)}
                                            helperText={formik.touched.lead_source && formik.errors.lead_source}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Lead Source</MenuItem>
                                            {leadSourceList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.lead_source && formik.errors.lead_source && (
                                            <FormHelperText error>{formik.errors.lead_source}</FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Lead Type<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            // disabled
                                            name="lead_type"
                                            value={formik.values.lead_type ? formik.values.lead_type : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.lead_type && Boolean(formik.errors.lead_type)}
                                            helperText={formik.touched.lead_type && formik.errors.lead_type}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Lead Type</MenuItem>
                                            {leadTypeList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i} onClick={() => setTypeData(i + 1)}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.lead_type && formik.errors.lead_type && (
                                            <FormHelperText error>{formik.errors.lead_type}</FormHelperText>
                                        )}
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
                                            Client Information
                                        </Typography>
                                    </Button>
                                </Box>
                                <Divider sx={{ borderStyle: 'dashed', borderColor: '#000000', marginTop: '-20px', marginBottom: '40px' }} />
                                <Grid container spacing={1} sx={{ p: '10px 30px', justifyContent: 'center' }}>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Client Name<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Client Name"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="client_name"
                                            value={formik.values.client_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.client_name && Boolean(formik.errors.client_name)}
                                            helperText={formik.touched.client_name && formik.errors.client_name}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Company Name
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Company Name"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="company_name"
                                            value={formik.values.company_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                            helperText={formik.touched.company_name && formik.errors.company_name}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Contact Number
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Contact Number"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="contact_number"
                                            value={formik.values.contact_number}
                                            onChange={formik.handleChange}
                                            error={formik.touched.contact_number && Boolean(formik.errors.contact_number)}
                                            helperText={formik.touched.contact_number && formik.errors.contact_number}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            WhatsApp Number
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter WhatsApp Number"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="whatsapp_number"
                                            value={formik.values.whatsapp_number}
                                            onChange={formik.handleChange}
                                            error={formik.touched.whatsapp_number && Boolean(formik.errors.whatsapp_number)}
                                            helperText={formik.touched.whatsapp_number && formik.errors.whatsapp_number}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Predefine Note
                                        </Typography>
                                        <Select
                                            fullWidth
                                            name="predefine_note"
                                            value={formik.values.predefine_note ? formik.values.predefine_note : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.predefine_note && Boolean(formik.errors.predefine_note)}
                                            helperText={formik.touched.predefine_note && formik.errors.predefine_note}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Predefine Note</MenuItem>
                                            {preDefineNotesList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.predefine_note && formik.errors.predefine_note && (
                                            <FormHelperText error>{formik.errors.predefine_note}</FormHelperText>
                                        )}
                                    </Grid> */}
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Country<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        {/* <TextField
                                            fullWidth
                                            placeholder="Enter Country"
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
                                            // id="country-select-demo"
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
                                                    // label="Choose a country"
                                                    placeholder="Enter Country"
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
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Address
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Address"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="address"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            error={formik.touched.address && Boolean(formik.errors.address)}
                                            helperText={formik.touched.address && formik.errors.address}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Email
                                            {/* <span style={{ color: 'red' }}>*</span> */}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Email"
                                            type="email"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            LinkedIn URL
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter LinkedIn URL"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="linkedin_url"
                                            value={formik.values.linkedin_url}
                                            onChange={formik.handleChange}
                                            error={formik.touched.linkedin_url && Boolean(formik.errors.linkedin_url)}
                                            helperText={formik.touched.linkedin_url && formik.errors.linkedin_url}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Upwork URL
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Upwork URL"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="upwork_url"
                                            value={formik.values.upwork_url}
                                            onChange={formik.handleChange}
                                            error={formik.touched.upwork_url && Boolean(formik.errors.upwork_url)}
                                            helperText={formik.touched.upwork_url && formik.errors.upwork_url}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Bid URL
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Bid URL"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="bid_url"
                                            value={formik.values.bid_url}
                                            onChange={formik.handleChange}
                                            error={formik.touched.bid_url && Boolean(formik.errors.bid_url)}
                                            helperText={formik.touched.bid_url && formik.errors.bid_url}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Proposal Amount
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Proposal Amount"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="proposal_amount"
                                            value={formik.values.proposal_amount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.proposal_amount && Boolean(formik.errors.proposal_amount)}
                                            helperText={formik.touched.proposal_amount && formik.errors.proposal_amount}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Client Budget
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Client Budget"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="client_budget"
                                            value={formik.values.client_budget}
                                            onChange={formik.handleChange}
                                            error={formik.touched.linkedin_url && Boolean(formik.errors.client_budget)}
                                            helperText={formik.touched.client_budget && formik.errors.client_budget}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Add Notes
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Add Notes"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="add_notes"
                                            value={formik.values.add_notes}
                                            onChange={formik.handleChange}
                                            error={formik.touched.add_notes && Boolean(formik.errors.add_notes)}
                                            helperText={formik.touched.add_notes && formik.errors.add_notes}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Skype Id
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Skype Id"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="skype_id"
                                            value={formik.values.skype_id}
                                            onChange={formik.handleChange}
                                            error={formik.touched.skype_id && Boolean(formik.errors.skype_id)}
                                            helperText={formik.touched.skype_id && formik.errors.skype_id}
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
                                            width: '20%',
                                            height: '35px',
                                            pl: 2,
                                            background: '#3a5895',
                                            '&:hover': { color: '#000', background: '#c6d9ff' }
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
                {/* {successOpen && <DuplicateLeadModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { ClusterUpdateLeadApi })(EditLeadsModels);
