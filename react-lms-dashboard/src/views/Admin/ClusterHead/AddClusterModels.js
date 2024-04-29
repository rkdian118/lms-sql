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
import { IMAGES_FILE_SUPPORTED_FORMATS, handleKeyBlock } from 'Helper/Validation';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ActiveBranchApi, AddClusterApi } from 'store/slices/adminAction';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { countries } from 'Helper/CountriesData';
// import SuccessModel from './SuccessModel';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

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

const AddClusterModels = (props) => {
    const theme = useTheme();
    const { open, close, ActiveBranchApi, AddClusterApi } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [successOpen, setSuccessOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [showProfile, setShowProfile] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [branchData, setShowBranchData] = useState([]);

    useEffect(() => {
        ActiveBranchApi().then((res) => {
            setShowBranchData(res?.ResponseData ? res.ResponseData : []);
        });
    }, []);

    const initialValues = {
        emp_id: '',
        cluster_name: '',
        username: '',
        email: '',
        mobile: '',
        password: '',
        designation: '',
        profile_pic: '',
        branch_id: '',
        selectedCountryCode: null
    };

    const validationSchema = Yup.object({
        cluster_name: Yup.string()
            .required('Name Field is Required')
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only alphabets are allowed with single space between words')
            .min(4, 'Name must be at least 4 characters')
            .max(20, 'Name must be at most 20 characters'),
        username: Yup.string()
            .required('Username Field is Required')
            .matches(/^[a-zA-Z0-9_]+$/, 'Only alphabet characters, numbers, and _ are allowed')
            .min(5, 'Username must be at least 5 characters'),
        email: Yup.string().required('Email Field is Required').email('Invalid email format'),
        mobile: Yup.string()
            .required('Mobile Field is Required')
            .min(10, 'Enter the Valid Mobile Number')
            .max(15, 'Enter the Valid Mobile Number'),
        password: Yup.string()
            .required('Password Field is Required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .min(8, 'Password must be at least 8 characters'),
        designation: Yup.string()
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only alphabets are allowed with single space between words')
            .min(2, 'Designation must be at least 2 characters')
            .max(30, 'Designation must be at most 30 characters')
            .required('Designation is required'),
        emp_id: Yup.string()
            .required('Employee ID Field is Required')
            .min(3, 'Employee ID must be at least 3 digits')
            .max(4, 'Employee ID must be at most 4 characters long'),
        branch_id: Yup.string().required('Branch Field is Required'),
        profile_pic: Yup.mixed()
            .required('Profile Pic Field is Required')
            .test(
                'FILE_FORMAT',
                '(Note: Only JPEG, JPG, PNG, GIF image type allowed)',
                (value) => value && IMAGES_FILE_SUPPORTED_FORMATS.includes(value?.type.toString())
            )
            .test('FILE_SIZE', 'Please select an image smaller than 10 MB', (value) => !value || (value && value.size <= 1024 * 1024 * 10))
    });

    const onSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('name', values.cluster_name);
        formData.append('username', values.username.toLowerCase());
        formData.append('email', values.email);
        formData.append('mobile', values.mobile);
        formData.append('password', values.password);
        formData.append('designation', values.designation);
        formData.append('profile_pic', values.profile_pic);
        formData.append('branch_id', values.branch_id);
        formData.append('emp_id', `WM-${values.emp_id}`);
        formData.append('country_code', values?.selectedCountryCode?.phone);
        setLoader(true);
        // console.log('formData', formData);
        AddClusterApi(formData)
            .then((res) => {
                // setLoginLoading(false);
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    const handleCountryChange = (event, newValue) => {
        formik.setFieldValue('selectedCountryCode', newValue); // Set the value of the 'country' field in Formik
    };

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
                        maxWidth: '800px',
                        padding: '0px'
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }} align="center">
                        Add Cluster
                    </Typography>
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        // background: '16px',
                        scrollbarWidth: 'thin' /* For Firefox */,
                        scrollbarColor: '#b2b3b3 #f1f1f1'
                    }}
                >
                    <DialogContent dividers sx={{ px: 0 }}>
                        <Formik>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} sx={{ p: '10px 30px' }}>
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Name<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Name"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="cluster_name"
                                            value={formik.values.cluster_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.cluster_name && Boolean(formik.errors.cluster_name)}
                                            helperText={formik.touched.cluster_name && formik.errors.cluster_name}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>

                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Branch<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                fullWidth
                                                name="branch_id"
                                                value={formik.values.branch_id ? formik.values.branch_id : ''}
                                                onChange={formik.handleChange}
                                                error={formik.touched.branch_id && Boolean(formik.errors.branch_id)}
                                                helperText={formik.touched.branch_id && formik.errors.branch_id}
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
                                            {formik.touched.branch_id && formik.errors.branch_id && (
                                                <FormHelperText error>{formik.errors.branch_id}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Email<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Email"
                                            type="text"
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

                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Designation<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Designation"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="designation"
                                            value={formik.values.designation}
                                            onChange={formik.handleChange}
                                            error={formik.touched.designation && Boolean(formik.errors.designation)}
                                            helperText={formik.touched.designation && formik.errors.designation}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>

                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Username<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Username"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="username"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            error={formik.touched.username && Boolean(formik.errors.username)}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.username && formik.errors.username}
                                            inputProps={{ maxLength: 35 }}
                                        />
                                        {/* {formik.touched.username && formik.errors.username && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {formik.errors.username}
                                            </FormHelperText>
                                        )} */}
                                    </Grid>

                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Password<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <OutlinedInput
                                            fullWidth
                                            placeholder="Enter Password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            // label="Password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            inputProps={{ maxLength: 16 }}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            onBlur={formik.handleBlur}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                        />
                                        {formik.touched.password && formik.errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {formik.errors.password}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <Typography variant="h5" sx={{ width: '180px', mb: 0.5 }}>
                                            Country Code <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Autocomplete
                                            // id="country-select-demo"
                                            options={countries}
                                            autoHighlight
                                            getOptionLabel={(option) => option.phone}
                                            value={formik.values.selectedCountryCode} // Set the value of Autocomplete from Formik
                                            onChange={handleCountryChange} // Handle changes and update Formik field value
                                            onBlur={formik.handleBlur}
                                            renderOption={(props, option) => (
                                                <Box component="li" {...props} key={option.label}>
                                                    <img
                                                        loading="lazy"
                                                        width="20"
                                                        style={{ paddingRight: '5px' }}
                                                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                        // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                        alt="flag-pic"
                                                    />
                                                    {option.label} {option.phone}
                                                </Box>
                                            )}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Enter Country code"
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.selectedCountryCode && Boolean(formik.errors.selectedCountryCode)}
                                                    helperText={formik.touched.selectedCountryCode && formik.errors.selectedCountryCode}
                                                    inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-number' // disable autocomplete and autofill
                                                    }}
                                                />
                                            )}
                                        />
                                        <FormHelperText>Search By Country Code</FormHelperText>
                                    </Grid>

                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Mobile Number<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter Mobile Number"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="mobile"
                                            onKeyDown={handleKeyBlock}
                                            value={formik.values.mobile}
                                            onChange={formik.handleChange}
                                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                            helperText={formik.touched.mobile && formik.errors.mobile}
                                            onBlur={formik.handleBlur}
                                        />
                                    </Grid>

                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Employee ID<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <OutlinedInput
                                            placeholder="Enter Employee ID"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            inputProps={{ maxLength: 4, minLength: 3 }}
                                            name="emp_id"
                                            onKeyDown={handleKeyBlock}
                                            value={formik.values.emp_id}
                                            onChange={formik.handleChange}
                                            error={formik.touched.emp_id && Boolean(formik.errors.emp_id)}
                                            helperText={formik.touched.emp_id && formik.errors.emp_id}
                                            onBlur={formik.handleBlur}
                                            startAdornment={
                                                <>
                                                    <InputAdornment position="start">WM-</InputAdornment>
                                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                                </>
                                            }
                                        />
                                        {formik.touched.emp_id && formik.errors.emp_id && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {formik.errors.emp_id}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    {/* image upload */}
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Profile Pic<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <TextField
                                            ref={fileRef}
                                            id="outlined-basic"
                                            type="file"
                                            name="profile_pic"
                                            onChange={(event) => {
                                                formik.setFieldValue('profile_pic', event.target.files[0]);
                                            }}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            error={formik.touched.profile_pic && Boolean(formik.errors.profile_pic)}
                                            helperText={formik.touched.profile_pic && formik.errors.profile_pic}
                                            onBlur={formik.handleBlur}
                                            inputProps={{
                                                accept: IMAGES_FILE_SUPPORTED_FORMATS.join(',')
                                            }}
                                        />
                                        <FormHelperText>(Note: Only JPEG, JPG, PNG, GIF image type allowed)</FormHelperText>
                                        {/* <Typography variant="h6">(Note: Only JPEG, JPG, PNG, GIF image type allowed)</Typography> */}
                                    </Grid>

                                    {/* image show reflect */}
                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        {(formik.values.profile_pic && <PreviewImage file={formik.values.profile_pic || profilePic} />) ||
                                            (showProfile && (
                                                // <Grid>
                                                <img src={showProfile || profilePic} alt="preview" width="100px" height="100px" />
                                                // </Grid>
                                            ))}
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
                {/* {successOpen && <SuccessModel open={successOpen} />} */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { ActiveBranchApi, AddClusterApi })(AddClusterModels);
