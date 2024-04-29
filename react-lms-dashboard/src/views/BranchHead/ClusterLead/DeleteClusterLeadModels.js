import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography
} from '@mui/material';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { connect, useDispatch } from 'react-redux';
import { openPopupModel } from 'store/slices/menu';
import { LogoutSession } from 'store/slices/adminAuth';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { openSnackbar } from 'store/slices/snackbar';
import { ClusterLeadGetApi, ClusterLeadStatusChangeApi } from 'store/slices/clusterAction';

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

const DeleteClusterLeadModels = ({ open, close, deleteData, ClusterLeadStatusChangeApi }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onDeleteStatus = () => {
        setIsLoading(true);
        const newData = { cluster_lead_id: deleteData._id, status: '3' };
        ClusterLeadStatusChangeApi(newData)
            .then((res) => {
                setIsLoading(false);
                close();
                if (res.succeeded === true) {
                    dispatch(ClusterLeadGetApi(1, 100));
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res.ResponseMessage,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            transition: 'Fade',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' }
                        })
                    );
                } else {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res.ResponseMessage,
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            transition: 'Fade',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' }
                        })
                    );
                }
            })
            .catch((err) => {
                setIsLoading(false);
            });
    };

    const handleClose = () => {
        close();
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
                                {/* “Delete” */}
                                <ErrorOutlineIcon sx={{ width: 120, height: 120 }} />
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="h2" align="center" color="#db5227" sx={{ fontWeight: '400', fontSize: '2em', my: 0.5 }}>
                                {`Are you sure that you want to delete ${deleteData?.name}?`}
                            </Typography>
                            {/* <Typography
                                variant="h2"
                                align="center"
                                color="#db5227"
                                sx={{ fontWeight: '400', fontSize: '1.5em', mt: 2, mb: 1 }}
                            >
                                {`Are you sure that you want to delete ${deleteData?.name}?`}
                            </Typography> */}
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
                                        color: '#db5227',
                                        fontSize: '18px !important',
                                        border: '1px solid #db5227',
                                        mr: 2,
                                        '&:hover': { color: '#fff', background: '#db5227' }
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
                                        '&:hover': { color: '#db5227', background: 'transparent', border: '1px solid #db5227' }
                                    }}
                                    onClick={(e) => onDeleteStatus(e)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <CircularProgress color="inherit" size={20} />
                                        </>
                                    ) : (
                                        'Yes'
                                    )}
                                </Button>
                            </Box>
                        </DialogContent>
                    </>
                )}
            </BootstrapDialog>
        </>
    );
};

export default connect(null, { ClusterLeadStatusChangeApi })(DeleteClusterLeadModels);
