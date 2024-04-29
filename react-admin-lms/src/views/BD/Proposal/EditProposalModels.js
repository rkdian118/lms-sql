/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
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
    Autocomplete,
    Avatar,
    Select,
    MenuItem
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
// import SuccessModel from './SuccessModel';
// import DuplicateLeadModel from './DuplicateLeadModel';
import PreviewImage from 'Helper/PreviewPic';
import { FILE_SUPPORTED_FORMATS } from 'Helper/Validation';
import PlusIcon from 'assets/Icons/add-icon2.png';
import PlusGreenIcon from 'assets/Icons/plus2.png';
import PlusOrgIcon from 'assets/Icons/plus3.png';
import WordIcon from 'assets/Icons/word-icon.png';
import PDFIcon from 'assets/Icons/pdf-icon.png';
import ExcelIcon from 'assets/Icons/excel-icon.png';
import PPTIcon from 'assets/Icons/ppt-icon.png';
import { UpdateProposalApi } from 'store/slices/businessAction';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

const EditProposalModels = (props) => {
    const theme = useTheme();
    const { open, close, UpdateProposalApi, rowData } = props;
    const dispatch = useDispatch();
    const { proposalTypeList } = useSelector((state) => state.masterAction);
    const { getLeadDropdown } = useSelector((state) => state.businessAction);
    const fileRef = useRef(null);
    const fileRef2 = useRef(null);
    const fileRef3 = useRef(null);
    const fileRef4 = useRef(null);
    const [proposalCheck, setProposalCheck] = useState('');
    const [loader, setLoader] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
    const [leadId, setLeadId] = useState('');
    const top100Films = [
        { label: 'The Dark Knight', id: 1 },
        { label: 'Control with Control', id: 2 },
        { label: 'Combo with Solo', id: 3 },
        { label: 'The Dark', id: 4 },
        { label: 'Fight Club', id: 5 },
        { label: 'demo@company.com', id: 6 },
        { label: 'Pulp Fiction', id: 7 }
    ];

    const handleClose = () => {
        close();
    };

    const initialValues = {
        lead_id: '' || rowData?.leadData?._id,
        proposal_type: '',
        requirement_type: '' || rowData?.leadData?.reqTypeData?.status_name,
        comment_remark: '',
        project_name: '' || rowData?.project_name,
        upfront_amount: '' || rowData?.upfront_amount,
        project_amount: '' || rowData?.project_amount,
        proposal_submitted: '' || rowData?.proposal_submitted,
        man_hour: '' || rowData?.man_hour,
        timeline_days: '' || rowData?.timeline_days,
        add_proposal_docs: [],
        add_wbs_docs: [],
        add_wireframe_docs: [],
        other_docs: []
    };

    const validationSchema = Yup.object({
        lead_id: Yup.string().required('Lead Field is Required'),
        proposal_type: Yup.string().required('Proposal Type Field is Required'),
        comment_remark: Yup.string().required('Comment Remark Field is Required'),
        project_name: Yup.string().required('Project Name Field is Required'),
        upfront_amount: Yup.string().required('Upfront Amount Field is Required'),
        project_amount: Yup.string().required('Project Amount Field is Required'),
        proposal_submitted: Yup.string().required('Proposal Submitted Field is Required'),
        man_hour: Yup.string().required('Man Hour Field is Required'),
        timeline_days: Yup.string().required('Timeline Days Field is Required'),
        add_proposal_docs: Yup.array()
            .max(5, 'You can select up to 5 files')
            .test('FILES_SIZE', 'Please select files less than 10 MB', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => value.size <= 1024 * 1024 * 10);
            })
            .test('FILES_FORMAT', 'Please select valid formats', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => FILE_SUPPORTED_FORMATS.includes(value?.type));
            }),
        add_wbs_docs: Yup.array()
            .max(5, 'You can select up to 5 files')
            .test('FILES_SIZE', 'Please select files less than 10 MB', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => value.size <= 1024 * 1024 * 10);
            })
            .test('FILES_FORMAT', 'Please select valid formats', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => FILE_SUPPORTED_FORMATS.includes(value?.type));
            }),
        add_wireframe_docs: Yup.array()
            .max(5, 'You can select up to 5 files')
            .test('FILES_SIZE', 'Please select files less than 10 MB', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => value.size <= 1024 * 1024 * 10);
            })
            .test('FILES_FORMAT', 'Please select valid formats', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => FILE_SUPPORTED_FORMATS.includes(value?.type));
            }),
        other_docs: Yup.array()
            .max(5, 'You can select up to 5 files')
            .test('FILES_SIZE', 'Please select files less than 10 MB', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => value.size <= 1024 * 1024 * 10);
            })
            .test('FILES_FORMAT', 'Please select valid formats', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => FILE_SUPPORTED_FORMATS.includes(value?.type));
            })
    });

    const validate = (values) => {
        let errors = {};

        if (values.add_proposal_docs.length === 0 && values.add_wbs_docs.length === 0 && values.add_wireframe_docs.length === 0) {
            errors.other_docs = 'Upload Atleast One Document';
        }

        if (values.requirement_type === 'App' && proposalCheck === 'Detailed Proposal') {
            console.log('check');
            errors.add_proposal_docs = 'Proposal Field is Required';
            errors.add_wbs_docs = 'WBS Field is Required';
            errors.add_wireframe_docs = 'Wireframes Field is Required';
            delete errors.other_docs;
        }
        if (values.add_proposal_docs.length > 0) {
            delete errors.add_proposal_docs;
        }
        if (values.add_wbs_docs.length > 0) {
            delete errors.add_wbs_docs;
        }
        if (values.add_wireframe_docs.length > 0) {
            delete errors.add_wireframe_docs;
        }

        if (values.other_docs.length > 0) {
            delete errors.other_docs;
        }
        return errors;
    };

    // const validate = (values) => {
    //     let errors = {};

    //     if (values.add_proposal_docs.length === 0 && values.add_wbs_docs.length === 0 && values.add_wireframe_docs.length === 0) {
    //         errors.other_docs = 'Upload Atleast One Document';
    //     }
    //     if (values.other_docs.length > 0) {
    //         delete errors.other_docs;
    //     }

    //     return errors;
    // };

    const onSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('lead_id', values.lead_id);
        formData.append('proposal_type_id', values.proposal_type);
        formData.append('comment_remark', values.comment_remark);
        formData.append('project_name', values.project_name);
        formData.append('upfront_amount', values.upfront_amount);
        formData.append('project_amount', values.project_amount);
        formData.append('proposal_submitted', values.proposal_submitted);
        formData.append('man_hour', values.man_hour);
        formData.append('timeline_days', values.timeline_days);
        for (let i = 0; i < values.add_proposal_docs.length; i++) {
            const element = values.add_proposal_docs[i];
            formData.append('proposal', element);
        }
        for (let i = 0; i < values.add_wbs_docs.length; i++) {
            const element = values.add_wbs_docs[i];
            formData.append('wbs', element);
        }
        for (let i = 0; i < values.add_wireframe_docs.length; i++) {
            const element = values.add_wireframe_docs[i];
            formData.append('wireframe', element);
        }
        for (let i = 0; i < values.other_docs.length; i++) {
            const element = values.other_docs[i];
            formData.append('other_doc', element);
        }
        // console.log('formData', formData);
        UpdateProposalApi(formData)
            .then((res) => {
                // setLoginLoading(false);
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
                    close();
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
        initialValues,
        validationSchema,
        validate,
        onSubmit
    });

    const handleLeadChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        const selectType = newValue ? newValue.requirement_type : '';
        formik.setFieldValue('lead_id', selectValue);
        formik.setFieldValue('requirement_type', selectType);
    };

    const fileTypeIcons = {
        'application/pdf': PDFIcon,
        'application/msword': WordIcon,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': WordIcon,
        'application/vnd.ms-excel': ExcelIcon,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ExcelIcon,
        'application/vnd.ms-powerpoint': PPTIcon,
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': PPTIcon,
        'text/csv': ExcelIcon
    };

    console.log('formik', formik.values);
    console.log('formik', rowData);
    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                TransitionComponent={Transition}
                maxWidth="xl"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '700px'
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Edit Proposal
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
                                            Edit Proposal
                                        </Typography>
                                    </Button>
                                </Box>
                                <Divider sx={{ borderStyle: 'dashed', borderColor: '#000000', marginTop: '-20px', marginBottom: '40px' }} />
                                <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Autocomplete
                                            id="country-select-demo"
                                            options={getLeadDropdown}
                                            autoHighlight
                                            getOptionLabel={(option) => (option ? option.client_name : '')}
                                            value={getLeadDropdown.find((option) => option._id === formik.values.lead_id) || null}
                                            onChange={handleLeadChange}
                                            // disablePortal
                                            renderInput={(params) => (
                                                <TextField
                                                    error={formik.touched.lead_id && Boolean(formik.errors.lead_id)}
                                                    helperText={formik.touched.lead_id && formik.errors.lead_id}
                                                    onBlur={formik.handleBlur}
                                                    {...params}
                                                    label="Select Lead"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off' // disable autocomplete and autofill
                                                    }}
                                                    disabled
                                                />
                                            )}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Select
                                            fullWidth
                                            id="country-select-demo"
                                            name="proposal_type"
                                            value={formik.values.proposal_type ? formik.values.proposal_type : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.proposal_type && Boolean(formik.errors.proposal_type)}
                                            helperText={formik.touched.proposal_type && formik.errors.proposal_type}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="" onClick={() => setProposalCheck('')}>
                                                Select Proposal Type
                                            </MenuItem>
                                            {proposalTypeList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i} onClick={() => setProposalCheck(list?.status_name)}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.proposal_type && formik.errors.proposal_type && (
                                            <FormHelperText style={{ marginLeft: '15px' }} error>
                                                {formik.errors.proposal_type}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Project Name"
                                            name="project_name"
                                            value={formik.values.project_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.project_name && Boolean(formik.errors.project_name)}
                                            helperText={formik.touched.project_name && formik.errors.project_name}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Upfront Amount"
                                            name="upfront_amount"
                                            value={formik.values.upfront_amount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.upfront_amount && Boolean(formik.errors.upfront_amount)}
                                            helperText={formik.touched.upfront_amount && formik.errors.upfront_amount}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>{' '}
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Project Amount"
                                            name="project_amount"
                                            value={formik.values.project_amount}
                                            onChange={formik.handleChange}
                                            error={formik.touched.project_amount && Boolean(formik.errors.project_amount)}
                                            helperText={formik.touched.project_amount && formik.errors.project_amount}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>{' '}
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Select
                                            fullWidth
                                            name="proposal_submitted"
                                            value={formik.values.proposal_submitted ? formik.values.proposal_submitted : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.proposal_submitted && Boolean(formik.errors.proposal_submitted)}
                                            helperText={formik.touched.proposal_submitted && formik.errors.proposal_submitted}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Proposal Type</MenuItem>
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                        {formik.touched.proposal_submitted && formik.errors.proposal_submitted && (
                                            <FormHelperText style={{ marginLeft: '15px' }} error>
                                                {formik.errors.proposal_submitted}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Man Hour"
                                            name="man_hour"
                                            value={formik.values.man_hour}
                                            onChange={formik.handleChange}
                                            error={formik.touched.man_hour && Boolean(formik.errors.man_hour)}
                                            helperText={formik.touched.man_hour && formik.errors.man_hour}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Timeline Days"
                                            name="timeline_days"
                                            value={formik.values.timeline_days}
                                            onChange={formik.handleChange}
                                            error={formik.touched.timeline_days && Boolean(formik.errors.timeline_days)}
                                            helperText={formik.touched.timeline_days && formik.errors.timeline_days}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <FormControl fullWidth sx={{ mt: 1, pl: '20px', display: 'flex', alignItems: 'left' }}>
                                        <Typography variant="h5" align="" sx={{ fontSize: '1rem', color: '#3a5895' }}>
                                            Comment Remark
                                        </Typography>
                                    </FormControl>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            placeholder="Enter Description"
                                            name="comment_remark"
                                            value={formik.values.comment_remark}
                                            onChange={formik.handleChange}
                                            error={formik.touched.comment_remark && Boolean(formik.errors.comment_remark)}
                                            helperText={formik.touched.comment_remark && formik.errors.comment_remark}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Box
                                            sx={{
                                                p: '20px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                borderRadius: '5px',
                                                border: '2px dashed grey',
                                                width: '100%',
                                                height: 'auto'
                                            }}
                                        >
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                    <input
                                                        ref={fileRef}
                                                        type="file"
                                                        accept={FILE_SUPPORTED_FORMATS.join(',')}
                                                        name="add_proposal_docs"
                                                        // onChange={(event) => {
                                                        //     const filesArray = Array.from(event.target.files);
                                                        //     formik.setFieldValue('add_proposal_docs', filesArray);
                                                        // }}
                                                        onChange={(event) => {
                                                            const newFiles = Array.from(event.target.files);
                                                            formik.setFieldValue('add_proposal_docs', [
                                                                ...formik.values.add_proposal_docs,
                                                                ...newFiles
                                                            ]);
                                                        }}
                                                        multiple // Add this to accept multiple files
                                                        hidden
                                                    />
                                                    <Grid container spacing={2}>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            md={5}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                '&.MuiGrid-root': { pl: 0 }
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h5"
                                                                align="center"
                                                                sx={{ fontSize: '1rem', color: '#3a5895' }}
                                                            >
                                                                Add Proposal
                                                            </Typography>
                                                        </Grid>
                                                        {formik.values.add_proposal_docs.map((checktype, i) => (
                                                            <Grid
                                                                item
                                                                xs={1}
                                                                md={1}
                                                                sx={{ display: 'flex', '&.MuiGrid-root': { pl: 0, mr: 1 } }}
                                                                key={i}
                                                            >
                                                                {fileTypeIcons[checktype.type] && (
                                                                    <Avatar
                                                                        alt="pic"
                                                                        size="lg"
                                                                        src={fileTypeIcons[checktype.type]}
                                                                        sx={{
                                                                            mx: 1,
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '0px',
                                                                            background: 'transparent'
                                                                        }}
                                                                    />
                                                                )}
                                                                <IconButton
                                                                    size="medium"
                                                                    onClick={() => {
                                                                        const updatedFiles = [...formik.values.add_proposal_docs];
                                                                        updatedFiles.splice(i, 1); // Remove the file at index i
                                                                        formik.setFieldValue('add_proposal_docs', updatedFiles);
                                                                    }}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        right: '20px',
                                                                        top: '-15px',
                                                                        alignItems: 'flex-start',
                                                                        color: (theme) => theme.palette.error.main
                                                                    }}
                                                                >
                                                                    <DeleteOutlineIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        ))}
                                                        <Grid item xs={1} md={1} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                            <Avatar
                                                                alt="pic"
                                                                size="lg"
                                                                src={PlusIcon}
                                                                onClick={() => {
                                                                    fileRef.current.click();
                                                                }}
                                                                sx={{
                                                                    mx: 1,
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '0px',
                                                                    background: 'transparent',
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    {formik.errors.add_proposal_docs && (
                                                        <Typography
                                                            component="p"
                                                            variant="caption"
                                                            sx={{ color: 'red', padding: '0 40px' }}
                                                            className="invalid-text"
                                                        >
                                                            {formik.errors.add_proposal_docs}
                                                        </Typography>
                                                    )}
                                                </Grid>

                                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                    <input
                                                        ref={fileRef2}
                                                        type="file"
                                                        accept={FILE_SUPPORTED_FORMATS.join(',')}
                                                        name="add_wbs_docs"
                                                        // onChange={(event) => {
                                                        //     const filesArray = Array.from(event.target.files);
                                                        //     formik.setFieldValue('add_wbs_docs', filesArray);
                                                        // }}
                                                        onChange={(event) => {
                                                            const newFiles = Array.from(event.target.files);
                                                            formik.setFieldValue('add_wbs_docs', [
                                                                ...formik.values.add_wbs_docs,
                                                                ...newFiles
                                                            ]);
                                                        }}
                                                        multiple // Add this to accept multiple files
                                                        hidden
                                                    />
                                                    <Grid container spacing={2}>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            md={5}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                '&.MuiGrid-root': { pl: 0 }
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h5"
                                                                align="center"
                                                                sx={{ fontSize: '1rem', color: '#007732' }}
                                                            >
                                                                Add WBS
                                                            </Typography>
                                                        </Grid>
                                                        {formik.values.add_wbs_docs.map((checktype, i) => (
                                                            <Grid
                                                                item
                                                                xs={1}
                                                                md={1}
                                                                sx={{ display: 'flex', '&.MuiGrid-root': { pl: 0, mr: 1 } }}
                                                                key={i}
                                                            >
                                                                {fileTypeIcons[checktype.type] && (
                                                                    <Avatar
                                                                        alt="pic"
                                                                        size="lg"
                                                                        src={fileTypeIcons[checktype.type]}
                                                                        sx={{
                                                                            mx: 1,
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '0px',
                                                                            background: 'transparent'
                                                                        }}
                                                                    />
                                                                )}
                                                                <IconButton
                                                                    size="medium"
                                                                    onClick={() => {
                                                                        const updatedFiles = [...formik.values.add_wbs_docs];
                                                                        updatedFiles.splice(i, 1); // Remove the file at index i
                                                                        formik.setFieldValue('add_wbs_docs', updatedFiles);
                                                                    }}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        right: '20px',
                                                                        top: '-15px',
                                                                        alignItems: 'flex-start',
                                                                        color: (theme) => theme.palette.error.main
                                                                    }}
                                                                >
                                                                    <DeleteOutlineIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        ))}
                                                        <Grid item xs={1} md={1} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                            <Avatar
                                                                alt="pic"
                                                                size="lg"
                                                                src={PlusGreenIcon}
                                                                onClick={() => {
                                                                    fileRef2.current.click();
                                                                }}
                                                                sx={{
                                                                    mx: 1,
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '0px',
                                                                    background: 'transparent',
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    {formik.errors.add_wbs_docs && (
                                                        <Typography
                                                            component="p"
                                                            variant="caption"
                                                            sx={{ color: 'red', padding: '0 40px' }}
                                                            className="invalid-text"
                                                        >
                                                            {formik.errors.add_wbs_docs}
                                                        </Typography>
                                                    )}
                                                </Grid>

                                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                    <input
                                                        ref={fileRef3}
                                                        type="file"
                                                        accept={FILE_SUPPORTED_FORMATS.join(',')}
                                                        name="add_wireframe_docs"
                                                        // onChange={(event) => {
                                                        //     const filesArray = Array.from(event.target.files);
                                                        //     formik.setFieldValue('add_wireframe_docs', filesArray);
                                                        // }}
                                                        onChange={(event) => {
                                                            const newFiles = Array.from(event.target.files);
                                                            formik.setFieldValue('add_wireframe_docs', [
                                                                ...formik.values.add_wireframe_docs,
                                                                ...newFiles
                                                            ]);
                                                        }}
                                                        multiple // Add this to accept multiple files
                                                        hidden
                                                    />
                                                    <Grid container spacing={2}>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            md={5}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                '&.MuiGrid-root': { pl: 0 }
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h5"
                                                                align="center"
                                                                sx={{ fontSize: '1rem', color: '#FF964A' }}
                                                            >
                                                                Add Wireframes
                                                            </Typography>
                                                        </Grid>
                                                        {formik.values.add_wireframe_docs.map((checktype, i) => (
                                                            <Grid
                                                                item
                                                                xs={1}
                                                                md={1}
                                                                sx={{ display: 'flex', '&.MuiGrid-root': { pl: 0, mr: 1 } }}
                                                                key={i}
                                                            >
                                                                {' '}
                                                                {fileTypeIcons[checktype.type] && (
                                                                    <Avatar
                                                                        alt="pic"
                                                                        size="lg"
                                                                        src={fileTypeIcons[checktype.type]}
                                                                        sx={{
                                                                            mx: 1,
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '0px',
                                                                            background: 'transparent'
                                                                        }}
                                                                    />
                                                                )}
                                                                <IconButton
                                                                    size="medium"
                                                                    onClick={() => {
                                                                        const updatedFiles = [...formik.values.add_wireframe_docs];
                                                                        updatedFiles.splice(i, 1); // Remove the file at index i
                                                                        formik.setFieldValue('add_wireframe_docs', updatedFiles);
                                                                    }}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        right: '20px',
                                                                        top: '-15px',
                                                                        alignItems: 'flex-start',
                                                                        color: (theme) => theme.palette.error.main
                                                                    }}
                                                                >
                                                                    <DeleteOutlineIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        ))}
                                                        <Grid item xs={1} md={1} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                            <Avatar
                                                                alt="pic"
                                                                size="lg"
                                                                src={PlusOrgIcon}
                                                                onClick={() => {
                                                                    fileRef3.current.click();
                                                                }}
                                                                sx={{
                                                                    mx: 1,
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '0px',
                                                                    background: 'transparent',
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    {formik.errors.add_wireframe_docs && (
                                                        <Typography
                                                            component="p"
                                                            variant="caption"
                                                            sx={{ color: 'red', padding: '0 40px' }}
                                                            className="invalid-text"
                                                        >
                                                            {formik.errors.add_wireframe_docs}
                                                        </Typography>
                                                    )}
                                                </Grid>

                                                <Grid item xs={12} md={12} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                    <input
                                                        ref={fileRef4}
                                                        type="file"
                                                        accept={FILE_SUPPORTED_FORMATS.join(',')}
                                                        name="other_docs"
                                                        // onChange={(event) => {
                                                        //     const filesArray = Array.from(event.target.files);
                                                        //     formik.setFieldValue('other_docs', filesArray);
                                                        // }}
                                                        onChange={(event) => {
                                                            const newFiles = Array.from(event.target.files);
                                                            formik.setFieldValue('other_docs', [...formik.values.other_docs, ...newFiles]);
                                                        }}
                                                        multiple // Add this to accept multiple files
                                                        hidden
                                                    />
                                                    <Grid container spacing={2}>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            md={5}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                '&.MuiGrid-root': { pl: 0 }
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="h5"
                                                                align="center"
                                                                sx={{ fontSize: '1rem', color: '#FF964A' }}
                                                            >
                                                                Other Docs
                                                            </Typography>
                                                        </Grid>
                                                        {formik.values.other_docs.map((checktype, i) => (
                                                            <Grid
                                                                item
                                                                xs={1}
                                                                md={1}
                                                                sx={{ display: 'flex', '&.MuiGrid-root': { pl: 0, mr: 1 } }}
                                                                key={i}
                                                            >
                                                                {fileTypeIcons[checktype.type] && (
                                                                    <Avatar
                                                                        alt="pic"
                                                                        size="lg"
                                                                        src={fileTypeIcons[checktype.type]}
                                                                        sx={{
                                                                            mx: 1,
                                                                            width: '40px',
                                                                            height: '40px',
                                                                            borderRadius: '0px',
                                                                            background: 'transparent'
                                                                        }}
                                                                    />
                                                                )}
                                                                <IconButton
                                                                    size="medium"
                                                                    onClick={() => {
                                                                        const updatedFiles = [...formik.values.other_docs];
                                                                        updatedFiles.splice(i, 1); // Remove the file at index i
                                                                        formik.setFieldValue('other_docs', updatedFiles);
                                                                    }}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        right: '20px',
                                                                        top: '-15px',
                                                                        alignItems: 'flex-start',
                                                                        color: (theme) => theme.palette.error.main
                                                                    }}
                                                                >
                                                                    <DeleteOutlineIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        ))}
                                                        <Grid item xs={1} md={1} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                            <Avatar
                                                                alt="pic"
                                                                size="lg"
                                                                src={PlusOrgIcon}
                                                                onClick={() => {
                                                                    fileRef4.current.click();
                                                                }}
                                                                sx={{
                                                                    mx: 1,
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    borderRadius: '0px',
                                                                    background: 'transparent',
                                                                    cursor: 'pointer'
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    {formik.errors.other_docs && (
                                                        <Typography
                                                            component="p"
                                                            variant="caption"
                                                            sx={{ color: 'red', padding: '0 40px' }}
                                                            className="invalid-text"
                                                        >
                                                            {formik.errors.other_docs}
                                                        </Typography>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Box>
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
                                            background: '#3a5895',
                                            '&:hover': { color: '#000', background: '#c6d9ff' }
                                        }}
                                    >
                                        {formik.isSubmitting ? ( // Show loader when form is submitting
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
                {/* {successOpen && <DuplicateLeadModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { UpdateProposalApi })(EditProposalModels);
