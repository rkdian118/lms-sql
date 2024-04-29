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
    MenuItem
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
import { IMAGES_FILE_SUPPORTED_FORMATS, handleKeyBlock } from 'Helper/Validation';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ActiveBranchApi, SwitchClusterBranchApi, ClusterGetDetailsApi } from 'store/slices/adminAction';
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

const SwitchBranchModels = (props) => {
    const { open, close, clusterId, ClusterGetDetailsApi, ActiveBranchApi, SwitchClusterBranchApi } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const fileRef = useRef(null);

    const [currentBranchData, setCurrentBranchDara] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [branchData, setShowBranchData] = useState([]);

    useEffect(() => {
        ActiveBranchApi().then((res) => {
            setShowBranchData(res?.ResponseData ? res.ResponseData : []);
        });
        ClusterGetDetailsApi(clusterId).then((res) => {
            // console.log('🚀 res:', res);
            setCurrentBranchDara(res?.ResponseData?.branch_id ? res?.ResponseData?.branch_id : {});
        });
    }, []);

    // console.log('🚀 currentBranchData:', currentBranchData);
    const initialValues = {
        branch_id: currentBranchData?._id,
        new_branch: ''
    };
    const validationSchema = Yup.object({
        new_branch: Yup.string().required('New Branch Field is Required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        const formData = {
            cluster_id: clusterId,
            current_branch_id: values.branch_id,
            new_branch_id: values.new_branch
        };
        // console.log('🚀formData:', formData);

        SwitchClusterBranchApi(formData)
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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

    // console.log('formik', formik.values);

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
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    sx={{
                        background: '#e0f4ff'
                    }}
                >
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em', color: '#468ccc' }} align="center">
                        Cluster Switch Branch
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
                                            Current Branch
                                        </Typography>
                                        <Select
                                            fullWidth
                                            // labelId="category"
                                            // inputProps={{ 'aria-label': 'Without label' }}
                                            name="branch_id"
                                            value={formik.values.branch_id ? formik.values.branch_id : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.branch_id && Boolean(formik.errors.branch_id)}
                                            helperText={formik.touched.branch_id && formik.errors.branch_id}
                                            onBlur={formik.handleBlur}
                                            // displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            disabled
                                        >
                                            {!currentBranchData?._id ? (
                                                <MenuItem value="">Select Branch</MenuItem>
                                            ) : (
                                                <MenuItem value={currentBranchData?._id}>{currentBranchData?.branch_name}</MenuItem>
                                            )}
                                        </Select>
                                    </Grid>

                                    <Grid item xs={12} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            New Branch
                                        </Typography>
                                        <Select
                                            fullWidth
                                            // labelId="category"
                                            // inputProps={{ 'aria-label': 'Without label' }}
                                            name="new_branch"
                                            value={formik.values.new_branch ? formik.values.new_branch : ''}
                                            onChange={formik.handleChange}
                                            error={formik.touched.new_branch && Boolean(formik.errors.new_branch)}
                                            helperText={formik.touched.new_branch && formik.errors.new_branch}
                                            onBlur={formik.handleBlur}
                                            displayEmpty
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        >
                                            <MenuItem value="">Select Branch</MenuItem>
                                            {branchData?.map((list, i) => (
                                                <MenuItem value={list?.branch_id} key={i}>
                                                    {list?.branch_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.new_branch && formik.errors.new_branch && (
                                            <FormHelperText error>{formik.errors.new_branch}</FormHelperText>
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
                                            pl: 2,
                                            background: '#3e7dc3',
                                            borderRadius: '10px',
                                            width: '30%',
                                            height: '35px',
                                            '&:hover': { color: '#000', backgroundColor: '#c6d9ff' }
                                        }}
                                    >
                                        {formik.isSubmitting ? ( // Show loader when form is submitting
                                            <>
                                                <CircularProgress color="inherit" size={20} />
                                            </>
                                        ) : (
                                            'Branch Update'
                                        )}
                                    </Button>
                                    {/* <Button
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                        disabled={formik.isSubmitting}
                                        sx={{
                                            pl: 2,
                                            background: 'red',
                                            borderRadius: '10px',
                                            width: '30%',
                                            height: '35px',
                                            '&:hover': { color: '#000', backgroundColor: '#ff00007a' }
                                        }}
                                    >
                                        {formik.isSubmitting ? ( // Show loader when form is submitting
                                            <>
                                                <CircularProgress color="inherit" size={20} />
                                            </>
                                        ) : (
                                            'Remove Branch'
                                        )}
                                    </Button> */}
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

export default connect(null, { ActiveBranchApi, SwitchClusterBranchApi, ClusterGetDetailsApi })(SwitchBranchModels);
