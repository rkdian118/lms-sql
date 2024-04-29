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
    Autocomplete,
    FormControlLabel,
    RadioGroup,
    Radio
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
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { GetAllLeadDropDownApi, UploadLeadsDataApi } from 'store/slices/clusterAction';
// import SuccessModel from './SuccessModel';
// import DuplicateLeadModel from './DuplicateLeadModel';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

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

const UploadLeadModel = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { open, close, UploadLeadsDataApi } = props;
    const { leadSourceList, leadTypeList, requirementTypeList, preDefineNotesList } = useSelector((state) => state.masterAction);
    const { getSelectedBdLeadDropdown, getSelectedBDEDropdownList } = useSelector((state) => state.clusterAction);
    const [typeData, setTypeData] = useState(0);
    const [successOpen, setSuccessOpen] = useState(false);
    const [valueLabel, setValueLabel] = React.useState('checked');

    const initialValues = {
        excel_file: '',
        selected_bde: ''
    };

    const validationSchema = Yup.object({
        selected_bde: Yup.string().required('Select BDE Field is Required'),
        excel_file: Yup.mixed()
            .required('File is Required')
            .test('fileType', 'Only Excel files are allowed', (value) => {
                if (!value) return true; // allow empty values
                return (
                    value.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    //   value.type === "application/vnd.ms-excel";
                ); // validate file type
            })
        // selectedNewBDE: Yup.string().required('Select To BDE Field is Required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('leads', values.excel_file);
        formData.append('bd_id', values.selected_bde);

        UploadLeadsDataApi(formData)
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
            .catch((err) => {
                setSubmitting(false);
            });
    };

    const handleClose = () => {
        close();
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleOldBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        // const selectName = newValue ? newValue.name : '';
        formik.setFieldValue('selected_bde', selectValue);
        // formik.setFieldValue('selectedOldBDEName', selectName);
        // dispatch(GetAllLeadDropDownApi(selectValue));
    };

    console.log('🚀formik:', formik.values);

    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                TransitionComponent={Transition}
                maxWidth="xl"
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '600px' } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Upload Leads
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        // background: '16px',
                        scrollbarWidth: 'thin' /* For Firefox */,
                        scrollbarColor: '#b2b3b3 #f1f1f1',
                        maxWidth: '100%'
                    }}
                >
                    <DialogContent dividers>
                        <Formik onSubmit={onSubmit}>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={getSelectedBDEDropdownList}
                                            autoHighlight
                                            getOptionLabel={(option) => (option ? option.name : '')}
                                            renderOption={(props, option) => (
                                                <li {...props} style={{ fontSize: 13 }}>
                                                    <span style={{ marginRight: 2, fontWeight: 600 }}>{option.name} </span>(
                                                    {option.designation})
                                                </li>
                                            )}
                                            value={
                                                getSelectedBDEDropdownList.find((option) => option._id === formik.values.selected_bde) ||
                                                null
                                            }
                                            onChange={handleOldBdeChange}
                                            autoComplete="off"
                                            // disablePortal
                                            renderInput={(params) => (
                                                <TextField
                                                    error={formik.touched.selected_bde && Boolean(formik.errors.selected_bde)}
                                                    helperText={formik.touched.selected_bde && formik.errors.selected_bde}
                                                    onBlur={formik.handleBlur}
                                                    {...params}
                                                    label="Select BDE"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off' // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            ref={fileRef}
                                            type="file"
                                            accept=".xlsx"
                                            name="excel_file"
                                            onChange={(event) => {
                                                formik.setFieldValue('excel_file', event.target.files[0]);
                                            }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        />
                                        <Typography variant="h6">(Note: Only Excel (xlsx) File allowed)</Typography>
                                        {formik.touched.excel_file && formik.errors.excel_file && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {formik.errors.excel_file}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                width: '100%',
                                                mt: 1
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
                                                        'Submit'
                                                    )}
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    </Grid>
                                </Grid>
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

export default connect(null, { UploadLeadsDataApi })(UploadLeadModel);
