import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, Grid, Pagination, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { openPopupModel } from 'store/slices/menu';
import { dispatch } from 'store';
import { useSelector } from 'react-redux';
// import AddTeamLeadModels from './Models/AddTeamLeadModels';
// import TeamLeadDetails from './Models/TeamLeadDetails';
import Avatar1 from 'assets/images/users/avatar-1.png';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddBranchModels from './AddBranchModels';
import { BranchGetApi } from 'store/slices/adminAction';
import { BranchTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
import EditBranchModels from './EditBranchModels';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MuiTooltip from '@mui/material/Tooltip';
// import BranchTargetModels from './UpdateTargetModels';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewBranchTargetModels from './ViewBranchTargetModels';

const BranchList = () => {
    const newmenu = useSelector((state) => state.adminAction);
    const { branchList, branchLoading } = newmenu;
    const [openModel, setOpenModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [openTargetModel, setOpenTargetModel] = useState(false);
    const [openViewTargetModel, setViewOpenTargetModel] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        dispatch(BranchGetApi(currentPage, pageLength));
    }, [currentPage, pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(BranchGetApi(newPage, pageLength));
    };

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        setOpenTargetModel(false);
        dispatch(BranchGetApi(currentPage, pageLength));
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenTargetModel(false);
        setViewOpenTargetModel(false);
    };

    let { page } = branchList;
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
                        Branch Management
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
                        Add Branch <AddCircleRoundedIcon sx={{ ml: 1 }} />
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
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid item sx={{ mr: 2 }}>
                                        <Typography variant="h5">No. </Typography>
                                    </Grid>

                                    <Grid item xs zeroMinWidth>
                                        <Typography variant="h5" align="left">
                                            Branch Name
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Country</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">State</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">City</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Pincode</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Cluster Assigned</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Created By</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                                <Typography variant="h5" align="center">
                                    Action
                                </Typography>
                            </Grid>
                        </Grid>
                        {!branchLoading && branchList.docs.length > 0 ? (
                            branchList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={2} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item md={2} sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {/* {i + 1} */}
                                                    {page * pageLength + (i + 1)}
                                                </Typography>
                                            </Grid>

                                            <Grid item md={8}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list?.branch_name}
                                                </Typography>
                                                {list?.status === '1' ? (
                                                    <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#60b253' }}>
                                                        Active
                                                    </Typography>
                                                ) : (
                                                    <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#E94B4B' }}>
                                                        Inactive
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.country}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.state}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.city}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.pincode}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {list?.cluster_id?.name ? (
                                            <Typography variant="h5" sx={{ color: '#60b253' }}>
                                                {list?.cluster_id?.name}
                                            </Typography>
                                        ) : (
                                            <Typography variant="h5" sx={{ color: '#E94B4B' }}>
                                                Not Assigned
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5" sx={{ color: '#60b253' }}>
                                            {list?.admin_id?.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                                        <MuiTooltip title="Update Branch Details" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#b5dbff',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: 1,
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
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {branchLoading === true ? (
                                    <BranchTableLoader rows={10} />
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
                                                No Branch Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Typography>
                </Grid>
                {!branchLoading && branchList.totalDocs > 10 ? (
                    <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                        <Pagination
                            align="right"
                            sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                            color="primary"
                            shape="rounded"
                            count={branchList.totalPages}
                            page={currentPage}
                            onChange={onPaginationHandle}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
            {openModel && <AddBranchModels open={openModel} close={() => handleCloseModel()} />}
            {id && openEditModel && <EditBranchModels branchId={id} open={openEditModel} close={() => handleCloseModel()} />}
        </MainCard>
    );
};

export default BranchList;
