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
import { AddFollowUpsCallApi } from 'store/slices/businessAction';
import AnimateButton from 'ui-component/extended/AnimateButton';
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

const UpdateFollowUpsCall = (props) => {
    const { open, close, AddFollowUpsCallApi, typesOfKey, leadId } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { leadStatusList } = useSelector((state) => state.masterAction);
    const [typeData, setTypeData] = useState(0 || typesOfKey);

    const initialValues = {
        lead_response: '' || typesOfKey,
        new_Comment: ''
    };

    const getValidationSchema = () => {
        let schema = Yup.object({
            lead_response: Yup.string().required('Follow-Ups Call Field is Required')
            // new_Comment: Yup.string().required('Comment Field is Required')
        });

        if (typeData === 1) {
            schema = schema.shape({
                new_Comment: Yup.string().required('Comment Field is Required')
            });
        }

        return schema;
    };

    const validationSchema = getValidationSchema();

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            lead_id: leadId,
            response: values.lead_response,
            comment: values.new_Comment
        };

        AddFollowUpsCallApi(newData)
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
        // dispatch(openPopupModel({ openItemKey: '', modalState: false }));
        close();
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleCountryChange = (event, newValue) => {
        formik.setFieldValue('country', newValue); // Set the value of the 'country' field in Formik
    };
    // console.log('🚀formik:', formik.errors);

    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                TransitionComponent={Transition}
                maxWidth="sm"
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '500px' } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Add Follow-Ups Calls
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#b2b3b3 #f1f1f1',
                        maxWidth: '100%'
                    }}
                >
                    <DialogContent dividers sx={{ px: 0 }}>
                        <Formik>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <Divider sx={{ borderStyle: 'dashed', borderColor: '#000000', marginTop: '-20px', marginBottom: '40px' }} />
                                <Grid container spacing={0} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Follow-Ups Call<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            name="lead_response"
                                            value={formik.values.lead_response ? formik.values.lead_response : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.lead_response && Boolean(formik.errors.lead_response)}
                                            helperText={formik.touched.lead_response && formik.errors.lead_response}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="" onClick={() => setTypeData(0)}>
                                                Select Response
                                            </MenuItem>
                                            <MenuItem value={1} onClick={() => setTypeData(1)}>
                                                Picked
                                            </MenuItem>
                                            <MenuItem value={2} onClick={() => setTypeData(2)}>
                                                Not Picked
                                            </MenuItem>
                                            <MenuItem value={3} onClick={() => setTypeData(3)}>
                                                Declined
                                            </MenuItem>
                                        </Select>
                                        {formik.touched.lead_response && formik.errors.lead_response && (
                                            <FormHelperText error>{formik.errors.lead_response}</FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Comment {typeData === 1 ? <span style={{ color: 'red' }}>*</span> : ''}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Comment"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="new_Comment"
                                            value={formik.values.new_Comment}
                                            onChange={formik.handleChange}
                                            error={formik.touched.new_Comment && Boolean(formik.errors.new_Comment)}
                                            helperText={formik.touched.new_Comment && formik.errors.new_Comment}
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
                            </form>
                        </Formik>
                    </DialogContent>
                </PerfectScrollbar>
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { AddFollowUpsCallApi })(UpdateFollowUpsCall);
