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
import { BDListTableLoader } from 'ui-component/cards/Skeleton/TableLoader';
// import EditClusterModels from './EditClusterModels';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import UserImage from 'assets/images/users/avatar-2.png';
import { GetAllBdeListApi } from 'store/slices/managerAction';
import ClearIcon from '@mui/icons-material/Clear';
import { months } from 'Helper/Validation';
import UpdateBdTargets from '../Targets/UpdateBdTargets';
import { BASE_URL } from 'config';

const AllBdList = ({ GetAllBdeListApi }) => {
    const newmenu = useSelector((state) => state.managerAction);
    const { getBdeList, getBdeLoading } = newmenu;

    const BaseURL = process.env.REACT_APP_API_URL;
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(10);

    useEffect(() => {
        GetAllBdeListApi(page, pageLength, '');
    }, [pageLength]);

    const onPaginationHandle = async (e, newPage) => {
        setPage(newPage);
        GetAllBdeListApi(newPage, pageLength);
    };
    return (
        <MainCard content={false} sx={{ border: '0px solid', padding: '0px' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
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
                        BDE List
                    </Typography>
                </Grid>
                {/* <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                    autoComplete: 'off'
                                }}
                            />
                        )}
                    />
                </Grid> */}
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
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Email</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Mobile</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5">Status</Typography>
                            </Grid>
                        </Grid>
                        {!getBdeLoading && getBdeList.docs.length > 0 ? (
                            getBdeList.docs.map((list, i) => (
                                <Grid
                                    container
                                    spacing={0}
                                    sx={{ backgroundColor: 'white', my: 1, padding: '5px 0px', borderRadius: '10px' }}
                                    key={i}
                                >
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }} px="10px">
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid md={1} item sx={{ mr: 2 }}>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {i + 1}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar alt="Preview" src={BASE_URL + list?.profile_pic} />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" component="div" variant="subtitle1" sx={{ color: '#000000' }}>
                                                    {list?.name}
                                                </Typography>
                                                <Typography align="left" component="div" variant="subtitle2" sx={{ color: '#000000' }}>
                                                    {list?.emp_id} ({list?.designation})
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.email}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="h5">{list?.mobile}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* <Typography variant="h5">{list.total_target}</Typography> */}
                                        {list?.status === '1' ? (
                                            <Typography variant="h5" sx={{ color: '#60b253', mr: 2 }}>
                                                Active
                                            </Typography>
                                        ) : (
                                            <Typography variant="h5" sx={{ color: '#E94B4B', mr: 2 }}>
                                                Inactive
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            ))
                        ) : (
                            <>
                                {getBdeLoading === true ? (
                                    <BDListTableLoader rows={10} />
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
                {!getBdeLoading && getBdeList.totalDocs > 10 ? (
                    <Grid item xs={12} md={12} sx={{ my: '10px' }}>
                        <Pagination
                            align="right"
                            sx={{ float: 'right', '& .Mui-selected': { borderRadius: '50%', backgroundColor: `#b5dbff` } }}
                            color="primary"
                            shape="rounded"
                            count={getBdeList.totalPages}
                            page={page}
                            onChange={onPaginationHandle}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>
        </MainCard>
    );
};

export default connect(null, { GetAllBdeListApi })(AllBdList);
