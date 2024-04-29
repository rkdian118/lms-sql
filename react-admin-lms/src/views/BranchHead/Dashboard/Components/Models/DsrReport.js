import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { openPopupModel } from 'store/slices/menu';
import { LogoutSession } from 'store/slices/adminAuth';
import CloseIcon from '@mui/icons-material/Close';
// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - SLIDE ANIMATION ||=============================== //
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
const DsrReport = ({ open, close }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // const [openPopupModel, setOpenModel] = useState(open);

    const handleRemove = (e) => {
        e.preventDefault();
    };

    const handleClose = () => {
        // setOpenModel(false);
        close();
        // dispatch(openPopupModel({ openItemKey: '', modalState: false }));
    };

    return (
        <>
            <BootstrapDialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={close}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
                sx={{
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '1000px',
                        padding: '0px'
                    }
                }}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    sx={{
                        background: '#5bb4fe',
                        padding: '8px 24px'
                        // py: '4px',
                        // pl: '22px',
                        // display: 'flex',
                        // justifyContent: 'space-around',
                        // alignItem: 'baseline'
                    }}
                >
                    <Typography variant="h6" component="h6" sx={{ pl: '10px', fontSize: '16px', color: '#ffffff' }} align="center">
                        BD Name - ABCDEFGf <br /> Employee ID - WM - 927
                    </Typography>
                </BootstrapDialogTitle>

                <DialogContent sx={{ '&.MuiDialogContent-root': { p: '0 24px' } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sx={{ borderRight: '1px solid #5bb4fe', '&.MuiGrid-root': { p: '40px 30px' } }}>
                            <FormControl
                                fullWidth
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Number of Leads Assigned<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Number of Positive Response<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Number of Negative Response<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Number of Follow-ups<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Number of LinkedIn Messages<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    LinkedIn Response<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                sx={{
                                    mb: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Number of Nids (Upworks)<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ '&.MuiGrid-root': { p: '40px 30px' } }}>
                            <FormControl
                                fullWidth
                                sx={{ mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Upwork Response<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>{' '}
                            <FormControl
                                fullWidth
                                sx={{ mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Number of Calls Scheduled with status<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>{' '}
                            <FormControl
                                fullWidth
                                sx={{ mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Number of Proposals Submitted<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>{' '}
                            <FormControl
                                fullWidth
                                sx={{ mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Estimation Submitted<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>{' '}
                            <FormControl
                                fullWidth
                                sx={{ mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Understanding and Queries Submitted<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>{' '}
                            <FormControl
                                fullWidth
                                sx={{ mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Response Shared<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>{' '}
                            <FormControl
                                fullWidth
                                sx={{ mb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Typography variant="h5" sx={{ width: '100%' }}>
                                    Features List Shared with the Clients<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                <TextField
                                    // ref={fileRef}
                                    // fullWidth
                                    placeholder="Enter Client Name"
                                    type="text"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        marginBottom: '5px ',
                                        marginTop: '5px ',
                                        width: '35%'
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
};

export default DsrReport;
