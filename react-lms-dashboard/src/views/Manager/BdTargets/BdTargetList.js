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
import { BdTargetGetListApi } from 'store/slices/managerAction';
import ClearIcon from '@mui/icons-material/Clear';
import { months } from 'Helper/Validation';
import UpdateBdTargets from './UpdateBdTargets';
import UpdateCompleteTarget from './UpdateCompleteTarget';
import { BASE_URL } from 'config';

const BdTargetList = ({ BdTargetGetListApi }) => {
    const newmenu = useSelector((state) => state.managerAction);
    const { bdTargetList, bdTargetLoading } = newmenu;

    const [openModel, setOpenModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [id, setId] = useState('');
    const [bdId, setBdId] = useState('');
    const [totalTarget, setTotalTarget] = useState('');
    const [completeTarget, setCompleteTarget] = useState('');
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);

    const [isLoading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        BdTargetGetListApi(1, pageLength, '');
    }, [pageLength]);

    const handleCloseModel = () => {
        setId('');
        BdTargetGetListApi(1, pageLength);
    };

    const handleEditModel = (data) => {
        setId(data?._id);
        setTotalTarget(data?.total_target);
        setOpenEditModel(true);
        setOpenModel(false);
    };

    const handleCompleteTargetModel = (data) => {
        setId(data._id);
        setBdId(data?.bd?._id);
        setCompleteTarget(data.completed_target);
        setOpenModel(true);
        setOpenEditModel(false);
    };

    const handleMonthChange = (event, newValue) => {
        const months = newValue ? newValue.label : '';
        setSelectedMonth(newValue ? newValue.label : '');
        BdTargetGetListApi(1, pageLength, months);
    };

    const onPaginationHandle = async (e, newPage) => {
        setPage(newPage);
        BdTargetGetListApi(newPage, pageLength);
    };
    // console.log('🚀  selectedMonth:', selectedMonth);

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
                        BDE Assigned Target
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Select
                        name="selectedMonth"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        variant="outlined"
                        size="small"
                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>Select Month</em>
                        </MenuItem>
                        <MenuItem value="January">January</MenuItem>
                        <MenuItem value="February">February</MenuItem>
                    </Select> */}
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
                                <Typography variant="h5">Assigned</Typography>
                            </Grid> */}
                            <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Month</Typography>
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
                        {!bdTargetLoading && bdTargetList.docs.length > 0 ? (
                            bdTargetList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 0px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }} px="10px">
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {i + 1}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt="Preview" src={`${BASE_URL}${list?.bd?.profile_pic}`} />
                                                {/* <img alt="Preview" src={`${BaseURL}${list?.bd?.profile_pic}`} /> */}
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
                                    {/* <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.assigned_targets}</Typography>
                                    </Grid> */}
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.target_month}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.target_year}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '0px' }}>
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
                                            onClick={() => handleCompleteTargetModel(list)}
                                        >
                                            <TrackChangesIcon sx={{ mr: 0.5 }} /> Complete
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {bdTargetLoading === true ? (
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
                {!bdTargetLoading && bdTargetList.totalDocs > 10 ? (
                    <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                        <Pagination
                            align="right"
                            sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                            color="primary"
                            shape="rounded"
                            count={bdTargetList.totalPages}
                            page={page}
                            onChange={onPaginationHandle}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
            {id && openEditModel && (
                <UpdateBdTargets totalTarget={totalTarget} targetId={id} open={openEditModel} close={() => handleCloseModel()} />
            )}
            {id && openModel && (
                <UpdateCompleteTarget
                    completeTarget={completeTarget}
                    bdId={bdId}
                    targetId={id}
                    open={openModel}
                    close={() => handleCloseModel()}
                />
            )}
        </MainCard>
    );
};

export default connect(null, { BdTargetGetListApi })(BdTargetList);
