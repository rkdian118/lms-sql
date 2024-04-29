/* eslint-disable import/no-extraneous-dependencies */
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
    Avatar,
    CardContent,
    Card,
    Tabs,
    Tab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
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
// import path from 'path'; // Import the path module
import PlusIcon from 'assets/Icons/add-icon2.png';
import WordIcon from 'assets/Icons/word-icon.png';
import PDFIcon from 'assets/Icons/pdf-icon.png';
import ExcelIcon from 'assets/Icons/excel-icon.png';
import PPTIcon from 'assets/Icons/ppt-icon.png';
// import SuccessModel from './SuccessModel';
// import DuplicateLeadModel from './DuplicateLeadModel';
import { basename, extname } from 'path-browserify';
import { parse } from 'url';
import { BASE_URL } from 'config';
import moment from 'moment';
import { gridSpacing } from 'store/constant';
import useConfig from 'hooks/useConfig';
import { ActivityTabLoader } from 'ui-component/cards/Skeleton/ActivityTabLoader';
import MuiTooltip from '@mui/material/Tooltip';

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}
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

const ViewProposalModels = (props) => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const { open, close, rowData, activityId } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { rfpStatusTypeList } = useSelector((state) => state.masterAction);

    const newmenu = useSelector((state) => state.businessAction);
    const { getRfpLoading } = newmenu;
    const [commentData, setCommentData] = useState([]);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        if (rowData?.proposal?.length > 0) {
            setCommentData(rowData?.proposal[0]);
        }
    }, [rowData]);

    const initialValues = {
        rfp_status_id: '',
        new_Comment: ''
    };

    const validationSchema = Yup.object({
        rfp_status_id: Yup.string().required('Follow-Ups Field is Required'),
        new_Comment: Yup.string().required('Comment Field is Required')
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClose = () => {
        close();
    };

    // const handleUpdateStatus = () => {
    //     console.log('🚀 set upper data:');
    // };

    function getFileExtension(url) {
        const { pathname } = parse(url);
        const fileExtension = extname(pathname);
        return fileExtension;
    }

    function removeUniqueTimestampPrefix(path) {
        const parts = path?.split(/Z-/);
        return parts[1];
    }

    // console.log('commentData', commentData);
    return (
        <div>
            <BootstrapDialog
                open={open}
                // onClose={close}
                TransitionComponent={Transition}
                maxWidth="xl"
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '1000px' } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        View Proposal Document
                    </Typography>
                    {/* <Typography
                        variant="h6"
                        component="h6"
                        sx={{ pl: '10px', fontSize: '1em', cursor: 'pointer' }}
                        onClick={() => setUpdateActivityModel(true)}
                    >
                        <EditIcon color="primary" />
                    </Typography> */}
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
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: '0px' } }}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} lg={4} sx={{ height: '500px', overflow: 'auto' }}>
                                        <PerfectScrollbar
                                            component="div"
                                            style={{
                                                // background: '16px',
                                                scrollbarWidth: 'thin' /* For Firefox */,
                                                scrollbarColor: '#b2b3b3 #f1f1f1',
                                                maxWidth: '100%'
                                            }}
                                        >
                                            <CardContent sx={{ py: 2, pr: 0 }}>
                                                <Tabs
                                                    value={value}
                                                    onChange={handleChange}
                                                    orientation="vertical"
                                                    variant="scrollable"
                                                    sx={{
                                                        '& .MuiTabs-flexContainer': {
                                                            borderBottom: 'none'
                                                        },
                                                        '& button': {
                                                            color:
                                                                theme.palette.mode === 'dark'
                                                                    ? theme.palette.grey[600]
                                                                    : theme.palette.grey[600],
                                                            // minHeight: 'auto',
                                                            // minWidth: '100%',
                                                            // py: 1.5,
                                                            // pl: 2,
                                                            // display: 'flex',
                                                            // flexDirection: 'row',
                                                            // alignItems: 'flex-start',
                                                            // justifyContent: 'flex-start',
                                                            textAlign: 'left',
                                                            borderRadius: `${borderRadius}px`
                                                        },
                                                        '& button.Mui-selected': {
                                                            color: theme.palette.primary.main,
                                                            background:
                                                                theme.palette.mode === 'dark'
                                                                    ? theme.palette.dark.main
                                                                    : theme.palette.grey[50]
                                                        },
                                                        '& button > svg': {
                                                            marginBottom: '0px !important',
                                                            marginRight: 1.25,
                                                            marginTop: 1.25,
                                                            height: 20,
                                                            width: 20
                                                        },
                                                        '& button > div > span': {
                                                            display: 'block'
                                                        },
                                                        '& > div > span': {
                                                            display: 'none'
                                                        }
                                                    }}
                                                >
                                                    {rowData?.proposal?.length > 0 ? (
                                                        rowData?.proposal?.map((tab, index) => (
                                                            <Tab
                                                                key={index}
                                                                label={
                                                                    <Grid container direction="column">
                                                                        <Typography
                                                                            variant="subtitle1"
                                                                            color="inherit"
                                                                            sx={{
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'space-between',
                                                                                cursor: 'pointer'
                                                                            }}
                                                                        >
                                                                            {tab?.proposal_type_data?.status_name}
                                                                        </Typography>
                                                                        <Typography
                                                                            component="div"
                                                                            variant="caption"
                                                                            sx={{
                                                                                textTransform: 'capitalize',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'space-between',
                                                                                cursor: 'pointer'
                                                                            }}
                                                                        >
                                                                            <Typography component="div" variant="caption">
                                                                                {tab?.activity_data}
                                                                            </Typography>
                                                                            <Typography component="div" variant="caption">
                                                                                {moment(tab?.createdAt).format('DD MMM hh:mm a')}
                                                                            </Typography>
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                                {...a11yProps(index)}
                                                                sx={{ cursor: 'auto' }}
                                                                onLoad={() => setCommentData(tab)}
                                                                onClick={() => {
                                                                    setCommentData(tab);
                                                                    // setActivityId(tab._id);
                                                                }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <>
                                                            {getRfpLoading === true ? (
                                                                <ActivityTabLoader rows={5} tabRows={10} />
                                                            ) : (
                                                                <Tab
                                                                    label={
                                                                        <Grid container direction="column">
                                                                            <Typography variant="subtitle1" color="inherit">
                                                                                No Activity Found
                                                                            </Typography>
                                                                        </Grid>
                                                                    }
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </Tabs>
                                            </CardContent>
                                        </PerfectScrollbar>
                                    </Grid>
                                    <Grid item xs={12} lg={8} sx={{ '&.MuiGrid-root': { pl: '0px' }, height: '500px', overflow: 'auto' }}>
                                        <PerfectScrollbar
                                            component="div"
                                            style={{
                                                // background: '16px',
                                                scrollbarWidth: 'thin' /* For Firefox */,
                                                scrollbarColor: '#b2b3b3 #f1f1f1',
                                                maxWidth: '100%'
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    borderLeft: '1px solid',
                                                    borderColor:
                                                        theme.palette.mode === 'dark'
                                                            ? theme.palette.background.default
                                                            : theme.palette.grey[200],
                                                    height: '100%'
                                                }}
                                            >
                                                <TabPanel value={value} index={value}>
                                                    <Card
                                                        sx={{
                                                            display: 'inline-block',
                                                            bgcolor:
                                                                theme.palette.mode === 'dark' ? 'grey.600' : theme.palette.primary.light
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 2, pb: '16px !important', width: 'fit-content', ml: 'auto' }}>
                                                            <Grid container spacing={1}>
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignContent: 'center'
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        align="left"
                                                                        variant="subtitle2"
                                                                        color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                    >
                                                                        Comment Remark
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography
                                                                        variant="body2"
                                                                        color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                    >
                                                                        {commentData?.comment_remark}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignContent: 'center'
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        align="left"
                                                                        variant="subtitle2"
                                                                        color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                        sx={{ display: 'flex', alignItems: 'center' }}
                                                                    >
                                                                        {/* <PersonOutlineTwoToneIcon sx={{ width: '15px' }} /> */}
                                                                        {/* {tabcontent?.comment_by_name} */}
                                                                    </Typography>
                                                                    <Typography
                                                                        align="right"
                                                                        variant="subtitle2"
                                                                        color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                    >
                                                                        {/* {moment(commentData?.createdAt).format('Do MMM YYYY')} */}
                                                                        {moment(commentData?.createdAt).format('DD MMM YYYY hh:mm a')}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                    <br />
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        // sx={{ mt: 1 }}
                                                        sx={{ mt: 1, display: 'flex', justifyContent: 'space-evenly' }}
                                                    >
                                                        {commentData?.proposal?.length !== 0 ? (
                                                            <Grid item xs={12} lg={12}>
                                                                <Typography
                                                                    align="left"
                                                                    variant="subtitle2"
                                                                    color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                >
                                                                    Proposal
                                                                </Typography>
                                                            </Grid>
                                                        ) : (
                                                            ''
                                                        )}
                                                        {commentData?.proposal?.length > 0 ? (
                                                            <>
                                                                {commentData?.proposal?.map((checktype, i) => {
                                                                    const getExtension = getFileExtension(checktype);
                                                                    const getFileName = removeUniqueTimestampPrefix(checktype);
                                                                    // console.log('🚀 getFileExtension:', getFileExtension(checktype));
                                                                    // console.log('🚀 file:', removeUniqueTimestampPrefix(checktype));
                                                                    return (
                                                                        <Grid item xs={2} md={2} sx={{ px: 3 }}>
                                                                            {getExtension === '.pdf' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={PDFIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.doc' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={WordIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.docx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={WordIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.pptx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={PPTIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.xlsx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={ExcelIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.csv' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={ExcelIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            <Typography
                                                                                variant="subtitle1"
                                                                                color="inherit"
                                                                                sx={{ textAlign: 'center', fontSize: '12px' }}
                                                                            >
                                                                                <a
                                                                                    href={BASE_URL + checktype}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                >
                                                                                    {getFileName !== undefined
                                                                                        ? getFileName
                                                                                        : 'No File Name'}
                                                                                </a>
                                                                            </Typography>
                                                                        </Grid>
                                                                    );
                                                                })}
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        // sx={{ mt: 1 }}
                                                        sx={{ mt: 1, display: 'flex', justifyContent: 'space-evenly' }}
                                                    >
                                                        {commentData?.wireframe?.length !== 0 ? (
                                                            <Grid item xs={12} lg={12}>
                                                                <Typography
                                                                    align="left"
                                                                    variant="subtitle2"
                                                                    color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                >
                                                                    Wireframe
                                                                </Typography>
                                                            </Grid>
                                                        ) : (
                                                            ''
                                                        )}
                                                        {commentData?.wireframe?.length > 0 ? (
                                                            <>
                                                                {commentData?.wireframe?.map((checktype, i) => {
                                                                    const getExtension = getFileExtension(checktype);
                                                                    const getFileName = removeUniqueTimestampPrefix(checktype);
                                                                    // console.log('🚀 getFileExtension:', getFileExtension(checktype));
                                                                    // console.log('🚀 file:', removeUniqueTimestampPrefix(checktype));
                                                                    return (
                                                                        <Grid item xs={2} md={2} sx={{ px: 3 }}>
                                                                            {getExtension === '.pdf' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={PDFIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.docx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={WordIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.doc' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={WordIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.pptx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={PPTIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.xlsx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={ExcelIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.csv' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={ExcelIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            <Typography
                                                                                variant="subtitle1"
                                                                                color="inherit"
                                                                                sx={{ textAlign: 'center', fontSize: '12px' }}
                                                                            >
                                                                                <a
                                                                                    href={BASE_URL + checktype}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                >
                                                                                    {getFileName !== undefined
                                                                                        ? getFileName
                                                                                        : 'No File Name'}
                                                                                </a>
                                                                            </Typography>
                                                                        </Grid>
                                                                    );
                                                                })}
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        // sx={{ mt: 1 }}
                                                        sx={{ mt: 1, display: 'flex', justifyContent: 'space-evenly' }}
                                                    >
                                                        {commentData?.wbs?.length !== 0 ? (
                                                            <Grid item xs={12} lg={12}>
                                                                <Typography
                                                                    align="left"
                                                                    variant="subtitle2"
                                                                    color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                >
                                                                    WBS
                                                                </Typography>
                                                            </Grid>
                                                        ) : (
                                                            ''
                                                        )}
                                                        {commentData?.wbs?.length > 0 ? (
                                                            <>
                                                                {commentData?.wbs?.map((checktype, i) => {
                                                                    const getExtension = getFileExtension(checktype);
                                                                    const getFileName = removeUniqueTimestampPrefix(checktype);
                                                                    // console.log('🚀 getFileExtension:', getFileExtension(checktype));
                                                                    // console.log('🚀 file:', removeUniqueTimestampPrefix(checktype));
                                                                    return (
                                                                        <Grid item xs={2} md={2} sx={{ px: 3 }}>
                                                                            {getExtension === '.pdf' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={PDFIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.docx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={WordIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.doc' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={WordIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.pptx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={PPTIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.xlsx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={ExcelIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.csv' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={ExcelIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            <Typography
                                                                                variant="subtitle1"
                                                                                color="inherit"
                                                                                sx={{ textAlign: 'center', fontSize: '12px' }}
                                                                            >
                                                                                <a
                                                                                    href={BASE_URL + checktype}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                >
                                                                                    {getFileName !== undefined
                                                                                        ? getFileName
                                                                                        : 'No File Name'}
                                                                                </a>
                                                                            </Typography>
                                                                        </Grid>
                                                                    );
                                                                })}
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        spacing={2}
                                                        // sx={{ mt: 1 }}
                                                        sx={{ mt: 1, display: 'flex', justifyContent: 'space-evenly' }}
                                                    >
                                                        {commentData?.other_doc?.length !== 0 ? (
                                                            <Grid item xs={12} lg={12}>
                                                                <Typography
                                                                    align="left"
                                                                    variant="subtitle2"
                                                                    color={theme.palette.mode === 'dark' ? 'dark.900' : ''}
                                                                >
                                                                    Other
                                                                </Typography>
                                                            </Grid>
                                                        ) : (
                                                            ''
                                                        )}
                                                        {commentData?.other_doc?.length > 0 ? (
                                                            <>
                                                                {commentData?.other_doc?.map((checktype, i) => {
                                                                    const getExtension = getFileExtension(checktype);
                                                                    const getFileName = removeUniqueTimestampPrefix(checktype);
                                                                    // console.log('🚀 getFileExtension:', getFileExtension(checktype));
                                                                    // console.log('🚀 file:', removeUniqueTimestampPrefix(checktype));
                                                                    return (
                                                                        <Grid item xs={2} md={2} sx={{ px: 3 }}>
                                                                            {getExtension === '.pdf' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={PDFIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.docx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={WordIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.doc' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={WordIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.pptx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={PPTIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.xlsx' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={ExcelIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            {getExtension === '.csv' && (
                                                                                <Typography
                                                                                    variant="subtitle1"
                                                                                    color="inherit"
                                                                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                                                                >
                                                                                    <Avatar
                                                                                        alt="pic"
                                                                                        size="lg"
                                                                                        src={ExcelIcon}
                                                                                        sx={{
                                                                                            mx: 1,
                                                                                            width: '80px',
                                                                                            height: 'auto',
                                                                                            borderRadius: '0px',
                                                                                            background: 'transparent'
                                                                                        }}
                                                                                    />
                                                                                </Typography>
                                                                            )}
                                                                            <Typography
                                                                                variant="subtitle1"
                                                                                color="inherit"
                                                                                sx={{ textAlign: 'center', fontSize: '12px' }}
                                                                            >
                                                                                <a
                                                                                    href={BASE_URL + checktype}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                >
                                                                                    {getFileName !== undefined
                                                                                        ? getFileName
                                                                                        : 'No File Name'}
                                                                                </a>
                                                                            </Typography>
                                                                        </Grid>
                                                                    );
                                                                })}
                                                            </>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </Grid>
                                                </TabPanel>
                                            </CardContent>
                                        </PerfectScrollbar>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </PerfectScrollbar>
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, {})(ViewProposalModels);
