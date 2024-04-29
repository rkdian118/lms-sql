import React, { useEffect, useState } from 'react';
import { Autocomplete, Avatar, Box, Button, Chip, Grid, MenuItem, Pagination, Select, Switch, TextField, Typography } from '@mui/material';
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
import { TargetTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import UserImage from 'assets/images/users/avatar-2.png';
import { AllTargetGetApi } from 'store/slices/clusterAction';
import ClearIcon from '@mui/icons-material/Clear';
import { months } from 'Helper/Validation';
import UpdateTargets from './UpdateTargets';
import { format } from 'date-fns';
import { BASE_URL } from 'config';

const TeamLeadTarget = ({ AllTargetGetApi }) => {
    const newmenu = useSelector((state) => state.clusterAction);
    const { targetList, targetLoading } = newmenu;

    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);
    const [id, setId] = useState('');
    const [totalTarget, setTotalTarget] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        AllTargetGetApi(currentPage, pageLength, '');
    }, [currentPage, pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setCurrentPage(newPage);
        dispatch(AllTargetGetApi(newPage, pageLength));
    };

    const handleCloseModel = () => {
        setOpenModel(false);
        setId('');
        AllTargetGetApi(currentPage, pageLength);
    };

    const handleEditModel = (data) => {
        setId(data._id);
        setTotalTarget(data.total_target);
        setOpenEditModel(true);
    };

    const handleMonthChange = (event, newValue) => {
        const months = newValue ? newValue.label : '';
        setSelectedMonth(newValue ? newValue.label : '');
        AllTargetGetApi(currentPage, pageLength, months);
    };

    // console.log('🚀  selectedMonth:', selectedMonth);
    let { page } = targetList;
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
                        Team Lead Target Based On Month
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
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid container spacing={2}>
                                    <Grid item sx={{ mr: 2 }}>
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
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Assigned</Typography>
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
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5" align="center">
                                    Action
                                </Typography>
                            </Grid>
                        </Grid>
                        {!targetLoading && targetList.docs.length > 0 ? (
                            targetList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 0px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }} px="10px">
                                        {/* <Grid container spacing={2} alignItems="center">
                                            <Grid item md={2} sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {page * pageLength + (i + 1)}
                                                </Typography>
                                            </Grid>

                                            <Grid item md={9}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list?.manager?.name}
                                                </Typography>
                                            </Grid>
                                        </Grid> */}
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid md={1} item sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {page * pageLength + (i + 1)}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt={list.name} src={`${BASE_URL}${list?.manager?.profile_pic}`} />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list?.manager?.name}
                                                </Typography>
                                                <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                                                    {list?.manager?.emp_id} ({list?.manager?.designation})
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        {/* <Grid container spacing={2} alignItems="center">
                                            <Grid item sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {i + 1}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt="Preview" src={`${BaseURL}${list?.manager?.profile_pic}`} />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list?.manager?.name}
                                                </Typography>
                                                <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                                                    {list?.manager?.emp_id} ({list?.manager?.designation})
                                                </Typography>
                                            </Grid>
                                        </Grid> */}
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.targets}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.prev_month_target}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.total_target}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.completed_target}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list.remaining_target}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.assigned_targets}</Typography>
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
                                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '0px' }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: '#b5dbff',
                                                color: '#000000',
                                                padding: '5px 15px',
                                                my: 1,
                                                mx: 1,
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
                                        {/* <Button
                                            variant="contained"
                                            sx={{
                                                background: '#b5dbff',
                                                color: '#000000',
                                                padding: '5px 15px',
                                                my: 1,
                                                mx: 1,
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    background: '#4d97f3',
                                                    color: '#ffffff'
                                                }
                                            }}
                                            // onClick={() => handleEditModel(list)}
                                        >
                                            <TrackChangesIcon sx={{ mr: 0.5 }} /> Complete
                                        </Button> */}
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {targetLoading === true ? (
                                    <TargetTableLoader rows={10} />
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
                                                No Assigned Target Found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </>
                        )}
                    </Typography>
                </Grid>
                {!targetLoading && targetList.totalDocs > 10 ? (
                    <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                        <Pagination
                            align="right"
                            sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                            color="primary"
                            shape="rounded"
                            count={targetList.totalPages}
                            page={currentPage}
                            onChange={onPaginationHandle}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
            {/* {openModel && <AddClusterModels open={openModel} close={() => handleCloseModel()} />} */}
            {id && openEditModel && (
                <UpdateTargets totalTarget={totalTarget} targetId={id} open={openEditModel} close={() => handleCloseModel()} />
            )}
        </MainCard>
    );
};

export default connect(null, { AllTargetGetApi })(TeamLeadTarget);
