import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { openPopupModel } from 'store/slices/menu';
import { LogoutSession } from 'store/slices/adminAuth';

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
const RemoveTLModel = ({ open, close }) => {
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
                        backgroundColor: '#f9e1b4',
                        width: '100%',
                        maxWidth: '500px'
                    },
                    '& .MuiDialog-container': {
                        display: 'flex',
                        justifyContent: 'center'
                    }
                }}
            >
                {open && (
                    <>
                        <DialogTitle id="alert-dialog-slide-title1" sx={{ mx: 6, fontWeight: '500', fontSize: '2rem' }}>
                            <Typography variant="h1" color="#db5227" sx={{ display: 'flex', justifyContent: 'center' }}>
                                Remove TL
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography
                                variant="h5"
                                align="center"
                                color="#db5227"
                                sx={{ fontWeight: '400', fontSize: '1.5em', my: 2, padding: '5px 65px' }}
                            >
                                Are you sure do you want to remove TL from team?
                            </Typography>
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: '20px 30px'
                                }}
                            >
                                <Button
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        width: '20%',
                                        height: '35px',
                                        pl: 2,
                                        background: 'transparent',
                                        fontSize: '18px !important',
                                        border: '1px solid #db5227',
                                        color: '#db5227',
                                        mr: 2,
                                        '&:hover': { color: '#ffffff', background: '#db5227' }
                                    }}
                                    onClick={handleClose}
                                >
                                    No
                                </Button>
                                <Button
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    sx={{
                                        width: '20%',
                                        height: '35px',
                                        pl: 2,
                                        background: '#db5227',
                                        fontSize: '18px !important',
                                        '&:hover': { color: '#000', border: '1px solid #db5227', backgroundColor: '#f9e1b4' }
                                    }}
                                    onClick={(e) => handleRemove(e)}
                                >
                                    Yes
                                </Button>
                            </Box>
                        </DialogContent>
                    </>
                )}
            </BootstrapDialog>
        </>
    );
};

export default RemoveTLModel;
