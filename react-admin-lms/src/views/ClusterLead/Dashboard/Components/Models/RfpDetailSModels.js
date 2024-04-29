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
    Avatar,
    Skeleton
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
import LeadRfpTable from './Table/LeadRfpTable';
import WordIcon from 'assets/Icons/word-icon.png';
import PDFIcon from 'assets/Icons/pdf-icon.png';
import ExcelIcon from 'assets/Icons/excel-icon.png';
import PPTIcon from 'assets/Icons/ppt-icon.png';
import { ClusterGetRfpDetailsDataApi } from 'store/slices/clusterLeadAction';
import { parse } from 'url';
import { basename, extname } from 'path-browserify';
import { BASE_URL } from 'config';

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

const RfpDetailsModels = (props) => {
    const { open, close, leadId, ClusterGetRfpDetailsDataApi } = props;
    // console.log('🚀  leadId:', leadId);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    // const restro = useSelector((state) => state.restroCat);
    const { getRfpDetailsData, getRfpDetailsLoading } = useSelector((state) => state.clusterLeadAction);
    // const { getBulkRestraurant } = restro;
    const [loader, setLoader] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        ClusterGetRfpDetailsDataApi(leadId);
    }, [leadId]);

    const handleClose = () => {
        close();
    };

    function getFileExtension(url) {
        const { pathname } = parse(url);
        const fileExtension = extname(pathname);
        return fileExtension;
    }

    function removeUniqueTimestampPrefix(path) {
        const parts = path?.split(/Z-/);
        return parts[1];
    }
    return (
        <div>
            <BootstrapDialog
                open={open}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                maxWidth="xl"
                fullWidth
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
                                background: '#b5dbff',
                                padding: '10px 15px'
                            }}
                        >
                            RFP Details
                            {/* <br /> Lead ID - 566 */}
                        </Typography>
                    </Grid>
                </BootstrapDialogTitle>
                {/* <PerfectScrollbar
                    component="div"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#ff0000 #f1f1f1'
                    }}
                > */}
                <DialogContent sx={{ m: 2, mt: 1, p: 0 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                align="center"
                                color="#db5227"
                                sx={{
                                    borderRadius: '10px',
                                    background: '#b5dbff',
                                    padding: '5px 14px'
                                }}
                            >
                                <LeadRfpTable />
                                <Grid container spacing={1}>
                                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', '&.MuiGrid-root': { pl: 3 } }}>
                                        <Typography variant="h5" align="center" sx={{ fontSize: '1rem', color: '#000000' }}>
                                            View Attachments
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                        <Box
                                            sx={{
                                                p: '10px',
                                                display: 'flex',
                                                justifyContent: 'space-evenly',
                                                borderRadius: '5px',
                                                border: '2px dashed grey',
                                                width: '100%',
                                                my: '10px'
                                            }}
                                        >
                                            {getRfpDetailsData?.rfpData?.attachments.length > 0 ? (
                                                <>
                                                    {getRfpDetailsData?.rfpData?.attachments?.map((checktype) => {
                                                        // console.log('🚀list:', checktype);
                                                        const getExtension = getFileExtension(checktype);
                                                        console.log('🚀 getExtension:', getExtension, checktype);
                                                        // const getFileName = removeUniqueTimestampPrefix(checktype);
                                                        return (
                                                            <>
                                                                {getExtension === '.pdf' && (
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color="inherit"
                                                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                                                    >
                                                                        <a href={BASE_URL + checktype} target="_blank" rel="noreferrer">
                                                                            <Avatar
                                                                                alt="pic"
                                                                                size="lg"
                                                                                src={PDFIcon}
                                                                                sx={{
                                                                                    mx: 1,
                                                                                    width: '45px',
                                                                                    height: 'auto',
                                                                                    borderRadius: '0px',
                                                                                    background: 'transparent'
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    </Typography>
                                                                )}
                                                                {getExtension === '.docx' && (
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color="inherit"
                                                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                                                    >
                                                                        <a href={BASE_URL + checktype} target="_blank" rel="noreferrer">
                                                                            <Avatar
                                                                                alt="pic"
                                                                                size="lg"
                                                                                src={WordIcon}
                                                                                sx={{
                                                                                    mx: 1,
                                                                                    width: '45px',
                                                                                    height: 'auto',
                                                                                    borderRadius: '0px',
                                                                                    background: 'transparent'
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    </Typography>
                                                                )}
                                                                {getExtension === '.doc' && (
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color="inherit"
                                                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                                                    >
                                                                        <a href={BASE_URL + checktype} target="_blank" rel="noreferrer">
                                                                            <Avatar
                                                                                alt="pic"
                                                                                size="lg"
                                                                                src={WordIcon}
                                                                                sx={{
                                                                                    mx: 1,
                                                                                    width: '45px',
                                                                                    height: 'auto',
                                                                                    borderRadius: '0px',
                                                                                    background: 'transparent'
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    </Typography>
                                                                )}
                                                                {getExtension === '.pptx' && (
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color="inherit"
                                                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                                                    >
                                                                        <a href={BASE_URL + checktype} target="_blank" rel="noreferrer">
                                                                            <Avatar
                                                                                alt="pic"
                                                                                size="lg"
                                                                                src={PPTIcon}
                                                                                sx={{
                                                                                    mx: 1,
                                                                                    width: '45px',
                                                                                    height: 'auto',
                                                                                    borderRadius: '0px',
                                                                                    background: 'transparent'
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    </Typography>
                                                                )}
                                                                {getExtension === '.xlsx' && (
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color="inherit"
                                                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                                                    >
                                                                        <a href={BASE_URL + checktype} target="_blank" rel="noreferrer">
                                                                            <Avatar
                                                                                alt="pic"
                                                                                size="lg"
                                                                                src={ExcelIcon}
                                                                                sx={{
                                                                                    mx: 1,
                                                                                    width: '45px',
                                                                                    height: 'auto',
                                                                                    borderRadius: '0px',
                                                                                    background: 'transparent'
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    </Typography>
                                                                )}
                                                                {getExtension === '.csv' && (
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        color="inherit"
                                                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                                                    >
                                                                        <a href={BASE_URL + checktype} target="_blank" rel="noreferrer">
                                                                            <Avatar
                                                                                alt="pic"
                                                                                size="lg"
                                                                                src={ExcelIcon}
                                                                                sx={{
                                                                                    mx: 1,
                                                                                    width: '45px',
                                                                                    height: 'auto',
                                                                                    borderRadius: '0px',
                                                                                    background: 'transparent'
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    </Typography>
                                                                )}
                                                            </>
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <Grid container spacing={1}>
                                                    {/* <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', '&.MuiGrid-root': { pl: 3 } }}>
                                            <Typography variant="h5" align="center" sx={{ fontSize: '1rem', color: '#000000' }}>
                                                View Attachments
                                            </Typography>
                                        </Grid> */}
                                                    {getRfpDetailsLoading === true ? (
                                                        <Grid item xs={12} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                            {/* <Box
                                                                sx={{
                                                                    p: '10px',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-evenly',
                                                                    borderRadius: '5px',
                                                                    border: '2px dashed grey',
                                                                    width: '100%',
                                                                    my: '10px'
                                                                }}
                                                            > */}
                                                            <Skeleton
                                                                variant="rectangular"
                                                                width="100%"
                                                                height={20}
                                                                sx={{ my: 1, mx: 0.5 }}
                                                            />
                                                            {/* </Box> */}
                                                        </Grid>
                                                    ) : (
                                                        <Grid item xs={12} sx={{ '&.MuiGrid-root': { pl: 0 } }}>
                                                            <Typography
                                                                variant="h5"
                                                                align="center"
                                                                sx={{ fontSize: '1rem', color: '#000000' }}
                                                            >
                                                                No Attachments
                                                            </Typography>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* </PerfectScrollbar> */}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, { ClusterGetRfpDetailsDataApi })(RfpDetailsModels);
