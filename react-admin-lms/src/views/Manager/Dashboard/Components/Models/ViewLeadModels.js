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
import LeadTable from './LeadTable';
import WordIcon from 'assets/Icons/word-icon.png';
import PDFIcon from 'assets/Icons/pdf-icon.png';
import ExcelIcon from 'assets/Icons/excel-icon.png';
import PPTIcon from 'assets/Icons/ppt-icon.png';

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

const newLeadsArray = [
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
    }
];

const ViewLeadModels = (props) => {
    const { open, close } = props;
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    // const restro = useSelector((state) => state.restroCat);
    // const { getBulkRestraurant } = restro;
    const [loader, setLoader] = useState(false);
    const [value, setValue] = useState('');

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
                        maxWidth: '1100px',
                        p: 0
                    }
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', background: '#f9e1b4', borderRadius: '15px', mb: 1 }}>
                        <OutlineInputStyle
                            id="input-search-header"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter Lead ID"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={3} size="2rem" color="#b79056" />
                                </InputAdornment>
                            }
                            sx={{ height: '45px', background: '#fcf0dc', width: '600px', margin: '5px 0px' }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <HeaderAvatarStyle variant="rounded">
                                        <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                    </HeaderAvatarStyle>
                                </InputAdornment>
                            }
                            aria-describedby="search-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                    </Box>
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
                            mx: 2,
                            p: 0
                        }}
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    p="14px"
                                    color="#db5227"
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#f9e1b4'
                                    }}
                                >
                                    Number Of Leads 100
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="#db5227"
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#fcf0dc',
                                        padding: '5px 14px'
                                    }}
                                >
                                    Result
                                    <br /> Lead ID - 566
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    p="14px"
                                    color="#db5227"
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#f9e1b4'
                                    }}
                                >
                                    Prospects
                                </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    // p="14px"
                                    color="#db5227"
                                    sx={{
                                        padding: '5px 10px',
                                        borderRadius: '10px',
                                        background: '#f9e1b4',
                                        height: '553px'
                                    }}
                                >
                                    <PerfectScrollbar
                                        component="div"
                                        style={{
                                            // background: '16px',
                                            scrollbarWidth: 'thin' /* For Firefox */,
                                            scrollbarColor: '#ff0000 #f1f1f1'
                                        }}
                                    >
                                        {LeadsArray.map((list, i) => (
                                            <Grid
                                                container
                                                spacing={0}
                                                sx={{ backgroundColor: 'white', my: 1, padding: '0px 10px', borderRadius: '10px' }}
                                                key={i}
                                            >
                                                <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <MuiTypography variant="h5">{`${list.id}. ${list.leadName}`}</MuiTypography>
                                                </Grid>
                                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '20px' }}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            background: '#fcf0dc',
                                                            color: '#000000',
                                                            padding: '0px 25px',
                                                            my: 1,
                                                            borderRadius: '10px',
                                                            '&:hover': {
                                                                background: '#f2be56',
                                                                color: '#000000'
                                                            }
                                                        }}
                                                        // onClick={(e) => onClickModel()}
                                                    >
                                                        View
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        ))}
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: '#fcf0dc',
                                                color: '#e88e56',
                                                padding: '0px 25px',
                                                my: 1,
                                                borderRadius: '5px',
                                                '&:hover': {
                                                    background: '#f2be56',
                                                    color: '#000000'
                                                }
                                            }}
                                        >
                                            View more
                                        </Button>
                                    </PerfectScrollbar>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                    color="#db5227"
                                    sx={{
                                        borderRadius: '10px',
                                        background: '#fcf0dc',
                                        padding: '5px 14px'
                                    }}
                                >
                                    <LeadTable />
                                    <Grid container spacing={1}>
                                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', '&.MuiGrid-root': { pl: 3 } }}>
                                            <Typography variant="h5" align="center" sx={{ fontSize: '1rem', color: '#000000' }}>
                                                Add Attachment
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
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                {/* <PerfectScrollbar
                                        component="div"
                                        style={{
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: '#ff0000 #f1f1f1'
                                        }}
                                    > */}
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            // p="14px"
                                            color="#db5227"
                                            sx={{
                                                padding: '5px 10px',
                                                borderRadius: '10px',
                                                background: '#f9e2de'
                                                // height: '553px'
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                align="center"
                                                p="8px"
                                                color="#ffffff"
                                                sx={{
                                                    borderRadius: '10px',
                                                    background: '#d76a6a'
                                                }}
                                            >
                                                Hot
                                            </Typography>
                                            {newLeadsArray.map((list, i) => (
                                                <Grid
                                                    container
                                                    spacing={0}
                                                    sx={{ backgroundColor: 'white', my: 1, padding: '0px 10px', borderRadius: '10px' }}
                                                    key={i}
                                                >
                                                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <MuiTypography variant="h5">{`${list.id}. ${list.leadName}`}</MuiTypography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={4}
                                                        sx={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '20px' }}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                background: '#f9e2de',
                                                                color: '#000000',
                                                                padding: '0px 30px',
                                                                my: '5px',
                                                                borderRadius: '10px',
                                                                '&:hover': {
                                                                    background: '#d76a6a',
                                                                    color: '#000000'
                                                                }
                                                            }}
                                                            // onClick={(e) => onClickModel()}
                                                        >
                                                            View
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            // p="14px"
                                            color="#db5227"
                                            sx={{
                                                padding: '5px 10px',
                                                borderRadius: '10px',
                                                background: '#f9e6be'
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                align="center"
                                                p="8px"
                                                color="#ffffff"
                                                sx={{
                                                    borderRadius: '10px',
                                                    background: '#f6d49b'
                                                }}
                                            >
                                                Warm
                                            </Typography>
                                            {newLeadsArray.map((list, i) => (
                                                <Grid
                                                    container
                                                    spacing={0}
                                                    sx={{ backgroundColor: 'white', my: 1, padding: '0px 10px', borderRadius: '10px' }}
                                                    key={i}
                                                >
                                                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <MuiTypography variant="h5">{`${list.id}. ${list.leadName}`}</MuiTypography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={4}
                                                        sx={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '20px' }}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                background: '#f9e5be',
                                                                color: '#000000',
                                                                padding: '0px 30px',
                                                                my: '5px',
                                                                borderRadius: '10px',
                                                                '&:hover': {
                                                                    background: '#f2be56',
                                                                    color: '#000000'
                                                                }
                                                            }}
                                                            // onClick={(e) => onClickModel()}
                                                        >
                                                            View
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            // p="14px"
                                            color="#db5227"
                                            sx={{
                                                padding: '5px 10px',
                                                borderRadius: '10px',
                                                background: '#c9fdc1'
                                                // height: '553px'
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                align="center"
                                                p="8px"
                                                color="#ffffff"
                                                sx={{
                                                    borderRadius: '10px',
                                                    background: '#60b253'
                                                }}
                                            >
                                                Cold
                                            </Typography>
                                            {newLeadsArray.map((list, i) => (
                                                <Grid
                                                    container
                                                    spacing={0}
                                                    sx={{ backgroundColor: 'white', my: 1, padding: '0px 10px', borderRadius: '10px' }}
                                                    key={i}
                                                >
                                                    <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <MuiTypography variant="h5">{`${list.id}. ${list.leadName}`}</MuiTypography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={4}
                                                        sx={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: '20px' }}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                background: '#c4fdbb',
                                                                color: '#000000',
                                                                padding: '0px 30px',
                                                                my: '5px',
                                                                borderRadius: '10px',
                                                                '&:hover': {
                                                                    background: '#60b253',
                                                                    color: '#000000'
                                                                }
                                                            }}
                                                            // onClick={(e) => onClickModel()}
                                                        >
                                                            View
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {/* </PerfectScrollbar> */}
                            </Grid>
                        </Grid>
                    </DialogContent>
                </PerfectScrollbar>
            </BootstrapDialog>
        </div>
    );
};

export default connect(null, {})(ViewLeadModels);
