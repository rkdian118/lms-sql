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
const SuccessModel = ({ open }) => {
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
                        backgroundColor: '#c6d9ff'
                    }
                }}
            >
                {openModel && (
                    <>
                        <DialogTitle
                            id="alert-dialog-slide-title1"
                            sx={{ display: 'flex', justifyContent: 'center', mx: 6, fontWeight: '500', fontSize: '2rem' }}
                        >
                            <Typography variant="h1" align="center" color="#3a5895">
                                “Thank You, you have added the Lead Successfully”
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="h3" align="center" color="#3a5895" sx={{ fontWeight: '400', fontSize: '2em', my: 2 }}>
                                {/* <Typography variant="h2" sx={{ px: 4 }}> */}
                                Lead Id - 927
                            </Typography>
                            <Typography variant="h5" align="center" color="#3a5895" mb={2}>
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

export default SuccessModel;
