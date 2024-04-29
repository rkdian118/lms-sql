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
    Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { shouldForwardProp } from '@mui/system';
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons';
import MuiTypography from '@mui/material/Typography';
import LeadCallTable from './Table/LeadCallTable';
import WordIcon from 'assets/Icons/word-icon.png';
import PDFIcon from 'assets/Icons/pdf-icon.png';
import ExcelIcon from 'assets/Icons/excel-icon.png';
import PPTIcon from 'assets/Icons/ppt-icon.png';
import { ClusterGetCallDetailsDataApi } from 'store/slices/clusterLeadAction';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        // padding: theme.spacing(2)
    },
    '& .MuDialogActions-root': {
        // padding: theme.spacing(1)
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

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    color: '#ea7b26',
    '&:hover': {
        background: '#ceb184',
        color: '#000000'
    }
}));

const LeadsArray = [
    {
        id: 1,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 2,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 3,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 4,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 5,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 6,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 7,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 8,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 9,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 10,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 11,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 12,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 13,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 14,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 15,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 16,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 17,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 18,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 19,
        leadName: 'Lead ID XXXX'
    },
    {
        id: 20,
        leadName: 'Lead ID XXXX'
    }
];

const CallDetailsModel = (props) => {
    const { open, close, leadId, ClusterGetCallDetailsDataApi } = props;
    // console.log('🚀  leadId:', leadId);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    // const restro = useSelector((state) => state.restroCat);
    // const { getBulkRestraurant } = restro;
    const [loader, setLoader] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        ClusterGetCallDetailsDataApi(leadId);
    }, [leadId]);

    const initialValues = {
        excel_file: ''
    };

    const validationSchema = Yup.object({
        excel_file: Yup.mixed()
            .required('File is Required')
            .test('fileType', 'Only Excel files are allowed', (value) => {
                if (!value) return true; // allow empty values
                return (
                    value.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    //   value.type === "application/vnd.ms-excel";
                ); // validate file type
            })
    });

    const onSubmit = (values) => {};

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleClose = () => {
        close();
    };

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
                        maxWidth: '900px',
                        p: 0
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {/* <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em' }}>
                        Lead Details
                    </Typography> */}
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            align="center"
                            // color="#db5227"
                            sx={{
                                borderRadius: '10px',
                                background: '#cffea0',
                                padding: '10px 15px'
                            }}
                        >
                            Call Details
                            {/* <br /> Lead ID - 566 */}
                        </Typography>
                    </Grid>
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
                        // dividers
                        sx={{
                            m: 2,
                            mt: 1,
                            p: 0
                        }}
                    >
                        <Grid container spacing={1}>
                            {/* <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="#db5227"
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#cffea0',
                                        padding: '5px 14px'
                                    }}
                                >
                                    Result
                                    <br /> Lead ID - 566
                                </Typography>
                            </Grid> */}

                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="#db5227"
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#cffea0',
                                        padding: '5px 14px'
                                    }}
                                >
                                    <LeadCallTable />
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </PerfectScrollbar>
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { ClusterGetCallDetailsDataApi })(CallDetailsModel);
