import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, Grid, Switch, Typography, FormControlLabel, Pagination } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { openPopupModel } from 'store/slices/menu';
import { dispatch } from 'store';
import { connect, useSelector } from 'react-redux';
// import AddTeamLeadModels from './Models/AddTeamLeadModels';
// import TeamLeadDetails from './Models/TeamLeadDetails';
import Avatar1 from 'assets/images/users/avatar-1.png';
import AddClusterModels from './AddClusterModels';
import { ClusterGetApi, ClusterStatusChangeApi, SwitchClusterBranchApi } from 'store/slices/adminAction';
import { BASE_URL } from 'config';
import { ClusterTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
import EditClusterModels from './EditClusterModels';
import { useTheme } from '@mui/material/styles';
import { openSnackbar } from 'store/slices/snackbar';
import DeleteClusterModels from './DeleteClusterModels';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SwitchBranchModels from './SwitchBranchModels';
import MuiTooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GppBadIcon from '@mui/icons-material/GppBad';

const Index = ({ ClusterStatusChangeApi, SwitchClusterBranchApi }) => {
    const theme = useTheme();
    const newmenu = useSelector((state) => state.adminAction);
    const { clusterList, clusterLoading } = newmenu;
    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [openSwitchModel, setOpenSwticheModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [id, setId] = useState('');
    const [removeStatus, setRemoveStatus] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);

    const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        dispatch(ClusterGetApi(currentPage, pageLength));
    }, [currentPage, pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(ClusterGetApi(newPage, pageLength));
    };

    const onChangeStatus = (data) => {
        const newData = { cluster_id: data._id, status: data.status === '1' ? '2' : '1' };
        ClusterStatusChangeApi(newData).then((res) => {
            if (res.succeeded === true) {
                dispatch(ClusterGetApi(currentPage, pageLength));
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
        });
    };

    const onRemoveBranch = (data) => {
        // console.log('🚀 data:', data);
        setRemoveStatus(false);

        const formData = {
            cluster_id: data?._id,
            current_branch_id: data?.branch_id?._id ? data?.branch_id?._id : '',
            new_branch_id: ''
        };
        if (!data?.branch_id?._id) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Branch already removed',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    transition: 'Fade',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
                })
            );
            setRemoveStatus(true);
        } else {
            SwitchClusterBranchApi(formData).then((res) => {
                if (res.succeeded === true) {
                    setRemoveStatus(true);
                    dispatch(ClusterGetApi(currentPage, pageLength));
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Branch removed successfully.',
                            // message: res.ResponseMessage,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            transition: 'Fade',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' }
                        })
                    );
                } else {
                    setRemoveStatus(true);
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
            });
        }
    };

    const onDeleteStatus = (data) => {
        setOpenDeleteModel(true);
        setDeleteData(data);
    };

    const handleCloseModel = (type) => {
        setOpenModel(false);
        setId('');
        dispatch(ClusterGetApi(currentPage, pageLength));
    };

    const handleCloseSwitchModel = () => {
        setOpenSwticheModel(false);
        setId('');
        dispatch(ClusterGetApi(currentPage, pageLength));
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenSwticheModel(false);
    };

    const handleSwitchModel = (data) => {
        setId(data._id);
        setOpenEditModel(false);
        setOpenSwticheModel(true);
    };

    let { page } = clusterList;
    page -= 1;
    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '10px' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={10}>
                    <Typography
                        variant="h4"
                        align="center"
                        // p="10px"
                        color="#b276a8"
                        sx={{
                            p: '20px 10px',
                            borderRadius: '4px',
                            color: '#4968a2',
                            background: '#b5dbff'
                        }}
                    >
                        Cluster Management
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        sx={{
                            border: '1px solid #3e7dc3',
                            color: '#3e7dc3',
                            borderRadius: '5px',
                            background: '#e0f4ff',
                            p: '6px 25px',
                            '&:hover': {
                                background: '#3e7dc3',
                                color: '#e0f4ff'
                            }
                        }}
                        onClick={(e) => setOpenModel(true)}
                    >
                        Add Cluster <AddCircleRoundedIcon sx={{ ml: 1 }} />
                    </Button>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography
                        align="center"
                        p="10px"
                        color="#b276a8"
                        sx={{
                            borderRadius: '4px',
                            // height: '780px',
                            color: '#4968a2',
                            background: '#b5dbff'
                        }}
                    >
                        <Grid container spacing={0} sx={{ backgroundColor: 'white', my: 1, padding: '20px 10px', borderRadius: '10px' }}>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid md={1} item sx={{ mr: 2 }}>
                                        <Typography variant="h5" sx={{ color: '#000000' }}>
                                            No.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs zeroMinWidth>
                                        <Typography variant="h5" align="left">
                                            Name
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Username</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Branch Name</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Secret Key</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Status</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                                <Typography variant="h5" align="center">
                                    Action
                                </Typography>
                            </Grid>
                        </Grid>
                        {!clusterLoading && clusterList.docs.length > 0 ? (
                            clusterList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid md={1} item sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {/* {i + 1} */}
                                                    {page * pageLength + (i + 1)}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt="Preview" src={BASE_URL + list.profile_pic} />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list.name}
                                                </Typography>
                                                <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                                                    {list?.emp_id} ({list?.designation})
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.username}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {list?.branch_id?.branch_name ? (
                                            <Typography variant="h5"> {list?.branch_id?.branch_name}</Typography>
                                        ) : (
                                            <Typography variant="h5" sx={{ color: '#E94B4B' }}>
                                                Not Assigned
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.secret_key}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FormControlLabel
                                            value="bottom"
                                            control={
                                                <Switch
                                                    checked={list?.status === '1'}
                                                    color="primary"
                                                    onClick={() => onChangeStatus(list)}
                                                />
                                            }
                                            label={
                                                list?.status === '1' ? (
                                                    <Chip label="Activated" variant="outlined" color="primary" sx={{ cursor: 'pointer' }} />
                                                ) : (
                                                    <>
                                                        {list?.status === '2' ? (
                                                            <Chip
                                                                label="Deactivated"
                                                                variant="outlined"
                                                                color="secondary"
                                                                sx={{ cursor: 'pointer' }}
                                                            />
                                                        ) : (
                                                            <Chip
                                                                label="Deleted"
                                                                variant="outlined"
                                                                color="error"
                                                                sx={{ cursor: 'pointer' }}
                                                            />
                                                        )}
                                                    </>
                                                )
                                            }
                                            labelPlacement="bottom"
                                        />
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                                        <MuiTooltip title="Switch Branch" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#b5dbff',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: '15px',
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        background: '#4d97f3',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                onClick={() => handleSwitchModel(list)}
                                            >
                                                <SyncAltIcon />
                                            </Button>
                                        </MuiTooltip>
                                        <MuiTooltip title="Remove Branch" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#b5dbff',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: '15px',
                                                    ml: 1,
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        background: '#4d97f3',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                onClick={() => onRemoveBranch(list)}
                                                disabled={!removeStatus}
                                            >
                                                <GppBadIcon />
                                            </Button>
                                        </MuiTooltip>
                                        <MuiTooltip title="Edit Branch" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#b5dbff',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: '15px',
                                                    ml: 1,
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        background: '#4d97f3',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                onClick={() => handleEditModel(list)}
                                            >
                                                <EditIcon />
                                            </Button>
                                        </MuiTooltip>
                                        <MuiTooltip title="Delete Branch" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#b5dbff',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: '15px',
                                                    ml: 1,
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        background: '#4d97f3',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                onClick={() => onDeleteStatus(list)}
                                            >
                                                <DeleteOutlineIcon />
                                            </Button>
                                        </MuiTooltip>
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {clusterLoading === true ? (
                                    <ClusterTableLoader rows={10} />
                                ) : (
                                    <Grid
                                        container
                                        spacing={0}
                                        sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    >
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography
                                                align="center"
                                                component="div"
                                                variant="subtitle1"
                                                sx={{ color: '#000000', p: '10px' }}
                                            >
                                                No Cluster Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Typography>
                </Grid>
                {!clusterLoading && clusterList.totalDocs > 10 ? (
                    <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                        <Pagination
                            align="right"
                            sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                            color="primary"
                            shape="rounded"
                            count={clusterList.totalPages}
                            page={currentPage}
                            onChange={onPaginationHandle}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
            {openDeleteModel && (
                <DeleteClusterModels open={openDeleteModel} close={() => setOpenDeleteModel(false)} deleteData={deleteData} />
            )}
            {openModel && <AddClusterModels open={openModel} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditClusterModels clusterId={id} open={openEditModel} close={() => handleCloseModel()} />}
            {id && openSwitchModel && <SwitchBranchModels clusterId={id} open={openSwitchModel} close={() => handleCloseSwitchModel()} />}
        </MainCard>
    );
};

export default connect(null, { ClusterGetApi, ClusterStatusChangeApi, SwitchClusterBranchApi })(Index);
