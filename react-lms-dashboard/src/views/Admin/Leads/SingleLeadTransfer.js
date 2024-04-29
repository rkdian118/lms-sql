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
import { GetAllLeadDropDownApi, TransferLeadApi } from 'store/slices/clusterAction';
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

const SingleLeadTransfer = ({ open, close, TransferLeadApi, rowData }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { leadSourceList, leadTypeList, requirementTypeList, preDefineNotesList } = useSelector((state) => state.masterAction);
    const { getSelectedBdLeadDropdown, getBdeDropdownList, getLeadDropdown } = useSelector((state) => state.clusterAction);
    const [typeData, setTypeData] = useState(0);
    const [successOpen, setSuccessOpen] = useState(false);
    const [valueLabel, setValueLabel] = React.useState('checked');

    const initialValues = {
        selectedOldBDE: '' || rowData?.bdData?.bd_id,
        selectedNewBDE: '',
        selectedLeads: '' || rowData?._id
    };

    const validationSchema = Yup.object({
        selectedOldBDE: Yup.string().required('Select From BDE Field is Required'),
        selectedNewBDE: Yup.string().required('Select To BDE Field is Required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            bd_id: values.selectedOldBDE,
            new_bd_id: values.selectedNewBDE,
            lead_ids: [values.selectedLeads]
        };

        TransferLeadApi(newData)
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
        const selectName = newValue ? newValue.name : '';
        formik.setFieldValue('selectedOldBDE', selectValue);
        // dispatch(GetAllLeadDropDownApi(selectValue));
    };

    const handleLeadChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        formik.setFieldValue('selectedLeads', selectValue);
    };

    const handleNewBdeChange = (e, newValue) => {
        const selectValue = newValue ? newValue._id : '';
        formik.setFieldValue('selectedNewBDE', selectValue);
    };
    console.log('🚀formik:', rowData);

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
                        Transfer Lead
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
                                            id="country-select-demo"
                                            options={getLeadDropdown}
                                            autoHighlight
                                            getOptionLabel={(option) => (option ? option.client_name : '')}
                                            value={getLeadDropdown.find((option) => option._id === formik.values.selectedLeads) || null}
                                            onChange={handleLeadChange}
                                            autoComplete="off"
                                            disabled
                                            renderInput={(params) => (
                                                <TextField
                                                    error={formik.touched.selectedLeads && Boolean(formik.errors.selectedLeads)}
                                                    helperText={formik.touched.selectedLeads && formik.errors.selectedLeads}
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
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={getBdeDropdownList}
                                            autoHighlight
                                            getOptionLabel={(option) => (option ? option.name : '')}
                                            renderOption={(props, option) => (
                                                <li {...props} style={{ fontSize: 13 }}>
                                                    <span style={{ marginRight: 2, fontWeight: 600 }}>{option.name} </span>(
                                                    {option.designation})
                                                </li>
                                            )}
                                            value={getBdeDropdownList.find((option) => option._id === formik.values.selectedOldBDE) || null}
                                            onChange={handleOldBdeChange}
                                            autoComplete="off"
                                            disabled
                                            renderInput={(params) => (
                                                <TextField
                                                    error={formik.touched.selectedOldBDE && Boolean(formik.errors.selectedOldBDE)}
                                                    helperText={formik.touched.selectedOldBDE && formik.errors.selectedOldBDE}
                                                    onBlur={formik.handleBlur}
                                                    {...params}
                                                    label="Select From BDE"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off' // disable autocomplete and autofill
                                                    }}
                                                    disabled
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={getBdeDropdownList}
                                            autoHighlight
                                            getOptionLabel={(option) => (option ? option.name : '')}
                                            renderOption={(props, option) => (
                                                <li {...props} style={{ fontSize: 13 }}>
                                                    <span style={{ marginRight: 2, fontWeight: 600 }}>{option.name} </span>(
                                                    {option.designation})
                                                </li>
                                            )}
                                            value={getBdeDropdownList.find((option) => option._id === formik.values.selectedNewBDE) || null}
                                            onChange={handleNewBdeChange}
                                            autoComplete="off"
                                            // disablePortal
                                            renderInput={(params) => (
                                                <TextField
                                                    error={formik.touched.selectedNewBDE && Boolean(formik.errors.selectedNewBDE)}
                                                    helperText={formik.touched.selectedNewBDE && formik.errors.selectedNewBDE}
                                                    onBlur={formik.handleBlur}
                                                    {...params}
                                                    label="Select To BDE"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off' // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
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

export default connect(null, { TransferLeadApi })(SingleLeadTransfer);
