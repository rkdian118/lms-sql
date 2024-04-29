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
// import { excelDataImport } from './../../../store/slices/restroCatAction';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import { shouldForwardProp } from '@mui/system';
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons';
import MuiTypography from '@mui/material/Typography';
import LeadTable from './Table/LeadTable';
import WordIcon from 'assets/Icons/word-icon.png';
import PDFIcon from 'assets/Icons/pdf-icon.png';
import ExcelIcon from 'assets/Icons/excel-icon.png';
import PPTIcon from 'assets/Icons/ppt-icon.png';
import { ClusterGetLeadDetailsDataApi } from 'store/slices/clusterLeadAction';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

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

const LeadDetailModel = (props) => {
    const { open, close, leadId, ClusterGetLeadDetailsDataApi } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const { getLeadDetailsData, getLeadDetailsLoading } = useSelector((state) => state.clusterLeadAction);
    // console.log('🚀  leadId:', getLeadDetailsData);
    const [loader, setLoader] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        ClusterGetLeadDetailsDataApi(leadId);
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
                        maxWidth: '700px',
                        p: 0
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            align="center"
                            color="#db5227"
                            sx={{
                                borderRadius: '10px',
                                background: '#fcf0dc',
                                padding: '10px 15px'
                            }}
                        >
                            Lead Details
                            {/* <br /> Lead ID - 566 */}
                        </Typography>
                    </Grid>
                </BootstrapDialogTitle>
                <PerfectScrollbar
                    component="div"
                    style={{
                        // background: '16px',
                        scrollbarWidth: 'thin' /* For Firefox */,
                        scrollbarColor: '#b2b3b3 #f1f1f1'
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
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="#db5227"
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#fcf0dc',
                                        padding: '5px 15px'
                                    }}
                                >
                                    <LeadTable />
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </PerfectScrollbar>
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { ClusterGetLeadDetailsDataApi })(LeadDetailModel);
