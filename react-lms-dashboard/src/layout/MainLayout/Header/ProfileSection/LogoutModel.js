import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { openPopupModel } from 'store/slices/menu';
import { LogoutSession } from 'store/slices/adminAuth';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from 'config';

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
const LogoutModel = ({ open, close }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [openPopupModel, setOpenModel] = useState(open);

    const handleClickLogout = (e) => {
        e.preventDefault();
        dispatch(LogoutSession());
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRole');
        navigate(LOGIN_PATH, { replace: true });
    };

    const handleClose = () => {
        // setOpenModel(false);
        dispatch(openPopupModel({ openItemKey: '', modalState: false }));
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
                        backgroundColor: '#f9e0fa',
                        width: '100%',
                        maxWidth: '500px'
                    },
                    '& .MuiDialog-container': {
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }
                }}
            >
                {open && (
                    <>
                        <DialogTitle id="alert-dialog-slide-title1" sx={{ mx: 6, fontWeight: '500', fontSize: '2rem' }}>
                            <Typography variant="h1" color="#98528d" sx={{ display: 'flex', justifyContent: 'center' }}>
                                “Logout”
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="h2" align="center" color="#98528d" sx={{ fontWeight: '400', fontSize: '2em', my: 2 }}>
                                Do you want to log out?
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
                                    style={{
                                        // display: "flex",
                                        // justifyContent: "flex-start",
                                        width: '20%',
                                        height: '35px',
                                        '&:hover': { color: '#000', backgroundColor: '#c6d9ff' }
                                    }}
                                    sx={{
                                        pl: 2,
                                        background: 'transparent',
                                        fontSize: '18px !important',
                                        border: '1px solid #98528d',
                                        color: '#98528d',
                                        mr: 2
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
                                    style={{
                                        // display: "flex",
                                        // justifyContent: "flex-start",
                                        width: '20%',
                                        height: '35px',
                                        '&:hover': { color: '#000', backgroundColor: '#c6d9ff' }
                                    }}
                                    sx={{
                                        pl: 2,
                                        background: '#98528d',
                                        fontSize: '18px !important'
                                    }}
                                    onClick={(e) => handleClickLogout(e)}
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

export default LogoutModel;
