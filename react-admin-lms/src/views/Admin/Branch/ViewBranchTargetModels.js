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
    InputAdornment,
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
import PerfectScrollbar from 'react-perfect-scrollbar';
import { openPopupModel } from 'store/slices/menu';
import { useTheme } from '@mui/system';
import PreviewImage from 'Helper/PreviewPic';
import { IMAGES_FILE_SUPPORTED_FORMATS, handleKeyBlock, months } from 'Helper/Validation';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UpdateTargetsApi } from 'store/slices/clusterAction';
// import SuccessModel from './SuccessModel';
import { format } from 'date-fns';

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

const BranchTargetModels = (props) => {
    const theme = useTheme();
    const { open, close, UpdateTargetsApi, totalTarget, branchId } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [targetData, setTargetData] = useState({
        targets: 300000,
        prev_month_target: 250000,
        total_target: 250000,
        completed_target: 250000,
        remaining_target: 250000,
        assigned_targets: 250000,
        month_start_date: '2023-09-15',
        // month_start_date: '2023-09-15T07:03:01.184Z',
        target_month: 'September',
        target_year: '2023'
    });

    const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'LLLL') || '');

    const initialValues = {
        target_total: totalTarget
    };

    const validationSchema = Yup.object({
        target_total: Yup.string().required('Targets Field is Required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const formData = {
            branch_id: branchId,
            targets: values.target_total
        };

        // UpdateTargetsApi(formData)
        //     .then((res) => {
        //         // console.log('🚀  res:', res);
        //         if (res.succeeded === true) {
        //             close();
        //             setLoader(false);
        //             setSubmitting(false);
        //             dispatch(
        //                 openSnackbar({
        //                     open: true,
        //                     message: res.ResponseMessage,
        //                     variant: 'alert',
        //                     alert: {
        //                         color: 'success'
        //                     },
        //                     transition: 'Fade',
        //                     anchorOrigin: { vertical: 'top', horizontal: 'right' }
        //                 })
        //             );
        //         } else {
        //             setLoader(false);
        //             setSubmitting(false);
        //             dispatch(
        //                 openSnackbar({
        //                     open: true,
        //                     message: res.ResponseMessage,
        //                     variant: 'alert',
        //                     alert: {
        //                         color: 'error'
        //                     },
        //                     transition: 'Fade',
        //                     anchorOrigin: { vertical: 'top', horizontal: 'right' }
        //                 })
        //             );
        //         }
        //     })
        //     .catch((err) => {
        //         setSubmitting(false);
        //     });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit
    });

    const handleClose = () => {
        close();
    };
    const handleMonthChange = (event, newValue) => {
        setSelectedMonth(newValue ? newValue.label : '');
    };

    // console.log('🚀 formik:', formik.errors);
    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                maxWidth="xl"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '700px',
                        padding: '0px',
                        top: '-110px'
                    }
                }}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    sx={{
                        background: '#e0f4ff'
                    }}
                >
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em', color: '#468ccc' }} align="center">
                        View Branch Targets On Monthly Based
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
                    <DialogContent dividers sx={{ px: 0 }}>
                        <Formik>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <Grid container spacing={1} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={9} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Autocomplete
                                            id="month-select"
                                            fullWidth
                                            options={months}
                                            getOptionLabel={(option) => option.label}
                                            value={{ label: selectedMonth }}
                                            onChange={handleMonthChange}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Month"
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'off' // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Button
                                            size="small"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            disabled={formik.isSubmitting}
                                            sx={{
                                                // pl: 2,
                                                p: '25px 30px',
                                                borderRadius: '10px',
                                                // width: '100%',
                                                color: '#468ccc',
                                                background: '#e0f4ff',
                                                height: '35px',
                                                fontSize: '1rem',
                                                '&:hover': { background: '#468ccc', color: '#e0f4ff' }
                                            }}
                                        >
                                            {formik.isSubmitting ? (
                                                <>
                                                    <CircularProgress color="inherit" size={20} />
                                                </>
                                            ) : (
                                                'Get Target'
                                            )}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Formik>

                        <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant="h4" color="primary" component="div" sx={{ mb: 0.625 }}>
                                    Month Start Date: &nbsp;
                                </Typography>{' '}
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'secondary.main',
                                        mb: 0.625
                                    }}
                                >
                                    {targetData?.month_start_date}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.625 }}>
                                    Target Month: &nbsp;
                                </Typography>
                                <Typography variant="h4" color="primary" component="div" sx={{ mb: 0.625 }}>
                                    {targetData?.target_month}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.625 }}>
                                    Target Year: &nbsp;
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 0.625,
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'secondary.main'
                                    }}
                                >
                                    {targetData?.target_year}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.625 }}>
                                    Target: &nbsp;
                                </Typography>
                                <Typography variant="h4" color="primary" component="div" sx={{ mb: 0.625 }}>
                                    {targetData?.targets}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.625 }}>
                                    Previous Month: &nbsp;
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 0.625,
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'secondary.main'
                                    }}
                                >
                                    {targetData?.prev_month_target}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.625 }}>
                                    Total Torget: &nbsp;
                                </Typography>
                                <Typography variant="h4" color="primary" component="div" sx={{ mb: 0.625 }}>
                                    {targetData?.total_target}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.625 }}>
                                    Completed Torget: &nbsp;
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 0.625,
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'secondary.main'
                                    }}
                                >
                                    {targetData?.completed_target}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.625 }}>
                                    Remaining Torget: &nbsp;
                                </Typography>
                                <Typography variant="h4" color="primary" component="div" sx={{ mb: 0.625 }}>
                                    {targetData?.remaining_target}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.625 }}>
                                    Assigned Torget: &nbsp;
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 0.625,
                                        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : 'secondary.main'
                                    }}
                                >
                                    {targetData?.assigned_targets}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </PerfectScrollbar>
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { UpdateTargetsApi })(BranchTargetModels);
