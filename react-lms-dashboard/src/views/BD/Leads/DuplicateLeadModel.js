import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import styled from '@emotion/styled';
import moment from 'moment';

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
const DuplicateLeadModel = ({ open, close, duplicateData, responseMessage }) => {
    const theme = useTheme();
    const [openModel, setOpenModel] = useState(open);

    const handleClickOpen = () => {
        setOpenModel(true);
    };

    const handleClose = () => {
        // setOpenModel(false);
        close();
    };

    return (
        <>
            <BootstrapDialog
                open={openModel}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: theme.palette.primary.light
                    }
                }}
            >
                {openModel && (
                    <>
                        <DialogTitle
                            id="alert-dialog-slide-title1"
                            sx={{ display: 'flex', justifyContent: 'center', mx: 6, fontWeight: '500', fontSize: '2em' }}
                        >
                            <Typography variant="h1" align="center" color={theme.palette.secondary.main}>
                                “Duplicate Lead”
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="h5" align="center" color={theme.palette.secondary.main} mb={1.5}>
                                BDE Name - {duplicateData?.name}
                                {/* handling this Lead */}
                            </Typography>
                            <Typography variant="h5" align="center" color={theme.palette.secondary.main} mb={1.5}>
                                Requirement Type -{duplicateData?.lead_req_type ? duplicateData?.lead_req_type : '-'}
                            </Typography>
                            <Typography variant="h5" align="center" color={theme.palette.secondary.main} mb={1.5}>
                                Lead Source -{duplicateData?.lead_source ? duplicateData?.lead_source : '-'}
                            </Typography>
                            <Typography variant="h5" align="center" color={theme.palette.secondary.main} mb={1.5}>
                                Lead Type - {duplicateData?.lead_type}
                            </Typography>
                            <Typography variant="h5" align="center" color={theme.palette.secondary.main} mb={1.5}>
                                Lead Status - {duplicateData?.lead_status ? duplicateData?.lead_status : '-'}
                            </Typography>
                            <Typography variant="h5" align="center" color={theme.palette.secondary.main} mb={1.5}>
                                Client Name - {duplicateData?.client_name}
                            </Typography>
                            <Typography variant="h5" align="center" color={theme.palette.secondary.main} mb={1.5}>
                                Client Country - {duplicateData?.client_country}
                            </Typography>
                            <Typography variant="h5" align="center" color={theme.palette.secondary.main} mb={1.5}>
                                Assigned Date ({moment(duplicateData?.assign_date).format('DD-MMM-YYYY')})
                            </Typography>
                            <Typography variant="h3" align="center" color="#e63838" my={2}>
                                {responseMessage}
                            </Typography>
                        </DialogContent>
                    </>
                )}
            </BootstrapDialog>
        </>
    );
};

export default DuplicateLeadModel;
