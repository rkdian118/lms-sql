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
import { AddAdminApi } from 'store/slices/adminAction';
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

const AddAdminModels = (props) => {
    const theme = useTheme();
    const { open, close, AddAdminApi } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [successOpen, setSuccessOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [showProfile, setShowProfile] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [branchData, setShowBranchData] = useState([]);

    const initialValues = {
        emp_id: '',
        admin_name: '',
        username: '',
        email: '',
        mobile: '',
        password: '',
        designation: '',
        profile_pic: ''
    };

    const validationSchema = Yup.object({
        admin_name: Yup.string()
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only alphabets are allowed with single space between words')
            .max(16, 'Full Name must be at most 16 characters')
            .required('Full Name is required'),
        username: Yup.string()
            .required('Username Field is Required')
            .matches(/^[a-zA-Z0-9_]+$/, 'Only alphabet characters, numbers, and _ are allowed')
            .min(5, 'Username must be at least 5 characters'),
        email: Yup.string().required('Email Field is Required').email('Invalid email format'),
        mobile: Yup.string()
            .matches(/^[0-9]+$/, 'Only numbers are allowed')
            .required('Mobile Number is required')
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
        formData.append('name', values.admin_name);
        formData.append('username', values.username.toLowerCase());
        formData.append('email', values.email);
        formData.append('mobile', values.mobile);
        formData.append('password', values.password);
        formData.append('designation', values.designation);
        formData.append('profile_pic', values.profile_pic);
        formData.append('emp_id', `WM-${values.emp_id}`);

        setLoader(true);
        // console.log('formData', formData);
        AddAdminApi(formData)
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
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    sx={{
                        background: '#e0f4ff'
                    }}
                >
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em', color: '#468ccc' }} align="center">
                        Add Admin
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
                                            name="admin_name"
                                            value={formik.values.admin_name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.admin_name && Boolean(formik.errors.admin_name)}
                                            helperText={formik.touched.admin_name && formik.errors.admin_name}
                                            onBlur={formik.handleBlur}
                                        />
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

                                    <Grid item xs={6} sx={{ mb: 0, alignItems: 'left' }}>
                                        <Typography variant="h5" sx={{ width: '180px' }}>
                                            Employee ID<span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        {/* <TextField
                                            fullWidth
                                            placeholder="Enter Employee ID"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="emp_id"
                                            onKeyDown={handleKeyBlock}
                                            value={formik.values.emp_id}
                                            onChange={formik.handleChange}
                                            error={formik.touched.emp_id && Boolean(formik.errors.emp_id)}
                                            helperText={formik.touched.emp_id && formik.errors.emp_id}
                                            onBlur={formik.handleBlur}
                                        /> */}
                                        <OutlinedInput
                                            placeholder="Enter Employee ID"
                                            type="text"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                marginBottom: '5px ',
                                                marginTop: '5px '
                                            }}
                                            name="emp_id"
                                            inputProps={{ maxLength: 4, minLength: 3 }}
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
                                            width: '20%',
                                            height: '35px',
                                            '&:hover': { color: '#000', backgroundColor: '#c6d9ff' }
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
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { AddAdminApi })(AddAdminModels);
