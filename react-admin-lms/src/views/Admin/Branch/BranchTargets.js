import React, { useEffect, useState } from 'react';
import { Autocomplete, Avatar, Box, Button, Chip, Grid, Pagination, TextField, Typography } from '@mui/material';
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
import { BranchTargetGetApi } from 'store/slices/adminAction';
import EditBranchModels from './EditBranchModels';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MuiTooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewBranchTargetModels from './ViewBranchTargetModels';
import { months } from 'Helper/Validation';
import { format } from 'date-fns';
import { BranchTargetTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
import UpdateTargetModels from './UpdateTargetModels';

const BranchTargets = () => {
    const newmenu = useSelector((state) => state.adminAction);
    const { branchTargetList, branchTargetLoading } = newmenu;

    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);
    const [openTargetModel, setOpenTargetModel] = useState(false);
    const [openCompletedTargetModel, setOpenCompletedTargetModel] = useState(false);
    const [totalTarget, setTotalTarget] = useState('');
    const [completedTarget, setCompletedTarget] = useState('');
    const [id, setId] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        dispatch(BranchTargetGetApi(currentPage, pageLength));
    }, [currentPage, pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(BranchTargetGetApi(newPage, pageLength));
    };

    const handleCloseModel = () => {
        setId('');
        setOpenTargetModel(false);
        dispatch(BranchTargetGetApi(currentPage, pageLength));
    };

    const handleTargetUpdateModel = (data) => {
        setId(data?._id);
        setTotalTarget(data?.targets);
        setOpenTargetModel(true);
        setOpenCompletedTargetModel(false);
    };

    const handleCompletedTargetUpdateModel = (data) => {
        setId(data?._id);
        setCompletedTarget(data?.completed_target);
        setOpenTargetModel(false);
        setOpenCompletedTargetModel(true);
    };

    const handleMonthChange = (event, newValue) => {
        const months = newValue ? newValue.label : '';
        setSelectedMonth(newValue ? newValue.label : '');
        dispatch(BranchTargetGetApi(currentPage, pageLength, months));
    };

    let { page } = branchTargetList;
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
                        Branch Target Based On Month
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Autocomplete
                        id="month-select"
                        fullWidth
                        options={months}
                        getOptionLabel={(option) => option.label}
                        value={{ label: selectedMonth }}
                        onChange={handleMonthChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Month"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off' // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
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
                                <Typography variant="h5">Targets</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Prev. Month</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Total</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Completed</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Remaining</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Assigned</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Month Start</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '10px' }}>
                                <Typography variant="h5">Year</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5" align="center">
                                    Action
                                </Typography>
                            </Grid>
                        </Grid>
                        {!branchTargetLoading && branchTargetList.docs.length > 0 ? (
                            branchTargetList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item md={2} sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {/* {i + 1} */}
                                                    {page * pageLength + (i + 1)}
                                                </Typography>
                                            </Grid>

                                            <Grid item md={8}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list?.branch?.branch_name}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.targets}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.prev_month_target}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.total_target}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.completed_target}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.remaining_target}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.assigned_targets}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{format(new Date(list?.month_start_date), 'dd MMM')}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.target_year}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', paddingRight: '5px' }}>
                                        <MuiTooltip title="Update Branch Target" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#b5dbff',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: 1,
                                                    mr: 1,
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        background: '#4d97f3',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                onClick={() => handleTargetUpdateModel(list)}
                                            >
                                                <EditIcon sx={{ mr: 1 }} /> Edit
                                            </Button>
                                        </MuiTooltip>
                                        {/* <MuiTooltip title="Update Completed Target" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#b5dbff',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: 1,
                                                    // mx: 1,
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        background: '#4d97f3',
                                                        color: '#ffffff'
                                                    }
                                                }}
                                                onClick={() => handleCompletedTargetUpdateModel(list)}
                                            >
                                                <TrackChangesIcon sx={{ mr: 1 }} /> Completed
                                            </Button>
                                        </MuiTooltip> */}
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {branchTargetLoading === true ? (
                                    <BranchTargetTableLoader rows={10} />
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
                                                No Branch Targets Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Typography>
                </Grid>
                {!branchTargetLoading && branchTargetList.totalDocs > 10 ? (
                    <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                        <Pagination
                            align="right"
                            sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                            color="primary"
                            shape="rounded"
                            count={branchTargetList.totalPages}
                            page={currentPage}
                            onChange={onPaginationHandle}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
            {id && openTargetModel && (
                <UpdateTargetModels targetId={id} totalTarget={totalTarget} open={openTargetModel} close={() => handleCloseModel()} />
            )}
            {/* {id && openCompletedTargetModel && (
                <CompleteTargetModels
                    targetId={id}
                    completedTarget={completedTarget}
                    open={openCompletedTargetModel}
                    close={() => handleCloseModel()}
                />
            )} */}
        </MainCard>
    );
};

export default BranchTargets;
