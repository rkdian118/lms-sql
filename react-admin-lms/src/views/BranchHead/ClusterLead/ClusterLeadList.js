import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, FormControlLabel, Grid, Pagination, Switch, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { openPopupModel } from 'store/slices/menu';
import { dispatch } from 'store';
import { connect, useSelector } from 'react-redux';
// import AddTeamLeadModels from './Models/AddTeamLeadModels';
// import TeamLeadDetails from './Models/TeamLeadDetails';
import Avatar1 from 'assets/images/users/avatar-1.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import AddClusterModels from './AddClusterModels';
import { ClusterLeadGetApi, ClusterLeadStatusChangeApi } from 'store/slices/clusterAction';
import { BASE_URL } from 'config';
import { TeamLeadTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import UserImage from 'assets/images/users/avatar-2.png';
import AddTeamLeadModels from './AddClusterLeadModels';
import EditTeamLeadModels from './EditClusterLeadModels';
import { openSnackbar } from 'store/slices/snackbar';
import DeleteTeamLeadModels from './DeleteClusterLeadModels';
import MuiTooltip from '@mui/material/Tooltip';

const ClusterLeadList = ({ ClusterLeadStatusChangeApi }) => {
    const newmenu = useSelector((state) => state.clusterAction);
    const { clusterLeadList, clusterLeadLoading } = newmenu;

    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);
    const [id, setId] = useState('');
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});

    useEffect(() => {
        dispatch(ClusterLeadGetApi(currentPage, pageLength));
    }, [currentPage, pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(ClusterLeadGetApi(newPage, pageLength));
    };
    const onChangeStatus = (data) => {
        const newData = { cluster_lead_id: data._id, status: data.status === '1' ? '2' : '1' };
        ClusterLeadStatusChangeApi(newData).then((res) => {
            if (res.succeeded === true) {
                dispatch(ClusterLeadGetApi(currentPage, pageLength));
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

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        dispatch(ClusterLeadGetApi(currentPage, pageLength));
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        dispatch(ClusterLeadGetApi(currentPage, pageLength));
    };

    const onDeleteStatus = (data) => {
        setOpenDeleteModel(true);
        setDeleteData(data);
    };

    let { page } = clusterLeadList;
    page -= 1;
    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '0px' }}>
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
                        Cluster Lead Management
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
                        Add Cluster Lead <AddCircleRoundedIcon sx={{ ml: 1 }} />
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
                                        <Typography variant="h5">No. </Typography>
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
                                <Typography variant="h5">Mobile No.</Typography>
                            </Grid>
                            {/* <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">TL Name</Typography>
                            </Grid> */}
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Secret Key</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Status</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                                <Typography variant="h5" align="center">
                                    Action
                                </Typography>
                            </Grid>
                        </Grid>
                        {!clusterLeadLoading && clusterLeadList.docs.length > 0 ? (
                            clusterLeadList.docs.map((list, i) => (
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
                                                <Avatar alt={list.name} src={`${BASE_URL}${list.profile_pic}`} />
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
                                        <Typography variant="h5">{list?.mobile}</Typography>
                                    </Grid>
                                    {/* <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {list?.manager?.name ? (
                                            <Typography variant="h5">{list?.manager?.name}</Typography>
                                        ) : (
                                            <Typography variant="h5" sx={{ color: '#E94B4B' }}>
                                                Not Assigned
                                            </Typography>
                                        )}
                                    </Grid> */}
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.secret_key}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FormControlLabel
                                            value="bottom"
                                            control={
                                                <Switch
                                                    checked={list.status === '1'}
                                                    color="primary"
                                                    onClick={() => onChangeStatus(list)}
                                                />
                                            }
                                            label={
                                                list.status === '1' ? (
                                                    <Chip label="Activated" variant="outlined" color="primary" sx={{ cursor: 'pointer' }} />
                                                ) : (
                                                    <>
                                                        {list.status === '2' ? (
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
                                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                                        {/* <Button
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
                                        >
                                            <VisibilityIcon sx={{ mr: 1 }} /> View
                                        </Button> */}
                                        <MuiTooltip title="Update Team Lead" arrow>
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
                                                <EditIcon sx={{ mr: 1 }} /> Edit
                                            </Button>
                                        </MuiTooltip>
                                        <MuiTooltip title="Delete Team Lead" arrow>
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
                                                <DeleteOutlineIcon sx={{ mr: 1 }} /> Delete
                                            </Button>
                                        </MuiTooltip>
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {clusterLeadLoading === true ? (
                                    <TeamLeadTableLoader rows={10} />
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
                                                No Team Lead Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Typography>
                </Grid>
                {!clusterLeadLoading && clusterLeadList.totalDocs > 10 ? (
                    <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                        <Pagination
                            align="right"
                            sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                            color="primary"
                            shape="rounded"
                            count={clusterLeadList.totalPages}
                            page={currentPage}
                            onChange={onPaginationHandle}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
            {openDeleteModel && (
                <DeleteTeamLeadModels open={openDeleteModel} close={() => setOpenDeleteModel(false)} deleteData={deleteData} />
            )}
            {openModel && <AddTeamLeadModels open={openModel} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditTeamLeadModels teamLeadId={id} open={openEditModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default connect(null, { ClusterLeadGetApi, ClusterLeadStatusChangeApi })(ClusterLeadList);
