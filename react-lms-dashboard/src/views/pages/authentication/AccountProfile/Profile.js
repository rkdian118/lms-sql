// material-ui
import { Avatar, Button, FormHelperText, Grid, Stack, TextField, Typography, Badge, CircularProgress, Autocomplete } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import Avatar1 from 'assets/images/users/avatar-1.png';
import { connect, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { BASE_URL } from 'config';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { IMAGES_FILE_SUPPORTED_FORMATS } from 'Helper/Validation';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';
import { AdminDetailApi, UpdateProfileApi } from 'store/slices/adminAuth';
import ProfileAvatar from 'Helper/ProfileAvatar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DemoPicture from 'assets/images/user.png';
import { countries } from 'Helper/CountriesData';
import { Box } from '@mui/system';
// ==============================|| PROFILE 3 - PROFILE ||============================== //
function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}
const Profile = ({ UpdateProfileApi, AdminDetailApi }) => {
    const { user } = useAuth();
    const anchorRef = useRef(null);
    const fileRef = useRef(null);
    const { openItemKey, modalState } = useSelector((state) => state.menu);
    const { adminDetails, adminRole, adminToken } = useSelector((state) => state.admin);
    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [profilePic, setProfilePic] = useState('');
    const [showProfile, setShowProfile] = useState('');
    const [getDesignation, setDesignation] = useState('');
    const [name, setName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [isBooleanValue, setIsBooleanValue] = useState(false);
    const [isCheckFileType, setIsCheckFileType] = useState(true);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        setIsBooleanValue(true);
        // dispatch(openPopupModel({ openItemKey: '', modalState: false }));
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
        setCountryCode(adminDetails?.country_code);
    }, [open, successOpen, getDesignation, name, getEmail, countryCode, mobileNumber, profilePic, adminDetails, showProfile]);

    // console.log(
    //     'object',
    //     countries.find((country) => country.phone === adminDetails?.country_code)
    // );

    const initialValues = {
        admin_name: adminDetails?.name,
        email: adminDetails?.email,
        mobile: adminDetails?.mobile,
        designation: adminDetails?.designation,
        profile_pic: '',
        selectedCountryCode: null || countries.find((country) => country.phone === adminDetails?.country_code)
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
            .min(6, 'Enter the Valid Mobile Number')
            .max(16, 'Enter the Valid Mobile Number'),
        profile_pic: profilePicValidationSchema
    });

    const onSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('role_type', adminRole);
        formData.append('name', values.admin_name);
        formData.append('email', values.email);
        formData.append('mobile', values.mobile);
        formData.append('designation', values.designation);
        formData.append('country_code', values?.selectedCountryCode?.phone);
        if (values.profile_pic) {
            formData.append('profile_pic', values.profile_pic);
        }

        // setLoader(true);
        // console.log('formData', formData);
        UpdateProfileApi(formData)
            .then((res) => {
                // setLoginLoading(false);
                if (res.succeeded === true) {
                    // setLoader(false);
                    setSubmitting(false);
                    // setIsBooleanValue(true);
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
                    // setLoader(false);
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

    const handleClick = () => {
        // setIsBooleanValue(!isBooleanValue);
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

    const handleCountryChange = (event, newValue) => {
        formik.setFieldValue('selectedCountryCode', newValue); // Set the value of the 'country' field in Formik
    };
    // console.log('🚀 formik:', formik.values);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={4}>
                <SubCard title="Profile Picture" contentSX={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12}>
                            <Avatar
                                alt="User 1"
                                src={showProfile || profilePic}
                                sx={{ width: 150, height: 150, margin: '0 auto' }}
                                outline
                                color="success"
                            />
                        </Grid> */}
                        <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                            {!isCheckFileType ? (
                                <Avatar
                                    alt="User 1"
                                    src={DemoPicture}
                                    sx={{ width: 150, height: 150, margin: '0 auto' }}
                                    outline
                                    color="success"
                                />
                            ) : (
                                <>
                                    {(formik.values.profile_pic && <ProfileAvatar file={formik.values.profile_pic || profilePic} />) ||
                                        (showProfile && (
                                            // <Grid>
                                            <Avatar
                                                alt="User 1"
                                                src={showProfile || profilePic}
                                                sx={{ width: 150, height: 150, margin: '0 auto' }}
                                                outline
                                                color="success"
                                            />
                                            // </Grid>
                                        ))}
                                </>
                            )}
                        </Grid>
                        <Typography variant="h5" sx={{ width: '350px' }}>
                            {formik.touched.profile_pic && formik.errors.profile_pic && (
                                <FormHelperText error>{formik.errors.profile_pic}</FormHelperText>
                            )}
                        </Typography>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" align="center">
                                Upload/Change Your Profile Image
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                        if (isBooleanValue === false) {
                                            fileRef.current.click();
                                        }
                                    }}
                                >
                                    Upload Picture
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item sm={6} md={8}>
                <SubCard title="Update Account Details">
                    <Formik>
                        <form noValidate onSubmit={formik.handleSubmit}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-basic"
                                        fullWidth
                                        placeholder="Enter Full Name"
                                        // label="Name"
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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-basic"
                                        fullWidth
                                        placeholder="Enter Email Address"
                                        // label="Email Address"
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
                                </Grid>
                                <Grid item md={4} xs={12}>
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
                                <Grid item md={8} xs={12}>
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
                                        // label="Mobile Number"
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        id="outlined-basic"
                                        fullWidth
                                        placeholder="Designation"
                                        // label="Enter Designation"
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
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row">
                                        <AnimateButton>
                                            <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                                                {formik.isSubmitting ? (
                                                    <>
                                                        Update <CircularProgress color="inherit" size={20} />
                                                    </>
                                                ) : (
                                                    'Update'
                                                )}
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    </Formik>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default connect(null, { UpdateProfileApi, AdminDetailApi })(Profile);
