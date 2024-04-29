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
    MenuItem,
    Select
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
import { FILE_SUPPORTED_FORMATS, fileTypeIcons } from 'Helper/Validation';
import PlusIcon from 'assets/Icons/add-icon2.png';
import WordIcon from 'assets/Icons/word-icon.png';
import PDFIcon from 'assets/Icons/pdf-icon.png';
import ExcelIcon from 'assets/Icons/excel-icon.png';
import PPTIcon from 'assets/Icons/ppt-icon.png';
import { AddRfpRequestApi } from 'store/slices/businessAction';

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

const AddRfpModels = (props) => {
    const theme = useTheme();
    const { open, close, AddRfpRequestApi } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { rfpTypeList } = useSelector((state) => state.masterAction);
    const { getLeadDropdown } = useSelector((state) => state.businessAction);
    const [loader, setLoader] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

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
        // dispatch(openPopupModel({ openItemKey: '', modalState: false }));
        close();
    };

    const handleUploadButtonClick = () => {
        fileRef.current.click();
    };

    const initialValues = {
        lead_id: '',
        lead_rfp_type: '',
        minutes_of_meeting: '',
        docs_files: []
    };

    const validationSchema = Yup.object({
        lead_id: Yup.string().required('Lead Field is Required'),
        lead_rfp_type: Yup.string().required('Lead RFP Type Field is Required'),
        minutes_of_meeting: Yup.string().required('Minutes Of Meeting Field is Required'),
        docs_files: Yup.array()
            .nullable()
            .test('FILES_SIZE', 'Please select files less than 10 MB', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => value.size <= 1024 * 1024 * 10);
            })
            .test('FILES_FORMAT', 'Please select valid formats', (values) => {
                if (!values) return true; // allow empty values
                return values.every((value) => FILE_SUPPORTED_FORMATS.includes(value?.type));
            })
    });

    const onSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('lead_id', values.lead_id);
        formData.append('minutes_of_meeting', values.minutes_of_meeting);
        formData.append('rfp_type', values.lead_rfp_type);
        // if (values.docs_files) {
        //     formData.append('attachment', values.docs_files);
        // }
        for (let i = 0; i < values.docs_files.length; i++) {
            const element = values.docs_files[i];
            formData.append('attachment', element);
        }
        // console.log('formData', formData);
        AddRfpRequestApi(formData)
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
        onSubmit,
        validationSchema
    });

    const handleLeadChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        formik.setFieldValue('lead_id', selectValue);
    };

    // console.log('🚀 formik:', formik.values.docs_files);
    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                // aria-labelledby="customized-dialog-title"
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
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    // sx={{
                    //     py: '4px',
                    //     pl: '22px',
                    //     display: 'flex',
                    //     justifyContent: 'space-around',
                    //     alignItem: 'baseline'
                    // }}
                >
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Add RFP
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
                                            RFP Request
                                        </Typography>
                                    </Button>
                                </Box>
                                <Divider sx={{ borderStyle: 'dashed', borderColor: '#000000', marginTop: '-20px', marginBottom: '40px' }} />
                                <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        {/* <Typography variant="h5" sx={{ width: '180px' }}>
                                            Lead<span style={{ color: 'red' }}>*</span>
                                        </Typography> */}
                                        {/* <Select
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
                                        >
                                            <MenuItem value="">Select Lead</MenuItem>
                                            {getLeadDropdown?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {`${list?.client_name} (${list?.client_country})`}
                                                </MenuItem>
                                            ))}
                                        </Select> */}

                                        <Autocomplete
                                            options={getLeadDropdown}
                                            getOptionLabel={(option) => (option ? option.client_name : '')}
                                            value={getLeadDropdown.find((option) => option._id === formik.values.lead_id) || null}
                                            onChange={handleLeadChange}
                                            disablePortal
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
                                                    style={{
                                                        minWidth: '250px'
                                                    }}
                                                />
                                            )}
                                        />
                                        {/* {formik.touched.lead_id && formik.errors.lead_id && (
                                            <FormHelperText style={{ marginLeft: '15px' }} error>
                                                {formik.errors.lead_id}
                                            </FormHelperText>
                                        )} */}
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        {/* <Typography variant="h5" sx={{ width: '180px' }}>
                                            Lead RFP Type<span style={{ color: 'red' }}>*</span>
                                        </Typography> */}
                                        <Select
                                            fullWidth
                                            name="lead_rfp_type"
                                            value={formik.values.lead_rfp_type ? formik.values.lead_rfp_type : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.lead_rfp_type && Boolean(formik.errors.lead_rfp_type)}
                                            helperText={formik.touched.lead_rfp_type && formik.errors.lead_rfp_type}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Lead RFP Type</MenuItem>
                                            {rfpTypeList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.lead_rfp_type && formik.errors.lead_rfp_type && (
                                            <FormHelperText style={{ marginLeft: '15px' }} error>
                                                {formik.errors.lead_rfp_type}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <FormControl fullWidth sx={{ mt: 1, px: 6, display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            sx={{ marginTop: '15px', fontSize: '1rem', color: '#3a5895' }}
                                        >
                                            Add Mom
                                        </Typography>
                                    </FormControl>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            placeholder="Enter Description"
                                            name="minutes_of_meeting"
                                            value={formik.values.minutes_of_meeting}
                                            onChange={formik.handleChange}
                                            error={formik.touched.minutes_of_meeting && Boolean(formik.errors.minutes_of_meeting)}
                                            helperText={formik.touched.minutes_of_meeting && formik.errors.minutes_of_meeting}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>
                                    <FormControl fullWidth sx={{ mt: 1, px: 6, display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            sx={{ marginTop: '15px', fontSize: '1rem', color: '#3a5895' }}
                                        >
                                            Add Attachment
                                        </Typography>
                                    </FormControl>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept={FILE_SUPPORTED_FORMATS.join(',')}
                                            name="docs_files"
                                            // onChange={(event) => {
                                            //     const filesArray = Array.from(event.target.files);
                                            //     formik.setFieldValue('docs_files', filesArray);
                                            // }}
                                            onChange={(event) => {
                                                const newFiles = Array.from(event.target.files);
                                                formik.setFieldValue('docs_files', [...formik.values.docs_files, ...newFiles]);
                                            }}
                                            multiple // Add this to accept multiple files
                                            hidden
                                        />
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
                                            <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {formik.values.docs_files.map((checktype, i) => (
                                                    <Grid item xs={3} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                        {fileTypeIcons[checktype.type] && (
                                                            <Avatar
                                                                alt="pic"
                                                                size="lg"
                                                                src={fileTypeIcons[checktype.type]}
                                                                sx={{
                                                                    mx: 1,
                                                                    width: '90px',
                                                                    height: 'auto',
                                                                    borderRadius: '0px',
                                                                    background: 'transparent'
                                                                }}
                                                            />
                                                        )}
                                                        <IconButton
                                                            size="medium"
                                                            onClick={() => {
                                                                const updatedFiles = [...formik.values.docs_files];
                                                                updatedFiles.splice(i, 1); // Remove the file at index i
                                                                formik.setFieldValue('docs_files', updatedFiles);
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
                                                <Grid item xs={3} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Avatar
                                                        alt="pic"
                                                        size="lg"
                                                        src={PlusIcon}
                                                        onClick={handleUploadButtonClick}
                                                        sx={{
                                                            mx: 1,
                                                            width: '90px',
                                                            height: '90px',
                                                            borderRadius: '0px',
                                                            background: 'transparent',
                                                            cursor: 'pointer'
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {formik.errors.docs_files && (
                                            <Typography component="p" variant="caption" sx={{ color: 'red' }} className="invalid-text">
                                                {formik.errors.docs_files}
                                            </Typography>
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

export default connect(null, { AddRfpRequestApi })(AddRfpModels);
