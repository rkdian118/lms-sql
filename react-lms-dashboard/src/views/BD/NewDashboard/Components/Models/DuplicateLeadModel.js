import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import styled from '@emotion/styled';

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
const DuplicateLeadModel = ({ open }) => {
    const theme = useTheme();
    const [openModel, setOpenModel] = useState(open);

    const handleClickOpen = () => {
        setOpenModel(true);
    };

    const handleClose = () => {
        setOpenModel(false);
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
                        backgroundColor: '#f8dcdc'
                    }
                }}
            >
                {openModel && (
                    <>
                        <DialogTitle
                            id="alert-dialog-slide-title1"
                            sx={{ display: 'flex', justifyContent: 'center', mx: 6, fontWeight: '500', fontSize: '2em' }}
                        >
                            <Typography variant="h1" align="center" color="#e63838">
                                “Duplicate Lead”
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="h5" align="center" color="#e63838" mb={1.5}>
                                The X employee handling this Lead
                            </Typography>
                            <Typography variant="h5" align="center" color="#e63838" mb={1.5}>
                                Lead Type - Email
                            </Typography>
                            <Typography variant="h5" align="center" color="#e63838" mb={1.5}>
                                Source Type - Internal
                            </Typography>
                            <Typography variant="h5" align="center" color="#e63838" mb={1.5}>
                                Assigned Date and Time
                            </Typography>
                            <Typography variant="h5" align="center" color="#e63838" mb={1.5}>
                                Lead Id - 927
                            </Typography>
                            <Typography variant="h5" align="center" color="#e63838" mb={2}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                scrambled.
                            </Typography>
                        </DialogContent>
                    </>
                )}
            </BootstrapDialog>
        </>
    );
};

export default DuplicateLeadModel;
