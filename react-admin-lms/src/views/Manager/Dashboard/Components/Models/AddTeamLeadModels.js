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
    Divider
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
import SuccessModel from './SuccessModel';

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

const AddTeamLeadModels = (props) => {
    const theme = useTheme();
    const { open, close } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [successOpen, setSuccessOpen] = useState(false);
    const [loader, setLoader] = useState(false);

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

    const onSubmit = (values) => {
        setSuccessOpen(true);
    };

    const formik = useFormik({
        initialValues,
        onSubmit
        // validationSchema
    });

    const handleClose = () => {
        dispatch(openPopupModel({ openItemKey: '', modalState: false }));
    };

    return (
        <div>
            <BootstrapDialog
                open={open}
                onClose={close}
                aria-labelledby="customized-dialog-title"
                TransitionComponent={Transition}
                maxWidth="xl" // Set the desired max width here (e.g., "xs", "sm", "md", "lg", "xl")
                fullWidth // Ensures that the dialog takes up the full width available
                sx={{
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '700px',
                        padding: '0px'
                    }
                }}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    sx={{
                        background: '#e0f4ff'

                        // py: '4px',
                        // pl: '22px',
                        // display: 'flex',
                        // justifyContent: 'space-around',
                        // alignItem: 'baseline'
                    }}
                >
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '1em', color: '#468ccc' }} align="center">
                        Add Team Lead
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
                            // mt: '-12px',
                            // mb: 2,
                            // overflowY: 'hidden',
                            // display: 'flex',
                            // justifyContent: 'flex-start',
                            // flexDirection: 'column'
                        }}
                    >
                        <Formik>
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <FormControl fullWidth sx={{ mb: 2, px: 6, alignItems: 'left' }}>
                                    <Typography variant="h5" sx={{ width: '180px' }}>
                                        TL Name<span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <TextField
                                        // ref={fileRef}
                                        fullWidth
                                        placeholder="Enter Client Name"
                                        type="text"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            marginBottom: '5px ',
                                            marginTop: '5px '
                                        }}
                                    />
                                </FormControl>{' '}
                                <FormControl fullWidth sx={{ mb: 2, px: 6, alignItems: 'left' }}>
                                    <Typography variant="h5" sx={{ width: '180px' }}>
                                        Email<span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <TextField
                                        // ref={fileRef}
                                        fullWidth
                                        placeholder="Enter Client Name"
                                        type="text"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            marginBottom: '5px ',
                                            marginTop: '5px '
                                        }}
                                    />
                                </FormControl>{' '}
                                <FormControl fullWidth sx={{ mb: 2, px: 6, alignItems: 'left' }}>
                                    <Typography variant="h5" sx={{ width: '180px' }}>
                                        Branch Name<span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <TextField
                                        // ref={fileRef}
                                        fullWidth
                                        placeholder="Enter Client Name"
                                        type="text"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            marginBottom: '5px ',
                                            marginTop: '5px '
                                        }}
                                    />
                                </FormControl>{' '}
                                <FormControl fullWidth sx={{ mb: 2, px: 6, alignItems: 'left' }}>
                                    <Typography variant="h5" sx={{ width: '180px' }}>
                                        Contact Number<span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <TextField
                                        // ref={fileRef}
                                        fullWidth
                                        placeholder="Enter Client Name"
                                        type="text"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            marginBottom: '5px ',
                                            marginTop: '5px '
                                        }}
                                    />
                                </FormControl>{' '}
                                <FormControl fullWidth sx={{ mb: 2, px: 6, alignItems: 'left' }}>
                                    <Typography variant="h5" sx={{ width: '180px' }}>
                                        Employee ID<span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <TextField
                                        // ref={fileRef}
                                        fullWidth
                                        placeholder="Enter Client Name"
                                        type="text"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            marginBottom: '5px ',
                                            marginTop: '5px '
                                        }}
                                    />
                                </FormControl>{' '}
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
                                        sx={{
                                            pl: 2,
                                            background: '#3e7dc3',
                                            borderRadius: '10px',
                                            width: '20%',
                                            height: '35px',
                                            '&:hover': { color: '#000', backgroundColor: '#c6d9ff' }
                                        }}
                                    >
                                        Add
                                    </Button>
                                    {loader === true ? (
                                        <>
                                            <CircularProgress color="inherit" variant="indeterminate" sx={{ mr: 2 }} />
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </Box>
                            </form>
                        </Formik>
                    </DialogContent>
                </PerfectScrollbar>
                {successOpen && <SuccessModel open={successOpen} />}
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, {})(AddTeamLeadModels);
