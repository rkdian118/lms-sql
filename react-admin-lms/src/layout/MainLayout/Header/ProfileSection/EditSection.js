import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Chip,
    CircularProgress,
    ClickAwayListener,
    Divider,
    Drawer,
    FormControl,
    FormHelperText,
    Grid,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Popper,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// project imports
import Transitions from 'ui-component/extended/Transitions';
import PerfectScrollbar from 'react-perfect-scrollbar';
// assets
import PersonIcon from '@mui/icons-material/Person';
import TranslateTwoToneIcon from '@mui/icons-material/TranslateTwoTone';
import useConfig from 'hooks/useConfig';
import { gridSpacing } from 'store/constant';
import Layout from 'layout/Customization/Layout';
import PresetColor from 'layout/Customization/PresetColor';
import FontFamily from 'layout/Customization/FontFamily';
import BorderRadius from 'layout/Customization/BorderRadius';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
// import LogoutModel from 'views/dashboard/Default/Models/LogoutModel';
import { connect, useDispatch, useSelector } from 'react-redux';
import { openPopupModel } from 'store/slices/menu';
import LogoutModel from 'layout/MainLayout/Header/ProfileSection/LogoutModel';
import DemoPicture from 'assets/images/user.png';
import { IMAGES_FILE_SUPPORTED_FORMATS } from 'Helper/Validation';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ProfileAvatar from 'Helper/ProfileAvatar';
import { BASE_URL } from 'config';
import { openSnackbar } from 'store/slices/snackbar';
import { UpdateProfileApi, AdminDetailApi } from 'store/slices/adminAuth';
import { useNavigate } from 'react-router-dom';

import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import ChangePassword from './ChangePassword';
// ==============================|| LOCALIZATION ||============================== //

const EditProfile = ({ UpdateProfileApi, AdminDetailApi }) => {
    const { borderRadius, locale, onChangeLocale } = useConfig();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const fileRef = useRef(null);
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const newmenu = useSelector((state) => state.menu);
    const { adminDetails, adminRole, adminToken } = useSelector((state) => state.admin);
    const { openItemKey, modalState } = newmenu;

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [showProfile, setShowProfile] = useState('');
    const [getDesignation, setDesignation] = useState('');
    const [name, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isBooleanValue, setIsBooleanValue] = useState(true);
    const [isCheckFileType, setIsCheckFileType] = useState(true);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        setIsBooleanValue(true);
        dispatch(openPopupModel({ openItemKey: '', modalState: false }));
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
        setProfilePic(BASE_URL + adminDetails?.profile_pic);
        setShowProfile(BASE_URL + adminDetails?.profile_pic);
        setName(adminDetails?.name);
        setDesignation(adminDetails?.designation);
        setEmail(adminDetails?.email);
        setMobileNumber(adminDetails?.mobile);
    }, [open, successOpen, getDesignation, name, getEmail, mobileNumber, profilePic, adminDetails, showProfile]);

    const initialValues = {
        admin_name: adminDetails?.name,
        email: adminDetails?.email,
        mobile: adminDetails?.mobile,
        designation: adminDetails?.designation,
        profile_pic: ''
    };

    const profilePicValidationSchema = Yup.mixed()
        .test(
            'FILE_FORMAT',
            '(Note: Only JPEG, JPG, PNG, GIF image type allowed)',
            (value) => !value || IMAGES_FILE_SUPPORTED_FORMATS.includes(value?.type.toString())
        )
        .test('FILE_SIZE', 'Please select an image smaller than 10 MB', (value) => !value || value.size <= 1024 * 1024 * 10);

    const customEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;

    const validationSchema = Yup.object({
        admin_name: Yup.string()
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only alphabets are allowed with single space between words')
            .min(4, 'Full Name must be at least 4 characters')
            .max(16, 'Full Name must be at most 16 characters')
            .required('Full Name is required'),
        designation: Yup.string()
            .matches(/^[a-zA-Z\s]+$/, 'Only alphabet characters are allowed')
            .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, 'Only one space allowed between words')
            .min(2, 'Designation must be at least 2 characters')
            .max(30, 'Designation must be at most 30 characters')
            .required('Designation is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        // email: Yup.string()
        //     .required('Email is required')
        //     .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i, 'Invalid email format'),
        mobile: Yup.string()
            .matches(/^[0-9]+$/, 'Only numbers are allowed')
            .required('Mobile Number is required')
            .min(10, 'Enter the Valid Mobile Number')
            .max(15, 'Enter the Valid Mobile Number'),
        profile_pic: profilePicValidationSchema
    });

    const onSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('role_type', adminRole);
        formData.append('name', values.admin_name);
        formData.append('email', values.email);
        formData.append('mobile', values.mobile);
        formData.append('designation', values.designation);
        if (values.profile_pic) {
            formData.append('profile_pic', values.profile_pic);
        }

        setLoader(true);
        // console.log('formData', formData);
        UpdateProfileApi(formData)
            .then((res) => {
                // setLoginLoading(false);
                if (res.succeeded === true) {
                    setLoader(false);
                    setSubmitting(false);
                    setIsBooleanValue(true);
                    AdminDetailApi(adminToken, adminRole);
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
                    AdminDetailApi(adminToken, adminRole);
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleClickOpen = () => {
        // setSuccessOpen(!successOpen);
        dispatch(openPopupModel({ openItemKey: 'logoutModel', modalState: true }));
    };

    const handleChangePassword = () => {
        // setSuccessOpen(!successOpen);
        dispatch(openPopupModel({ openItemKey: 'passwordChange', modalState: true }));
    };

    const handleClick = () => {
        setIsBooleanValue(!isBooleanValue);
        formik.resetForm({
            values: {
                admin_name: adminDetails?.name,
                email: adminDetails?.email,
                mobile: adminDetails?.mobile,
                designation: adminDetails?.designation
            }
        });
        formik.setFieldTouched('profile_pic', false); // Set the touched state to false
        formik.setFieldValue('profile_pic', ''); // Reset the profile_pic value
        setShowProfile(BASE_URL + adminDetails?.profile_pic); // Update the show profile picture state
    };

    const onChangeFile = (event) => {
        formik.setFieldValue('profile_pic', event.currentTarget.files[0]); // Use event.currentTarget to get the selected file
        formik.setFieldTouched('profile_pic', true); // Trigger field touch to activate validation
        // console.log('🚀 formik:', IMAGES_FILE_SUPPORTED_FORMATS.includes(event.currentTarget.files[0].type));
        if (IMAGES_FILE_SUPPORTED_FORMATS.includes(event.currentTarget.files[0].type) === false) {
            setIsCheckFileType(false);
            formik.setFieldError('profile_pic', 'Invalid file format');
        } else {
            setIsCheckFileType(true);
            formik.setFieldError('profile_pic', ''); // Clear the error message
        }
    };

    // console.log('🚀 isCheckFileType:', isCheckFileType);
    // console.log('🚀 successOpen:', successOpen);

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    [theme.breakpoints.down('md')]: {
                        ml: 1
                    }
                }}
            >
                <Chip
                    sx={{
                        height: '48px',
                        alignItems: 'center',
                        borderRadius: '27px',
                        transition: 'all .2s ease-in-out',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        '&[aria-controls="menu-list-grow"], &:hover': {
                            borderColor: theme.palette.primary.main,
                            background: `${theme.palette.primary.main}!important`,
                            color: theme.palette.primary.light,
                            '& svg': {
                                stroke: theme.palette.primary.light
                            }
                        },
                        '& .MuiChip-label': {
                            lineHeight: 0
                        }
                    }}
                    icon={
                        <Avatar
                            src={BASE_URL + adminDetails?.profile_pic}
                            sx={{
                                ...theme.typography.mediumAvatar,
                                margin: '8px 0 8px 8px !important',
                                cursor: 'pointer'
                            }}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                            alt="user-account"
                        />
                    }
                    label={<PersonIcon stroke={1.5} size="24px" color={theme.palette.primary.main} />}
                    variant="outlined"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="primary"
                />
                {/* <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        color: theme.palette.primary.dark,
                        transition: 'all .2s ease-in-out',
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.primary.main,
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.light
                        }
                    }}
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    color="inherit"
                >
                    <PersonIcon sx={{ fontSize: '1.3rem' }} />
                </Avatar> */}
            </Box>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 565,
                        borderRadius: '10px'
                    }
                }}
            >
                {open && (
                    <PerfectScrollbar component="div">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h3"
                                    align="center"
                                    p="14px"
                                    color="#b276a8"
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#f9e0fa'
                                    }}
                                >
                                    User Profile
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                    <Button
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            // pl: 2,
                                            background: '#f9e0fa',
                                            color: '#b276a8',
                                            fontSize: '14px !important',
                                            mr: 2,
                                            width: '15%',
                                            height: '30px',
                                            '&:hover': { color: '#f9e0fa', backgroundColor: '#b276a8' }
                                        }}
                                        onClick={handleClick}
                                    >
                                        {isBooleanValue === true ? 'Edit' : 'Cancel'}
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 0 } }}>
                                <Formik>
                                    <form noValidate onSubmit={formik.handleSubmit}>
                                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: '5px 0px' }}>
                                            <input
                                                ref={fileRef}
                                                type="file"
                                                accept={IMAGES_FILE_SUPPORTED_FORMATS.join(',')}
                                                name="profile_pic"
                                                onChange={(event) => {
                                                    onChangeFile(event);
                                                }}
                                                hidden
                                            />

                                            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {!isCheckFileType ? (
                                                    <Badge
                                                        overlap="circular"
                                                        badgeContent={
                                                            <Avatar
                                                                size="badge"
                                                                sx={{
                                                                    background: '#98528d',
                                                                    width: '30px',
                                                                    height: '30px',
                                                                    top: '90px',
                                                                    cursor: isBooleanValue === false ? 'pointer' : 'auto'
                                                                }}
                                                                onClick={() => {
                                                                    if (isBooleanValue === false) {
                                                                        fileRef.current.click();
                                                                    }
                                                                }}
                                                            >
                                                                <AddCircleOutlineIcon
                                                                    sx={{ color: '#f9e0fa', width: '30px', height: '30px', top: '90px' }}
                                                                />
                                                            </Avatar>
                                                        }
                                                    >
                                                        <Avatar
                                                            alt="User 1"
                                                            src={DemoPicture}
                                                            style={{
                                                                width: '130px',
                                                                height: '130px',
                                                                border: '3px solid #98528d'
                                                            }}
                                                            outline
                                                            color="success"
                                                        />
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        overlap="circular"
                                                        badgeContent={
                                                            <Avatar
                                                                size="badge"
                                                                sx={{
                                                                    background: '#98528d',
                                                                    width: '30px',
                                                                    height: '30px',
                                                                    top: '90px',
                                                                    cursor: isBooleanValue === false ? 'pointer' : 'auto'
                                                                }}
                                                                onClick={() => {
                                                                    if (isBooleanValue === false) {
                                                                        fileRef.current.click();
                                                                    }
                                                                }}
                                                            >
                                                                <AddCircleOutlineIcon
                                                                    sx={{ color: '#f9e0fa', width: '30px', height: '30px', top: '90px' }}
                                                                />
                                                            </Avatar>
                                                        }
                                                    >
                                                        {/* <>
                                                            {formik.values.profile_pic?.type ===
                                                            IMAGES_FILE_SUPPORTED_FORMATS.includes(formik.values.profile_pic?.type) ? (
                                                                <ProfileAvatar file={formik.values.profile_pic || profilePic} />
                                                            ) : (
                                                                <Avatar
                                                                    alt="User 1"
                                                                    src={showProfile || profilePic}
                                                                    style={{
                                                                        width: '130px',
                                                                        height: '130px',
                                                                        border: '3px solid #98528d'
                                                                    }}
                                                                    outline
                                                                    color="success"
                                                                />
                                                            )}
                                                        </> 
                                                        (formik.values.profile_pic && (
                                                            <ProfileAvatar file={formik.values.profile_pic || profilePic} />
                                                        )) 
                                                        
                                                        */}
                                                        {(formik.values.profile_pic && (
                                                            <ProfileAvatar file={formik.values.profile_pic || profilePic} />
                                                        )) ||
                                                            (showProfile && (
                                                                // <Grid>
                                                                <Avatar
                                                                    alt="User 1"
                                                                    src={showProfile || profilePic}
                                                                    style={{
                                                                        width: '130px',
                                                                        height: '130px',
                                                                        border: '3px solid #98528d'
                                                                    }}
                                                                    outline
                                                                    color="success"
                                                                />
                                                                // </Grid>
                                                            ))}
                                                    </Badge>
                                                )}
                                            </Grid>
                                            <Typography variant="h5" sx={{ width: '350px' }}>
                                                {formik.touched.profile_pic && formik.errors.profile_pic && (
                                                    <FormHelperText error>{formik.errors.profile_pic}</FormHelperText>
                                                )}
                                            </Typography>
                                        </Grid>
                                        <FormControl fullWidth sx={{ mb: 2, px: 6 }}>
                                            <Typography variant="h5" sx={{ width: '180px' }}>
                                                Full Name<span style={{ color: 'red' }}>*</span>
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="Enter Full Name"
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
                                                disabled={isBooleanValue}
                                            />
                                        </FormControl>{' '}
                                        <FormControl fullWidth sx={{ mb: 2, px: 6 }}>
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
                                                disabled={isBooleanValue}
                                            />
                                        </FormControl>{' '}
                                        <FormControl fullWidth sx={{ mb: 2, px: 6 }}>
                                            <Typography variant="h5" sx={{ width: '180px' }}>
                                                Email Address<span style={{ color: 'red' }}>*</span>
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
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                onBlur={formik.handleBlur}
                                                disabled={isBooleanValue}
                                            />
                                        </FormControl>{' '}
                                        <FormControl fullWidth sx={{ mb: 2, px: 6 }}>
                                            <Typography variant="h5" sx={{ width: '180px' }}>
                                                Mobile Number<span style={{ color: 'red' }}>*</span>
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                placeholder="Enter Mobile Number"
                                                type="text"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    marginBottom: '5px ',
                                                    marginTop: '5px '
                                                }}
                                                name="mobile"
                                                value={formik.values.mobile}
                                                onChange={formik.handleChange}
                                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                                helperText={formik.touched.mobile && formik.errors.mobile}
                                                onBlur={formik.handleBlur}
                                                disabled={isBooleanValue}
                                            />
                                        </FormControl>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                width: '100%'
                                            }}
                                        >
                                            {isBooleanValue === false ? (
                                                <Button
                                                    size="small"
                                                    type="submit"
                                                    variant="contained"
                                                    color="secondary"
                                                    disabled={formik.isSubmitting}
                                                    sx={{
                                                        pl: 2,
                                                        background: '#98528d',
                                                        fontSize: '18px !important',
                                                        // mr: 2,
                                                        width: '20%',
                                                        height: '35px',
                                                        '&:hover': { background: '#f9e0fa', color: '#b276a8' }
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
                                            ) : (
                                                <>
                                                    {/* {adminRole === 'Admin' || adminRole === 'Cluster' ? (
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            color="secondary"
                                                            sx={{
                                                                pl: 2,
                                                                mr: 2,
                                                                background: '#98528d',
                                                                fontSize: '18px !important',
                                                                // width: '20%',
                                                                height: '35px',
                                                                '&:hover': { background: '#f9e0fa', color: '#b276a8' }
                                                            }}
                                                            onClick={handleChangePassword}
                                                        >
                                                            Change Password
                                                        </Button>
                                                    ) : (
                                                        ''
                                                    )} */}
                                                    <Button
                                                        size="small"
                                                        // type="submit"
                                                        variant="contained"
                                                        color="secondary"
                                                        sx={{
                                                            pl: 2,
                                                            background: '#98528d',
                                                            fontSize: '18px !important',
                                                            width: '20%',
                                                            height: '35px',
                                                            '&:hover': { background: '#f9e0fa', color: '#b276a8' }
                                                        }}
                                                        onClick={handleClickOpen}
                                                    >
                                                        Logout
                                                    </Button>
                                                </>
                                            )}
                                        </Box>
                                    </form>
                                </Formik>
                            </Grid>

                            {/* <Grid item xs={12}>
                                <BorderRadius />
                            </Grid> */}
                        </Grid>
                    </PerfectScrollbar>
                )}
                {modalState && openItemKey === 'logoutModel' && <LogoutModel open={modalState} />}
                {modalState && openItemKey === 'passwordChange' && <ChangePassword open={modalState} />}
            </Drawer>
        </>
    );
};

export default connect(null, { UpdateProfileApi, AdminDetailApi })(EditProfile);
