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
import { UpdateBranchLeadStatusApi } from 'store/slices/clusterAction';
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

const UpdateLeadStatus = (props) => {
    const theme = useTheme();
    const { open, close, UpdateBranchLeadStatusApi, leadStatusId, projectStatusId, leadId } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { leadStatusList, projectionStatusList } = useSelector((state) => state.masterAction);
    console.log('🚀leadStatusList:', leadStatusList);
    const [openStatus, setOpenStatus] = React.useState(false);

    useEffect(() => {
        const findData = leadStatusList.find((data) => data._id === leadStatusId);
        if (findData?.status_name === 'Prospect') {
            setOpenStatus(true);
        } else {
            setOpenStatus(false);
        }
    }, []);

    const initialValues = {
        lead_status: '' || leadStatusId,
        projection_status: ''
    };

    const getValidationSchema = () => {
        let schema = Yup.object({
            lead_status: Yup.string().required('Status Field is Required')
        });

        if (openStatus === true) {
            schema = schema.shape({
                projection_status: Yup.string().required('Projection Status Field is Required')
            });
        }

        return schema;
    };

    const validationSchema = getValidationSchema();

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            lead_id: leadId,
            lead_status: values.lead_status,
            projection_status: values.projection_status
        };

        UpdateBranchLeadStatusApi(newData)
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

    const handleSelectChange = (event) => {
        const { value, name } = event.target;
        formik.setFieldValue('lead_status', value);
        const findData = leadStatusList.find((data) => data._id === value);

        // console.log("🚀 'Prospect':", findData);

        if (findData.status_name === 'Prospect') {
            setOpenStatus(true);
        } else {
            setOpenStatus(false);
        }
        // You can perform any additional logic here if needed
    };
    // console.log('🚀formik:', formik.values);

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
                        Lead Status Update
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
                    <DialogContent dividers sx={{ px: 0 }}>
                        <Formik onSubmit={onSubmit}>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <Grid container spacing={0} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Status<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            fullWidth
                                            name="lead_status"
                                            value={formik.values.lead_status ? formik.values.lead_status : ''}
                                            // onChange={formik.handleChange}
                                            onChange={handleSelectChange}
                                            error={formik.touched.lead_status && Boolean(formik.errors.lead_status)}
                                            helperText={formik.touched.lead_status && formik.errors.lead_status}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Status</MenuItem>
                                            {leadStatusList?.map((list, i) => (
                                                <MenuItem value={list?._id} key={i}>
                                                    {list?.status_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.lead_status && formik.errors.lead_status && (
                                            <FormHelperText error>{formik.errors.lead_status}</FormHelperText>
                                        )}
                                    </Grid>
                                    {openStatus ? (
                                        <Grid item xs={12} sx={{ mt: 1, alignItems: 'left' }}>
                                            <Typography variant="h5" sx={{ width: '180px' }}>
                                                Projection Status<span style={{ color: 'red' }}>*</span>
                                            </Typography>
                                            <Select
                                                fullWidth
                                                name="projection_status"
                                                value={formik.values.projection_status ? formik.values.projection_status : ''}
                                                onChange={formik.handleChange}
                                                error={formik.touched.projection_status && Boolean(formik.errors.projection_status)}
                                                helperText={formik.touched.projection_status && formik.errors.projection_status}
                                                onBlur={formik.handleBlur}
                                                displayEmpty
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    marginBottom: '5px ',
                                                    marginTop: '5px '
                                                }}
                                            >
                                                <MenuItem value="">Select Status</MenuItem>
                                                {projectionStatusList?.map((list, i) => (
                                                    <MenuItem value={list?._id} key={i}>
                                                        {list?.status_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {formik.touched.projection_status && formik.errors.projection_status && (
                                                <FormHelperText error>{formik.errors.projection_status}</FormHelperText>
                                            )}
                                        </Grid>
                                    ) : (
                                        ''
                                    )}
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
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
                {/* {successOpen && <DuplicateLeadModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { UpdateBranchLeadStatusApi })(UpdateLeadStatus);
