import React, { useEffect, useState } from 'react';
import { Autocomplete, Avatar, Box, Button, Chip, FormControlLabel, Grid, Pagination, Switch, TextField, Typography } from '@mui/material';
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
import { BDGetTargetApi, BdStatusChangeApi } from 'store/slices/clusterAction';
import { BASE_URL } from 'config';
import { BDETableTargetLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import UserImage from 'assets/images/users/img-user.png';
import AddBdModels from './AddBdModels';
import EditBdModels from './EditBdModels';
import DeleteBdModels from './DeleteBdModels';
import { openSnackbar } from 'store/slices/snackbar';
import { format } from 'date-fns';
import { months } from 'Helper/Validation';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import MuiTooltip from '@mui/material/Tooltip';
import CompleteTargetModels from './CompleteTargetModels';
import UpdateTargetModels from './UpdateTargetModels';

const BdTargets = ({ BdStatusChangeApi }) => {
    const newmenu = useSelector((state) => state.clusterAction);
    const { bdTargetList, bdTargetLoading } = newmenu;

    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);
    const [id, setId] = useState('');
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [completedTarget, setCompletedTarget] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [openCompletedTargetModel, setOpenCompletedTargetModel] = useState(false);
    const [totalTarget, setTotalTarget] = useState('');
    const [bdId, setBdId] = useState('');

    useEffect(() => {
        dispatch(BDGetTargetApi(currentPage, pageLength));
    }, [currentPage, pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(BDGetTargetApi(newPage, pageLength));
    };

    const handleCompletedTargetUpdateModel = (data) => {
        setId(data?._id);
        setBdId(data?.bd?._id);
        setCompletedTarget(data?.completed_target);
        setOpenCompletedTargetModel(true);
        setOpenEditModel(false);
    };

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        dispatch(BDGetTargetApi(currentPage, pageLength));
    };
    const handleEditModel = (data) => {
        setId(data._id);
        setOpenEditModel(true);
        setOpenCompletedTargetModel(false);
        setTotalTarget(data?.targets);
        // dispatch(BDGetTargetApi(currentPage, pageLength));
    };

    const onDeleteStatus = (data) => {
        setOpenDeleteModel(true);
        setDeleteData(data);
    };

    const handleMonthChange = (event, newValue) => {
        const months = newValue ? newValue.label : '';
        setSelectedMonth(newValue ? newValue.label : '');
        dispatch(BDGetTargetApi(currentPage, pageLength, months));
    };

    let { page } = bdTargetList;
    page -= 1;
    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '0px' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={10}>
                    <Typography
                        variant="h4"
                        align="center"
                        // p="10px"
                        // color="#4a873b"
                        sx={{
                            p: '20px 10px',
                            borderRadius: '4px',
                            color: '#4a873b',
                            background: '#cffea0'
                        }}
                    >
                        BDE Target Based On Month
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
                        color="#4a873b"
                        sx={{
                            borderRadius: '4px',
                            // height: '780px',
                            color: '#4968a2',
                            background: '#cffea0'
                        }}
                    >
                        <Grid container sx={{ backgroundColor: 'white', my: 1, padding: '20px 10px', borderRadius: '10px' }}>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid item sx={{ mr: 0 }}>
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

                            {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Month Start</Typography>
                            </Grid> */}
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Month</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '10px' }}>
                                <Typography variant="h5">Year</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5" align="center">
                                    Action
                                </Typography>
                            </Grid>
                        </Grid>
                        {!bdTargetLoading && bdTargetList.docs.length > 0 ? (
                            bdTargetList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 10px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid md={1} item sx={{ mr: 1 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {/* {i + 1} */}
                                                    {page * pageLength + (i + 1)}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt="Preview" src={`${BASE_URL}${list?.bd?.profile_pic}`} />
                                                {/* <img alt="Preview" src={`${BaseURL}${list.profile_pic}`} /> */}
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list?.bd?.name}
                                                </Typography>
                                                <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                                                    {list?.bd?.emp_id} ({list?.bd?.designation})
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
                                    {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{format(new Date(), 'dd MMM')}</Typography>
                                    </Grid> */}
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.target_month}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.target_year}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }}>
                                        <MuiTooltip title="Edit Total Target" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#cffea0',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: '15px',
                                                    mr: 2,
                                                    ml: 1,
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        background: '#9bf541',
                                                        color: '#000000'
                                                    }
                                                }}
                                                onClick={() => handleEditModel(list)}
                                            >
                                                <EditIcon sx={{ mr: 1 }} /> Edit
                                            </Button>
                                        </MuiTooltip>
                                        <MuiTooltip title="Update Completed Target" arrow>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#cffea0',
                                                    color: '#000000',
                                                    padding: '5px 15px',
                                                    my: '15px',
                                                    ml: 1,
                                                    borderRadius: '8px',
                                                    '&:hover': {
                                                        background: '#9bf541',
                                                        color: '#000000'
                                                    }
                                                }}
                                                onClick={() => handleCompletedTargetUpdateModel(list)}
                                            >
                                                <TrackChangesIcon sx={{ mr: 1 }} /> Completed
                                            </Button>
                                        </MuiTooltip>
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {bdTargetLoading === true ? (
                                    <BDETableTargetLoader rows={10} />
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
                                                No BDE Target Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Typography>
                </Grid>
                {!bdTargetLoading && bdTargetList.totalDocs > 10 ? (
                    <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                        <Pagination
                            align="right"
                            sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                            color="success"
                            shape="rounded"
                            count={bdTargetList.totalPages}
                            page={currentPage}
                            onChange={onPaginationHandle}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
            {id && openEditModel && (
                <UpdateTargetModels targetId={id} totalTarget={totalTarget} open={openEditModel} close={() => handleCloseModel()} />
            )}
            {id && openCompletedTargetModel && (
                <CompleteTargetModels
                    targetId={id}
                    bdId={bdId}
                    completedTarget={completedTarget}
                    open={openCompletedTargetModel}
                    close={() => handleCloseModel()}
                />
            )}
        </MainCard>
    );
};

export default connect(null, { BdStatusChangeApi })(BdTargets);
